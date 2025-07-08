import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface IUsuario {
    _id?: ObjectId | string | undefined;
    usuario: string;
    fechaAlta: Date;
    password: string;
}
export interface ISchemaUsuario extends Document {
    _id: ObjectId | string | undefined;
    usuario: string;
    fechaAlta: Date;
    password: string;
}
const usuarioSchema = new Schema(
    {
        usuario: { type: String, require: true },
        fechaAlta: { type: Date },
        password: { type: String, require: true }
    },
    {
        versionKey: false,
        timestamps: true
    })


const Usuario = mongoose.models.Usuario || mongoose.model("Usuario", usuarioSchema);
export default Usuario;