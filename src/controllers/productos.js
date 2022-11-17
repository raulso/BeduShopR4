const Producto = require('../models/Producto')
// CREATE
async function crearProducto(req, res){
    const info = req.body;
    const nombreProd = req.body.nombreProducto;
    const validaRegistro = await Producto.findOne({nombreProducto:nombreProd})
    if(!validaRegistro){
        const prod = new Producto(info)
        prod.save()
        .then(data => res.status(200).send(data))
    }else{
         return  res.status(404).send({mesagge:`Ya existe el Producto ${nombreProd}`})
    }
}
// READ
function obtenerProductos(req, res){
    Producto.find()
    .then(data => res.status(200).send(data))
}

function obtenerProductos2(req, res){
    const pid = req.params.pid;
    const query = {   '_id': pid  }
    Producto.find(query)
    .then(data => res.status(200).send(data))
}
//patch
async  function updateP(req, res){
   const pid = req.params.pid;
   const productoss = await Producto.findById(pid);
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
async function eliminarProducto(req,res){
    const id = req.body.id;
    const resultado = await Producto.findByIdAndDelete(id)
    .then(data => res.status(200).send({mesagge:`Producto ${id} borrado exitosamente`}))
    .catch(err => res.status(500).send(err))
    if(!resultado){
        return  res.status(404).send({mesagge:"No se encontro el producto"})
    }
}
// UPDATE
function modificarProducto(req, res){
    const pid = req.params.pid;
    const info = req.body;
    Producto.findByIdAndUpdate(pid, info,
        function(err, result) {
            if (err) {
              res.status(404).send({mesagge:"No se encontro el producto"});
            } else {
                 Producto.findById(pid)
                .then(filtro => res.status(200).send(filtro))
            }
          })
   }

module.exports = {
    crearProducto,
    modificarProducto,
    eliminarProducto,
    obtenerProductos,
    obtenerProductos2,
    updateP
}