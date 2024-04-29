import React, { useState, useEffect } from "react";
import { Container, Row, Button } from "react-bootstrap";
import Column from "./components/Column";
import CardModal from "./components/CardModal";
import "./App.css"; // Ensure this imports your CSS file

const defaultColumns = {
  todo: [],
  inProgress: [],
  done: [],
};

function App() {
  const [columns, setColumns] = useState(
    () => JSON.parse(localStorage.getItem("kanbanColumns")) || defaultColumns
  );
  const [showModal, setShowModal] = useState(false);
  const [editableCard, setEditableCard] = useState(null);

  useEffect(() => {
    localStorage.setItem("kanbanColumns", JSON.stringify(columns));
  }, [columns]);

  const handleShowModal = (card = null) => {
    setEditableCard(card);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditableCard(null);
  };

  const handleAddCard = (card) => {
    const newColumns = {
      ...columns,
      [card.status]: [...columns[card.status], card],
    };
    setColumns(newColumns);
    handleCloseModal();
  };

  const handleEditCard = (updatedCard) => {
    if (!updatedCard) return;

    const newColumns = { ...columns };
    // Remove the card from its current column
    newColumns[updatedCard.status] = newColumns[updatedCard.status].filter(
      (card) => card.id !== updatedCard.id
    );
    // Add the updated card to its new column
    newColumns[updatedCard.status].push(updatedCard);
    setColumns(newColumns);
    handleCloseModal();
  };

  const handleDeleteCard = (card) => {
    const newColumns = {
      ...columns,
      [card.status]: columns[card.status].filter((c) => c.id !== card.id),
    };
    setColumns(newColumns);
    handleCloseModal();
  };

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #76509B 0%, #C07AB8 100%)",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <Container fluid>
        <Row style={{ justifyContent: "center", marginBottom: "1rem" }}>
          <header
            style={{
              display: "flex",
              justifyContent: "space-between", // Align items horizontally with space between
              alignItems: "center", // Align items vertically to center
              backgroundColor: "rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(10px)",
              padding: "10px 20px",
              borderRadius: "10px",
              color: "white",
              fontSize: "1.5rem",
              marginBottom: "20px",
            }}
          >
            <div>Project Team Spirit</div> {/* Name on the left */}
            <Button onClick={() => handleShowModal()} variant="light">
              Add New Card
            </Button>{" "}
            {/* Button on the right */}
          </header>
        </Row>
        <Row>
          {Object.keys(columns).map((columnId) => (
            <Column
              key={columnId}
              title={columnId.replace(/^\w/, (c) => c.toUpperCase())} // Capitalize the first letter
              cards={columns[columnId]}
              onCardClick={handleShowModal}
            />
          ))}
        </Row>
        {showModal && (
          <CardModal
            show={showModal}
            onHide={handleCloseModal}
            onSave={editableCard ? handleEditCard : handleAddCard}
            onDelete={editableCard && handleDeleteCard}
            card={editableCard}
          />
        )}
      </Container>
    </div>
  );
}

export default App;
