import { createSlice } from '@reduxjs/toolkit';

const noteSlice = createSlice({
  name: 'note',
  initialState: {
    note: null, //use to get note to edit
    notes: [],
    notesLoading: true,
  },
  reducers: {
    noteLoadedSuccess: (state, action) => {
      state.notes = action.payload;
      state.notesLoading = false;
    },
    noteLoadedFail: (state) => {
      state.notes = [];
      state.notesLoading = false;
    },
    addNote: (state, action) => {
      state.notes.push(action.payload);
    },
    deleteNote: (state, action) => {
      state.notes = state.notes.filter((note) => note._id !== action.payload);
    },
    updateNote: (state, action) => {
      const newNotes = state.notes.map((note) =>
        note._id === action.payload._id ? action.payload : note
      );
      state.notes = newNotes;
    },
    findNote: (state, action) => {
      state.note = action.payload;
    },
    addTodo: (state, action) => {
      //payload là nguyên cái note sau khi thêm 1 todo
      const newNotes = state.notes.map((note) =>
        note._id === action.payload._id ? action.payload : note
      );
      state.notes = newNotes;
    },
    deletedTodo: (state, action) => {
      //payload là nguyên cái note sau khi xóa 1 todo
      const newNotes = state.notes.map((note) =>
        note._id === action.payload._id ? action.payload : note
      );
      state.notes = newNotes;
    },
    toggleTodo: (state, action) => {
      const newNotes = state.notes.map((note) =>
        note._id === action.payload._id ? action.payload : note
      );
      state.notes = newNotes;
    },
  },
});

export const {
  noteLoadedSuccess,
  noteLoadedFail,
  addNote,
  deleteNote,
  updateNote,
  findNote,
  addTodo,
  deletedTodo,
  toggleTodo,
} = noteSlice.actions;

export default noteSlice.reducer;
