const Usuario = require('../models/Usuario');
const passport = require('passport')
function login(req, res){
    const email = req.body.email;
    const pass = req.body.pass;

    passport.authenticate('local', {session:false},(err,user,info)=> {
        if(err) return err
        if(user){
            user.token = user.generaJWT();
            return res.json({user:user.toAuthJSON()})
        }
        else
            return res.status(422).json(info)
        

    })(req,res)
}

async function agregarUsuario(req,res){
    const email = req.body.email;
    const validaRegistro = await Usuario.find({ $or: [ { email:req.body.email }, { nombre:req.body.nombre },{ username:req.body.username } ] })
    if(validaRegistro.length === 0){
        const usuario = new Usuario(req.body)
        const pass = req.body.password
        usuario.crearContrasena(pass);
        usuario.save()
        .then(data => res.status(200).send(data))
    }else{
         return  res.send({mesagge:`Ya existe usuario con email ${email}`})
    }
}

function obtenerUsuarios(req,res){
    if(!req.auth)
        req.sendStatus(401)

    Usuario.findById(req.auth.id)
    .then(user => {
        res.send(user.publicData())
    })
}

module.exports  = {
    login,
    agregarUsuario,
    obtenerUsuarios
}