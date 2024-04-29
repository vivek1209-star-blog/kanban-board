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

  const handleEditCard = (updatedCard) => {
    if (!updatedCard) return;

    // Remove the card from its current column if the status changed
    const columnCards = columns[updatedCard.status].filter(card => card.id !== updatedCard.id);

    // Add the updated card to its new column
    const newColumns = {
        ...columns,
        [updatedCard.status]: [...columnCards, updatedCard]
    };

    // If the status changed, we also need to remove the card from the old column
    if (editableCard && editableCard.status !== updatedCard.status) {
        newColumns[editableCard.status] = newColumns[editableCard.status].filter(card => card.id !== updatedCard.id);
    }

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
