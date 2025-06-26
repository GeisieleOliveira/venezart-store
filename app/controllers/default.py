from flask import render_template, flash, redirect, url_for
from app import app, db
from app.models.tables import User, CartItem, Product, Pedido, PedidoItem 
from app.models.forms import LoginForm, SignupForm
from flask_login import login_user, logout_user
from flask import request, jsonify
from werkzeug.security import check_password_hash
from werkzeug.security import generate_password_hash
from reportlab.pdfgen import canvas
from io import BytesIO
from flask import send_file
from flask import session
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_jwt_extended import create_access_token
from flask import send_file, request, jsonify
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.platypus import Table, TableStyle, SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet
from io import BytesIO
from datetime import datetime
import pytz

@app.route("/api/login", methods=['POST'])
def api_login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"error": "Preencha todos os campos"}), 400
    
    user = User.query.filter_by(username=username).first()

    if not user:
        return jsonify({"error": "Usuário não encontrado."}), 404  

    if not check_password_hash(user.password, password):
         return jsonify({"error": "Senha inválida."}), 401 
    
    if user.username == 'admin':
        access_token = create_access_token(identity=username)
        return jsonify({'message': 'Login realizado com sucesso - Admin', 
        'role': 'admin',
        'username': user.username,
        'name': user.name,
        'access_token': access_token}), 200
    
    access_token = create_access_token(identity=username)
    return jsonify({
    'message': 'Login realizado com sucesso',
    'role': 'user',
    'username': user.username,
    'name': user.name,
    'access_token': access_token
}), 200


@app.route("/logout", methods=['POST'])
def logout():
    session.clear()
    return jsonify({'message': 'Logout realizado com sucesso!'}), 200

  
@app.route("/api/signup", methods=['GET','POST'])
def signup():
    data = request.json

    username = data.get('username')
    password = data.get('password')
    email = data.get('email')
    name = data.get('name')

    if not username or not password or not name or not email:
        return jsonify({"error":"Todos os campos são obrigatórios"}), 400
    if User.query.filter_by(username=username).first():
        return jsonify({"error" : "Usuário já cadastrado."}),409
    new_user = User(
        username=username,
        password=generate_password_hash(password),
        email=email,
        name=name
    )
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message":"Usuário cadastrado com sucesso"}), 201
        

@app.route('/api/cart', methods=['GET', 'POST'])
def handle_cart():
    if request.method == 'GET':
        username = request.args.get('username')
        if not username:
            return jsonify({'error': 'Parâmetro "username" é obrigatório'}), 400

        user = User.query.filter_by(name=username).first()
        if not user:
            return jsonify({'error': 'Usuário não encontrado'}), 404

        cart_items = CartItem.query.filter_by(user_id=user.id).all()

        cart = []
        for item in cart_items:
            product = Product.query.get(item.product_id)
            cart.append({
                'product_id': product.id,
                'product_name': product.name,
                'quantity': item.quantity,
                'price': product.price
            })

        return jsonify({'username': username, 'cart': cart}), 200

    elif request.method == 'POST':
        data = request.get_json()
        print(f"Requisição recebida: {data}")
        username = data.get('username')
        product_id = data.get('product_id')
        quantity = data.get('quantity', 1)

        user = User.query.filter_by(name=username).first()
        print(f"Usuário: {user}")
        if not user:
            return jsonify({'error': 'Usuário não encontrado'}), 404

        product = Product.query.get(product_id)
        print(f"Produto: {product}")
        if not product:
            return jsonify({'error': 'Produto não encontrado'}), 404

        cart_item = CartItem.query.filter_by(user_id=user.id, product_id=product_id).first()
        if cart_item:
            cart_item.quantity += quantity
        else:
            cart_item = CartItem(user_id=user.id, product_id=product_id, quantity=quantity)
            db.session.add(cart_item)

        db.session.commit()
        return jsonify({'message': 'Item adicionado ao carrinho'}), 201


@app.route('/api/cart', methods=['DELETE'])
def delete_cart_item():
    data = request.get_json()
    username = data.get('username')
    product_id = data.get('product_id')

    if not username or not product_id:
        return jsonify({'error': 'Parâmetros "username" e "product_id" são obrigatórios'}), 400

    user = User.query.filter_by(name=username).first()
    if not user:
        return jsonify({'error': 'Usuário não encontrado'}), 404

    cart_item = CartItem.query.filter_by(user_id=user.id, product_id=product_id).first()
    if not cart_item:
        return jsonify({'error': 'Item não encontrado no carrinho'}), 404

    db.session.delete(cart_item)
    db.session.commit()

    return jsonify({'message': 'Item removido do carrinho com sucesso'}), 200


