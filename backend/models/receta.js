const connection = require('../database/connection');


class Receta {
    constructor(receta_id,usuario_id, utensilio, titulo, procedimiento) {
        this.receta_id = receta_id;
        this.utensilio = utensilio;
        this.titulo = titulo;
        this.procedimiento = procedimiento;
        this.usuario_id =usuario_id;
    }

    static getAll(callback) {
        connection.query('SELECT * FROM receta', (err, rows) => {
            if (err) {
                console.error(err.message);
                callback(err);
            } else {
                callback(null, rows);
            }
        });
    }

    static create(receta, callback) {
        connection.query('INSERT INTO receta (receta_id, usuario_id, utensilio, titulo, procedimiento) VALUES (?, ?, ?, ?, ?)',
            [receta.receta_id,receta.usuario_id , receta.titulo, receta.procedimiento, receta.utensilio],
            (err) => {
                if (err) {
                    console.error(err.message);
                    callback(err);
                } else {
                    callback(null);
                }
            }
        );
    }
    
    // Método estático para eliminar un contacto por su rut
    static deleteById(receta_id, callback) {
        db.run('DELETE FROM receta WHERE receta_id = ?', [receta_id], (err) => {
            if (err) {
                console.error(err.message);
                callback(err);
            } else {
                callback(null);
            }
        });
    }

    // Puedes agregar métodos para actualizar y eliminar contactos si es necesario
}

module.exports = Receta;