const connection = require('../database/connection');

class getAllIngrediente{
    constructor(ingrediente_id, nombre, descripcion, unidad_medida){
        this.ingrediente_id = ingrediente_id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.unidad_medida = unidad_medida;
    }

    static getAll(callback){
        connection.query('SELECT * FROM ingrediente'),(err, rows) => {
            if(err){
                console.error(error.message);
                callback(err);
            } else{
                callback(null, rows);
            }
        }
    }

    static add(ingrediente, callback){
        connection.query('INSERT INTO ingrediente (ingrediente_id, nombre, descripcion, unidad_medida) VALUES (?, ?, ?, ?)', 
            [ingrediente.ingrediente_id, ingrediente.nombre, ingrediente.descripcion, ingrediente.unidad_medida],
            (err) => {
                 if(err){
                    console.error(err.message);
                    callback(err);
                } else{
                    callback(null);
                }
            }
        );
    }

    static delete(i, callback){
        connection.query('DELETE FROM ingrediente WHERE ingrediente_id = ?', 
            [i.ingrediente_id], 
            (err) => {
                if(err){
                    console.error(err.message);
                    callback(err);
                } else{
                    callback(null);
                }
            }
        );
    }
}