import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMotos } from "../../api/motos.js";

export const obtenerMotos = createAsyncThunk("motos/obtenerMotos", async () => {
  const respuesta = await fetchMotos();
  return respuesta;
});

const savedCarrito = JSON.parse(localStorage.getItem("carrito")) || [];

const initialState = {
  lista: [],
  carrito: savedCarrito,
  estado: "idle",
  error: null,
};

export const motosSlice = createSlice({
  name: "motos",
  initialState,
  reducers: {
    agregarCarrito: (state, action) => {
      const { id } = action.payload;
      const existe = state.carrito.find((item) => item.id === id);
      if (existe) {
        existe.cantidad += 1;
      } else {
        state.carrito.push({ ...action.payload, cantidad: 1 });
      }
      localStorage.setItem("carrito", JSON.stringify(state.carrito));
    },
    incrementarCantidad: (state, action) => {
      const item = state.carrito.find((i) => i.id === action.payload);
      if (item) item.cantidad += 1;
      localStorage.setItem("carrito", JSON.stringify(state.carrito));
    },
    disminuirCantidad: (state, action) => {
      const item = state.carrito.find((i) => i.id === action.payload);
      if (item) {
        item.cantidad -= 1;
        if (item.cantidad <= 0) {
          state.carrito = state.carrito.filter((i) => i.id !== action.payload);
        }
      }
      localStorage.setItem("carrito", JSON.stringify(state.carrito));
    },
    eliminarCarrito: (state, action) => {
      state.carrito = state.carrito.filter(
        (item) => item.id !== action.payload
      );
      localStorage.setItem("carrito", JSON.stringify(state.carrito));
    },
    vaciarCarrito: (state) => {
      state.carrito = [];
      localStorage.setItem("carrito", JSON.stringify(state.carrito));
    },
  },
extraReducers: (builder) => {
  builder
    .addCase(obtenerMotos.pending, (state) => { 
      state.estado = "loading"; 
    })
    .addCase(obtenerMotos.fulfilled, (state, action) => {
      state.estado = "succeeded";

      state.lista = action.payload.map(moto => ({
        ...moto,
        id: moto._id, 
      }));
    })
    .addCase(obtenerMotos.rejected, (state, action) => {
      state.estado = "failed";
      state.error = action.error.message;
    });
}

});

export const {
  agregarCarrito,
  incrementarCantidad,
  disminuirCantidad,
  eliminarCarrito,
  vaciarCarrito,
} = motosSlice.actions;

export default motosSlice.reducer;
