const mongoose = require("mongoose");

const ProveedorSchema = mongoose.Schema({
    nombreproveedor : {
        type: String, 
        required: true
    }, 
    razonsocial : {
        type: String, 
        required: true
    }, 
    rfc : {
        type: String, 
        required: true
    },
    numcontacto:{
        type: String, 
        required: true
    },
    emailcontacto:{
        type: String, 
        required: true
    }
},{
    collection : "Proveedores",
    timestamps: true
})

const Proveedores = mongoose.model("Proveedor", ProveedorSchema);

module.exports = Proveedores