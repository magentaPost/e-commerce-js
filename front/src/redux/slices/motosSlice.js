import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMotos } from "../../api/motos.js";

export const obtenerMotos = createAsyncThunk("motos/obtenerMotos", async () => {
  const respuesta = await fetchMotos();
  return respuesta;
});

<<<<<<< Updated upstream
=======
const savedCarrito = JSON.parse(localStorage.getItem("carrito")) || [];

>>>>>>> Stashed changes
const initialState = {
  lista: [],
  carrito: [],
  estado: "idle",
  error: null,
};

export const motosSlice = createSlice({
  name: "motos",
  initialState,
  reducers: {
    agregarCarrito: (state, action) => {
<<<<<<< Updated upstream
      const { id, cantidad = 1 } = action.payload; 
      const existe = state.carrito.find(item => item.id === id);

=======
      const { id } = action.payload;
      const existe = state.carrito.find((item) => item.id === id);
>>>>>>> Stashed changes
      if (existe) {
        state.carrito = state.carrito
          .map(item =>
            item.id === id
              ? { ...item, cantidad: Math.max(item.cantidad + cantidad, 0) }
              : item
          )
          .filter(item => item.cantidad > 0); 
      } else if (cantidad > 0) {
        state.carrito.push({ ...action.payload, cantidad });
      }
<<<<<<< Updated upstream
    },
    eliminarCarrito: (state, action) => {
      state.carrito = state.carrito.filter(item => item.id !== action.payload);
    },
    vaciarCarrito: (state) => {
      state.carrito = [];
    }
=======
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
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
export const { agregarCarrito, eliminarCarrito, vaciarCarrito } = motosSlice.actions;
=======
export const {
  agregarCarrito,
  incrementarCantidad,
  disminuirCantidad,
  eliminarCarrito,
  vaciarCarrito,
} = motosSlice.actions;

>>>>>>> Stashed changes
export default motosSlice.reducer;
