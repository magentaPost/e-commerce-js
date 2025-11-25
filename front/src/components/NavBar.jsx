import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/usuarioSlice";

const NavBar = () => {
  const carrito = useSelector((state) => state.motos.carrito || []);
  const usuario = useSelector((state) => state.usuario.usuario); // Usuario logueado
  const totalProductos = carrito.reduce(
    (acc, item) => acc + (item.cantidad || 0),
    0
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [menuAbierto, setMenuAbierto] = useState(false);
  const toggleMenu = () => setMenuAbierto((prev) => !prev);

  const cerrarMenuYNavegar = (to) => {
    setMenuAbierto(false);
    navigate(to);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="navbar" aria-label="Main navigation">
      <div className="navbar-left">
        <button
          className="navbar-menu-toggle"
          onClick={toggleMenu}
          aria-expanded={menuAbierto}
          aria-label="Abrir menú"
        >
          ☰
        </button>
      </div>

      <ul className={`navbar-links ${menuAbierto ? "navbar-open" : ""}`}>
        <li>
          <button
            className="nav-button-link"
            onClick={() => cerrarMenuYNavegar("/")}
          >
            Home
          </button>
        </li>

        <li>
          <button
            className="nav-button-link"
            onClick={() => cerrarMenuYNavegar("/productos")}
          >
            Productos
          </button>
        </li>

        {/*  Si NO hay usuario → mostrar Login y Registro */}
        {!usuario && (
          <>
            <li>
              <button
                className="nav-button-link"
                onClick={() => cerrarMenuYNavegar("/login")}
              >
                Login
              </button>
            </li>
            <li>
              <button
                className="nav-button-link"
                onClick={() => cerrarMenuYNavegar("/registro")}
              >
                Registro
              </button>
            </li>
          </>
        )}

        {/*  Si SÍ hay usuario → mostrar su nombre y logout */}
        {usuario && (
          <>
            <li className="nav-username">
              👤 {usuario.nombreUsuario || usuario.nombre}
            </li>
            <li>
              <button className="nav-button-link" onClick={handleLogout}>
                Cerrar sesión
              </button>
            </li>
          </>
        )}
      </ul>

      <div className="navbar-right">
        <NavLink
          to="/Checkout"
          className="navbar-cart"
          onClick={() => setMenuAbierto(false)}
        >
          Carrito <span className="cart-count">({totalProductos})</span>
        </NavLink>
      </div>

      {menuAbierto && (
        <div className="navbar-overlay" onClick={() => setMenuAbierto(false)} />
      )}
    </nav>
  );
};

export default NavBar;
