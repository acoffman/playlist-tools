import React from 'react';
import './App.css';
import { MusicApi } from './services/MusicApi';
import { MainPage } from './components/MainPage';

function App() {
  let musicApi = new MusicApi()
  return (
    <div>
      <MainPage musicApi={musicApi} />
    </div>
  );
}

export default App;
