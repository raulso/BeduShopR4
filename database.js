console.log("I'm alive");
const mongoose  = require("mongoose");
const db = "BeduShop"
const dbUser = "raulso"
const dbPass = "raulso1984"
const uri = `mongodb+srv://${dbUser}:${dbPass}@cluster0.ylmtwla.mongodb.net/${db}?retryWrites=true&w=majority`

mongoose.connect(uri);

const ProductSchema = mongoose.Schema({
    nombre: String,
    precio: Number,
    cat: {type: String, enum:['Alimentos','Bebidas', 'Otros']},
    desc: String,
    descuento:Number,
    },{collection:"Productos",
    timestamps:true

})

const Producto = mongoose.model("Productos",ProductSchema);

function obtenerProductos(){
    Producto.find()
.then(data=> console.log(data))
}

function crearProducto(producto){
    const prod = new Producto(producto);
    prod.save()
    .then(res => console.log(res));
}

function obtenerProductoPorPrecio(precio){
    const query = {
        'precio': {
          '$lte': precio
        }
      }
      Producto.find(query).then(data=> console.log(data))
}
 
const info = {
    nombre:"silla",
    precio:500,
    cat:'Otros',
    desc:"Silla con 4 patas",
    descuento:20.0

}

//crearProducto(info);
//obtenerProductoPorPrecio(600)

function agregacion(precio){
    const aggr = [
        {
          '$project': {
            'nombre': 1, 
            'precio': 1, 
            '_id': 0
          }
        }, {
          '$match': {
            'precio': {
              '$lte': precio
            }
          }
        }, {
          '$sort': {
            'precio': -1
          }
        }
      ]

    Producto.aggregate(aggr)
    .then( data => console.log(data))

}

agregacion(800);
