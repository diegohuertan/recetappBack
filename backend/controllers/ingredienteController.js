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

    const Ingrediente = new Ingrediente(ingrediente_id, nombre, descripcion, unidad_medida);

    Ingrediente.create(Ingrediente, (err) => {
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

    Receta.deletebyId(titulo, (err, result) => {
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

    
    Receta.filterByid(ingrediente_id, (err, result) => {
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

    
    Receta.filterBynombre(nombre, (err, result) => {
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

    
    Receta.filterBydescripcion(descripcion, (err, result) => {
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

    
    Receta.filterByunidad_medida(unidad_medida, (err, result) => {
        if (err) {
            console.error(err.message);
            res.status(500).send( 'Error en el servidor.');
        } else {
            res.status(200).json(result);
        }
    });
}