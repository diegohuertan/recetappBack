const connection = require('../database/connection');

class Instruccion{
    constructor(intruccion_id, receta_id, descripcion, tip){
        this.intruccion_id = intruccion_id;
        this.receta_id = receta_id;
        this.descripcion = descripcion;
        this.tip = tip;
    }

    static getInstruccion(callback){
        connection.query(' SELECT instruccion_id, imagen, descripcion, tip, utensilio, titulo FROM instruccion INNER JOIN receta on receta.receta_id = instruccion.receta_id', (err, rows) => {
            if(err){
                console.error(err.message);
                callback(err);
            } else {
                callback(null, rows);
            }
        });
    }

    static crearInstruccion(instruccion, callback){
        connection.query('INSERT INTO instruccion (instruccion_id, receta_id, descripcion, tip) VALUES (?, ?, ?, ?)',
            [instruccion.intruccion_id, instruccion.receta_id, instruccion.descripcion, instruccion.tip],
            (err) => {
                if(err){
                    console.error(err.message);
                    callback(err);
                } else {
                    callback(null);
                }
            });
    }

    static borrarInstruccion(instruccion_id, receta_id, callback){
        connection.query('DELETE FROM instruccion WHERE instruccion_id = receta_id = ?', [instruccion_id, receta_id],
                (error) =>{
            if(error){
                console.error(error.message);
                callback(error);
            } else {
                callback(null);
            }
        });
    }

    static filterByInstruccionId(instruccion_id, callback){
        connection.query('SELECT * FROM instruccion WHERE instruccion_id = ?', [instruccion_id],
        (err, rows) => {
            if (err) {
                console.error(err.message);
                callback(err, null);
            }
            else{
                callback(null, rows);
            }
        });
    }

    static filterByRecetaId(receta_id, callback){
        connection.query('SELECT * FROM instruccion WHERE receta_id = ?', [receta_id],
        (err, rows) => {
            if (err) {
                console.error(err.message);
                callback(err, null);
            }
            else{
                callback(null, rows);
            }
        });
    }

    static filterByDescripcion(descripcion, callback){
        connection.query('SELECT * FROM instruccion WHERE descripcion = ?', [descripcion],
        (err, rows) => {
            if (err) {
                console.error(err.message);
                callback(err, null);
            }
            else{
                callback(null, rows);
            }
        });
    }

    static filterByTip(tip, callback){
        connection.query('SELECT * FROM instruccion WHERE tip = ?', [tip],
        (err, rows) => {
            if (err) {
                console.error(err.message);
                callback(err, null);
            }
            else{
                callback(null, rows);
            }
        });
    }
}

module.exports = Instruccion;