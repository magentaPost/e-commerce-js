import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/usuarioSlice";
import { useNavigate } from "react-router-dom";
import "../style/styles.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setMensaje("Por favor completa todos los campos.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, contraseña: password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMensaje(data.message || "Error al iniciar sesión");
        return;
      }

      //  Guardar usuario y token en Redux
      dispatch(
        login({
          usuario: data.data.usuario,
          token: data.data.token,
        })
      );

      // Guardar en localStorage
      /*       localStorage.setItem("token", data.token);
      localStorage.setItem("usuario", JSON.stringify(data.usuario)); */

      setMensaje("Login exitoso!");
      setEmail("");
      setPassword("");

      // APENAS LOGUEA → IR A /productos
      navigate("/productos");
    } catch (error) {
      console.error("Error de conexión:", error);
      setMensaje("No se pudo conectar con el servidor");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Iniciar sesión</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <label>Email</label>
          <input
            type="email"
            className="auth-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Contraseña</label>
          <input
            type="password"
            className="auth-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="auth-btn">
            Ingresar
          </button>
        </form>

        {mensaje && <p className="auth-msg">{mensaje}</p>}
      </div>
    </div>
  );
};

export default Login;
