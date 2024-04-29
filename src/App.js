import React, { useState, useEffect } from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import Column from './components/Column';
import CardModal from './components/CardModal';

const defaultColumns = {
  todo: [],
  inProgress: [],
  done: []
};

function App() {
  const [columns, setColumns] = useState(() => JSON.parse(localStorage.getItem('kanbanColumns')) || defaultColumns);
  const [showModal, setShowModal] = useState(false);
  const [editableCard, setEditableCard] = useState(null);

  useEffect(() => {
    localStorage.setItem('kanbanColumns', JSON.stringify(columns));
  }, [columns]);

  const handleAddCard = (card) => {
    const newColumns = { ...columns, [card.status]: [...columns[card.status], card] };
    setColumns(newColumns);
    handleCloseModal();
  };

  const handleEditCard = (card) => {
    // Logic to replace the card in its column
    const newColumn = columns[card.status].map(c => c.id === card.id ? card : c);
    const newColumns = { ...columns, [card.status]: newColumn };
    setColumns(newColumns);
    handleCloseModal();
  };

  const handleDeleteCard = (card) => {
    const newColumn = columns[card.status].filter(c => c.id !== card.id);
    const newColumns = { ...columns, [card.status]: newColumn };
    setColumns(newColumns);
    handleCloseModal();
  };

  const handleShowModal = (card = null) => {
    setEditableCard(card);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditableCard(null);
  };

  return (
    <Container fluid>
      <Row className="justify-content-center mb-4">
        <Button onClick={() => handleShowModal()}>Add New Card</Button>
      </Row>
      <Row>
        <Column title="To Do" cards={columns.todo} onCardClick={handleShowModal} />
        <Column title="In Progress" cards={columns.inProgress} onCardClick={handleShowModal} />
        <Column title="Done" cards={columns.done} onCardClick={handleShowModal} />
      </Row>
      <CardModal
        show={showModal}
        onHide={handleCloseModal}
        onSave={editableCard ? handleEditCard : handleAddCard}
        onDelete={editableCard && handleDeleteCard}
        card={editableCard}
      />
    </Container>
  );
}

export default App;
