// Column.js
import React from 'react';
import { Card, Col } from 'react-bootstrap';

const Column = ({ title, cards, onCardClick }) => {
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
          onClick={() => onCardClick(card)}
        >
          <Card.Body>
            <Card.Title>{card.title}</Card.Title>
            <Card.Text>{card.description}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </Col>
  );
};

export default Column;
