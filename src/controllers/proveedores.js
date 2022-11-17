const Proveedor = require('../models/Proveedor')
// CREATE
async function crearProveedor(req, res){
    const info = req.body;
    const nombreProv = req.body.nombreproveedor;
    const validaRegistro = await Proveedor.findOne({nombreproveedor:nombreProv})
    if(!validaRegistro){
        const prod = new Proveedor(info)
        prod.save()
        .then(data => res.status(200).send(data))
    }else{
         return  res.status(404).send({mesagge:`Ya existe el Proveedor ${nombreProv}`})
    }
}

// READ
function obtenerProveedores(req, res){
    Proveedor.find()
    .then(data => res.status(200).send(data))
}

function obtenerProveedores2(req, res){
    const pid = req.params.pid;
    const query = { '_id': pid  }
    Proveedor.find(query,
        function(err, result) {
            if (err) {
              res.status(404).send({mesagge:"No se encontro el registro solicitado"});
            } else {
                 res.status(200).send(result)
            }
          })
    //.then(data => res.status(200).send(data))
}

//patch
async  function updateP(req, res){
   const pid = req.params.pid;
   const productoss = await Proveedor.findById(pid);
   if(!productoss){
        return  res.status(404).send({mesagge:"No se encontro el producto"})
   }
   const contenido = req.body;
   console.log(contenido);
   for (const key in contenido){
    productoss[key]  = contenido[key];
    console.log(productoss[key]);
   }
    await productoss.save()
    res.status(200).send(productoss)
}

// DELETE
async function eliminarProveedor(req,res){
    const id = req.body.id;
    const resultado = await Proveedor.findByIdAndDelete(id)
    .then(data => res.status(200).send({mesagge:`Proveedor ${id} borrado exitosamente`}))
    .catch(err => res.status(500).send(err))
    if(!resultado){
        return  res.status(404).send({mesagge:"No se encontro Proveedor"})
    }
}
//UPDATE
async function modificarProveedor(req, res){
    const pid = req.params.pid;
    const info = req.body;
    Proveedor.findByIdAndUpdate(pid, info,
        function(err, result) {
            if (err) {
              res.status(404).send({mesagge:"No se encontro el producto"});
            } else {
                Proveedor.findById(pid)
                .then(filtro => res.status(200).send(filtro))
            }
          })
}

module.exports = {
    crearProveedor,
    modificarProveedor,
    eliminarProveedor,
    obtenerProveedores,
    obtenerProveedores2,
    updateP
}

