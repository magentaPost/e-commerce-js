import cors from "cors";
import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import mainRouter from "./routes/mainRoute.js";
import setupLogger from "./config/logger.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

//Middlewares
dotenv.config({ quiet: true });
/* app.use(morgan("dev")); */
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173", // URL del frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // para usar cookies/autenticación
  })
);

// Logging de solicitudes
setupLogger(app);

//Ruta raiz
app.use("/", mainRouter);

// Middleware global de manejo de errores
app.use(errorHandler);

export default app;
