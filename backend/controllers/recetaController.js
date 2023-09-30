const Receta = require('../models/receta');

// Controlador para obtener todos los contactos
exports.getAllrecetas = (req, res) => {
    // Utiliza el modelo Contact para obtener todos los contactos
    Receta.getAll((err, Receta) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Error en el servidor');
        } else {
            res.json(Receta);
        }
    });
};

// Controlador para crear un nuevo contacto
exports.createReceta = (req, res) => {
    // Obtener los datos del cuerpo de la solicitud
    const { receta_id,usuario_id , titulo, procedimiento, utensilio  } = req.body;

    // Crear un nuevo objeto Contact con los datos
    const newReceta = new Receta(receta_id,usuario_id , titulo, procedimiento, utensilio);

    // Llamar al método estático "create" del modelo Contact
    Receta.create(newReceta, (err) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Error en el servidor');
        } else {
            res.status(201).send('Receta creada exitosamente');
        }
    });
};

exports.deleterecetaByid = (req, res) => {
    const { receta_id } = req.params;

    Receta.deletebyId(rut, (err) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Error en el servidor');
        } else {
            res.status(200).send('Contacto eliminado exitosamente');
        }
    });
};