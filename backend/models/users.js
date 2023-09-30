const connection = require('../database/connection');


class Usuario {
    constructor(id,correo, contraseña, perfil) {
        this.id = id;
        this.correo = correo;
        this.contraseña = contraseña;
        this.perfil = perfil;
       
    }

    static getAll(callback) {
        connection.query('SELECT * FROM usuarios', (err, rows) => {
            if (err) {
                console.error(err.message);
                callback(err);
            } else {
                callback(null, rows);
            }
        });
    }

    static validar(usuarios, callback) {
        connection.query(
           'SELECT COUNT(*) AS count FROM usuarios WHERE correo = ? AND contraseña = ? AND perfil = ? ',
            [usuarios.correo, usuarios.contraseña, usuarios.perfil],
            (error, results) => {
                if (error) {
                    console.error('Error al realizar la consulta:', error);
                    callback(error, null); // Llama al callback con el error
                } else {
                    const count = results[0].count;
                    console.log('Count:', count);
                    if (count === 1) {
                        callback(null, { success: true, message: 'Inicio de sesión exitoso' });
                    } else {
                        callback(null, { success: false, message: 'Credenciales de inicio de sesión no válidas' });
                    }
                }
            }
        );
    }
    static create(usuarios, callback) {
        connection.query('INSERT INTO usuarios (id,correo, contraseña, perfil) VALUES (?, ?, ?, ?)',
            [usuarios.id,usuarios.correo, usuarios.contraseña, usuarios.perfil],
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
    static deleteById(id, callback) {
        connection.query('DELETE FROM usuarios WHERE id = ?', [id], (err) => {
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