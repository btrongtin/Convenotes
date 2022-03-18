import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../components/auth/authSlice';
import noteReducer from '../components/note/noteSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  note: noteReducer,
});

export default rootReducer;
