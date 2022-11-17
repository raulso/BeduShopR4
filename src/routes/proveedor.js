const routerProve = require('express').Router();
const {
 obtenerProveedores,
 obtenerProveedores2,
  crearProveedor,
  modificarProveedor,
  eliminarProveedor,
  updateP
} = require('../controllers/proveedores')

routerProve.post('/', crearProveedor)
routerProve.put('/:pid', modificarProveedor)
routerProve.delete('/', eliminarProveedor)
routerProve.get('/', obtenerProveedores)
routerProve.get('/:pid', obtenerProveedores2)
routerProve.patch('/:pid', updateP)

module.exports = routerProve;