const Note = require('../model/Note');

class NoteController {
  getNotes = async (req, res) => {
    try {
      const notes = await Note.find({ user: req.userId }).populate('user', [
        'username',
      ]);
      res.json({ success: true, notes });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: 'Internal server error' });
    }
  };

  //@route POST api/posts
  //@desc Create post
  //@access Private
  createNote = async (req, res) => {
    const { title, description, priority, color } = req.body;

    if (!title)
      return res
        .status(400)
        .json({ success: false, message: 'Title is required' });

    try {
      const newNote = new Note({
        title,
        description,
        priority: priority || 'MEDIUM',
        user: req.userId,
        color: color || 'info',
      });

      await newNote.save();

      res.json({ success: true, message: 'Happy note added!', note: newNote });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: 'Internal server error' });
    }
  };

  // @route PUT api/posts
  // @desc Update post
  // @access Private
  updateNote = async (req, res) => {
    const { title, description, priority } = req.body;

    // Simple validation
    if (!title)
      return res
        .status(400)
        .json({ success: false, message: 'Title is required' });

    try {
      let updatedNote = {
        title,
        description: description || '',
        priority: priority || 'MEDIUM',
      };

      //điều kiện để update
      const noteUpdateCondition = { _id: req.params.id, user: req.userId };

      updatedNote = await Note.findOneAndUpdate(
        noteUpdateCondition,
        updatedNote,
        { new: true } // sau khi update xong trả lại updatedpost
      );

      // User not authorised to update post or post not found
      //gửi request từ đâu đó, tài khoản ko có quyền update
      if (!updatedNote)
        return res.status(401).json({
          success: false,
          message: 'Note not found or user not authorised',
        });

      res.json({
        success: true,
        message: 'Excellent progress!',
        note: updatedNote,
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: 'Internal server error' });
    }
  };

  addTodo = async (req, res) => {
    const { title } = req.body;

    // Simple validation
    if (!title)
      return res
        .status(400)
        .json({ success: false, message: "Todo's title is required" });

    try {
      //điều kiện để update => lấy ra note => lấy todos => push new todo => save
      const noteUpdateCondition = { _id: req.params.id, user: req.userId };

      const updatedNote = await Note.findOne(noteUpdateCondition);
      updatedNote.todos.push({
        title,
      });
      const updated = await updatedNote.save();

      // User not authorised to update post or post not found
      //gửi request từ đâu đó, tài khoản ko có quyền update
      if (!updated)
        return res.status(401).json({
          success: false,
          message: 'Note not found or user not authorised',
        });

      res.json({
        success: true,
        message: 'Add todo success!',
        note: updated,
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: 'Internal server error' });
    }
  };

  // @route DELETE api/notes
  // @desc Delete post
  // @access Private
  deleteTodo = async (req, res) => {
    try {
      const todoDeleteCondition = {
        _id: req.params.id,
        user: req.userId,
      };

      const noteContainTodo = await Note.findOne(todoDeleteCondition);
      if (
        !noteContainTodo.todos.some((todo) => todo._id == req.params.idTodo)
      ) {
        return res.status(401).json({
          success: false,
          message: 'todo not found or user not authorised',
        });
      }
      noteContainTodo.todos = noteContainTodo.todos.filter(
        (todo) => todo._id != req.params.idTodo
      );

      const noteAfterRemoveTodo = await noteContainTodo.save();
      // User not authorised or todo not found
      if (!noteAfterRemoveTodo)
        return res.status(401).json({
          success: false,
          message: 'todo not found or user not authorised',
        });

      res.json({ success: true, note: noteAfterRemoveTodo });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: 'Internal server error' });
    }
  };

  // @route DELETE api/posts
  // @desc Delete post
  // @access Private
  deleteNote = async (req, res) => {
    try {
      const noteDeleteCondition = { _id: req.params.id, user: req.userId };
      const deletedNote = await Note.findOneAndDelete(noteDeleteCondition);

      // User not authorised or Note not found
      if (!deletedNote)
        return res.status(401).json({
          success: false,
          message: 'Note not found or user not authorised',
        });

      res.json({ success: true, note: deletedNote });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: 'Internal server error' });
    }
  };

  // @route PATCH api/posts
  // @desc toggle completed of todo
  // @access Private
  toggleStatusTodo = async (req, res) => {
    try {
      //điều kiện để update
      const todoUpdateCondition = { _id: req.params.id, user: req.userId };
      const noteContainTodo = await Note.findOne(todoUpdateCondition);

      noteContainTodo.todos.map((todo) =>
        todo._id == req.params.idTodo
          ? (todo.completed = !todo.completed)
          : todo
      ); //Completed = false => true, Completed = any value => false

      const noteAfterToggleStatus = await noteContainTodo.save();
      // User not authorised or todo not found
      if (!noteAfterToggleStatus)
        return res.status(401).json({
          success: false,
          message: 'Toggle status todo failed',
        });

      res.json({ success: true, note: noteAfterToggleStatus });
      // res.json({ success: true });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: 'Internal server error' });
    }
  };
}

module.exports = new NoteController();
