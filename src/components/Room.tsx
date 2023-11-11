import React, { useEffect, useRef, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Peer from 'peerjs';
import styles from './styles/Room.module.css';
import Alert from '../common/Alert';

const Room: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const location = useLocation();
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const [peer, setPeer] = useState<Peer | null>(null);
  const [isHost, setIsHost] = useState<boolean>(false);
  const [alert, setAlert] = useState<{ show: boolean; message: string }>({
    show: false,
    message: "",
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const isHostParam = searchParams.get('host') === 'true';
    const newPeer = new Peer("", {
      // Opciones de configuración de PeerJS...
    });

    setPeer(newPeer);

    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      if (!isHostParam) {
        const hostPeerId = prompt("Por favor, ingresa la contraseña de la sala:");
        if (hostPeerId) {
          connectToHost(newPeer, hostPeerId, stream);
        }
      }

      newPeer.on('call', (call) => {
        call.answer(stream);
        call.on('stream', (remoteStream) => {
          // Aquí manejarías el stream remoto
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = remoteStream;
          }
        });
      });
    });

    newPeer.on('open', (id) => {
      setIsHost(isHostParam);
      console.log(id);
    });

    return () => {
      newPeer.destroy();
    };
  }, [location.search]);

  const connectToHost = (peer: Peer, hostPeerId: string, stream: MediaStream) => {
    const call = peer.call(hostPeerId, stream);
    call.on('stream', (remoteStream) => {
      // Aquí manejarías el stream remoto
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = remoteStream;
      }
    });
  };

  const copyToClipboard = () => {
    const roomUrl = window.location.href.split('?')[0]; // Obtiene la URL sin los parámetros de búsqueda
    navigator.clipboard.writeText(roomUrl).then(() => {
      setAlert({
        show: true,
        message:
          "URL de la sala copiada al portapapeles.",
      });
    }, (err) => {
      console.error('Error al copiar la URL de la sala: ', err);
      setAlert({
        show: true,
        message:
          "Error al copiar la URL.",
      });
    });
  };

  return (
    <div className={styles.roomContainer}>
      {alert.show && (
        <Alert
          message={alert.message}
          onClose={() => setAlert({ show: false, message: "" })}
        />
      )}
      <h1>Sala de Videoconferencia: {roomId}</h1>
      <div className={styles.videos}>
        <div className={styles.videoWrapper} style={{ width: '50%' }}>
          <video ref={localVideoRef} autoPlay playsInline muted className={styles.localVideo}></video>
        </div>
        <div className={styles.videoWrapper} style={{ width: '50%' }}>
          <video ref={remoteVideoRef} autoPlay playsInline className={styles.remoteVideo}></video>
        </div>
      </div>
      {isHost && <p>Eres el anfitrión de esta sala. Esta es la contrasena: {peer?.id}</p>}
      <button onClick={copyToClipboard} className={styles.copyButton}>
        Copiar URL de la Sala
      </button>
    </div>
  );
};

export default Room;
