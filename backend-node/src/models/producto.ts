import {Schema,model} from "mongoose";

let productoSchema = new Schema(
    {
        nombre:{type:String, required:[true,'El nombre es necesario']},
        precioUni:{type:String, required:[true,'El precio unitario es necesario']},
        descripcion:{type:String, required:false},
        disponible:{type:Boolean, required:true, default:true},
        categoria:{type:Schema.Types.ObjectId, ref:'Categoria',required:true},
    }
);

export default model('Producto',productoSchema);