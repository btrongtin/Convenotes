import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import editIcon from '../../assets/pencil.svg';
import deleteIcon from '../../assets/trash.svg';
import { deleteOneNote } from '../../redux/apiRequest';
import { getNotesSelector } from '../../redux/selectors';
import { findNote } from './noteSlice';

const ActionButtons = ({ _id, setShowUpdateNoteModal }) => {
  const dispatch = useDispatch();
  const notes = useSelector(getNotesSelector);
  const handleDeleteNote = () => {
    deleteOneNote(_id, dispatch);
  };
  const selectNote = () => {
    const note = notes.find((note) => note._id === _id);
    dispatch(findNote(note));
    setShowUpdateNoteModal(true);
  };

  return (
    <>
      <Button className="post-button" onClick={selectNote}>
        <img
          src={editIcon}
          className="icon-button"
          alt="edit"
          width="24"
          height="24"
        />
      </Button>
      <Button className="post-button" onClick={handleDeleteNote}>
        <img
          src={deleteIcon}
          className="icon-button"
          alt="delete"
          width="24"
          height="24"
        />
      </Button>
    </>
  );
};

export default ActionButtons;
