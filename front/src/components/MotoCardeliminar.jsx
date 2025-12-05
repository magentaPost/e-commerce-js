import { useContext } from "react";
import { CartContext } from "../contexteliminar/CartContext.jsx";
import { Link } from "react-router-dom";
import "../style/styles.css";

const MotoCard = ({ moto }) => {
  const { agregarAlCarrito } = useContext(CartContext);

  return (
    <div className="moto-card">
      <Link to={`/product/${moto.id}`}>
        <img
          src={moto.imagenes}
          alt={moto.nombre}
          className="moto-card-img"
        />
      </Link>

      <h3 className="moto-card-title">{moto.nombre}</h3>
      <p className="moto-card-desc">{moto.descripcion}</p>
      <strong className="moto-card-price">${moto.precio}</strong>

      <button
        onClick={() => agregarAlCarrito(moto)}
        className="btn-add"
      >
        Añadir al carrito
      </button>
    </div>
  );
};

export default MotoCard;


