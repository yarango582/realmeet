import { useState, useEffect } from "react";
import Peer from "peerjs";
import "./App.css";

function GuestApp() {
  const [roomCode, setRoomCode] = useState("");
  const [myStream, setMyStream] = useState<MediaStream | null>(null);
  const [partnerStream, setPartnerStream] = useState<MediaStream | null>(null);
  const [isAutoMuted, setIsAutoMuted] = useState(false);

  const myPeer = new Peer();

  const handleJoinRoom = () => {
    const hostId = `host-${roomCode}`;
    if (!myStream) return;

    const call = myPeer.call(hostId, myStream);

    call.on("stream", (partnerStream: MediaStream) => {
      partnerStream.getAudioTracks().forEach((track) => {
        track.enabled = !isAutoMuted; // Habilita o deshabilita el micrófono según el estado
      });
      setPartnerStream(partnerStream);
    });
  };

  useEffect(() => {
    myPeer.on("open", (id) => {
      console.log("ID de PeerJS:", id);
    });

    const initializeUserMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });

        if (isAutoMuted) {
          stream.getAudioTracks().forEach((track) => {
            track.enabled = false; // Silencia el micrófono si isAutoMuted es verdadero
          });
        }

        setMyStream(stream);
      } catch (error) {
        console.error("Error al obtener el acceso a la cámara y al micrófono:", error);
      }
    };

    initializeUserMedia();

  }, [isAutoMuted]); // Agregar isAutoMuted como dependencia

  const toggleAutoMute = () => {
    // Cambia el estado de auto mute
    const newAutoMuted = !isAutoMuted;
    setIsAutoMuted(newAutoMuted);

    if (myStream) {
      myStream.getAudioTracks().forEach((track) => {
        track.enabled = !newAutoMuted; // Habilita o deshabilita el micrófono según el estado
      });
    }
  };

  return (
    <div className="container">
      <div>
        <input
          className="input-text"
          type="text"
          placeholder="Código de Sala"
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value)}
        />
        <button className="button" onClick={handleJoinRoom}>
          Unirse
        </button>
        <h2>Tu cámara</h2>
        <video
          ref={(video) => video && (video.srcObject = myStream)}
          autoPlay
          playsInline
        />
      </div>
      <div className="card">
        <h2>Cámara del anfitrión</h2>
        {partnerStream ? (
          <video
            ref={(video) => video && (video.srcObject = partnerStream)}
            autoPlay
            playsInline
          />
        ) : (
          <p className="waiting-message">Esperando al anfitrión...</p>
        )}
      </div>
      <div>
        <button className="toggle-mute-button" onClick={toggleAutoMute}>
          {isAutoMuted ? "Activar Micrófono" : "Desactivar Micrófono"}
        </button>
        <p className={isAutoMuted ? "mute-text" : ""}>
          Auto Mute: {isAutoMuted ? "Activado" : "Desactivado"}
        </p>
      </div>
    </div>
  );
}

export default GuestApp;
