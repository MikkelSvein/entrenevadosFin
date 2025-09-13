import React from "react";
import { Link } from "react-router-dom";

function Navbar({ userEmail, onLogout }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src="/logo.png"
            alt="EntreNevados"
            height="40"
            className="me-2"
          />
          <span className="fw-bold text-brown">EntreNevados</span>
        </Link>

        <div className="collapse navbar-collapse justify-content-end">
          <ul className="navbar-nav align-items-center">
            <li className="nav-item">
              <Link className="nav-link fw-bold" to="/">
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-bold" to="/categorias">
                Categorías
              </Link>
            </li>
            {userEmail && (
              <>
                <li className="nav-item me-2">
                  <span className="nav-link fw-bold">{userEmail}</span>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-warning fw-bold"
                    onClick={onLogout}
                  >
                    Cerrar Sesión
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
