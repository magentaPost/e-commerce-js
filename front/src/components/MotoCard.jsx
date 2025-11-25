import { useContext } from "react";
import { CartContext } from "../context/CartContext.jsx";
import { Link } from "react-router-dom";
import "../Style/styles.css";
const MotoCard = ({ moto }) => {
  const { agregarAlCarrito } = useContext(CartContext);

  return (
    <div>
      <Link to={`/product/${moto.id}`}>
        <img
          src={moto.imagenes}
          alt={moto.nombre}
          style={{ width: "100%", borderRadius: "8px" }}
        />
      </Link>

      <h3>{moto.nombre}</h3>
      <p>{moto.descripcion}</p>
      <strong>${moto.precio}</strong>

      <button
        onClick={() => agregarAlCarrito(moto)}
        style={{
          marginTop: "0.5rem",
          padding: "0.5rem 1rem",
          backgroundColor: "#222",
          color: "white",
          borderRadius: "6px",
          cursor: "pointer",
          border: "none",
        }}
      >
        Añadir al carrito
      </button>
    </div>
  );
};

export default MotoCard;
