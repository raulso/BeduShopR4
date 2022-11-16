const Producto = require('../models/Producto')

// CREATE
function crearProducto(req, res){
    const info = req.body;
    const prod = new Producto(info)
    prod.save()
    .then(data => res.send(data))
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
function eliminarProducto(req,res){
    const name = req.body.nombre;
    Producto.findOneAndDelete({nombre : name})
    .then(data => res.send(data))
    .catch(err => res.status(500).send(err))
}

// UPDATE
function modificarProducto(req, res){
    const name = req.params.nombre;
    const nuevaInfo = req.body;
    Producto.findOne({nombre : name})
    .then(producto => {
        producto = req.body
        producto.save()
        .then( data => {
            res.status(200).send(data);
        })
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

