// WaitingRoom.tsx
import React, { useEffect, useRef, /*useState*/ } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./styles/WaitingRoom.module.css";

const WaitingRoom: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();
  const { roomId } = useParams<{ roomId: string }>();
  const ws = useRef<WebSocket | null>(null);
  const peerConnection = useRef<RTCPeerConnection | null>(null);
  // const [roomPassword, setRoomPassword] = useState<string>("");
  // const [isHost, setIsHost] = useState<boolean>(false);

  useEffect(() => {
    // Determinar si el usuario es el anfitrión
    // setIsHost(sessionStorage.getItem("isHost") === "true");

    // Configuración de WebRTC
    const config: RTCConfiguration = {
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    };
    peerConnection.current = new RTCPeerConnection(config);
    console.log(peerConnection.current);

    // Iniciar la conexión WebSocket
    const serverUrl = import.meta.env.VITE_WS_SERVER;
    ws.current = new WebSocket(serverUrl);

    ws.current.onopen = () => {
      console.log("Connected to WebSocket server");
      ws.current?.send(JSON.stringify({ type: "join", roomId }));
    };

    ws.current.onmessage = (message) => {
      const parsedMessage = JSON.parse(message.data);
      console.log("Received message: ", parsedMessage);

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

    // Obtener medios locales y establecer el stream local
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
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

  // Gestión de la oferta recibida
  const handleOffer = (offer: RTCSessionDescriptionInit) => {
    peerConnection.current?.setRemoteDescription(new RTCSessionDescription(offer)).then(() => {
      return peerConnection.current?.createAnswer();
    }).then(answer => {
      return peerConnection.current?.setLocalDescription(answer);
    }).then(() => {
      ws.current?.send(JSON.stringify({
        type: 'answer',
        answer: peerConnection.current?.localDescription,
        roomId
      }));
    });
  };

  // Gestión de la respuesta recibida
  const handleAnswer = (answer: RTCSessionDescriptionInit) => {
    peerConnection.current?.setRemoteDescription(new RTCSessionDescription(answer));
  };

  // Gestión de nuevos candidatos ICE recibidos
  const handleNewICECandidate = (candidate: RTCIceCandidateInit | undefined) => {
    peerConnection.current?.addIceCandidate(new RTCIceCandidate(candidate));
  };

  const handleJoinClick = () => {
    // Validar contraseña si es necesario y unirse a la sala
    // if (!isHost && !roomPassword) {
    //   console.log("Se requiere contraseña para los invitados.");
    //   return;
    // }
    navigate(`/room/${roomId}`);
  };

  return (
    <div className={styles.waitingRoom}>
      {/* Video preview y controles de usuario */}
      <div className={styles.cameraPreview}>
        <video ref={videoRef} autoPlay playsInline muted className={styles.camera}></video>
      </div>
      <div className={styles.controls}>
        {/* Botones para controlar el micrófono, la cámara y salir */}
      </div>
      {/* {!isHost && (
        <input
          className={styles.input}
          type="password"
          placeholder="Ingresar contraseña"
          value={roomPassword}
          onChange={(e) => setRoomPassword(e.target.value)}
        />
      )} */}
      <button className={styles.button} onClick={handleJoinClick}>
        Entrar
      </button>
    </div>
  );
};

export default WaitingRoom;
