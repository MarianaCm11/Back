import { Router } from "express";
import { register, login, mostrarUsuarios, buscarUsuarioPorId, borrarUsuarioPorId, actualizarUsuario } from "../db/usuariosDB.js";
import { adminAutorizado, usuarioAutorizado } from "../middlewares/funcionesPassword.js";
import { isAdmin } from "../db/usuariosDB.js";
const router = Router();

/**
 * 
 * @param {string} errorMessage
 * @param {(request, response) => Promise<void>} callback 
 * @returns {async (request, response) => void} 
 */
function awaitOrSendError(errorMessage, callback) {
    return async function (request, response) {
        callback(request, response).catch(error => {
            response.status(500).send("Error: " + errorMessage);
            console.log(error);
        });
    }
}

router.post("/registro", async (req, res) => {
    const respuesta = await register(req.body);
    console.log(respuesta.mensajeOriginal);
    res.cookie("token", respuesta.token).status(respuesta.status).json(respuesta.mensajeUsuario);
});

router.post("/login", async (req, res) => {
    const respuesta = await login(req.body);
    console.log(respuesta.mensajeOriginal);
    res.cookie("token", respuesta.token).status(respuesta.status).json(respuesta.mensajeUsuario);
});

router.get("/mostrar", async (req, res) => {
    const respuesta = await mostrarUsuarios();
    res.status(respuesta.status).json(respuesta.mensajeUsuario);
});

router.get("/buscar/:id", async (req, res) => {
    const respuesta = await buscarUsuarioPorId(req.params.id);
    res.status(respuesta.status).json(respuesta.mensajeUsuario);
});

router.delete("/borrar/:id", async (req, res) => {
    const respuesta = await borrarUsuarioPorId(req.params.id);
    res.status(respuesta.status).json(respuesta.mensajeUsuario);
});

router.put("/actualizar/:id", async (req, res) => {
    const respuesta = await actualizarUsuario(req.params.id, req.body);
    res.status(respuesta.status).json(respuesta.mensajeUsuario);
});

router.get("/exit", async (req, res) => {
    res.cookie("token", "", { expires: new Date(0) }).status(200).json("Sesion cerrada correctamente");
});

router.get("/usuariosLogeados", async (req, res) => {
    const respuesta = usuarioAutorizado(req.cookies.token, req);
    res.status(respuesta.status).json(respuesta.mensajeUsuario);
});

router.get("/usuariosAdmin", async (req, res) => {
    const respuesta = await adminAutorizado(req);
    res.status(respuesta.status).json(respuesta.mensajeUsuario);
});

router.get("/usuariosGenerales", async (req, res) => {
    res.json("Estas en Admins");
});

export default router;