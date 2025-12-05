import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCategorias } from "../../api/categorias.js"; // import desde api

// Async thunk usando la función de api
export const obtenerCategorias = createAsyncThunk(
  "categorias/obtenerCategorias",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchCategorias();
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const categoriasSlice = createSlice({
  name: "categorias",
  initialState: {
    lista: [],
    estado: "idle", // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(obtenerCategorias.pending, state => {
        state.estado = "loading";
        state.error = null;
      })
      .addCase(obtenerCategorias.fulfilled, (state, action) => {
        state.estado = "succeeded";
        state.lista = action.payload;
      })
      .addCase(obtenerCategorias.rejected, (state, action) => {
        state.estado = "failed";
        state.error = action.payload;
      });
  }
});

export default categoriasSlice.reducer;
