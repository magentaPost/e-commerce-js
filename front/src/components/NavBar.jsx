import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/usuarioSlice";

const NavBar = () => {
  const carrito = useSelector(state => state.motos.carrito || []);
  const totalProductos = carrito.reduce((acc, item) => acc + (item.cantidad || 0), 0);
  const usuario = useSelector(state => state.usuario.usuario);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [menuAbierto, setMenuAbierto] = useState(false);

  const toggleMenu = () => setMenuAbierto(prev => !prev);
  const cerrarMenuYNavegar = (to) => {
    setMenuAbierto(false);
    navigate(to);
  };

  const handleLogout = () => {
    dispatch(logout());
    setMenuAbierto(false);
    navigate("/login");
  };

  return (
    <nav className="navbar" aria-label="Main navigation">
      {/* IZQUIERDA */}
      <div className="navbar-left">
        <button
          className="navbar-menu-toggle"
          onClick={toggleMenu}
          aria-expanded={menuAbierto}
        >
          ☰
        </button>

        <button onClick={() => cerrarMenuYNavegar("/")}>Home</button>
        <button onClick={() => cerrarMenuYNavegar("/productos")}>Productos</button>

        {!usuario ? (
          <>
            <button onClick={() => cerrarMenuYNavegar("/login")}>Login</button>
            <button onClick={() => cerrarMenuYNavegar("/registro")}>Registro</button>
          </>
        ) : (
          <button onClick={handleLogout} className="btn-logout">Cerrar sesión</button>
        )}
      </div>

      {/* CENTRO */}
      <div className="navbar-center">
        {usuario && <span className="navbar-user">Hola, {usuario.nombre}</span>}
      </div>

      {/* DERECHA */}
      <div className="navbar-right">
        <NavLink to="/checkout" className="navbar-cart">
          Carrito <span className="cart-count">({totalProductos})</span>
        </NavLink>
      </div>

      {/* MENÚ MÓVIL */}
      {menuAbierto && (
        <>
          <ul className="navbar-links navbar-open">
            <li><button onClick={() => cerrarMenuYNavegar("/")}>Home</button></li>
            <li><button onClick={() => cerrarMenuYNavegar("/productos")}>Productos</button></li>

            {!usuario ? (
              <>
                <li><button onClick={() => cerrarMenuYNavegar("/login")}>Login</button></li>
                <li><button onClick={() => cerrarMenuYNavegar("/registro")}>Registro</button></li>
              </>
            ) : (
              <>
                <li><span className="nav-user">Hola, {usuario.nombre}</span></li>
                <li><button onClick={handleLogout}>Cerrar sesión</button></li>
              </>
            )}

            <li>
              <NavLink to="/checkout" onClick={() => setMenuAbierto(false)}>
                Carrito ({totalProductos})
              </NavLink>
            </li>
          </ul>

          <div className="navbar-overlay" onClick={() => setMenuAbierto(false)} />
        </>
      )}
    </nav>
  );
};

export default NavBar;
