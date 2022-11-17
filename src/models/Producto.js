const mongoose = require("mongoose");

const ProductoSchema = mongoose.Schema({
    nombreProducto:{
        type:String,
        unique: true,
        required:true
    },
    descripcion:{
        type: String, 
        required: true
    },
    recomendacion:{
        type: String, 
        required: true
    },
    funcionPolicial : Array,
    proveedor:Array
},{
    collection: "Productos",
    timestamps: true
})

const Producto = mongoose.model("Producto", ProductoSchema);
module.exports = Producto;