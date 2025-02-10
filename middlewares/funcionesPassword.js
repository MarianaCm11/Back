import { log } from 'console';
import crypto from 'crypto';

export function encryptPassword(password) {
    const salt = crypto.randomBytes(32).toString("hex");
    const hash = crypto.scryptSync(password, salt, 10, 64, "sha512").toString("hex");
    return { salt, hash };
};

export function validarPassword(password, salt, hash) {
    const hashEvaluar = crypto.scryptSync(password, salt, 10, 64, "sha512").toString("hex");
    return hashEvaluar == hash;

};

export function usuarioAutorizado(req,res,next) { //se usa para cuando se logee un usuario normal o adeministrador
   console.log(req.cookies);
   next();
   
};

export function adminAutorizado() {

};

// const {salt,hash} =encriptarPassword("123456");
// console.log("salt ----->"+salt);
// console.log("hash ----->"+hash);
// const aprobado = validarPassword("123456",salt,hash);
// log("aprobado ----->"+aprobado);