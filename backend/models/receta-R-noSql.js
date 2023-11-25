const mongoose = require('mongoose');

// Define el esquema para la colección "ingredientes"
const ingredienteSchema = new mongoose.Schema({
  nombre: String,
  cantidad: String,
});

// Define el esquema para la colección "procedimientos"
const procedimientoSchema = new mongoose.Schema({
  paso: Number,
  descripcion: String,
});

// Define el esquema para la colección "usuarios"
const usuarioSchema = new mongoose.Schema({
  nombre: String,
  email: String,
});

const utensilioSchema = new mongoose.Schema({
    nombre: String,
    });

// Define el esquema para la colección "valoraciones"
const valoracionSchema = new mongoose.Schema({
    Receta_id: Number,
    usuario_id: Number,
    comentario: String,
    puntuacion: Number,
  });


// Define el esquema para la colección "recetas"
const recetaSchema = new mongoose.Schema({
  titulo: String,
  descripcion: String,
  imagen: String,
  ingredientes: [ingredienteSchema], // Esto crea una relación con la colección "ingredientes"
  valoraciones: [valoracionSchema], // Esto crea una relación con la colección "valoraciones"
  utensilios: [utensilioSchema],
  procedimientos: [procedimientoSchema], // Esto crea una relación con la colección "procedimientos"
  utensilios: [utensilioSchema], 
  usuario_id: Number, // Esto crea una relación con la colección "usuarios"

});



// Crea los modelos a partir de los esquemas
const Ingrediente = mongoose.model('Ingrediente', ingredienteSchema);
const Valoracion = mongoose.model('Valoracion', valoracionSchema);
const Procedimiento = mongoose.model('Procedimiento', procedimientoSchema);
const Usuario = mongoose.model('Usuario', usuarioSchema);
const Receta = mongoose.model('Receta', recetaSchema);
const Utensilio = mongoose.model('Utensilio', utensilioSchema);

module.exports = { Ingrediente, Valoracion, Procedimiento,Utensilio, Usuario, Receta };