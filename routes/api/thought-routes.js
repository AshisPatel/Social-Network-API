const router = require('express').Router();
const {
    getThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought
} = require('../../controllers/thought-controller');

// /api/thoughts/ router

router
    .route('/')
    .get(getThoughts)
    .post(createThought);

// /api/thoughts/:thoughtId router

router
    .route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

module.exports = router; 