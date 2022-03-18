import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from '../constant';
import setAuthToken from '../utils/setAuthToken';
import { setAuth } from '../components/auth/authSlice';
import {
  addNote,
  addTodo,
  deletedTodo,
  deleteNote,
  findNote,
  noteLoadedFail,
  noteLoadedSuccess,
  toggleTodo,
  updateNote,
} from '../components/note/noteSlice';
import axios from 'axios';
import { getNotesSelector } from './selectors';

//Authenticate user
export const loadUser = async (dispatch) => {
  if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
    setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
  }
  try {
    const response = await axios.get(`${apiUrl}/auth`);
    if (response.data.success) {
      dispatch(
        setAuth({
          isAuthenticated: true,
          user: response.data.user,
        })
      );
    }
  } catch (error) {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
    setAuthToken(null); //xóa token trong default header
    dispatch(
      setAuth({
        isAuthenticated: false,
        user: null,
      })
    );
  }
};
// useEffect(() => loadUser(), []);

//Login
export const loginUser = async (userForm, dispatch) => {
  //userForm : {username, password}
  try {
    const response = await axios.post(`${apiUrl}/auth/login`, userForm);
    if (response.data.success)
      localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken);

    await loadUser(dispatch);

    return response.data;
  } catch (error) {
    // error từ server
    if (error.response.data) return error.response.data;
    //error trong quá trình gửi request
    else return { success: false, message: error.message };
  }
};

// Register
export const registerUser = async (userForm, dispatch) => {
  try {
    const response = await axios.post(`${apiUrl}/auth/register`, userForm);
    if (response.data.success)
      localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken);

    await loadUser(dispatch);

    return response.data;
  } catch (error) {
    if (error.response.data) return error.response.data;
    else return { success: false, message: error.message };
  }
};

// Add note
export const addNewNote = async (newNote, dispatch) => {
  try {
    const response = await axios.post(`${apiUrl}/notes`, newNote);
    if (response.data.success) {
      dispatch(addNote(response.data.note));
      return response.data;
    }
  } catch (error) {
    return error.response.data // server có trả về lỗi có chủ đích
      ? error.response.data
      : { success: false, message: 'Server error' };
  }
};

export const getNotes = async (dispatch) => {
  try {
    const response = await axios.get(`${apiUrl}/notes`);
    if (response.data.success) {
      dispatch(noteLoadedSuccess(response.data.notes));
    }
  } catch (error) {
    dispatch(noteLoadedFail());
  }
};

export const deleteOneNote = async (id, dispatch) => {
  try {
    const response = await axios.delete(`${apiUrl}/notes/${id}`);
    if (response.data.success) {
      dispatch(deleteNote(id));
    }
  } catch (error) {
    console.log(error);
  }
};

// Update note
export const updateOneNote = async (updatedNote, dispatch) => {
  try {
    const response = await axios.put(
      `${apiUrl}/notes/${updatedNote._id}`,
      updatedNote
    );
    if (response.data.success) {
      dispatch(updateNote(response.data.note));
      return response.data;
    }
  } catch (error) {
    return error.response.data
      ? error.response.data
      : { success: false, message: 'Server error' };
  }
};

// export const chooseNote = (noteId, dispatch, selector) => {
//   const notes = selector(getNotesSelector);
//   const note = notes.find((note) => note._id === noteId);
//   dispatch(findNote(note));
// };

export const addNewTodo = async (title, idNote, dispatch) => {
  try {
    const response = await axios.post(`${apiUrl}/notes/${idNote}`, {
      title,
    });
    if (response.data.success) {
      dispatch(addTodo(response.data.note));
    }
  } catch (error) {
    return error.response.data
      ? error.response.data
      : { success: false, message: 'Server error' };
  }
};

export const deleteTodo = async (idNote, idTodo, dispatch) => {
  try {
    const response = await axios.put(`${apiUrl}/notes/${idNote}/${idTodo}`);
    if (response.data.success) {
      dispatch(deletedTodo(response.data.note));
    }
  } catch (error) {
    return error.response.data
      ? error.response.data
      : { success: false, message: 'Server error' };
  }
};

export const toggleStatusTodo = async (idNote, idTodo, dispatch) => {
  try {
    const response = await axios.patch(`${apiUrl}/notes/${idNote}/${idTodo}`);
    if (response.data.success) {
      dispatch(toggleTodo(response.data.note));
    }
  } catch (error) {
    console.log(error);
    console.log('HUHUHU', error.response);
    // if (error.response.data) return error.response.data;
    // else return { success: false, message: error.message };
  }
};
