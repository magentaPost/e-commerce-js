import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Obtener productos
export const obtenerMotos = createAsyncThunk(
  "motos/obtenerMotos",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3000/products");
      if (!response.ok) throw new Error("Error al obtener motos");

      const result = await response.json();
      const productos = result.data.map((moto) => ({
        ...moto,
        id: moto._id,
        imagenes: Array.isArray(moto.imagenes)
          ? moto.imagenes
          : JSON.parse(moto.imagenes || "[]"),
      }));

      return productos;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const initialState = {
  lista: [],
  carrito: [],
  estado: "idle",
  error: null,
};

const motosSlice = createSlice({
  name: "motos",
  initialState,
  reducers: {
    cargarCarrito: (state, action) => {
      state.carrito = action.payload;
    },
    agregarCarrito: (state, action) => {
      const { id, cantidad = 1 } = action.payload;
      const existe = state.carrito.find((item) => item.id === id);

      if (existe) {
        state.carrito = state.carrito
          .map((item) =>
            item.id === id
              ? { ...item, cantidad: Math.max(item.cantidad + cantidad, 0) }
              : item
          )
          .filter((item) => item.cantidad > 0);
      } else if (cantidad > 0) {
        state.carrito.push({ ...action.payload, cantidad });
      }
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
    },
    vaciarCarrito: (state) => {
      state.carrito = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(obtenerMotos.pending, (state) => {
        state.estado = "loading";
      })
      .addCase(obtenerMotos.fulfilled, (state, action) => {
        state.estado = "succeeded";
        state.lista = action.payload;
      })
      .addCase(obtenerMotos.rejected, (state, action) => {
        state.estado = "failed";
        state.error = action.payload;
      });
  },
});

export const {
  cargarCarrito,
  agregarCarrito,
  incrementarCantidad,
  disminuirCantidad,
  eliminarCarrito,
  vaciarCarrito,
} = motosSlice.actions;

export default motosSlice.reducer;
