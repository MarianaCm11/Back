import { Router } from "express";
import { register, login, mostrarUsuarios, buscarUsuarioPorId, borrarUsuarioPorId, actualizarUsuario } from "../db/usuariosDB.js";
import { usuarioAutorizado } from "../middlewares/funcionesPassword.js";
const router = Router();

router.post("/registro", async(req, res)=>{
    const respuesta = await register(req.body);
    console.log(respuesta.mensajeOriginal);
    res.cookie("token",respuesta.token).status(respuesta.status).json(respuesta.mensajeUsuario);
});

router.post("/login", async(req, res)=>{
    const respuesta = await login(req.body);
    console.log(respuesta.mensajeOriginal);
    res.cookie("token",respuesta.token).status(respuesta.status).json(respuesta.mensajeUsuario);
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

router.get("/exit", async(req, res)=>{
   res.cookie("token","",{expires: new Date(0)}).status(200).json("Sesion cerrada correctamente");
});

router.get("/usuariosLogeados",usuarioAutorizado, async(req, res)=>{
    res.json("Usuarios convencionales y administradores logeados");
});

router.get("/usuariosAdmin", async(req,res)=>{
    res.json("Solo admins con acceso");
});

router.get("/usuariosGenerales", async(req,res)=>{
    res.json("Estas en Admins");
});

export default router;