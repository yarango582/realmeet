import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './styles/Room.module.css';
import Alert from '../common/Alert';

const Room: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const ws = useRef<WebSocket | null>(null);
  const peerConnection = useRef<RTCPeerConnection | null>(null);
  const [isHost, setIsHost] = useState<boolean>(false);
  const [alert, setAlert] = useState<{ show: boolean; message: string }>({
    show: false,
    message: "",
  });

  useEffect(() => {
    setIsHost(sessionStorage.getItem("isHost") === "true");
    const pcConfig: RTCConfiguration = {
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    };

    peerConnection.current = new RTCPeerConnection(pcConfig);

    peerConnection.current.ontrack = (event) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    ws.current = new WebSocket(import.meta.env.VITE_WS_SERVER);
    ws.current.onopen = () => {
      console.log("Connected to WebSocket server");
      ws.current?.send(JSON.stringify({ type: "join", roomId }));
    };

    ws.current.onmessage = (message) => {
      const parsedMessage = JSON.parse(message.data);
      switch (parsedMessage.type) {
        case 'offer':
          handleOffer(parsedMessage.offer);
          break;
        case 'answer':
          handleAnswer(parsedMessage.answer);
          break;
        case 'candidate':
          handleNewICECandidate(parsedMessage.candidate);
          break;
        default:
          console.error('Unknown message type:', parsedMessage.type);
          break;
      }
    };

    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
        stream.getTracks().forEach(track => {
          peerConnection.current?.addTrack(track, stream);
        });
      }).catch(error => {
        console.error('Error accessing media devices.', error);
      });

    return () => {
      ws.current?.close();
      peerConnection.current?.close();
    };
  }, [roomId]);

  const handleOffer = (offer: RTCSessionDescriptionInit) => {
    peerConnection.current?.setRemoteDescription(new RTCSessionDescription(offer))
      .then(() => {
        return peerConnection.current?.createAnswer();
      })
      .then(answer => {
        return peerConnection.current?.setLocalDescription(answer);
      })
      .then(() => {
        ws.current?.send(JSON.stringify({
          type: 'answer',
          answer: peerConnection.current?.localDescription,
          roomId
        }));
      });
  };

  const handleAnswer = (answer: RTCSessionDescriptionInit) => {
    peerConnection.current?.setRemoteDescription(new RTCSessionDescription(answer));
  };

  const handleNewICECandidate = (candidate: RTCIceCandidateInit | undefined) => {
    peerConnection.current?.addIceCandidate(new RTCIceCandidate(candidate));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href)
      .then(() => setAlert({ show: true, message: "URL de la sala copiada al portapapeles." }))
      .catch(err => {
        console.error('Error al copiar la URL de la sala: ', err);
        setAlert({ show: true, message: "Error al copiar la URL." });
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
        <video ref={localVideoRef} autoPlay playsInline muted className={styles.localVideo}></video>
        <video ref={remoteVideoRef} autoPlay playsInline className={styles.remoteVideo}></video>
      </div>
      {isHost && (
        <p>Eres el anfitrión de esta sala. Comparte la URL con los participantes.</p>
      )}
      <button onClick={copyToClipboard} className={styles.copyButton}>
        Copiar URL de la Sala
      </button>
    </div>
  );
};

export default Room;
