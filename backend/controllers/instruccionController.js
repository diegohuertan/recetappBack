const Instruccion = require('../models/instruccion');

exports.getInstrucciones = (req, res) => {
    Instruccion.getInstruccion((err, Instruccion) =>{
        if(err){
            console.error(err.message);
            res.status(500).send('Error en el servidor');
        } else{
            res.json(Instruccion);
        }
    });
};

exports.createInstrucciones = (req, res) => {
    const {instruccion_id, receta_id, descripcion, tip} = req.body;

    const newinstruccion = new Instruccion(instruccion_id, receta_id, descripcion, tip);

    Instruccion.crearInstruccion(newinstruccion, (err) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Error en el servidor');
        } else {
            res.status(201).send('Intruccion creada exitosamente');
        }
    });
};

exports.borrarInstrucciones = (req, res) => {
    const {instruccion_id, receta_id} = req.params;

    Instruccion.borrarInstruccion(instruccion_id, receta_id, (err, result) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Error en el servidor');
        } else {
    
            res.status(200).json(result)
        }
    });
};

exports.filterByInstruccionId = (req, res) => {
    
    const {
       instruccion_id
       } = req.body;

   
   Instruccion.filterByInstruccionId(instruccion_id, (err, result) => {
       if (err) {
           console.error(err.message);
           res.status(500).send( 'Error en el servidor.');
       } else {
           res.status(200).json(result);
       }
   });
}

exports.filterByRecetaId = (req, res) => {
    
    const {
       receta_id
       } = req.body;

   
   Instruccion.filterByRecetaId(receta_id, (err, result) => {
       if (err) {
           console.error(err.message);
           res.status(500).send( 'Error en el servidor.');
       } else {
           res.status(200).json(result);
       }
   });
}

exports.filterByDescripcion = (req, res) => {
    
    const {
       descripcion
       } = req.body;

   
   Instruccion.filterByDescripcion(descripcion, (err, result) => {
       if (err) {
           console.error(err.message);
           res.status(500).send('Error en el servidor.');
       } else {
           res.status(200).json(result);
       }
   });
}

exports.filterByTip = (req, res) => {
    
    const {
       tip
       } = req.body;

   
   Instruccion.filterByTip(tip, (err, result) => {
       if (err) {
           console.error(err.message);
           res.status(500).send( 'Error en el servidor.');
       } else {
           res.status(200).json(result);
       }
   });
}