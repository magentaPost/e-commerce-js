import { useContext } from "react";
import { CartContext } from "../context/CartContext.jsx";
import "../style/styles.css";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { carrito, eliminarDelCarrito, vaciarCarrito } = useContext(CartContext);

  const total = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  return (
    <div className="cart-container">
      <h1 className="cart-title">Carrito de Compras</h1>

      {carrito.length === 0 ? (
        <p className="cart-empty">Tu carrito está vacío.</p>
      ) : (
        <>
          <div className="cart-items">
            {carrito.map((item) => (
              <div key={item.id} className="cart-item">
                
                <div className="cart-item-info">
                  <h3>{item.nombre}</h3>
                  <p>Cantidad: {item.cantidad}</p>
                  <p>Subtotal: ${item.precio * item.cantidad}</p>
                </div>

                <button
                  onClick={() => eliminarDelCarrito(item.id)}
                  className="btn-remove"
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>

          <h2 className="cart-total">Total: ${total}</h2>

          <div className="cart-actions">
            <button onClick={vaciarCarrito} className="btn-empty">
              Vaciar Carrito
            </button>

            <Link to="/checkout">
              <button className="btn-checkout">Ir a Checkout</button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
