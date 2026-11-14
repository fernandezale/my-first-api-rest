import { Schema, model } from "mongoose";

const CategorySchema = new Schema({
    nombre: {
        type: String,
        required: [true,"El nombre es obligatorio"],
        unique: true,
    },
    estado:{
        type: Boolean,
        default: true,
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref: "User",
    },


},
{
    timestamps: true,
}
);

export default model("Category", CategorySchema);