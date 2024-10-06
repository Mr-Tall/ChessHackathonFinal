// Advanced.js
import React from 'react';
import ChessboardComponent from './ChessboardComponent';

const Advanced = () => {
  return (
    <div style={{ textAlign: 'center', paddingTop: '20px' }}>
      <h1 style={{ marginTop: '0px', paddingBottom: '20px', fontSize: '36px' }}>Advanced Chess Game</h1>
      <ChessboardComponent />
    </div>
  );
};

export default Advanced;