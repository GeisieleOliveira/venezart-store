import { useState } from "react";
import '../App.css'
import { useNavigate } from "react-router-dom"
import '../bootstrap.min.css'
import { FaShoppingCart } from 'react-icons/fa';
import '../App.css'
import NavbarL from "./NavbarL"
import s from '../assets/s.png';
export default function Signup() {
    const [form, setForm] = useState({
        username: "",
        password: "",
        name: "",
        email: ""
    });
    
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setSuccessMessage("");

        try {
            const response = await fetch("http://127.0.0.1:5000/api/signup", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(form)
            });

            const data = await response.json();

            if (response.ok) {
                setSuccessMessage("Cadastro realizado com sucesso!");
                setForm({ username: "", password: "", name: "", email: "" });

                setTimeout(() => {
                    setSuccessMessage("");
                    navigate("/login");
                }, 3000);
            } else {
                setErrorMessage(data.error || "Erro ao cadastrar.");
            }
        } catch (error) {
            setErrorMessage("Erro de conexão com o servidor!");
        }
    };

return (
  <>
    <NavbarL />
    <div className="login-background-s" style={{ backgroundImage: `url(${s})` }}>
      <div className="login-container">
        <h2>Cadastro</h2>
        {successMessage && (
          <div className="alert alert-success text-center fw-bold" role="alert">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="alert alert-warning text-center fw-bold" role="alert">
            {errorMessage}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="User"
            value={form.username}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  </>
);

}
