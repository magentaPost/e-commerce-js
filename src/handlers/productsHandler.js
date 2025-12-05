import {
  createProductsController,
  getAllProductsController,
  getProductsByIdControllers,
  getProductsByNameControllers,
  updateProductControllers,
  deleteProductControllers,
  getProductsByCategoryController,
} from "../controllers/productsControllers.js";
import { validate } from "../validations/validators.js";

//crea un producto
export const createProductsHandler = async (req, res, next) => {
  try {
    // Validación de datos
    const validatedData = validate("producto", req.body);

    const response = await createProductsController(validatedData);

    return res.status(201).json({
      success: true,
      message: response.message,
      data: response.data,
    });
  } catch (err) {
    next(err);
  }
};

export const getAllProductsHandler = async (req, res, next) => {
  try {

    const { data } = await getAllProductsController();
    return res.status(200).json(data);

  } catch (err) {
    next(err);
  }
};

//trae todos los productos de la base de datos, o por nombre si se pasa el query
export const getProductsByNameHandler = async (req, res, next) => {
  try {
    const { nombre } = req.query;
    if (!nombre) {
      const response = await getProductsByNameControllers();

      return res.status(200).json({
        success: true,
        message: response.message,
        data: response.data,
      });
    }
  } catch (err) {
    next(err);
  }
};

//trae todos los productos por id
export const getProductsByIdHandler = async (req, res, next) => {
  try {
    const response = await getProductsByIdControllers(req.params.id);

    return res.status(200).json({
      success: true,
      message: response.message,
      data: response,
    });
  } catch (err) {
    next(err);
  }
};

//Actualizar producto
export const updateProductHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const productData = req.body;

    const response = await updateProductControllers(id, productData);

    return res.status(200).json({
      success: true,
      message: response.message,
      data: response,
    });
  } catch (err) {
    next(err);
  }
};

/* --- Delete --- */
export const deleteProductHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    const response = await deleteProductControllers(id);

    return res.status(200).json({
      success: true,
      message: response.message,
      data: response,
    });
  } catch (err) {
    next(err);
  }
};

export const getProductsByCategoryHandler = async (req, res, next) => {
  try {
    const { categoriaId } = req.params;
    const response = await getProductsByCategoryController(categoriaId);
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};
