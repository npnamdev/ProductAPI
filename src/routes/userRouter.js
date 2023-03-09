const express = require('express');
const router = express.Router();

const {
    getAllUserController,
    createUserController,
    updateUserController,
    deleteUserController,
    getAUserController,
    loginController,
    logoutController
} = require('../controllers/userController');




router.get('/users', getAllUserController);

router.get('/users/:id', getAUserController);

router.post('/users', createUserController);

router.put('/users/:id', updateUserController);

router.delete('/users/:id', deleteUserController);

router.post('/login', loginController);

router.post('/logout', logoutController);

module.exports = router;