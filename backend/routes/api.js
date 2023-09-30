const express = require('express');
const router = express.Router();
const recetaController = require('../controllers/recetaController')
const usersController = require('../controllers/usersController')


router.get('/recetas', recetaController.getAllrecetas);
router.post('/crearRecetas', recetaController.createReceta);
router.get('/usuarios', usersController.getAllusuarios );
router.post('/validarsesion', usersController.validarUser);




module.exports = router;