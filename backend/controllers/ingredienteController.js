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

exports.addIngredients = (req, res) => {
    const {ingrediente_id, nombre, descripcion, unidad_medida} = req.body;

    const 

    
}