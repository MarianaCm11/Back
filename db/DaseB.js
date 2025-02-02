import mongoose from "mongoose";
import { mensaje } from "../libs/mensajes.js";

export async function conectarDB() {
    try { //intentar = try
        const conexion = await mongoose.connect("mongodb://127.0.0.1:27017/MongoDBApp");
        //const conexion = await mongoose.connect("mongodb+srv://marianacano12309:Morena_11@cluster0.fpnic.mongodb.net/?retryWrites=true&w=majority&appName=MondoBDApp");
        // console.log(conexion);
        //console.log("Conexion correcta a MongoDB");
        return mensaje(200, "Conexion Ok");
    } catch (error) {
        return mensaje(400, "Error al conectarse a la bd",error);
    }
};
// concectarDB(); 
