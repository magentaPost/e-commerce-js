import "../style/styles.css";

const Home = () => {
  return (
    <div className="home-container">
      <h2 className="home-title">Bienvenido a NitroRiders</h2>

      <p className="home-subtitle">Encendé el motor. Viví la adrenalina.</p>

      <p className="home-text">
        En <strong>NitroRiders</strong> vivimos la pasión por las motos. Somos
        tu tienda de confianza para encontrar motocicletas, repuestos y
        equipamiento pensado para elevar tu experiencia en cada ruta.
      </p>

      <p className="home-text">
        Calidad, variedad y atención personalizada son parte de nuestro
        compromiso con cada piloto. Sabemos que detrás de cada moto hay una
        historia, un sueño y un destino.
      </p>

      <p className="home-text">
        Explorá nuestro catálogo y unite a una comunidad donde la velocidad, la
        libertad y el estilo son parte del mismo camino.
        <strong>Tu próxima aventura comienza acá.</strong>
      </p>
    </div>
  );
};

export default Home;
