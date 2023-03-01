const express = require('express');
const router = express.Router();

const {
    getAllUserController,
    createUserController,
    updateUserController,
    deleteUserController,
    getAUserController,
    filterUserByRoleController,
    searchUserByEmailController
} = require('../controllers/userController');



router.get('/', getAllUserController);

router.get('/:id', getAUserController);

router.post('/', createUserController);

router.put('/:id', updateUserController);

router.delete('/:id', deleteUserController);

router.post('/filter', filterUserByRoleController);

router.post('/search', searchUserByEmailController);


module.exports = router;