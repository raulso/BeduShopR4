const  router = require("express").Router();

router.get('/', (req, res)=>{
  res.send('Bienvenido a bedushop');
});

router.use('/productos',require('./producto'));
router.use('/usuarios',require('./usuario'));
router.use('/proveedores',require('./proveedor'));

module.exports = router;