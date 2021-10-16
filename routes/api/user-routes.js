const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require('../../controllers/user-controller');

// /api/users/ router

router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

// /api/users/:userId router

router
    .route('/:userId')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser)


module.exports = router; 
