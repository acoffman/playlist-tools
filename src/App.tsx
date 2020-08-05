import React from 'react';
import './App.css';
import { Playlists } from './components/Playlists';
import { MusicApi } from './services/MusicApi';

function App() {
  let musicApi = new MusicApi()
  return (

    <div className="App">
      <Playlists musicApi={musicApi}/>
    </div>
  );
}

export default App;
