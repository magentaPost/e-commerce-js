import { useDispatch } from "react-redux";
import { agregarCarrito } from "../redux/slices/motosSlice.js";
import "../style/styles.css";

const ProductCard = ({ moto }) => {
  const dispatch = useDispatch();

  return (
    <div className="moto-card">
      <img
        src={moto.imagenes}
        alt={moto.nombre}
        className="moto-card-img"
      />

      <h3 className="moto-card-title">{moto.nombre}</h3>
      <p className="moto-card-desc">{moto.descripcion}</p>
      <strong className="moto-card-price">${moto.precio}</strong>

      <button
        onClick={() => dispatch(agregarCarrito(moto))}
        className="btn-add"
      >
        Agregar al carrito
      </button>
    </div>
  );
};

export default ProductCard;

