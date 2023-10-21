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
    const { receta_id , utensilio, titulo , imagen  } = req.body;

    // Crear un nuevo objeto Contact con los datos
    const newReceta = new Receta(receta_id , utensilio, titulo, imagen);

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

exports.filterByreceta_id = (req, res) => {
    // Obtén el JSON enviado en el cuerpo de la solicitud
     const {
        receta_id
        } = req.body;

    
    Receta.filterByid(receta_id, (err, result) => {
        if (err) {
            console.error(err.message);
            res.status(500).send( 'Error en el servidor.');
        } else {
            res.status(200).json(result);
        }
    });
}

exports.filterBytitulo = (req, res) => {
    // Obtén el JSON enviado en el cuerpo de la solicitud
     const {
        titulo
        } = req.body;

    
    Receta.filterBytitulo(titulo, (err, result) => {
        if (err) {
            console.error(err.message);
            res.status(500).send( 'Error en el servidor.');
        } else {
            res.status(200).json(result);
        }
    });
}

exports.filterByutensilio = (req, res) => {
    // Obtén el JSON enviado en el cuerpo de la solicitud
     const {
        utensilio
        } = req.body;

    
    Receta.filterByutensilio(utensilio, (err, result) => {
        if (err) {
            console.error(err.message);
            res.status(500).send( 'Error en el servidor.');
        } else {
            res.status(200).json(result);
        }
    });
}



exports.deleterecetaByid = (req, res) => {
    const { receta_id } = req.params;

    Receta.deleteById(receta_id, (err) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Error en el servidor');
        } else {
            res.status(200).send('Receta eliminada exitosamente');
        }
    });
}