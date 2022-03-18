import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNoteSelector } from '../../redux/selectors';
import { updateOneNote } from '../../redux/apiRequest';

const UpdateNoteModal = ({ showUpdateNoteModal, setShowUpdateNoteModal }) => {
  // Contexts
  //   const {
  //     postState: { post },
  //     showUpdatePostModal,
  //     setShowUpdatePostModal,
  //     updatePost,
  //     setShowToast,
  //   } = useContext(PostContext);

  // State
  const note = useSelector(getNoteSelector);
  const dispatch = useDispatch();
  const [updatedNote, setUpdatedNote] = useState(note);

  useEffect(() => setUpdatedNote(note), [note]); //khi người dùng chọn note khác => setupdated note

  const { title, description, priority } = updatedNote;

  const onChangeUpdatedNoteForm = (event) =>
    setUpdatedNote({ ...updatedNote, [event.target.name]: event.target.value });

  const closeDialog = () => {
    setUpdatedNote(note);
    setShowUpdateNoteModal(false);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const { success, message } = await updateOneNote(updatedNote, dispatch);
    setShowUpdateNoteModal(false);
    // setShowToast({ show: true, message, type: success ? 'success' : 'danger' });
  };

  return (
    <Modal show={showUpdateNoteModal} onHide={closeDialog}>
      <Modal.Header closeButton>
        <Modal.Title>Making progress?</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Title"
              name="title"
              required
              aria-describedby="title-help"
              value={title}
              onChange={onChangeUpdatedNoteForm}
            />
            <Form.Text id="title-help" muted>
              Required
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Description"
              name="description"
              value={description}
              onChange={onChangeUpdatedNoteForm}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              as="select"
              value={priority}
              name="priority"
              onChange={onChangeUpdatedNoteForm}
            >
              <option value="LOW">LOW</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="HIGH">HIGH</option>
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDialog}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default UpdateNoteModal;
