import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar.jsx";
import ProductCard from "../components/ProductCard.jsx";
import Paginacion from "../components/Paginacion.jsx";
import { obtenerMotos } from "../redux/slices/motosSlice.js";
import { obtenerCategorias } from "../redux/slices/categoriasSlice.js"; // Redux para categorías
import "../style/styles.css";

const Productos = () => {
  const dispatch = useDispatch();

  // Redux Motos
  const { lista: motos, estado: estadoMotos, error: errorMotos } = useSelector(state => state.motos);

  // Redux Categorías
  const { lista: categorias, estado: estadoCategorias, error: errorCategorias } = useSelector(state => state.categorias);

  // Estado local
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const porPagina = 8;

  // Cargar productos (solo si estado idle)
  useEffect(() => {
    if (estadoMotos === "idle") dispatch(obtenerMotos());
  }, [estadoMotos, dispatch]);

  // Cargar categorías (solo si estado idle)
  useEffect(() => {
    if (estadoCategorias === "idle") dispatch(obtenerCategorias());
  }, [estadoCategorias, dispatch]);

  // Filtrado por categoría
  const filtrarMotos = categoriaSeleccionada
    ? motos.filter(m => m.categoria === categoriaSeleccionada)
    : motos;

  // Paginación
  const totalPaginas = Math.ceil(filtrarMotos.length / porPagina);
  const motosPagina = filtrarMotos.slice(
    (paginaActual - 1) * porPagina,
    paginaActual * porPagina
  );

  // Loading / Error
  if (estadoMotos === "loading" || estadoCategorias === "loading") return <p className="loading-text">Cargando...</p>;
  if (estadoMotos === "failed") return <p className="error-text">Error: {errorMotos}</p>;
  if (estadoCategorias === "failed") return <p className="error-text">Error: {errorCategorias}</p>;

  return (
    <div className="productos-layout">
      <Sidebar
        categorias={categorias}
        filtroCategoria={setCategoriaSeleccionada}
        categoriaSeleccionada={categoriaSeleccionada}
      />

      <div className="productos-main">
        <h2 className="productos-title">Productos</h2>

        {motosPagina.length === 0 && <p>No hay motos disponibles.</p>}

        <div className="cards-grid">
          {motosPagina.map(moto => (
            <ProductCard key={moto.id} moto={moto} />
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
