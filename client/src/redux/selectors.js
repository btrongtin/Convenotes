export const loginUserSelector = (state) => state.auth.user.username;
export const authLoadingSelector = (state) => state.auth.authLoading;
export const isAuthSelector = (state) => state.auth.isAuthenticated;
export const getNotesSelector = (state) => state.note.notes;
export const getNoteSelector = (state) => state.note.note; //lấy 1 cái note đang được chọn
export const notesLoadingSelector = (state) => state.note.notesLoading;