@app.route('/api/checkout', methods=['POST'])
def checkout():
    data = request.get_json()
    username = data.get('username')

    user = User.query.filter_by(name=username).first()
    if not user:
        return jsonify({'error': 'Usuário não encontrado'}), 404

    cart_items = CartItem.query.filter_by(user_id=user.id).all()
    if not cart_items:
        return jsonify({'error': 'Carrinho vazio'}), 400

    pedido_info = []
    total = 0
    novo_pedido = Pedido(user_id=user.id)
    db.session.add(novo_pedido)
    db.session.flush()

    for item in cart_items:
        product = Product.query.get(item.product_id)
        subtotal = product.price * item.quantity
        total += subtotal
        pedido_info.append([
            product.name,
            str(item.quantity),
            f"R$ {product.price:.2f}",
            f"R$ {subtotal:.2f}"
        ])
        pedido_item = PedidoItem(
            pedido_id=novo_pedido.id,
            product_name=product.name,
            quantity=item.quantity,
            price=product.price
        )
        db.session.add(pedido_item)
        db.session.delete(item)

    db.session.commit()

    buffer = BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=A4)
    elements = []

    styles = getSampleStyleSheet()
    title = Paragraph(f"<b>Comprovante de Compra</b>", styles['Title'])
    user_info = Paragraph(f"Cliente: <b>{username}</b>", styles['Normal'])

    elements.append(title)
    elements.append(Spacer(1, 12))
    elements.append(user_info)
    elements.append(Spacer(1, 12))

    
    data = [["Produto", "Quantidade", "Preço Unitário", "Subtotal"]] + pedido_info
    table = Table(data, colWidths=[150, 80, 100, 100])
    table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.lightblue),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
        ('ALIGN', (1, 1), (-1, -1), 'CENTER'),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.grey),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
    ]))

    elements.append(table)
    elements.append(Spacer(1, 12))

    total_paragraph = Paragraph(f"<b>Total da Compra:</b> R$ {total:.2f}", styles['Normal'])
    agradecimento = Paragraph("Obrigado pela compra!", styles['Normal'])

    elements.append(total_paragraph)
    elements.append(Spacer(1, 12))
    elements.append(agradecimento)

    doc.build(elements)
    buffer.seek(0)

    return send_file(buffer, as_attachment=True, download_name="comprovante.pdf", mimetype='application/pdf')

@app.route('/api/pedidos', methods=['GET'])
@jwt_required()
def listar_pedidos():
    current_user = get_jwt_identity() 
    user = User.query.filter_by(username=current_user).first()

    if not user or user.username != 'admin':
        return jsonify({'error': 'Acesso não autorizado'}), 403

    pedidos = Pedido.query.all()
    result = []

    fuso_brasil = pytz.timezone('America/Sao_Paulo')
    utc = pytz.utc

    for pedido in pedidos:
        itens = PedidoItem.query.filter_by(pedido_id=pedido.id).all()

        if pedido.data:
            if pedido.data.tzinfo is None:
                data_com_fuso = utc.localize(pedido.data)
            else:
                data_com_fuso = pedido.data

            data_brasil = data_com_fuso.astimezone(fuso_brasil)
            data_formatada = data_brasil.strftime('%Y-%m-%dT%H:%M:%S')
        else:
            data_formatada = None

        result.append({
            'pedido_id': pedido.id,  
            'usuario': User.query.get(pedido.user_id).username,
            'data': data_formatada,
            'itens': [ 
                {
                    'produto': i.product_name,
                    'quantidade': i.quantity,
                    'preco': i.price
                } for i in itens
            ]
        })
    return jsonify(result), 200

@app.route('/api/pedidos/<int:pedido_id>/confirmar', methods=['PUT', 'OPTIONS'])
@jwt_required()
def confirmar_pedido(pedido_id):
    if request.method == "OPTIONS":
        return '', 200  
    current_user = get_jwt_identity()
    user = User.query.filter_by(username=current_user).first()

    if not user or user.username != 'admin':
        return jsonify({'error': 'Acesso não autorizado'}), 403

    pedido = Pedido.query.get(pedido_id)
    if not pedido:
        return jsonify({'error': 'Pedido não encontrado'}), 404

    pedido.status = 'Confirmado'
    db.session.commit()

    return jsonify({'message': 'Pedido confirmado com sucesso'})


