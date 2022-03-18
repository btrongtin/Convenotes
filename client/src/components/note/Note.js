import React from 'react';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import ActionButtons from './ActionButtons';
import Todos from './todos/Todos';

function Note({
  note: { _id, title, description, priority, todos, color },
  showUpdateNoteModal,
  setShowUpdateNoteModal,
}) {
  // THIS SECTION IS FOR FEATURE: SELECT COLOR (IN THEME PALETTE) FOR NOTE
  // const style = getComputedStyle(document.body);
  // const themeColor = variantArr.map((colorName) => {
  //   return style.getPropertyValue(`--bs-${colorName}`);
  // });

  // <Form>
  //   <Form.Label htmlFor="exampleColorInput">Color picker</Form.Label>
  //   <Form.Control
  //     type="color"
  //     id="exampleColorInput"
  //     defaultValue="#563d7c"
  //     title="Choose your color"
  //     list="myPalette"
  //     className="mb-3"
  //   />
  //   <datalist id="myPalette">
  //     <option>#ff0000</option>
  //     {themeColor.map((color) => (
  //       <option>{color}</option>
  //     ))}
  //   </datalist>
  // </Form>;

  return (
    <Card bg={color} text="white" className="mb-2">
      <Card.Header>
        <div className="group-btn">
          <ActionButtons
            _id={_id}
            showUpdateNoteModal={showUpdateNoteModal}
            setShowUpdateNoteModal={setShowUpdateNoteModal}
          />
        </div>
      </Card.Header>
      <Card.Body>
        <Card.Title
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span>{title}</span>
          <Badge
            pill
            bg={
              priority === 'HIGH'
                ? 'danger'
                : priority === 'MEDIUM'
                ? 'warning'
                : 'info'
            }
            style={{ border: '2px solid #fff' }}
          >
            {priority}
          </Badge>
        </Card.Title>
        <Card.Text className="text-limit">{description}</Card.Text>

        <Todos todos={todos} idNote={_id} />
      </Card.Body>
    </Card>
  );
}

export default Note;
