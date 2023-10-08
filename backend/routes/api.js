const express = require('express');
const router = express.Router();
const recetaController = require('../controllers/recetaController')
const usersController = require('../controllers/usersController')
const valoracionController = require ('../controllers/valoracionController')

router.get('/recetas', recetaController.getAllrecetas);
router.post('/crearRecetas', recetaController.createReceta);
router.get('/usuarios', usersController.getAllusuarios );
router.post('/validarsesion', usersController.validarUser);


//rutas valoracion
router.get('/valoraciones', valoracionController.getAllval);
router.get('/valoracionReceta/:id',valoracionController.getValRid);//valoraciones segun id receta
router.get('/valoracionUsuario/:id',valoracionController.getValUid);//valoraciones segun id usuario
router.post('/crearValoracion',valoracionController.addVal);// añadir valoracion
router.delete('/borrarValoracion/:id',valoracionController.delValId);// borrar valoracion
router.put('/editarValoracion',valoracionController.modVal);// editar valoracion



module.exports = router;