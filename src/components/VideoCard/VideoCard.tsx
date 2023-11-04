import "./style.css";

export const VideoCard = () => {
  return (
    <div className="video-card-container">
      <div className="camera-card">
        <video autoPlay playsInline className="camera-feed"></video>
        <div className="camera-info">
          <button className="camera-control-button">Mute</button>
          <button className="camera-control-button">Video</button>
        </div>
        <div className="user">
        <span>Nombre del Participante</span>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
