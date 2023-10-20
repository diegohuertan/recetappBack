const express = require('express');
const router = express.Router();
const recetaController = require('../controllers/recetaController')
const usersController = require('../controllers/usersController')
const valoracionController = require ('../controllers/valoracionController')

router.get('/recetas', recetaController.getAllrecetas);
router.post('/filtrarId', recetaController.filterByreceta_id);
router.post('/filtrarTitulo', recetaController.filterBytitulo);
router.post('/filtrarUtensilio', recetaController.filterByutensilio);
router.post('/crearRecetas', recetaController.createReceta);
router.get('/usuarios', usersController.getAllusuarios );
router.post('/validarsesion', usersController.validarUser);
router.post('/crearUsuario', usersController.createUser);



//rutas valoracion
router.get('/valoraciones', valoracionController.getAllval);
router.get('/valoracionReceta/:id',valoracionController.getValRid);//valoraciones segun id receta
router.get('/valoracionUsuario/:id',valoracionController.getValUid);//valoraciones segun id usuario
router.post('/crearValoracion',valoracionController.addVal);// añadir valoracion
router.delete('/borrarValoracion/:id',valoracionController.delValId);// borrar valoracion
router.put('/editarValoracion',valoracionController.modVal);// editar valoracion



module.exports = router;