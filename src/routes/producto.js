const routerP = require('express').Router();
const {
  obtenerProductos,
  obtenerProductos2,
  crearProducto,
  modificarProducto,
  eliminarProducto,
  updateP
} = require('../controllers/productos')


routerP.post('/', crearProducto)
routerP.put('/:pid', modificarProducto)
routerP.delete('/', eliminarProducto)
routerP.get('/', obtenerProductos)
routerP.get('/:pid', obtenerProductos2)
routerP.patch('/:pid', updateP)

module.exports = routerP;
