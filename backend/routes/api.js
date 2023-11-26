const express = require('express');
const router = express.Router();
const recetaController = require('../controllers/recetaController')
const usersController = require('../controllers/usersController')
const valoracionController = require ('../controllers/valoracionController')
const ingredienteController = require ('../controllers/ingredienteController')
const instruccionController = require('../controllers/instruccionController');
const recetaNoSqlController = require('../controllers/nosql/recetanosqlcontroller');

//rutas recetas
router.get('/recetas', recetaNoSqlController.getAllrecetas);
router.post('/filtrarId', recetaNoSqlController.filterByreceta_id);
router.post('/filtrarTitulo', recetaController.filterBytitulo);
router.post('/filtrarUtensilio', recetaController.filterByutensilio);
router.delete('/borrarReceta', recetaController.deleterecetaByid);
router.post('/crearRecetassql', recetaController.createReceta);
router.get('/getRecetasConIngredientesYValoracionPromedio', recetaController.getRecetasConIngredientesYValoracionPromedio);
router.get('/getRecetasConValoracionPromedioPorCorreo', recetaController.getRecetasConValoracionPromedioPorCorreo);
router.get('/getRecetasConCantidadDeIngredientes', recetaController.getRecetasConCantidadDeIngredientes);
router.get('/getRecetasConPromedioValoracion', recetaController.getRecetasConPromedioValoracion);
router.get('/getUsuariosConCantidadDeValoraciones', recetaController.getUsuariosConCantidadDeValoraciones);   
router.post('/crearReceta', recetaNoSqlController.createReceta);
router.put('/actualizarReceta/:receta_id', recetaNoSqlController.updateReceta);


//rutas usuario
router.post('/obtenerUsuario', usersController.obtenerUser);
router.get('/usuarios', usersController.getAllusuarios );
router.get('/getbyCorreo',usersController.getUserbyCorreo );
router.post('/validarsesion', usersController.validarUser);
router.post('/crearUsuario', usersController.createUser);
router.post('/crearUsuarioNoSql', recetaNoSqlController.createUsuario);
router.post('/validarCorreo',usersController.validarEmail);

// Ruta para obtener todos los utensilios
router.get('/utensilios', recetaNoSqlController.getAllUtensilios);


//rutas valoracion
router.get('/valoraciones', valoracionController.getAllval);
router.get('/valoracionReceta/:id',valoracionController.getValRid);//valoraciones segun id receta
router.get('/valoracionUsuario/:id',valoracionController.getValUid);//valoraciones segun id usuario
router.post('/crearValoracionsql',valoracionController.addVal);// añadir valoracion
router.delete('/borrarValoracion/:id',valoracionController.delValId);// borrar valoracion
router.put('/editarValoracion',valoracionController.modVal);// editar valoracion
router.post('/crearValoracion', recetaNoSqlController.createValoracion);


//rutas Ingrediente
router.get('/ingredientes', recetaNoSqlController.getAllingredientes);
router.post('/crearIngrediente', ingredienteController.createIngredients);
router.delete('/borrarIngrediente', ingredienteController.deleteByIngredienteid);
router.post('/filtrarIngredienteId', ingredienteController.filterByIngrediente_id);
router.post('/filtrarNombre', ingredienteController.filterBynombre);
router.post('/filtrarDescripcion', ingredienteController.filterByDescripcion);
router.post('/filtrarUnidad_medida', ingredienteController.filterByUnidad_medida);
router.post('/crearIngredienteNoSql', recetaNoSqlController.createIngrediente);


//rutas Intruccion
router.get('/instruccion', instruccionController.getInstrucciones);
router.post('/crearInstruccion', instruccionController.createInstrucciones);
router.delete('/borrarInstruccion', instruccionController.borrarInstrucciones);
router.post('/filtrarInstruccionId', instruccionController.filterByInstruccionId);
router.post('/filtrarRecetaId', instruccionController.filterByRecetaId);
router.post('/filtrarDescripcion', instruccionController.filterByDescripcion);
router.post('/filtrarTip', instruccionController.filterByTip);

router.post('/crearUtensilioNoSql', recetaNoSqlController.createUtensilio);

module.exports = router;