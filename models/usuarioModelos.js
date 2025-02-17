import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true, //borra espacio en blanco antes y despues
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    type: {
        type: String,
        default: "user",
    }
}, {
    timestamps: true //fecha de creacion y actualizacion
});

// export function getCleanUserObject(record) {
//     return {
//         username: record.username,
//         email: record.email,
//         hash: record.password,
//         salt: record.salt,
//         id: record._id
//     };
// }

export default mongoose.model('User', userSchema);