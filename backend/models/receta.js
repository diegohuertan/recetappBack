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
     * Obtiene las recetas con sus ingredientes y promedio de valoración.
     * @static
     * @param {function} callback - La función de retorno de llamada.
     */
    static getRecetasConIngredientesYValoracionPromedio(callback) {
        connection.query(`
            SELECT R.titulo, I.nombre AS ingrediente, AVG(V.puntuacion) AS promedio_valoracion
            FROM receta R
            JOIN r_ingrediente_receta RI ON R.receta_id = RI.receta_id
            JOIN ingrediente I ON RI.ingrediente_id = I.ingrediente_id
            LEFT JOIN valoracion V ON R.receta_id = V.receta_id
            GROUP BY R.titulo, I.nombre
            HAVING COUNT(V.valoracion_id) >= 3
            ORDER BY promedio_valoracion DESC;
        `, (err, rows) => {
            if (err) {
                console.error(err.message);
                callback(err);
            } else {
                callback(null, rows);
            }
        });
    }

    /**
     * Obtiene las recetas con sus ingredientes y promedio de valoración.
     * @static
     * @param {function} callback - La función de retorno de llamada.
     */
    static getRecetasConValoracionPromedioPorCorreo(callback) {
        connection.query(`
            SELECT U.correo, R.titulo, AVG(V.puntuacion) AS promedio_valoracion
            FROM usuario U
            JOIN r_usuario_receta UR ON U.usuario_id = UR.usuario_id
            JOIN receta R ON UR.receta_id = R.receta_id
            LEFT JOIN valoracion V ON R.receta_id = V.receta_id
            GROUP BY U.correo, R.titulo
            ORDER BY U.correo, promedio_valoracion DESC;
        `, (err, rows) => {
            if (err) {
                console.error(err.message);
                callback(err);
            } else {
                callback(null, rows);
            }
        });
    }

    /**
     * Obtiene las recetas con la cantidad de ingredientes que tienen.
     * @static
     * @param {function} callback - La función de retorno de llamada.
     */
    static getRecetasConCantidadDeIngredientes(callback) {
        connection.query(`
            SELECT R.titulo, COUNT(I.ingrediente_id) AS cantidad_ingredientes
            FROM receta R
            JOIN r_ingrediente_receta RI ON R.receta_id = RI.receta_id
            JOIN ingrediente I ON RI.ingrediente_id = I.ingrediente_id
            GROUP BY R.titulo
            HAVING COUNT(I.ingrediente_id) >= 2;
        `, (err, rows) => {
            if (err) {
                console.error(err.message);
                callback(err);
            } else {
                callback(null, rows);
            }
        });
    }

    /**
     * Obtiene las recetas con su promedio de valoración.
     * @static
     * @param {function} callback - La función de retorno de llamada.
     */
    static getRecetasConPromedioValoracion(callback) {
        connection.query(`
            SELECT R.titulo, AVG(V.puntuacion) AS promedio_valoracion
            FROM receta R
            LEFT JOIN valoracion V ON R.receta_id = V.receta_id
            GROUP BY R.titulo
            HAVING AVG(V.puntuacion) > 4;
        `, (err, rows) => {
            if (err) {
                console.error(err.message);
                callback(err);
            } else {
                callback(null, rows);
            }
        });
    }

    /**
     * Obtiene los usuarios con la cantidad de valoraciones que tienen con una puntuación mayor o igual a 4.
     * @static
     * @param {function} callback - La función de retorno de llamada.
     */
    static getUsuariosConCantidadDeValoraciones(callback) {
        connection.query(`
            SELECT U.correo, COUNT(V.valoracion_id) AS cantidad_valoraciones
            FROM usuario U
            JOIN valoracion V ON U.usuario_id = V.usuario_id
            WHERE V.puntuacion >= '4'
            GROUP BY U.correo
            HAVING COUNT(V.valoracion_id) > 1;
        `, (err, rows) => {
            if (err) {
                console.error(err.message);
                callback(err);
            } else {
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
