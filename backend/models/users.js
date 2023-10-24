const connection = require('../database/connection');
const bcrypt = require('bcrypt');
const saltRounds = 5;

class Usuario {
    constructor(usuario_id, correo, contraseña, perfil) {
        this.usuario_id = usuario_id;
        this.correo = correo;
        this.contraseña = contraseña;
        this.perfil = perfil;

    }

    static getAll(callback) {
        connection.query('SELECT * FROM usuario', (err, rows) => {
            if (err) {
                console.error(err.message);
                callback(err);
            } else {
                callback(null, rows);
            }
        });
    }
    static getbyCorreo(correo,callback){
        connection.query('Select usuario_id,correo,perfil from usuario WHERE correo = ?',[correo],
        (error,rows)=>{
            if (error){
                console.error('Error al realizar la consulta: ',error);
                callback(error,null);
            } else{
                callback(null,rows);
            }
        });
    }
    static validar(correo,contraseña, perfil, callback) {
        connection.query(
            'SELECT COUNT(*) AS count FROM usuario WHERE correo = ? AND perfil = ? ',
            [correo, perfil],
            (error, results) => {
                if (error) {
                    console.error('Error al realizar la consulta:', error);
                    callback(error, null); // Llama al callback con el error
                } else {
                    console.log('Results:', results);
                    const count = results[0].count;
                    console.log('Count:', count);
                    if (count == 1) {
                        callback(null, { success: true, message: 'Inicio de sesión exitoso' });
                    } else if (count == 0) {
                        callback(null, { success: false, message: 'Credenciales de inicio de sesión no válidas' });
                    }
                }
            }
        );
    }
    static create(usuarios, callback) {

        bcrypt.hash(usuarios.contraseña, saltRounds, (err, hash) => {
            if (err) {
                console.error(err.message);
                callback(err);
            } else {
                usuarios.contraseña = hash;

                connection.query('INSERT INTO usuario (usuario_id, correo, contraseña, perfil) VALUES (?, ?, ?, ?)',
                    [usuarios.usuario_id, usuarios.correo, usuarios.contraseña, usuarios.perfil],
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
        });
    }

    // Método estático para eliminar un contacto por su rut
    static deleteById(id, callback) {
        connection.query('DELETE FROM usuario WHERE id = ?', [id], (err) => {
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

module.exports = Usuario;