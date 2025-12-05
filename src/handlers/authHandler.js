import {
  registerController,
  loginController,
} from "../controllers/authControllers.js";
import { validateUsuario } from "../validations/usuariosValidation.js";
import { validateLogin } from "../validations/authValidation.js";

// Handler para registrar un nuevo usuario
export const registerHandler = async (req, res, next) => {
  try {
    // Primero valido los datos que vienen en el body usando Joi
    const { error, value } = validateUsuario.validate(req.body, {
      stripUnknown: true, // elimino campos que no estén definidos en el schema
    });

    // Si hay error de validación, lo tiro para que el middleware global lo maneje
    if (error) {
      const err = new Error(error.details[0].message);
      err.status = 400;
      err.name = "ValidationError";
      throw err;
    }

    // Llamo al controller para crear el usuario
    const usuario = await registerController(value);

    // Devuelvo el usuario creado (sin contraseña)
    return res.status(201).json({
      success: true,
      message: "Usuario registrado exitosamente",
      data: usuario,
    });
  } catch (err) {
    // cualquier error al middleware global
    next(err);
  }
};

// Handler para login de usuario
export const loginHandler = async (req, res, next) => {
  try {
    
    // Valido los datos de login (email y contraseña) con Joi
    const { error, value } = validateLogin.validate(req.body, {
      stripUnknown: true,
    });

    // Si hay error de validación, lo tiro
    if (error) {
      const err = new Error(error.details[0].message);
      err.status = 400;
      err.name = "ValidationError";
      throw err;
    }

    // Llamo al controller de login que devuelve usuario + token
    const { usuario, token } = await loginController(value);

    // Devuelvo la respuesta con status 200
    return res.status(200).json({
      success: true,
      message: "Login exitoso",
      data: { usuario, token },
    });
  } catch (err) {
    // Pasamos cualquier error al middleware global
    next(err);
  }
};