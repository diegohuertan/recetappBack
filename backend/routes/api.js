const express = require('express');
const router = express.Router();


// Ruta para obtener todos los contactos
app.get('/recetas', (req, res) => {
    // Realiza una consulta a la base de datos para obtener las recetas
    connection.query('SELECT * FROM receta', (error, results) => {
      if (error) {
        console.error('Error al realizar la consulta:', error);
        res.json({ success: false, message: 'Error en el servidor' });
      } else {
        // Envía los resultados de la consulta en formato JSON
        res.json({ success: true, recetas: results });
      }
    });
  });
  

module.exports = router;