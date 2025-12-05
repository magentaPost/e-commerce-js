import {
  createCategoriaController,
  /* Get */
  getAllCategoriesController,
  getCategoryStatsController,
  getCategoryByNameController,
  getCategoryByIdController,
  getCategoryByStatusController,
  /* Update */
  updateCategoryController,
  restoreCategoryController,
  /* Delete */
  deleteSoftCategoryController,
  deleteCategoryController,
} from "../controllers/categoryControllers.js";

import { validateCategoria } from "../validations/categoriaValidation.js";

/* --- Crear Categoría --- */
export const createCategoriaHandler = async (req, res, next) => {
  try {
    // Validación con Joi
    const { error } = validateCategoria.validate(req.body);
    if (error) {
      const err = new Error(error.details[0].message);
      err.status = 409;
      err.name = "ValidationError";
      throw err;
    }

    const { nombre, descripcion } = req.body;

    // Llamada al controller
    const response = await createCategoriaController({ nombre, descripcion });

    // Respuesta
    return res.status(201).json({
      success: true,
      message: response.message,
      data: response.data,
    });
  } catch (err) {
    // Pasar el error al middleware global
    next(err);
  }
};

/* --- Read --- */
export const getAllCategoriesHandler = async (req, res, next) => {
  try {
    // Llamada al controller que obtiene todas las categorías
    const { data } = await getAllCategoriesController();

    return res.status(200).json(data);
  } catch (err) {
    // Pasar el error al middleware global
    next(err);
  }
};

/* --- Estadísticas de categorías --- */
export const getAllCategoryStatsHandler = async (req, res, next) => {
  try {
    // Llamada al controller que obtiene las estadísticas
    const response = await getCategoryStatsController();

    // Respuesta
    return res.status(200).json({
      success: true,
      message: response.message,
      data: response.data,
    });
  } catch (err) {
    // Pasar el error al middleware global
    next(err);
  }
};

/* --- Buscar categoría por nombre --- */
export const getCategoryByNameHandler = async (req, res, next) => {
  try {
    const { nombre } = req.query;

    // Validación del parámetro
    if (!nombre) {
      const err = new Error("El parámetro 'nombre' es obligatorio");
      err.status = 400;
      throw err;
    }

    // Llamada al controller
    const response = await getCategoryByNameController(nombre);

    //Respuesta
    return res.status(200).json({
      success: true,
      message: response.message,
      data: response.data,
    });
  } catch (err) {
    // Pasar el error al middleware global
    next(err);
  }
};

/* --- Buscar categoría por ID --- */
export const getCategoryByIdHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Llamada al controller
    const response = await getCategoryByIdController(id);

    // Respuesta
    return res.status(200).json({
      success: true,
      message: response.message,
      data: response.data,
    });
  } catch (err) {
    // Pasar el error al middleware global
    next(err);
  }
};

/* --- Filtrar categorías por estado (activo/inactivo) --- */
export const getCategoryByStatusHandler = async (req, res, next) => {
  try {
    const { isActive } = req.query;

    // Validación del parámetro
    if (isActive === undefined) {
      const err = new Error("El parámetro 'isActive' es obligatorio");
      err.status = 400;
      throw err;
    }

    // Llamada al controller
    const response = await getCategoryByStatusController(isActive);

    // Respuesta
    return res.status(200).json({
      success: true,
      message: response.message,
      data: response.data,
    });
  } catch (err) {
    // Pasar el error al middleware global
    next(err);
  }
};

/* --- Update --- */
export const updateCategoryHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;

    // Llamada al controller
    const response = await updateCategoryController(id, {
      nombre,
      descripcion,
    });

    // Respuesta
    return res.status(200).json({
      success: true,
      message: response.message,
      data: response.data,
    });
  } catch (err) {
    // Pasar el error al middleware global
    next(err);
  }
};

/* --- Restaurar categoría --- */
export const restoreCategoryHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Llamada al controller
    const response = await restoreCategoryController(id);

    // Respuesta
    return res.status(200).json({
      success: true,
      message: response.message,
      data: response.data,
    });
  } catch (err) {
    // Pasar el error al middleware global
    next(err);
  }
};

/* --- Soft Delete Categoría --- */
export const deleteSoftCategoryHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Llamada al controller
    const response = await deleteSoftCategoryController(id);

    // Respuesta
    return res.status(200).json({
      success: true,
      message: response.message,
      data: response.data,
    });
  } catch (err) {
    // Pasar el error al middleware global
    next(err);
  }
};

/* --- Delete Categoría --- */
export const deleteCategoryHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Llamada al controller
    const response = await deleteCategoryController(id);

    // Respuesta
    return res.status(200).json({
      success: true,
      message: response.message,
      data: response.data,
    });
  } catch (err) {
    // Pasar el error al middleware global
    next(err);
  }
};
