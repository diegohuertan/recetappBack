const Usuario = require('../models/users');

// Controlador para obtener todos los usuarios
exports.getAllusuarios = (req, res) => {
    // Utiliza el modelo users para obtener todos los usuarios
    Usuario.getAll((err, Usuario) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Error en el servidor');
        } else {
            res.json(Usuario);
        }
    });
};
exports.getUserbyCorreo = (req,res)=>{
    const {
        correo
        } =req.body;
    Usuario.getbyCorreo(correo,(error,result)=>{
        if (error){
            console.error(error.mensaje);
            res.status(500).send('Error en el servidor');
        } else {
            res.status(200).json(result);
        }
    });
};
// Controlador para crear un nuevo user
exports.createUser = (req, res) => {
    // Obtener los datos del cuerpo de la solicitud
    const { usuario_id,correo, contraseña, perfil  } = req.body;

    // Crear un nuevo objeto Contact con los datos
    const newUser = new Usuario(usuario_id,correo, contraseña, perfil);

    // Llamar al método estático "create" del modelo users
    Usuario.create(newUser, (err) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Error en el servidor');
        } else {
            res.status(201).send('Usuario creado exitosamente');
        }
    });
};

exports.validarUser = (req, res) => {
    // Obtener los datos del cuerpo de la solicitud
    const { correo, contraseña, perfil  } = req.body;

    // Crear un nuevo objeto Contact con los datos
    const newUser = new Usuario(correo, contraseña, perfil);

    // Llamar al método estático "create" del modelo users
    Usuario.validar(newUser, (err, usuarioValidado) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Error en el servidor');
        } else {
            if (usuarioValidado) {
                res.status(200).json({ success: true, message: 'Inicio de sesión exitoso' , Usuario: newUser });
                
            } else {
                res.status(401).json({ message: 'Credenciales inválidas' });
            }
        }
    });
};

exports.deleteUserByid = (req, res) => {
    const { id } = req.params;

    Usuario.deletebyId(id, (err) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Error en el servidor');
        } else {
            res.status(200).send('Contacto eliminado exitosamente');
        }
    });
};