import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { mensaje } from '../libs/mensajes.js';
import { isAdmin } from '../db/usuariosDB.js';

export function encryptPassword(password) {
    const salt = crypto.randomBytes(32).toString("hex");
    const hash = crypto.scryptSync(password, salt, 10, 64, "sha512").toString("hex");
    return { salt, hash };
};

export function validarPassword(password, salt, hash) {
    const hashEvaluar = crypto.scryptSync(password, salt, 10, 64, "sha512").toString("hex");
    return hashEvaluar == hash;
};

export function usuarioAutorizado(token, req) { //se usa para cuando se logee un usuario normal o adeministradoror  
    if (!token) {
        return mensaje(400, "Usuario no autorizado");
    }
    jwt.verify(token, process.env.SECRET_TOKEN, (error, usuario) => {
        if (error) {
            return mensaje(400, "Usuario no autorizado");
        }
        req.usuario = usuario;
    });
    return mensaje(200, "Usuario autorizado");
};

export async function adminAutorizado(req) {
    const respuesta = usuarioAutorizado(req.cookies.token, req);
    if (respuesta.status != 200) {
        return mensaje(400, "Admin no autorizado");
    }

    if (await isAdmin(req.usuario.id)!=true) {
        return mensaje(400, "Admin no autorizado");
    }
    return mensaje(200, "Admin autorizado");
};

// const {salt,hash} =encriptarPassword("123456");
// console.log("salt ----->"+salt);
// console.log("hash ----->"+hash);
// const aprobado = validarPassword("123456",salt,hash);
// log("aprobado ----->"+aprobado);