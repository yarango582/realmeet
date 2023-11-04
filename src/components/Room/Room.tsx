import { useEffect, useState } from "react";
import VideoCard from "../VideoCard/VideoCard"; // Importa el componente de la tarjeta de video
import "./style.css";

export const Room = () => {
  const [roomID, setRoomID] = useState("");
  const [hostURL, setHostURL] = useState("");
  const [showVideoCard, setShowVideoCard] = useState(false); // Nuevo estado

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const roomID = params.get("code");
    setHostURL(window.location.href);
    if (roomID) {
      setRoomID(roomID);
    }
    () => {};
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard, redirecting to room");
    console.log(roomID);
    // Mostrar la tarjeta de video al copiar la URL
    setShowVideoCard(true);
    const roomContainer = document.getElementById("over");
    if (roomContainer) {
      roomContainer.classList.add("overlay");
    }
  };

  return (
    <div className="room-container">
      <h2>Copia la URL de invitación para iniciar</h2>
      <p>Comparte la siguiente URL o código con tus invitados:</p>
      <div className="room-details">
        <p>URL: {hostURL}</p>
        <button onClick={() => copyToClipboard(hostURL)}>Copiar</button>
      </div>
      <div id="over">{showVideoCard && <VideoCard />}</div>
    </div>
  );
};
