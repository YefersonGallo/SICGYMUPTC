const {Router} = require('express');
const router = Router();
const upload = require('../../libs/storage')

const { getRoutines, deleteRoutine, getRoutine, updateRoutine, createRoutine } = require('../controllers/routine.controller');

router.route('/')
    .get(getRoutines)
    .post(createRoutine, upload.single('image'))

router.route('/:id')
    .get(getRoutine)
    .put(updateRoutine)
    .delete(deleteRoutine)

module.exports = router;