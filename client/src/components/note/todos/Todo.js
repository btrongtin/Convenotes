import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { deleteTodo, toggleStatusTodo } from '../../../redux/apiRequest';
import { useDispatch } from 'react-redux';

function Todo({ todo, idNote }) {
  const dispatch = useDispatch();
  const handleDeleteTodo = (e) => {
    deleteTodo(idNote, todo._id, dispatch);
  };
  const handleToggleTodo = () => {
    toggleStatusTodo(idNote, todo._id, dispatch);
  };

  return (
    <ListGroup.Item
      action
      as="li"
      variant="warning"
      className="todo"
      onClick={handleToggleTodo}
      style={{ padding: '1rem 0.5rem !important' }}
    >
      <span className={todo.completed ? 'completed-item' : ''}>
        {todo.title}
      </span>

      <Button variant="danger" onClick={handleDeleteTodo} size="sm">
        Delete
      </Button>
    </ListGroup.Item>
  );
}

export default Todo;
