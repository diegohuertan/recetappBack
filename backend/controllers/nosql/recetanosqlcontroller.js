const { Receta, Ingrediente, Valoracion, Utensilio } = require('../../models/receta-R-noSql');



// Controlador para obtener todas las recetas
exports.getAllrecetas = async (req, res) => {
    try {
        const recetas = await Receta.find();
        res.json(recetas);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
};



// Método para crear una nueva receta
exports.createReceta = async (req, res) => {
  const { titulo, descripcion, imagen, ingredientes, utensilios, procedimientos, usuario } = req.body;

  try {
    // Crear la nueva receta
    const newReceta = new Receta({
      titulo,
      descripcion,
      imagen,
      ingredientes,
      utensilios,
      valoraciones: [],
      procedimientos,
      usuario: { usuario_id: usuario.usuario_id, correo: usuario.correo },
    });

    // Guardar la receta en la base de datos
    const recetaGuardada = await newReceta.save();

    // Enviar la receta guardada como respuesta
    res.json(recetaGuardada);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error en el servidor');
  }
};// Controlador para filtrar por _id
exports.filterByreceta_id = async (req, res) => {
  const { receta_id } = req.body;

  console.log(receta_id); // Agregar este log para verificar el ID recibido

  try {
    const receta = await Receta.findById(receta_id);
    console.log('Receta encontrada:', receta); // Agregar este log para verificar la receta encontrada

    if (!receta) {
      return res.status(404).json({ msg: 'Receta no encontrada' });
    }
    res.status(200).json(receta);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(404).json({ msg: 'Receta no encontrada' });
    }
    res.status(500).send('Error en el servidor');
  }
};
exports.filterByUsuario= async(req,res) =>{
  const {usuario}= req.body;
  try {
    const recetasEncontradas = await Receta.find({
      usuario: usuario
    });

    res.json(recetasEncontradas);
    console.log("Recetas:",recetasEncontradas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Método para crear un nuevo Ingrediente
exports.createIngrediente = async (req, res) => {
    const { nombre, cantidad } = req.body;
  
    const newIngrediente = new Ingrediente({ nombre, cantidad });
  
    try {
      const ingrediente = await newIngrediente.save();
      res.status(201).json(ingrediente);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error en el servidor');
    }
  };

  // Método para crear un nuevo Utensilo
exports.createUtensilio = async (req, res) => {
    const { nombre } = req.body;
  
    const newUtensilio = new Utensilio({ nombre });
  
    try {
      const utensilio = await newUtensilio.save();
      res.status(201).json(utensilio);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error en el servidor');
    }
  };
  
  // Método para crear una nueva Valoracion
  exports.createValoracion = async (req, res) => {
    const { Receta_id,usuario, comentario,puntuacion } = req.body;
  
    const newValoracion = new Valoracion({ Receta_id,usuario, comentario,puntuacion });
  
    try {
      const valoracion = await newValoracion.save();
      res.status(201).json(valoracion);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error en el servidor');
    }
  };
  // Método para actualizar una Receta con Valoraciones
  exports.updateReceta = async (req, res) => {
    const { receta_id } = req.params;

    try {
      // Buscar todas las valoraciones que coinciden con receta_id
      const valoraciones = await Valoracion.find({ Receta_id: receta_id });

      if (!valoraciones) {
        return res.status(404).json({ msg: 'No se encontraron valoraciones para esta receta' });
      }

      // Buscar la receta
      const receta = await Receta.findById(receta_id);
      if (!receta) {
        return res.status(404).json({ msg: 'Receta no encontrada' });
      }

    // Agregar las valoraciones a la lista de valoraciones de la receta
    receta.valoraciones = valoraciones.map(valoracion => valoracion._id);

    // Guardar la receta actualizada en la base de datos
    const recetaActualizada = await receta.save();

    // Enviar la receta actualizada como respuesta
    res.status(200).json(recetaActualizada);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error en el servidor');
  }
};
  // Controlador para obtener todos los utensilios
  exports.getAllUtensilios = async (req, res) => {
    try {
      const utensilios = await Utensilio.find({}, 'nombre');
      res.json(utensilios);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Error en el servidor');
    }
  };

  // Controlador para obtener todas las ingredientes
  exports.getAllingredientes = async (req, res) => {
    try {
      const ingredientes = await Ingrediente.find({}, 'nombre');
      res.json(ingredientes);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Error en el servidor');
    }
  };

