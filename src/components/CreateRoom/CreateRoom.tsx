import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style.css';

export const CreateRoom = () => {
  const [roomName, setRoomName] = useState('');
  const navigate = useNavigate();

  const generateRandomHash = () => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < 10; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  const createRoom = () => {
    if (roomName.length >= 3) {
      navigate(`/room?code=${roomName + '-' + generateRandomHash()}`);
    } else {
      alert("El nombre de la sala debe contener al menos 3 letras.");
    }
  };

  return (
    <div className="container">
      <div className='container__close-button'>
        <Link to="/" className="close-button">X</Link>
      </div>
      <h2>Crear una Sala</h2>
      <div>
        <label>Nombre de la Sala:</label>
        <input
          type="text"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />
      </div>
      <button onClick={createRoom} className="primary-button">
        Crear Sala
      </button>
    </div>
  );
};

export default CreateRoom;
