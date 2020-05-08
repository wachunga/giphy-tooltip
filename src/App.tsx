import React from 'react';
import { GiphyTooltip } from './components/GiphyTooltip';
import './App.css';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <GiphyTooltip />
        <p>Just select text and get GIFs.</p>
        <p>Cats 🐱 and dogs 🐶 and unicorns 🦄.</p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Test link
        </a>
      </header>
    </div>
  );
}

export default App;
