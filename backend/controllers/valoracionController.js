const valoracion = require('../models/valoracion');


exports.getAllval =(req,res)=> {
    valoracion.getAll((error,valoracion)=> {
        if (error){
            console.error(error.mensaje);
            res.status(500).send('Error en el servidor');
        } else {
            res.status(200).json(valoracion);
        }

    });
};
exports.getValUid = (req,res)=>{
    const usuario_id =req.params.id;
    valoracion.getValbyUid(usuario_id,(error,valoraciones)=>{
        if (error){
            res.status(500).send('Error en el servidor');
        } else {
            res.status(200).json(valoraciones);
        }
    });
};
exports.getValRid = (req, res) => {
    const receta_id = req.params.id; 

    valoracion.getValbyRid(receta_id, (error, valoraciones) => {
        if (error) {
            res.status(500).send('Error en el servidor');
        } else {
            res.status(200).json(valoraciones);
        }
    });
};

exports.delValId = (req,res)=> {
    const valoracion_id = req.params.id;

    valoracion.delValbyid(valoracion_id,(error,valoraciones)=>{
        if(error){
            res.status(500).send('Error  en el servidor');
        } else {
            if(valoraciones.affectedRows===0){
                res.status(404).send('No se encontro valoracion segun ese id');
            } else {
                res.status(200).send('Valoracion se eliminó con exito');
                console.log('C borro');
            }
        }
    });
};
exports.addVal = (req, res) => {
    const { usuario_id, receta_id, comentario, puntuacion } = req.body;

    if (!usuario_id || !receta_id || !comentario || !puntuacion) {
        return res.status(400).json({ error: 'Todos los campos son requeridos: usuario_id, receta_id, comentario, puntuacion' });
    }

    const nuevaValoracion = {
        usuario_id,
        receta_id,
        comentario,
        puntuacion
    };

    valoracion.addVal(nuevaValoracion, (error, valoracion) => {
        if (error) {
            return res.status(500).json({ error: 'Error al agregar la valoración' });
        }

        res.status(201).json({ mensaje: 'Valoración agregada exitosamente', valoracion });
    });
};

exports.modVal = (req, res) => {
    const { valoracion_id, usuario_id, receta_id, newCom, newPun} = req.body;

    // Validar que todos los campos necesarios estén presentes
    if (!valoracion_id || !usuario_id || !receta_id || !newCom || !newPun) {
        return res.status(400).json({ error: 'Todos los campos son requeridos: valoracion_id, usuario_id, receta_id, nuevoComentario, nuevaPuntuacion' });
    }

    // Crear un objeto con los datos actualizados
    const valoracionActualizada = {
        comentario: newCom,
        puntuacion: newPun
    };

    // Lógica para actualizar la valoración en la base de datos
    Valoracion.update(valoracion_id, usuario_id, receta_id, valoracionActualizada, (error, resultado) => {
        if (error) {
            return res.status(500).json({ error: 'Error al modificar la valoración' });
        }

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ error: 'No se encontró ninguna valoración para el ID proporcionado' });
        }

        // Valoración modificada exitosamente
        res.status(200).json({ mensaje: 'Valoración modificada exitosamente' });
    });
};