@app.route('/api/pedidos/<int:pedido_id>', methods=['DELETE', 'OPTIONS'])
@jwt_required()
def excluir_pedido(pedido_id):
    if request.method == "OPTIONS":
        return '', 200  

    current_user = get_jwt_identity()
    user = User.query.filter_by(username=current_user).first()

    if not user or user.username != 'admin':
        return jsonify({'error': 'Acesso não autorizado'}), 403

    pedido = Pedido.query.get(pedido_id)
    if not pedido:
        return jsonify({'error': 'Pedido não encontrado'}), 404

    PedidoItem.query.filter_by(pedido_id=pedido.id).delete()
    db.session.delete(pedido)
    db.session.commit()

    return jsonify({'message': 'Pedido excluído com sucesso'})

@app.route('/api/products', methods=['POST'])
def create_product():
    data = request.get_json()

    titulo = data.get('titulo')
    descricao = data.get('descricao')  
    preco = data.get('precoAtual')

    if not titulo or preco is None:
        return jsonify({'message': 'Dados inválidos'}), 400

    novo_produto = Product(name=titulo, description=descricao, price=preco)

    db.session.add(novo_produto)
    db.session.commit()

    return jsonify({'message': 'Produto criado com sucesso'}), 201





@app.route("/seed/products")
def seed_products():
    produtos = [
        Product(name='Gato Preto - Vermelho Cadmio Escuro 37ml', description='Pigmentação intensa, ideal para tons quentes', price=15.00),
        Product(name='Acrilex - Azul Ultramar 20ml', description='Secagem lenta, excelente para degradês', price=13.00),
        Product(name='Corfix - Amarelo Ocre 37ml', description='Cor terrosa clássica, ótima para tons de pele', price=16.00),
        Product(name='Gato Preto - Branco de Titânio 37ml', description='Essencial para mistura de cores', price=12.00),
        Product(name='Corfix - Preto Profundo 20ml', description='Perfeita para sombreamentos e constrastes', price=13.00),
        Product(name='Acrilex - Verde Veronese 40ml', description='Ideal para elementos naturais e paisagens', price=10.00),
        Product(name='Gato Preto - Azul da Prússia 37ml', description='Cor intensa, ótima para céus noturnos', price=18.00),
        Product(name='Corfix - Laranja Intenso 20ml', description='Excelente brilho, cor vibrante e ideal para destaques', price=17.00),
        Product(name='Acrilex - Rosa Permanente 37ml', description='Tinta com ótimo poder de cobertura e tonalidade marcante', price=18.50),

        Product(name='Acrilex - Terebintina 100ml', description='Solvente natural à base de resina vegetal', price=16.90),
        Product(name='Corfix - Medium Secante de Cobalto 60ml', description='Acelera a secagem da tinta a óleo sem alterar a consistência', price=22.50),
        Product(name='Gato Preto - Óleo de Linhaça 100ml', description='Dá brilho e melhora a fluidez da tinta', price=14.80),
        Product(name='Acrilex - Solvente Inodoro 100ml', description='Alternativa sem cheiro para diluição de tinta a óleo e limpeza', price=18.00),
        Product(name='Corfix - Essência de Petróleo 100ml', description='Solvente leve usado na primeira etapa da pintura', price=17.90),
        Product(name='Gato Preto - Óleo de Cártamo 100ml', description='Substituto do óleo de linhaça, ideal para tons claros e brancos', price=15.70),
        Product(name='Acrilex - Medium para Óleo 100ml', description='Mistura de solvente e óleo que melhora a aplicação e acabamento', price=21.90),
        Product(name='Corfix - Gel de Pintura para Óleo 60ml', description='Aumenta a transparência e brilho sem escorrer', price=23.50),
        Product(name='Gato Preto - Verniz Dammar 100ml', description='Finalizador para pintura a óleo. Realça cores e protege a obra', price=19.90)
    ]

    db.session.add_all(produtos)
    db.session.commit()

    return {"message": "Produtos criados com sucesso!"}, 201


