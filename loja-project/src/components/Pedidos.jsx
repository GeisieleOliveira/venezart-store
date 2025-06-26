import React, { useEffect, useState } from 'react';
import "../Admin.css";
import NavbarP from './NavbarP'
import Rodape from './Rodape'

function Pedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [erro, setErro] = useState("");

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log("Token enviado:", token);
        const response = await fetch('http://127.0.0.1:5000/api/pedidos', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Erro ao buscar pedidos");
        }

        if (!Array.isArray(data)) {
          throw new Error("Resposta inválida: pedidos não é um array");
        }

        setPedidos(data);
      } catch (err) {
        console.error('Erro ao buscar pedidos:', err.message);
        setErro(err.message);
      }
    };

    fetchPedidos();
  }, []);

  const confirmarPedido = (id) => {
    const token = localStorage.getItem('token');
    fetch(`http://127.0.0.1:5000/api/pedidos/${id}/confirmar`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao confirmar pedido');
        }
        setPedidos(prev => prev.map(p => p.pedido_id === id ? { ...p, status: 'Confirmado' } : p));
      })
      .catch(err => console.error('Erro ao confirmar pedido:', err));
  };

  const excluirPedido = (id) => {
    const token = localStorage.getItem('token');
    fetch(`http://127.0.0.1:5000/api/pedidos/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao excluir pedido');
        }
        setPedidos(prev => prev.filter(p => p.pedido_id !== id));
      })
      .catch(err => console.error('Erro ao excluir pedido:', err));
  };

  return (
    <>
    <NavbarP />
    <div className="admin-pedidos-container">
  <h2>Pedidos Recebidos</h2>
  {erro && <div className="alert alert-danger">{erro}</div>}

  {pedidos.length === 0 && !erro ? (
    <p>Nenhum pedido recebido.</p>
  ) : (
    pedidos.map(pedido => (
      <div key={pedido.pedido_id} className="admin-pedido-card">
        <div className="admin-pedido-body">
          <h5 className="admin-pedido-title">Pedido de {pedido.usuario}</h5>
          <p className="admin-pedido-text">Data: {new Date(pedido.data).toLocaleString()}</p>
          <p className="admin-pedido-text"><strong>Status:</strong> {pedido.status}</p>
          <p><strong>Produtos:</strong></p>
          <ul>
            {Array.isArray(pedido.itens) && pedido.itens.length > 0 ? (
              pedido.itens.map((item, index) => (
                <li key={`${pedido.pedido_id}-${item.produto}-${index}`}>
                  {item.produto} — Quantidade: {item.quantidade}
                </li>
              ))
            ) : (
              <li>Nenhum produto neste pedido.</li>
            )}
          </ul>

          <button
            className="btn btn-success me-2"
            disabled={pedido.status === 'Confirmado'}
            onClick={() => confirmarPedido(pedido.pedido_id)}
          >
            Confirmar Pedido
          </button>

          <button
            className="btn btn-danger"
            onClick={() => excluirPedido(pedido.pedido_id)}
          >
            Excluir Pedido
          </button>
        </div>
      </div>
    ))
  )}
</div>
    <Rodape />
  </>
  );
}

export default Pedidos;