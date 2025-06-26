import React, { useEffect, useState } from 'react';
import '../Navbar.css'; 
import { useNavigate } from 'react-router-dom';

function CartSidebar({ show, onClose }) {
  const [cartItems, setCartItems] = useState([]);
  const userName = localStorage.getItem('userName');
  const navigate = useNavigate();

  useEffect(() => {
    if (show && userName) {
      fetch(`http://127.0.0.1:5000/api/cart?username=${userName}`)
        .then(res => res.json())
        .then(data => setCartItems(Array.isArray(data.cart) ? data.cart : []))
        .catch(() => setCartItems([]));
    }
  }, [show, userName]);


  const handleDelete = (productId) => {
    fetch('http://127.0.0.1:5000/api/cart', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: userName, product_id: productId })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data.message);
        setCartItems(prevItems => prevItems.filter(item => item.product_id !== productId));
      })
      .catch(err => console.error("Erro ao excluir item:", err));
  };

  console.log("Fazendo checkout para:", userName);
  const handleCheckout = () => {
    fetch('http://127.0.0.1:5000/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: userName })
    })
      .then(res => {
        if (!res.ok) throw new Error("Falha no checkout");
        return res.blob();
      })
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = "comprovante.pdf";
        document.body.appendChild(a);
        a.click();
        a.remove();
        navigate('/compra-realizada');
      })
      .catch(err => {
        console.error("Erro ao finalizar compra:", err);
        alert("Erro ao finalizar compra.");
      });
  };

  return (
    <>
      <div className={`cart-sidebar ${show ? 'active' : ''}`}>
        <div className="cart-sidebar-header">
          <h5>Seu Carrinho</h5>
          <button onClick={onClose} className="close-btn">×</button>
        </div>
        <div className="cart-sidebar-body">
          {cartItems.length === 0 ? (
            <p>O carrinho está vazio.</p>
          ) : (
            cartItems.map((item, index) => (
              <div className="cart-item-card" key={index}>
                <div className="cart-item-details">
                  <p><strong>{item.product_name}</strong></p>
                  <p>Quantidade: {item.quantity}</p>
                </div>
                <button className="delete-btn" onClick={() => handleDelete(item.product_id)}>Excluir</button>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-sidebar-footer">
            <button className="checkout-btn" onClick={handleCheckout}>
              Finalizar Compra
            </button>
          </div>
        )}
      </div>

      {show && <div className="cart-sidebar-overlay" onClick={onClose}></div>}
    </>
  );
}

export default CartSidebar;