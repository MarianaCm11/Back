import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import usuariosRutas from "./routes/usuRutas.js";
import { conectarDB } from "./db/DaseB.js";

 async function conexionDB() {
    var mensajeDB = await conectarDB();
    console.log(mensajeDB);
}

const app = express();
conexionDB();
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/api", usuariosRutas);

const PORT = process.send.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});