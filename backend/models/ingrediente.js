const connection = require('../database/connection');

class Ingrediente{
    constructor(ingrediente_id, nombre, descripcion, unidad_medida){
        this.ingrediente_id = ingrediente_id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.unidad_medida = unidad_medida;
    }

    static getAll(callback){
        connection.query('SELECT * FROM ingrediente',(err, rows) => {
            if(err){
                console.error(err.message);
                callback(err);
            } else{
                callback(null, rows);
            }
        });
    }

    static create(ingrediente, callback){
        connection.query('INSERT INTO ingrediente (ingrediente_id, nombre, descripcion, unidad_medida) VALUES (?, ?, ?, ?)',
            [ingrediente.ingrediente_id, ingrediente.nombre, ingrediente.descripcion, ingrediente.unidad_medida], 
            (err) => {
                if(err){
                    console.error(err.message);
                    callback(err);
                } else {
                    callback(null);
                }
            }
        );
    }

    static deleteById(ingrediente_id, callback){
        connection.query('DELETE FROM ingrediente WHERE ingrediente_id = ?', [ingrediente_id],
        (error) =>{
            if(error){
                console.error(error.message);
                callback(error);
            } else {
                callback(null);
            }

        });
    }

    static filterByid(ingrediente_id, callback){

        connection.query('SELECT * FROM ingrediente WHERE ingrediente_id = ?', [ingrediente_id],
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

    static filterByNombre(nombre, callback){
        connection.query('SELECT * FROM ingrediente WHERE nombre = ?', [nombre],
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
        connection.query('SELECT * FROM ingrediente WHERE descripcion = ?', [descripcion],
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

    static filterByUnidad_medida(unidad_medida, callback){
        connection.query('SELECT * FROM ingrediente WHERE unidad_medida = ?', [unidad_medida],
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

module.exports = Ingrediente;