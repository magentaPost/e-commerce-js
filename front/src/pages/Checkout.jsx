import { useSelector, useDispatch } from "react-redux";
import {
  incrementarCantidad,
  disminuirCantidad,
  eliminarCarrito,
  vaciarCarrito,
} from "../redux/slices/motosSlice";
import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CartItem from "../components/CartItem";
import "../style/styles.css";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // --- Redux: carrito y usuario
  const carrito = useSelector((state) => state.motos.carrito);
  const { usuario, token } = useSelector((state) => state.usuario);
  const isLogged = !!usuario && !!token;

  // --- Formulario
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [direccion, setDireccion] = useState("");
  const [compraFinalizada, setCompraFinalizada] = useState(false);

  // --- Autorrellenar formulario si hay usuario
  useEffect(() => {
    if (usuario) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setNombre(usuario.nombre || "");
      setEmail(usuario.email || "");
    }
  }, [usuario]);

  // --- Total
  const total = useMemo(
    () => carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0),
    [carrito]
  );

  // --- Manejo del submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (nombre && email && direccion) {
      setCompraFinalizada(true);
      dispatch(vaciarCarrito());
    }
  };

  // --- Compra finalizada
  if (compraFinalizada) {
    return (
      <div className="checkout-container">
        <h2 className="checkout-title">¡Gracias por tu compra, {nombre}!</h2>
        <p className="checkout-subtext">Resumen enviado a: {email}</p>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2 className="cart-title">Tu carrito</h2>

      {carrito.length === 0 ? (
        <p className="cart-empty">El carrito está vacío.</p>
      ) : (
        <div className="cart-items">
          {carrito.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onIncrement={(id) => dispatch(incrementarCantidad(id))}
              onDecrement={(id) => dispatch(disminuirCantidad(id))}
              onRemove={(id) => dispatch(eliminarCarrito(id))}
            />
          ))}
        </div>
      )}

      <h3 className="cart-total">Total: ${total}</h3>

      <div className="cart-actions">
        <button className="btn-empty" onClick={() => dispatch(vaciarCarrito())}>
          Vaciar Carrito
        </button>
      </div>

      {/* --- No logueado */}
      {!isLogged && carrito.length > 0 && (
        <div className="login-required">
          <h3>Debes iniciar sesión para finalizar la compra</h3>
          <button onClick={() => navigate("/login")}>Ir al Login</button>
        </div>
      )}

      {/* --- Formulario solo si logueado y carrito con productos */}
      {isLogged && carrito.length > 0 && (
        <>
          <h2 className="checkout-title">Formulario de Compra</h2>
          <form className="checkout-form" onSubmit={handleSubmit}>
            <label>Nombre:</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />

            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Dirección:</label>
            <input
              type="text"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              required
            />

            <button className="btn-checkout" type="submit">
              Finalizar Compra
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default Checkout;
