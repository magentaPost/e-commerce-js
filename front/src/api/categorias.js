export const fetchCategorias = async () => {
  const res = await fetch("http://localhost:3000/categories");

  if (!res.ok) throw new Error("Error obteniendo categorías");

  const data = await res.json();

  // Formateo básico para el sidebar
  return data.map(cat => ({
    id: cat._id,
    nombre: cat.nombre
  }));
};
