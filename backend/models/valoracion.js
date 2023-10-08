const connection = require('../database/connection');

class valoracion{
    constructor(usuario_id,receta_id,valoracion_id,comentario,puntuacion){
        this.usuario_id=usuario_id;
        this.receta_id=receta_id;
        this.valoracion_id=valoracion_id;
        this.comentario=comentario;
        this.puntuacion=puntuacion;
    }
    static getAll(callback){
        connection.query('SELECT * FROM valoracion',(err,rows)=>{
            if(err){
                console.error(err.message);
                callback(err);
            } else{
                callback(null,rows);
            }
        });
    }
    static getValbyUid(usuario_id,callback){
        connection.query('SELECT * FROM valoracion WHERE usuario_id = ?',[usuario_id],
        (error,rows)=>{
            if(error){
                console.error('Error al realizar la consulta :',error);
                callback(error,null);
            }else{
                callback(null,rows);
            }

        });
    }
    static getValbyRid(receta_id,callback){
        connection.query('SELECT * FROM valoracion WHERE receta_id = ?',[receta_id],
        (error,rows)=>{
            if (error){
                console.error('Error al realizar la consulta :',error);
                callback(error,null);
            }else{
                callback(null,rows);
            }
        });     
    }
    static delValbyid(valoracion_id,callback){
        connection.query('DELETE FROM valoracion WHERE valoracion_id = ?',[valoracion_id],
        (error,rows)=>{
            if(error){
                console.error('Error al borrar valoracion',error);
                callback(error,null);
            } else{
                console.log('Valoracion borrada exitosamente.');
                callback(null,rows);
            }
        });
    }
    static addVal(usuario_id,receta_id,comentario,puntuacion,callback){
        connection.query('INSERT INTO valoracion(usuario_id,receta_id,comentario,puntuacion) VALUES (?,?,?,?)',[usuario_id,receta_id,comentario,puntuacion],
        (error,rows)=>{
            if(error){
                console.error('Error al agregar valoracion',error);
                callback(error,null);
            } else {
                console.log('Valoracion agregada exitosamente.');
                callback(null,rows);

            }
        });
    }
    static modVal(valoracion_id,usuario_id,receta_id,newCom,newPun){
        connection.query('UPDATE valoracion SET comentario = ?, puntuacion = ? WHERE valoracion_id = ? AND usuario_id = ? AND receta_id = ?',
        [newCom,newPun,valoracion_id,usuario_id,receta_id],
        (error,rows)=>{
            if(error){
                console.error('Error al modificar valoracion',error);
                callback(error,null);
            } else {
                console.log('Valoracion modificada exitosamente.');
                callback(null,rows);
            }
        });
    }
}
module.exports= valoracion;