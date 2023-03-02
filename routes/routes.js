var express = require('express');

var userController = require('../src/user/userController');
const router = express.Router();

// ruta para buscar usuario por primer nombre
router.route('/user').get(userController.getUserByFirstNameControllerFunc);
// ruta para actualizar usuario
router.route('/user/:id').put(userController.updateUserByIdControllerFunc);
// ruta para eliminar usuario
router.route('/user/:id').delete(userController.deleteUserByIdControllerFunc);
// ruta para login
router.route('/user/login').post(userController.loginUserControllerFunc);
// ruta para crear usuario
router.route('/user/create').post(userController.createUserControllerFunc);


module.exports = router;
