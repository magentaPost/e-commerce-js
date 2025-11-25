const Sidebar = ({ categorias, filtroCategoria, categoriaSeleccionada }) => {
  return (
    <aside>
      <h3>Categorías</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {categorias.map((cat) => (
          <li key={cat._id}>
            <button
              onClick={() => filtroCategoria(cat._id)} // pasa el _id al filtro
              style={{
                display: "block",
                width: "100%",
                marginBottom: "0.5rem",
                padding: "0.5rem",
                backgroundColor:
                  cat._id === categoriaSeleccionada ? "#222" : "#eee",
                color: cat._id === categoriaSeleccionada ? "white" : "black",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              {cat.nombre} {/* mostrar el nombre de la categoría */}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={() => filtroCategoria(null)} // botón "Todas"
            style={{
              display: "block",
              width: "100%",
              marginTop: "0.5rem",
              padding: "0.5rem",
              backgroundColor: !categoriaSeleccionada ? "#222" : "#eee",
              color: !categoriaSeleccionada ? "white" : "black",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Todas
          </button>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
