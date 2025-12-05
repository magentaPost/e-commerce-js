import { createSlice } from "@reduxjs/toolkit";

// Leer usuario del localStorage
let usuarioLocal = null;
let tokenLocal = localStorage.getItem("token") || null;
let tokenExpirationLocal = localStorage.getItem("tokenExpiration") || null;

try {
  const storedUsuario = localStorage.getItem("usuario");
  usuarioLocal = storedUsuario ? JSON.parse(storedUsuario) : null;
} catch {
  usuarioLocal = null;
}

const initialState = {
  usuario: usuarioLocal,
  token: tokenLocal,
  tokenExpiration: tokenLocal ? Number(tokenExpirationLocal) : null, // ← CLAVE
};

const usuarioSlice = createSlice({
  name: "usuario",
  initialState,
  reducers: {
    login: (state, action) => {
      const { usuario, token, tokenExpiration } = action.payload;

      state.usuario = usuario;
      state.token = token;
      state.tokenExpiration = tokenExpiration;

      // Guardar en localStorage
      localStorage.setItem("usuario", JSON.stringify(usuario));
      localStorage.setItem("token", token);
      localStorage.setItem("tokenExpiration", tokenExpiration);
    },

    logout: (state) => {
      state.usuario = null;
      state.token = null;
      state.tokenExpiration = null;

      localStorage.removeItem("usuario");
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpiration");
    },
  },
});

export const { login, logout } = usuarioSlice.actions;
export default usuarioSlice.reducer;
