import { Router } from "express";
import { autenticar } from "../middleware/autenticarMiddleware.js";
import {
  createCartHandler,
  getActiveCartHandler,
  getCartByIdHandler,
  getCartsByUserHandler,
  getAllCartsHandler,
  addProductToCartHandler,
  removeProductFromCartHandler,
  deleteCartHandler,
  clearCartHandler,
  checkoutCartHandler,
} from "../handlers/carritoHandler.js";

const cartRoutes = Router();

/* ===========================
   CREATE  (POST)
   =========================== */

/**
 * Crear un nuevo carrito para un usuario
 * POST http://localhost:3000/cart
 */
cartRoutes.post("/", createCartHandler);

/**
 * Agregar un producto al carrito
 * POST http://localhost:3000/cart/:cartId/product/:productoId
 */
cartRoutes.post("/:cartId/product/:productoId", addProductToCartHandler);

/* ===========================
   READ  (GET)
   =========================== */

/**
 * Obtener todos los carritos
 * GET http://localhost:3000/cart
 */
cartRoutes.get("/", getAllCartsHandler);

/**
 * Obtener el carrito activo del usuario autenticado
 * GET http://localhost:3000/cart/active
 */
cartRoutes.get("/active", getActiveCartHandler);

/**
 * Obtener todos los carritos de un usuario (filtro opcional por estado)
 * GET http://localhost:3000/cart/user/:id?estado=activo
 */
cartRoutes.get("/user/:id", getCartsByUserHandler);

/**
 * Obtener un carrito por su ID
 * GET http://localhost:3000/cart/:id
 */
cartRoutes.get("/:id", getCartByIdHandler);

/* ===========================
   UPDATE  (PUT)
   =========================== */

/**
 * Vaciar todos los productos del carrito
 * PUT http://localhost:3000/cart/:id/clear
 */
cartRoutes.put("/:id/clear", clearCartHandler);

/* ===========================
   ACTIONS (POST) - Checkout
   =========================== */

/**
 * Finalizar un carrito y generar un pedido
 * POST http://localhost:3000/cart/:cartId/checkout
 */
cartRoutes.post("/:cartId/checkout", checkoutCartHandler);

/* ===========================
   DELETE  (DELETE)
   =========================== */

/**
 * Eliminar un producto del carrito
 * DELETE http://localhost:3000/cart/:cartId/product/:productoId
 */
cartRoutes.delete("/:cartId/product/:productoId", removeProductFromCartHandler);

/**
 * Eliminar un carrito completo
 * DELETE http://localhost:3000/cart/:id
 */
cartRoutes.delete("/:id", deleteCartHandler);
/* "/:id",autenticar,autorizar("admin"), deleteCartHandler); */

export default cartRoutes;
