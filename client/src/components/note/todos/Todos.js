import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import AddTodo from './AddTodo';
import Todo from './Todo';

function Todos({ todos, idNote }) {
  return (
    <>
      <AddTodo idNote={idNote} />
      {todos.length !== 0 && (
        <ListGroup as="ul">
          {todos.map((todo) => (
            <Todo key={todo._id} todo={todo} idNote={idNote} />
          ))}
        </ListGroup>
      )}
    </>
  );
}

export default Todos;
