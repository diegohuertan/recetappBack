const mongoose = require('mongoose');

// Define el esquema para la colección "ingredientes"
const ingredienteSchema = new mongoose.Schema({
  nombre: String,
  cantidad: String,
});


const utensilioSchema = new mongoose.Schema({
    nombre: String,
    });

// Define el esquema para la colección "valoraciones"
const valoracionSchema = new mongoose.Schema({
  Receta_id: String,
  usuario: { usuario_id: Number, correo: String },
  comentario: String,
  puntuacion: Number,
});



// Define el esquema para la colección "recetas"
const recetaSchema = new mongoose.Schema({
  titulo: String,
  descripcion: String,
  imagen: String,
  ingredientes: [{nombre: String}], // Esto crea una relación con la colección "ingredientes"
  valoraciones: [valoracionSchema], // Esto crea una relación con la colección "valoraciones"
  utensilios: [{nombre: String}],
  procedimientos: [{
    Numpaso: Number,
    instruccion: String,
  }], // Esto crea una relación con la colección "procedimientos"
  usuario : {
    usuario_id: Number,
    correo: String
    
  }, // Esto crea una relación con la colección "usuarios"

});




// Crea los modelos a partir de los esquemas
const Ingrediente = mongoose.model('Ingrediente', ingredienteSchema);
const Valoracion = mongoose.model('Valoracion', valoracionSchema);
const Receta = mongoose.model('Receta', recetaSchema);
const Utensilio = mongoose.model('Utensilio', utensilioSchema);

module.exports = { Ingrediente, Valoracion,Utensilio, Receta }