import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        trim:true, //borra espacio en blanco antes y despues
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    salt:{
        type:String,
        required:true
    }
},
{
    timestamps:true //fecha de creacion y actualizacion
}


);

export default mongoose.model('User',userSchema);