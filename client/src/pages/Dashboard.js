import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Note from '../components/note/Note';
import addIcon from '../assets/plus-circle-fill.svg';
import AddNoteModal from '../components/note/AddNoteModal';
import UpdateNoteModal from '../components/note/UpdateNoteModal';
import { useDispatch, useSelector } from 'react-redux';
import {
  getNoteSelector,
  getNotesSelector,
  notesLoadingSelector,
} from '../redux/selectors';
import { getNotes } from '../redux/apiRequest';
import Spinner from 'react-bootstrap/Spinner';

function Dashboard() {
  const dispatch = useDispatch();
  const notes = useSelector(getNotesSelector);
  const note = useSelector(getNoteSelector);
  const notesLoading = useSelector(notesLoadingSelector);
  const [showAddNoteModal, setShowAddNoteModal] = useState(false);
  const [showUpdateNoteModal, setShowUpdateNoteModal] = useState(false);

  //Start get all note
  useEffect(() => getNotes(dispatch), []);

  let body = null;

  if (notesLoading) {
    body = (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else if (notes.length === 0) {
    body = (
      <>
        <Card className="text-center mx-5 my-5">
          <Card.Header as="h1">Hi </Card.Header>
          <Card.Body>
            <Card.Title>Welcome to Convenotes</Card.Title>
            <Card.Text>
              You don't have any note yet, click the button below to create your
              first note!
            </Card.Text>
            <Button
              className="btn-floating"
              onClick={() => setShowAddNoteModal(true)}
            >
              <img src={addIcon} alt="add post icon" width="60" height="60" />
            </Button>
          </Card.Body>
        </Card>
      </>
    );
  } else {
    body = (
      <>
        <Row className="row mx-auto mt-3">
          {notes.map((note) => (
            <Col className="my-3" lg="3" md="6" xl="3" sm="6" key={note._id}>
              <Note
                note={note}
                setShowUpdateNoteModal={setShowUpdateNoteModal}
              />
            </Col>
          ))}
        </Row>
        <Button
          className="btn-floating"
          onClick={() => setShowAddNoteModal(true)}
        >
          <img src={addIcon} alt="add post icon" width="60" height="60" />
        </Button>
      </>
    );
  }
  return (
    <>
      {body}
      <AddNoteModal
        showAddNoteModal={showAddNoteModal}
        setShowAddNoteModal={setShowAddNoteModal}
      />
      {note !== null && (
        <UpdateNoteModal
          showUpdateNoteModal={showUpdateNoteModal}
          setShowUpdateNoteModal={setShowUpdateNoteModal}
        />
      )}
    </>
  );
}

export default Dashboard;
