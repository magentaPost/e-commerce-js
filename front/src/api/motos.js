// api/motos.js
export const fetchMotos = async () => {
  const response = await fetch("http://localhost:3000/products");

  if (!response.ok) {
    throw new Error("Error obteniendo productos");
  }

  const data = await response.json();
  return data;
};
