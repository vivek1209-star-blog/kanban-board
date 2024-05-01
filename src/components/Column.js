import React from 'react';
import { Card, Col } from 'react-bootstrap';
import { BsTrash, BsPencil } from 'react-icons/bs';

const Column = ({ title, cards, onEditClick, onDeleteClick }) => {

  return (
    <Col style={{
      background: '#EBECF0',
      borderRadius: '3px',
      width: '300px',
      padding: '8px',
      margin: '0 10px'
    }}>
      <h2 style={{ textAlign: 'center', color: '#333' }}>{title}</h2>
      {cards.map((card, index) => (
        <Card
          key={card.id}
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '3px',
            margin: '0 0 8px 0',
            padding: '10px',
            cursor: 'pointer',
            boxShadow: '0 1px 0 rgba(9,30,66,.25)'
          }}
        >
          <Card.Body>
            <Card.Title>{card.title}</Card.Title>
            <Card.Text>{card.description}</Card.Text>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <BsPencil onClick={() => onEditClick(card)} style={{ cursor: "pointer" }} /> {/* Ensure onEditClick is called */}
              </div>
              <div>
                <BsTrash onClick={(e) => { e.stopPropagation(); onDeleteClick(card); }} style={{ cursor: "pointer" }} />
              </div>
            </div>
          </Card.Body>
        </Card>
      ))}
    </Col>
  );
};

export default Column;
