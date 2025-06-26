import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./components/Login"
import Signup from "./components/Signup"
import Admin from "./components/Admin"
import Logout from "./components/Logout"
import Home from "./components/Home"
import Telas from "./components/Telas"
import TintasOleo from "./components/TintasOleo"
import Pinceis from "./components/Pinceis"
import Solventes from "./components/Solventes"
import CartSidebar from "./components/CartSidebar"
import CompraRealizada from "./components/CompraRealizada"
import Pedidos from "./components/Pedidos";
import Produtos from "./components/Produtos";

function App() {
    return(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin" element={<Admin />}/>
          <Route path="/logout" element={<Logout />}/>
          <Route path="/home" element={<Home />}/>
          <Route path="/" element={<Home />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/telas" element={<Telas />} />
          <Route path="/pinceis" element={<Pinceis />} />
          <Route path="/tintas" element={<TintasOleo />} />
          <Route path="/solventes" element={<Solventes />} />
          <Route path="/carrinho" element={<CartSidebar />} />
          <Route path="/compra-realizada" element={<CompraRealizada />} />
          <Route path="/pedidos" element={<Pedidos />} />
        </Routes>
      </BrowserRouter>
    )
}

export default App
