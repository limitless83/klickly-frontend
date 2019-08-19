import React from 'react';
import Router from './routes';
import Notification from './components/Notification';
import { Wrapper } from './styles';

function App() {
  return (
    <Wrapper>
      <Notification />
      <Router />
    </Wrapper>
  );
}

export default App;
