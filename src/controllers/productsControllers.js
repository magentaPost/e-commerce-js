import products from "../models/Productos.js";
import Categoria from "../models/Categoria.js";
import mongoose from "mongoose";

export const createProductsController = async (productsData) => {
  const {
    nombre,
    descripcion,
    precio,
    stock,
    año,
    categoria,
    marca,
    imagenes,
  } = productsData;

  // Validación: verificar si el producto ya existe [nombre]
  const productExist = await products.findOne({ nombre });
  if (productExist) {
    const err = new Error("Producto ya agregado");
    err.status = 409;
    throw err;
  }

  // Creación del producto
  const newProduct = new products({
    nombre,
    descripcion,
    precio,
    stock,
    año,
    categoria,
    marca,
    imagenes,
  });

  await newProduct.save();

  return {
    success: true,
    message: "Producto agregado exitosamente",
    data: newProduct,
  };
};

/* trae todos los productos de la base de datos */
export const getAllProductsController = async () => {
  // populate("categoria", "nombre") traerá solo el nombre de la categoría
  const productos = await products.find().populate("categoria", "nombre");

  if (!productos.length) {
    const err = new Error("No hay productos disponibles");
    err.status = 404;
    throw err;
  }

  return {
    success: true,
    message: "Productos encontrados",
    data: productos,
  };
};

/* trae los productos por id */
export const getProductsByIdControllers = async (id) => {
  const producto = await products.findById(id);

  if (!producto) {
    throw new Error("No se encontró el producto");
  }

  return {
    success: true,
    message: "Usuario encontrado",
    data: producto,
  };
};

/* trae los productos por nombre */
export const getProductsByNameControllers = async (nombre) => {
  const producto = await products.findOne({ nombre });

  if (!producto) {
    throw new Error("No se encontró el producto");
  }

  return {
    success: true,
    message: "Producto encontrado",
    data: producto,
  };
};

/* actualiza un producto */
export const updateProductControllers = async (id, productsData) => {
  const {
    nombre,
    descripcion,
    precio,
    stock,
    año,
    categoria,
    marca,
    imagenes,
  } = productsData;

  const newProduct = {
    nombre,
    descripcion,
    precio,
    stock,
    año,
    categoria,
    marca,
    imagenes,
  };

  const producto = await products.findByIdAndUpdate(id, newProduct, {
    new: true,
  });
  if (producto !== -1) {
    Object.assign(producto, newProduct);
  }
  return producto;
};

//Eliminar producto
export const deleteProductControllers = async (id) => {
  const producto = await products.findById(id);
  if (!producto) {
    const err = new Error(`Producto con ID '${id}' no encontrado`);
    err.status = 404;
    throw err;
  }

  const Producto = await products.findByIdAndDelete(id);

  return {
    success: true,
    message: `Producto con ID '${id}' eliminado exitosamente`,
    data: Producto,
  };
};

export const getProductsByCategoryController = async (categoriaId) => {
  try {
    // Buscar productos que tengan la categoría indicada
    const productos = await products.find({ categoria: categoriaId });

    if (!productos || productos.length === 0) {
      return {
        success: true,
        message: "No se encontraron productos en esta categoría",
        data: [],
      };
    }

    return {
      success: true,
      message: "Productos encontrados",
      data: productos,
    };
  } catch (error) {
    throw new Error(
      `Error al obtener productos por categoría: ${error.message}`
    );
  }
};
