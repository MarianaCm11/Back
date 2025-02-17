import User from "../models/usuarioModelos.js";
import { encryptPassword, validarPassword } from "../middlewares/funcionesPassword.js";
import { mensaje } from "../libs/mensajes.js";
import { crearToken } from "../libs/jwt.js";

export const register = async ({ username, email, password }) => {
    try {
        const usuarioDuplicado = await User.findOne({ username });
        const emailDuplicado = await User.findOne({ email });
        if (usuarioDuplicado || emailDuplicado) {
            return mensaje(400, "Usuario o email ya existente");
        }
        const { salt, hash } = encryptPassword(password);
        const dataUser = new User({ username, email, password: hash, salt });
        const respuestaMongo = await dataUser.save();
        console.log(respuestaMongo);

        const token = await crearToken({ id: respuestaMongo._id });
        return mensaje(200, "Usuario registrado correctamente", "", token); //consumir la funcion 
    } catch (error) {
        return mensaje(400, "Error al registrar usuario", error);
    }
};

export const login = async ({ username, password }) => {
    try {
        const usuarioEncontrado = await User.findOne({ username });
        if (!usuarioEncontrado) {
            return mensaje(400, "Datos incorrectos");
        }
        const passwordValido = validarPassword(password, usuarioEncontrado.salt, usuarioEncontrado.password);
        if (!passwordValido) { //lo niego porque si es falso, no es valido
            return mensaje(400, "Datos incorrectos");
        }
        const token = await crearToken({ id: usuarioEncontrado._id });
        return mensaje(200, `Bienvenido ${usuarioEncontrado.username}`, "", token);

    } catch (error) {
        return mensaje(400, "Datos incorrectos", error);
    }
};

// Mostrar todos los usuarios
export const mostrarUsuarios = async () => {
    try {
        const usuarios = await User.find();
        return mensaje(200, usuarios);
    } catch (error) {
        return mensaje(400, "No existen usuarios", error);
    }
};

// Buscar usuario por id
export const buscarUsuarioPorId = async (id) => {
    try {
        const usuario = await User.findById(id);
        if (!usuario) {
            return mensaje(404, "Usuario no encontrado");
        }
        return mensaje(200, usuario);
    } catch (error) {
        return mensaje(400, "Error al buscar usuario", error);
    }
};

// Borrar usuario por id
export const borrarUsuarioPorId = async (id) => {
    try {
        const usuario = await User.findByIdAndDelete(id);
        if (!usuario) {
            return mensaje(404, "Usuario no encontrado");
        }
        return mensaje(200, "Usuario borrado correctamente");
    } catch (error) {
        return mensaje(400, "Error al borrar usuario", error);
    }
};

// Actualizar un usuario
export const actualizarUsuario = async (id, datosActualizados) => {
    try {
        const usuario = await User.findByIdAndUpdate(id, datosActualizados, { new: true });
        if (!usuario) {
            return mensaje(404, "Usuario no encontrado");
        }
        return mensaje(200, "Usuario actualizado correctamente", usuario);
    } catch (error) {
        return mensaje(400, "Error al actualizar usuario", error);
    }
};

export const isAdmin = async (id)=> {
    try {
        const usuario = await User.findById(id);
        if (usuario.tipoUsuario != "admin") {
            return false
        }
        return true;
    } catch (error) {
        return mensaje(400, "Admin no autorizado", error);
    }
}

