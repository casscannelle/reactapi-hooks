import React, { useState, useEffect } from 'react';
import BuscaFIPE from './components/BuscaFIPE/BuscaFIPE';
import Container from './components/Container/Container';
import './App.css'

function App() {
  
  return (
    <div className="box">
      <Container>
      <BuscaFIPE/>
      </Container>
    </div>
  );
}

export default App;
