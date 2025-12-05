import Usuario from "../models/Usuarios.js";
import bcrypt from "bcryptjs";
import { generarToken } from "../middleware/generarTokenMiddleware.js";

/*==============================
     Registrar un nuevo usuario
===============================*/
export const registerController = async (usuarioData) => {
  // Extraigo los campos importantes
  const {
    nombre,
    nombreUsuario,
    email,
    telefono,
    dni,
    fechaNacimiento,
    contraseña,
  } = usuarioData;

  // Primero chequeo si ya existe un usuario con ese email o nombre de usuario
  const existingUser = await Usuario.findOne({
    $or: [{ email }, { nombreUsuario }],
  });

  if (existingUser) {
    // Si ya existe, tiro un error
    const err = new Error("El usuario o email ya existe.");
    err.status = 400;
    throw err;
  }

  // Genero un salt para hashear la contraseña
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(contraseña, salt);

  // Creo el nuevo usuario con la contraseña hasheada
  const nuevoUsuario = await Usuario.create({
    ...usuarioData,
    contraseña: hashedPassword,
  });

  // Quito la contraseña del objeto antes de devolverlo
  const { contraseña: _, ...usuarioSinContraseña } = nuevoUsuario.toObject();
  return usuarioSinContraseña;
};

/*==============================
        Login usuario
===============================*/
export const loginController = async ({ email, contraseña }) => {
  // Busco el usuario por email
  const usuario = await Usuario.findOne({ email });
  if (!usuario) {
    // Si no existe, tiro error
    const err = new Error("Email o contraseña incorrectos.");
    err.status = 400;
    throw err;
  }

  // Comparo la contraseña enviada con la almacenada (hash)
  const validPassword = await bcrypt.compare(contraseña, usuario.contraseña);
  if (!validPassword) {
    // Si no coincide, tiro error
    const err = new Error("Email o contraseña incorrectos.");
    err.status = 400;
    throw err;
  }

  // Quito la contraseña antes de devolver el usuario
  const { contraseña: _, ...usuarioSinContraseña } = usuario.toObject();

  // Genero un JWT con los datos esenciales del usuario
  const token = generarToken({
    id: usuario._id,
    nombreUsuario: usuario.nombreUsuario,
    rol: usuario.rol,
  });

  // Devuelvo el usuario sin contraseña y el token
  return { usuario: usuarioSinContraseña, token };
};