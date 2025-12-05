import "../style/welcome.css";
import { Link } from "react-router-dom";

const Welcome = () => {

  return (
    <div className="welcome-container">
      <h2 className="welcome-title">Bienvenido a NitroRiders</h2>

      <p className="welcome-subtitle">Encendé el motor. Viví la adrenalina.</p>

      <p className="welcome-text">
        En <strong>NitroRiders</strong> vivimos la pasión por las motos. Somos
        tu tienda de confianza para encontrar motocicletas, repuestos y
        equipamiento pensado para elevar tu experiencia en cada ruta.
      </p>

      <p className="welcome-text">
        Calidad, variedad y atención personalizada son parte de nuestro
        compromiso con cada piloto. Sabemos que detrás de cada moto hay una
        historia, un sueño y un destino.
      </p>

      <p className="welcome-text">
        Explorá nuestro catálogo y unite a una comunidad donde la velocidad, la
        libertad y el estilo son parte del mismo camino.
        <strong>Tu próxima aventura comienza acá.</strong>
      </p>

      <Link
        to="/productos"
        style={{
          marginTop: "0.5rem",
          padding: "0.5rem 1rem",
          backgroundColor: "#222",
          color: "white",
          borderRadius: "6px",
          cursor: "pointer",
          border: "none",
          textDecoration: "none",
          display: "inline-block",
        }}
      >
        Productos
      </Link>
    </div>
  );
};

export default Welcome;
