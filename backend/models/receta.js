const connection = require('../database/connection');

/**
 * Representa una receta.
 * @class
 */
class Receta {
    /**
     * Crea una receta.
     * @constructor
     * @param {number} receta_id - El ID de la receta.
     * @param {string} utensilio - El utensilio utilizado en la receta.
     * @param {string} titulo - El título de la receta.
     * @param {string} imagen - La imagen de la receta.
     */
    constructor(receta_id, utensilio, titulo, imagen) {
        this.receta_id = receta_id;
        this.utensilio = utensilio;
        this.titulo = titulo;
        this.imagen = imagen;
    }

    /**
     * Obtiene todas las recetas.
     * @static
     * @param {function} callback - La función de retorno de llamada.
     */
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

    /**
     * Crea una receta.
     * @static
     * @param {Receta} receta - La receta a crear.
     * @param {function} callback - La función de retorno de llamada.
     */
    static create(receta, callback) {
        connection.query('INSERT INTO receta (receta_id, utensilio, titulo, imagen) VALUES (?, ?, ?, ?)',
            [receta.receta_id, receta.utensilio, receta.titulo, receta.imagen],
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
    
    /**
     * Filtra las recetas por ID.
     * @static
     * @param {number} receta_id - El ID de la receta a filtrar.
     * @param {function} callback - La función de retorno de llamada.
     */
    static filterByid(receta_id,callback){
        
        connection.query('SELECT * FROM receta where receta_id = ?', [receta_id], 
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

    /**
     * Filtra las recetas por título.
     * @static
     * @param {string} titulo - El título de la receta a filtrar.
     * @param {function} callback - La función de retorno de llamada.
     */
    static filterBytitulo(titulo,callback){
        
        connection.query('SELECT * FROM receta where titulo = ?', [titulo], 
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

    /**
     * Filtra las recetas por utensilio.
     * @static
     * @param {string} utensilio - El utensilio utilizado en la receta a filtrar.
     * @param {function} callback - La función de retorno de llamada.
     */
    static filterByutensilio(utensilio,callback){
        
        connection.query('SELECT * FROM receta where utensilio = ?', [utensilio], 
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

    /**
     * Elimina una receta por ID.
     * @static
     * @param {number} receta_id - El ID de la receta a eliminar.
     * @param {function} callback - La función de retorno de llamada.
     */
    static deleteById(receta_id, callback) {
        connection.query('DELETE FROM receta WHERE receta_id = ?', [receta_id], (err,rows) => {
            if (err) {
                console.error(err.message);
                callback(err);
            } else {
                callback(null, rows);
            }
        });
    }

    // Puedes agregar métodos para actualizar y eliminar contactos si es necesario
}

module.exports = Receta;
