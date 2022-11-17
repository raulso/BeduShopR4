const  router = require("express").Router();
// definimos el comportamiento en la raíz del endpoint
router.get('/', (req, res)=>{
  res.send('Bienvenido a bedushop');
});

router.use('/productos',require('./producto'));
router.use('/usuarios',require('./usuario'));
router.use('/proveedores',require('./proveedor'));
// exportamos nuestro nuevo router
module.exports = router;