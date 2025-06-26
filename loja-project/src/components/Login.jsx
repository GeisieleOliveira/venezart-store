import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Signup from "./Signup";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaShoppingCart } from 'react-icons/fa';
import '../App.css';
import NavbarL from "./NavbarL";
import bg from '../assets/bg.png'; 

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("http://127.0.0.1:5000/api/login", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('token', data.access_token);
            localStorage.setItem("userName", data.name);
            localStorage.setItem("userRole", data.role.toLowerCase()); 
           

            if (data.role === "admin") {
                navigate("/home");
            } else {
                navigate("/home");
            }
        } else {
            setError(data.error || "Erro ao fazer login");
        }
    };

    return (
        <>
            <NavbarL />
            <div
                className="login-background"
                style={{ backgroundImage: `url(${bg})` }}
            >   
                <div className="login-container">
                    <h2 className="h2-login">Login</h2>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Nome de usuário"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <br />
                        <input
                            type="password"
                            placeholder="Senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <br />
                        <button type="submit">Entrar</button>
                        <button type="button" onClick={() => navigate("/signup")}>Cadastre-se</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;