import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar.jsx";
import ProductCard from "../components/ProductCard.jsx";
import Paginacion from "../components/Paginacion.jsx";
import { obtenerMotos } from "../redux/slices/motosSlice.js";
import "../style/styles.css";

const Productos = () => {
  const dispatch = useDispatch();
  const { lista: motos, estado, error } = useSelector((state) => state.motos);

  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const porPagina = 8;

  // Traer productos desde Redux
  useEffect(() => {
    if (estado === "idle") dispatch(obtenerMotos());
  }, [estado, dispatch]);

  // Traer categorías desde backend
  useEffect(() => {
    axios
      .get("http://localhost:3000/categories") // endpoint de categories
      .then((res) => setCategorias(res.data.data))
      .catch((err) => console.error("Error al obtener categorías:", err));
  }, []);

  // Filtrar productos según categoría seleccionada
  const filtrarMotos = categoriaSeleccionada
    ? motos.filter((m) => m.categoria._id === categoriaSeleccionada)
    : motos;

  const totalPaginas = Math.ceil(filtrarMotos.length / porPagina);
  const motosPagina = filtrarMotos.slice(
    (paginaActual - 1) * porPagina,
    paginaActual * porPagina
  );

  if (estado === "loading")
    return <p className="loading-text">Cargando motos...</p>;
  if (estado === "failed") return <p className="error-text">Error: {error}</p>;

  return (
    <div className="productos-layout">
      <Sidebar
        categorias={categorias} // cada categoria tiene {_id, nombre}
        filtroCategoria={setCategoriaSeleccionada}
        categoriaSeleccionada={categoriaSeleccionada}
      />

      <div className="productos-main">
        <h2 className="productos-title">Productos</h2>

        {motosPagina.length === 0 && <p>No hay motos disponibles.</p>}

        <div className="cards-grid">
          {motosPagina.map((moto) => (
            <ProductCard key={moto._id} moto={moto} />
          ))}
        </div>

        <Paginacion
          totalPaginas={totalPaginas}
          paginaActual={paginaActual}
          cambiarPagina={setPaginaActual}
        />
      </div>
    </div>
  );
};

export default Productos;
