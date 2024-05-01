import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const CardModal = ({ show, onHide, onSave, card }) => {
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
    // Title validation: should only contain alphabets and spaces
    if (!/^[A-Za-z\s]+$/.test(title)) {
      alert('Title must contain only alphabets and spaces.');
      return;
    }


    // Description validation: should be at least 25 characters long
    if (description.length < 25) {
      alert('Description must be at least 25 characters long.');
      return;
    }

    // If card is being edited
    if (card) {
      // If validations pass, proceed to save the edited card
      onSave({
        id: card.id,
        title,
        description,
        status
      });
    } else {
      // If card is being added
      // Proceed to save the new card
      onSave({
        id: Date.now(),
        title,
        description,
        status
      });
    }

    onHide(); // Close modal after saving
  };


  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{card ? 'Edit Card' : 'Add Card'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Enter title" value={title} onChange={e => setTitle(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
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
        <Button variant="primary" onClick={handleSubmit}>Save Changes</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CardModal;
