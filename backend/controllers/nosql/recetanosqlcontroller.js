const { Receta, Ingrediente, Valoracion ,Procedimiento, Utensilio, Usuario } = require('../../models/receta-R-noSql');



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
    const { titulo, descripcion, ingredientes, valoraciones, utensilios , procedimientos, correo } = req.body;

    try {
        // Buscar los ingredientes y utensilios en la base de datos
        const dbIngredientes = await Promise.all(ingredientes.map(async (ingrediente) => {
            return await Ingrediente.findOne({ nombre: ingrediente.nombre });
        }));

        const dbUtensilios = await Promise.all(utensilios.map(async (utensilio) => {
            return await Utensilio.findOne({ nombre: utensilio.nombre });
        }));

        const dbValoraciones = await Promise.all(valoraciones.map(async (valoracion) => {
            return await Valoracion.findOne({ Receta: valoracion.receta_id });
        }));


        // Crear la nueva receta
        const newReceta = new Receta({
            titulo,
            descripcion,
            ingredientes: dbIngredientes,
            utensilios: dbUtensilios,
            valoraciones: dbValoraciones,
            procedimientos: procedimientos.map(procedimiento => new Procedimiento(procedimiento)),
            correo,
        });

        const receta = await newReceta.save();
        res.status(201).json(receta);

    } catch (err) {
        console.error(err);
        res.status(500).send('Error en el servidor');
    }
};
// Controlador para filtrar por receta_id
exports.filterByreceta_id = async (req, res) => {
    const { receta_id } = req.body;

    try {
        const recetas = await Receta.find({ receta_id });
        res.status(200).json(recetas);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
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
    const { Receta_id,usuario_id, comentario,puntuacion } = req.body;
  
    const newValoracion = new Valoracion({ Receta_id,usuario_id, comentario,puntuacion });
  
    try {
      const valoracion = await newValoracion.save();
      res.status(201).json(valoracion);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error en el servidor');
    }
  };

  // Controlador para obtener todos los utensilios
  exports.getAllUtensilios = async (req, res) => {
    try {
      const utensilios = await Utensilio.find();
      res.json(utensilios);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Error en el servidor');
    }
  };
  
  // Método para crear un nuevo Procedimiento
  exports.createProcedimiento = async (req, res) => {
    const { paso, descripcion } = req.body;
  
    const newProcedimiento = new Procedimiento({ paso, descripcion });
  
    try {
      const procedimiento = await newProcedimiento.save();
      res.status(201).json(procedimiento);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error en el servidor');
    }
  };
  
  // Método para crear un nuevo Usuario
  exports.createUsuario = async (req, res) => {
    const { nombre, email } = req.body;
  
    const newUsuario = new Usuario({ nombre, email });
  
    try {
      const usuario = await newUsuario.save();
      res.status(201).json(usuario);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error en el servidor');
    }
  };
