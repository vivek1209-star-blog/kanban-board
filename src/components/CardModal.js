import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const CardModal = ({ show, onHide, onSave, onDelete, card }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('todo');

  useEffect(() => {
    if (card) {
      setTitle(card.title);
      setDescription(card.description);
      setStatus(card.status);
    } else {
      setTitle('');
      setDescription('');
      setStatus('todo');
    }
  }, [card]);

  const handleSubmit = () => {
    if (!title.trim() || description.length < 25) {
        alert('Title must not be empty and description must be at least 25 characters long.');
        return;
    }
    onSave({
        id: card ? card.id : Date.now(),
        title,
        description,
        status
    });
};


  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{card ? 'Edit Card' : 'Add Card'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Enter title" value={title} onChange={e => setTitle(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Label>Status</Form.Label>
            <Form.Select value={status} onChange={e => setStatus(e.target.value)}>
              <option value="todo">To Do</option>
              <option value="inProgress">In Progress</option>
              <option value="done">Done</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
        {card && (
          <Button variant="danger" onClick={() => onDelete(card)}>
            Delete
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default CardModal;
