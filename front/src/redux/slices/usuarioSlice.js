import { createSlice } from "@reduxjs/toolkit";

// Leer usuario del localStorage sin romper la app
let usuarioLocal = null;
let tokenLocal = localStorage.getItem("token") || null;

try {
  const storedUsuario = localStorage.getItem("usuario");
  usuarioLocal = storedUsuario ? JSON.parse(storedUsuario) : null;
} catch {
  usuarioLocal = null; // Si falla el parse, lo reseteamos
}

const initialState = {
  usuario: usuarioLocal,
  token: tokenLocal,
};

const usuarioSlice = createSlice({
  name: "usuario",
  initialState,
  reducers: {
    login: (state, action) => {
      state.usuario = action.payload.usuario;
      state.token = action.payload.token;

      // Persistir datos CORRECTO
      localStorage.setItem("usuario", JSON.stringify(action.payload.usuario));
      localStorage.setItem("token", action.payload.token);
    },

    logout: (state) => {
      state.usuario = null;
      state.token = null;

      // Borrar persistencia
      localStorage.removeItem("usuario");
      localStorage.removeItem("token");
    },
  },
});

export const { login, logout } = usuarioSlice.actions;
export default usuarioSlice.reducer;
