import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../style.css';

export const JoinRoom = () => {
  const [roomCode, setRoomCode] = useState('');

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const codeFromURL = queryParams.get('code');
    if (codeFromURL) {
      setRoomCode(codeFromURL);
    }
    return () => {};
  }, []);

  const joinRoom = () => {
    // Aquí puedes utilizar el valor de roomCode para unirse a la sala.
    // Puedes implementar la lógica con PeerJS para establecer la conexión con la sala existente.
  };

  return (
    <div className='container'>
      <div className='container__close-button'>
        <Link to="/" className="close-button">X</Link>
      </div>
      <h2>Unirse a una Sala</h2>
      <div>
        <label>Código de la Sala:</label>
        <input
          type="text"
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value)}
        />
      </div>
      <button className='primary-button' onClick={joinRoom}>Unirse a la Sala</button>
    </div>
  );
};
