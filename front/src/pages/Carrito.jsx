import { useSelector, useDispatch } from "react-redux";
import {
  incrementarCantidad,
  disminuirCantidad,
  eliminarCarrito,
  vaciarCarrito,
} from "../redux/slices/motosSlice";
import CartItem from "../components/CartItem";
import "../style/styles.css";

const Carrito = () => {
  const carrito = useSelector((state) => state.motos.carrito);
  const dispatch = useDispatch();

  const total = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  return (
    <div className="cart-container">
      <h2 className="cart-title">Tu Carrito</h2>

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

      <p className="cart-total">Total: ${total}</p>

      <div className="cart-actions">
        <button className="btn-empty" onClick={() => dispatch(vaciarCarrito())}>
          Vaciar Carrito
        </button>
        {carrito.length > 0 && (
          <button className="btn-checkout">Finalizar Compra</button>
        )}
      </div>
    </div>
  );
};

export default Carrito;
