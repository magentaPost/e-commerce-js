import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/styles.css";

const Registro = () => {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dni, setDni] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !nombre ||
      !nombreUsuario ||
      !email ||
      !password ||
      !dni ||
      !fechaNacimiento
    ) {
      setMensaje("Completa todos los campos.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre,
          nombreUsuario,
          email,
          contraseña: password,
          dni,
          fechaNacimiento,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMensaje(data.message || "Error al registrar usuario");
        return;
      }

      setMensaje(`Usuario ${data.nombre} registrado correctamente!`);

      // Limpiar campos
      setNombre("");
      setNombreUsuario("");
      setEmail("");
      setPassword("");
      setDni("");
      setFechaNacimiento("");

      // Redirigir al login
      navigate("/login");
    } catch (error) {
      console.error("Error de conexión:", error);
      setMensaje("No se pudo conectar con el servidor");
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Registro</h2>

      <form onSubmit={handleSubmit} className="form-card">
        <label>Nombre:</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        <label>Nombre Usuario:</label>
        <input
          type="text"
          value={nombreUsuario}
          onChange={(e) => setNombreUsuario(e.target.value)}
          required
        />

        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Contraseña:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label>DNI:</label>
        <input
          type="text"
          value={dni}
          onChange={(e) => setDni(e.target.value)}
          required
        />

        <label>Fecha de Nacimiento:</label>
        <input
          type="date"
          value={fechaNacimiento}
          onChange={(e) => setFechaNacimiento(e.target.value)}
          required
        />

        <button type="submit" className="btn-submit">
          Registrar
        </button>
      </form>

      {mensaje && <p className="form-message">{mensaje}</p>}
    </div>
  );
};

export default Registro;
