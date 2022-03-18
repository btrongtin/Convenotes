import React, { useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { addNewTodo } from '../../../redux/apiRequest';

function AddTodo({ idNote }) {
  const dispatch = useDispatch();
  const [todoTitle, setTodoTitle] = useState('');

  const inputRef = useRef();

  const onChangeNewTodoForm = (e) => {
    setTodoTitle(e.target.value);
  };
  const handleAddNewTodo = (e) => {
    e.preventDefault();
    addNewTodo(todoTitle, idNote, dispatch);
    setTodoTitle('');
    inputRef.current.focus();
  };
  return (
    <Form onSubmit={handleAddNewTodo}>
      <Form.Group>
        <InputGroup className="mb-2">
          <Form.Control
            ref={inputRef}
            type="text"
            placeholder="Add new todo"
            name="todo-title"
            aria-describedby="todo-title-help"
            value={todoTitle}
            onChange={onChangeNewTodoForm}
          />
          <Button variant="primary" type="submit">
            Add
          </Button>
        </InputGroup>
      </Form.Group>
    </Form>
  );
}

export default AddTodo;
