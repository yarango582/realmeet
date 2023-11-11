import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles/Home.module.css";
import Alert from "../common/Alert";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [language, setLanguage] = useState("");
  const [alert, setAlert] = useState<{ show: boolean; message: string }>({
    show: false,
    message: "",
  });

  const createRoom = () => {
    if (!name || !language) {
      setAlert({
        show: true,
        message:
          "Por favor, ingresa tu nombre y selecciona tu idioma de preferencia.",
      });
      return;
    }

    const roomId = Date.now().toString();
    localStorage.setItem("userName", name);
    localStorage.setItem("userLanguage", language);
    // Añadimos el query parameter 'host=true' para identificar al anfitrión
    navigate(`/room/${roomId}?host=true`);
  };

  return (
    <div className={styles.container}>
      {alert.show && (
        <Alert
          message={alert.message}
          onClose={() => setAlert({ show: false, message: "" })}
        />
      )}
      <h1 className={styles.heading}>Bienvenido a realmeet!</h1>
      <input
        type="text"
        placeholder="Ingresa tu nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={styles.input}
      />
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className={styles.select}
      >
        <option value="" disabled>
          Selecciona tu idioma...
        </option>
        <option value="es">Español</option>
        <option value="en">Inglés</option>
      </select>
      <button className={styles.button} onClick={createRoom}>
        Iniciar una reunión
      </button>
    </div>
  );
};

export default Home;
