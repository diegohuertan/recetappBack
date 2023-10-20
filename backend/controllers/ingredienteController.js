const Ingrediente = require('../models/ingrediente');

exports.listIngredients = (req, res) => {
    Ingrediente.getAll((err, Ingrediente) =>{
        if(err){
            console.error(err.message);
            res.status(500).send('Error en el servidor');
        } else{
            res.json(Ingrediente);
        }
    });
};

exports.createIngredients = (req, res) => {
    const {ingrediente_id, nombre, descripcion, unidad_medida} = req.body;

    const newingrediente = new Ingrediente(ingrediente_id, nombre, descripcion, unidad_medida);

    Ingrediente.create(newingrediente, (err) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Error en el servidor');
        } else {
            res.status(201).send('Receta creada exitosamente');
        }
    });
};

exports.deleteByIngredienteid = (req, res) => {
    const {ingrediente_id} = req.params;

    Ingrediente.deletebyId(titulo, (err, result) => {
        if (err) {
            console.error(err.message);
            res.status(500).send( 'Error en el servidor.');
        } else {
            res.status(200).json(result);
        }
    });
};

exports.filterByIngrediente_id = (req, res) => {
    
     const {
        ingrediente_id
        } = req.body;

    
    Ingrediente.filterByid(ingrediente_id, (err, result) => {
        if (err) {
            console.error(err.message);
            res.status(500).send( 'Error en el servidor.');
        } else {
            res.status(200).json(result);
        }
    });
}

exports.filterBynombre = (req, res) => {
     const {
        nombre
        } = req.body;

    
    Ingrediente.filterBynombre(nombre, (err, result) => {
        if (err) {
            console.error(err.message);
            res.status(500).send( 'Error en el servidor.');
        } else {
            res.status(200).json(result);
        }
    });
}

exports.filterBydescripcion = (req, res) => {
     const {
        descripcion
        } = req.body;

    
    Ingrediente.filterBydescripcion(descripcion, (err, result) => {
        if (err) {
            console.error(err.message);
            res.status(500).send( 'Error en el servidor.');
        } else {
            res.status(200).json(result);
        }
    });
}

exports.filterByUnidad_medida = (req, res) => {
         const {
        unidad_medida
        } = req.body;

    
    Ingrediente.filterByunidad_medida(unidad_medida, (err, result) => {
        if (err) {
            console.error(err.message);
            res.status(500).send( 'Error en el servidor.');
        } else {
            res.status(200).json(result);
        }
    });
}