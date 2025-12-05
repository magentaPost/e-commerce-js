import "../style/home.css";

const Home = () => {
  return (
    <div className="banner-carousel-container">
      <input
        type="radio"
        name="banner-carousel-slider"
        id="banner-carousel-slide1"
        defaultChecked
      />
      <input
        type="radio"
        name="banner-carousel-slider"
        id="banner-carousel-slide2"
      />

      <div className="banner-carousel-slides">
        <div className="banner-carousel-slide">
          <img
            src="/src/assets/img/banner-1.webp"
            loading="lazy"
            alt="Banner principal"
          />
        </div>

        <div className="banner-carousel-slide">
          <img
            src="/src/assets/img/banner-2.webp"
            loading="lazy"
            alt="Segundo banner"
          />
        </div>
      </div>

      <div className="banner-carousel-controls">
        <label htmlFor="banner-carousel-slide1" aria-label="Ir al slide 1"></label>
        <label htmlFor="banner-carousel-slide2" aria-label="Ir al slide 2"></label>
      </div>
    </div>
  );
};

export default Home;
