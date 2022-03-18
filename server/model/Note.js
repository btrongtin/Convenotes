const mongoose = require('mongoose');
const Todo = require('./Todo');
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  priority: {
    type: String,
    enum: ['HIGH', 'MEDIUM', 'LOW'],
  },
  user: {
    type: Schema.Types.ObjectId, // nối tới object id
    ref: 'user', // nối tới collection user
  },
  todos: {
    type: [Todo],
    default: [],
  },
  color: {
    //color type of bootstrap
    type: String,
    enum: ['primary', 'secondary', 'success', 'danger', 'warning', 'info'],
    default: 'info',
  },
});

module.exports = mongoose.model('note', NoteSchema);
