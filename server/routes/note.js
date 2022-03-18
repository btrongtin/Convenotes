const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const noteController = require('../controllers/note');

// @route GET api/posts
// @desc Get posts
// @access Private
router.get('/', verifyToken, noteController.getNotes);

//@route POST api/posts
//@desc Create post
//@access Private
router.post('/', verifyToken, noteController.createNote);

// @route PUT api/posts
// @desc Update post
// @access Private
router.put('/:id', verifyToken, noteController.updateNote);

// @route POST api/note
// @desc add new todo into a note
// @access Private
router.post('/:id/', verifyToken, noteController.addTodo);

// @route DELETE api/posts
// @desc Delete post
// @access Private
router.delete('/:id', verifyToken, noteController.deleteNote);

// @route put api/notes/idTodo/
// @desc Delete todo in note
// @access Private
router.put('/:id/:idTodo', verifyToken, noteController.deleteTodo);
router.patch('/:id/:idTodo', verifyToken, noteController.toggleStatusTodo);

module.exports = router;
