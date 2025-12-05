import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/usuarioSlice";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "../api/auth";
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
      const response = await loginRequest(email, password);

      const { usuario, token } = response.data;

      // ===== OBTENER EXP DESDE EL TOKEN =====
      const payload = JSON.parse(atob(token.split(".")[1]));
      const tokenExpiration = payload.exp * 1000; // convertir a ms
      // =====================================

      // Guardar expiración en localStorage (el hook la usa)
      localStorage.setItem("tokenExpiration", tokenExpiration);

      // Guardar en Redux
      dispatch(login({ usuario, token, tokenExpiration }));

      setMensaje("Login exitoso!");
      setEmail("");
      setPassword("");
      navigate("/welcome");
    } catch (err) {
      setMensaje(err.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Iniciar sesión</h2>

        <form onSubmit={handleSubmit} className="auth-form">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className="auth-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
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
