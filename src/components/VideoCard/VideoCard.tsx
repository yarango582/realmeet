import Peer from "peerjs";
import { useEffect, useRef } from "react";
import "./style.css";

export const VideoCard = () => {
  const videoRefHost = useRef<HTMLVideoElement>(null);
  const peer = new Peer(); // Inicializa PeerJS

  useEffect(() => {
    const setupCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        if (!videoRefHost.current) return;
        videoRefHost.current.srcObject = stream;

        // Configura el PeerJS para transmitir la cámara y el audio
        peer.on("open", (id) => {
          const call = peer.call(id, stream);
          call.on("stream", (remoteStream) => {
            // Conecta el stream remoto al elemento de video
            if (!videoRefHost.current) return;
            videoRefHost.current.srcObject = remoteStream;
          });
        });
      } catch (error) {
        console.error("Error al acceder a la cámara o al micrófono:", error);
      }
    };
    setupCamera();
  }, []);

  return (
    <div className="video-card-container">
      <div className="camera-card">
        <video
          autoPlay
          playsInline
          className="camera-feed"
          ref={videoRefHost}
        ></video>
        <div className="camera-info">
          <button className="camera-control-button">Mute</button>
          <button className="camera-control-button">Video</button>
        </div>
        <div className="user-name">
          <span>Host: Nombre del Participante</span>
        </div>
      </div>
      <div className="camera-card">
        <video autoPlay playsInline className="camera-feed"></video>
        <div className="camera-info">
          <button className="camera-control-button">Mute</button>
          <button className="camera-control-button">Video</button>
        </div>
        <div className="user-name">
          <span>Guest: Nombre del Participante</span>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
