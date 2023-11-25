const connection = require('../database/connection');
const bcrypt = require('bcrypt');
const saltRounds = 5;
const jwt = require('jsonwebtoken');


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
 
static validar(correo, contraseña , callback) {
    connection.query(
        'SELECT usuario_id, contraseña FROM usuario WHERE correo = ?',
        [correo],
        (error, results) => {
            if (error) {
                console.error('Error al realizar la consulta:', error);
                callback(error, null); // Llama al callback con el error
            } else if (results.length > 0) {
                    
                    bcrypt.compare(contraseña, results[0].contraseña, function(err, result) {
                        if (result == true) {            
                            const token = jwt.sign({ usuario_id: results[0].usuario_id, correo: correo }, 'clavesita', { expiresIn: '1h' });                        callback(null, { success: true, message: 'Inicio de sesión exitoso token de sesion creado' ,token: token});
                        console.log(result)


                    } else {
                        callback(null, { success: false, message: 'Credenciales de inicio de sesión no válidas' });
                        

                    }
                });
            
            } else {
                callback(null, { success: false, message: 'Credenciales de inicio de sesión no válidas' });
                
            }
        }
    );
}   

static ObtenerUsuarioPorjwt(token, callback) {

    jwt.verify(token, 'clavesita', function(err, decoded) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, decoded);
        }
    });

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