import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNewNote } from '../../redux/apiRequest';

const AddPostModal = (props) => {
  const variantArr = [
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info',
  ];
  let randomCardBg = () =>
    variantArr[Math.floor(Math.random() * variantArr.length)];

  const dispatch = useDispatch();
  const { showAddNoteModal, setShowAddNoteModal } = props;
  const [newNote, setNewNote] = useState({
    title: '',
    description: '',
    priority: 'MEDIUM',
    color: 'danger',
  });

  const { title, description, priority } = newNote;

  const onChangeNewNoteForm = (event) =>
    setNewNote({ ...newNote, [event.target.name]: event.target.value }); //computed property

  const closeDialog = () => {
    resetAddNoteData();
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const { success, message } = await addNewNote(newNote, dispatch);
    resetAddNoteData();
    // setShowToast({ show: true, message, type: success ? 'success' : 'danger' });
  };

  const resetAddNoteData = () => {
    setNewNote({ title: '', description: '', priority: 'MEDIUM' });
    setShowAddNoteModal(false);
  };

  return (
    <Modal show={showAddNoteModal} onHide={closeDialog}>
      <Modal.Header closeButton>
        <Modal.Title>Darling, what is your note?</Modal.Title>
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
              onChange={onChangeNewNoteForm}
            />
            <Form.Text id="title-help" muted>
              Required
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              as="textarea"
              rows={3} // cao 3 row
              placeholder="Description"
              name="description"
              value={description}
              onChange={onChangeNewNoteForm}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              as="select"
              value={priority}
              name="priority"
              onChange={onChangeNewNoteForm}
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
          <Button
            variant="primary"
            type="submit"
            onClick={() => setNewNote({ ...newNote, color: randomCardBg() })}
          >
            LearnIt!
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddPostModal;
