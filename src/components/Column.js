import React from 'react';
import { Card, Col } from 'react-bootstrap';

const Column = ({ title, cards, onCardClick }) => {
  return (
    <Col>
      <h2>{title}</h2>
      {cards.map(card => (
        <Card key={card.id} onClick={() => onCardClick(card)} style={{ margin: '8px 0' }}>
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
