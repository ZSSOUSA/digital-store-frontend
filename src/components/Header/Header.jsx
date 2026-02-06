import { NavLink, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Logo from "../Logo/Logo";

import cartIcon from "../../assets/cart-icon.svg"; 
import searchIcon from "../../assets/search-icon.svg"; 

import "./header.css";

export default function Header() {
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();

  function doSearch() {
    const value = filter.trim();
    if (!value) return;
    
    navigate(`/products?filter=${encodeURIComponent(value)}`);
  }

  function onKeyDown(e) {
    if (e.key === "Enter") doSearch();
  }

  return (
    <header className="header">
      <div className="headerTop">
        <Logo />

        <div className="searchBox">
          <input
            className="searchInput"
            placeholder="Pesquisar produto..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            onKeyDown={onKeyDown}
          />
          <button className="searchButton" onClick={doSearch} aria-label="Buscar">
            <img src={searchIcon} alt="Buscar" />
          </button>
        </div>

        <div className="redirectArea">
          <Link className="signupLink" to="/cadastro">Cadastre-se</Link>
          <Link className="signinButton" to="/login">Entrar</Link>

          {/* icone carrinho */}

          <img className="cartIcon" src={cartIcon} alt="Carrinho" />
        </div>
      </div>

      <nav className="mainNav">
        <NavLink to="/" className={({ isActive }) => `navItem ${isActive ? "active" : ""}`}>
          Home
        </NavLink>
        <NavLink to="/produtos" className={({ isActive }) => `navItem ${isActive ? "active" : ""}`}>
          Produtos
        </NavLink>
        <NavLink to="/categorias" className={({ isActive }) => `navItem ${isActive ? "active" : ""}`}>
          Categorias
        </NavLink>
        <NavLink to="/meus-pedidos" className={({ isActive }) => `navItem ${isActive ? "active" : ""}`}>
          Meus Pedidos
        </NavLink>
      </nav>
    </header>
  );
}
