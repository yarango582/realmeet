import React from 'react';
import styles from './styles/Alert.module.css';

interface AlertProps {
  message: string;
  onClose: () => void;
}

const Alert: React.FC<AlertProps> = ({ message, onClose }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.alertBox}>
        <p className={styles.message}>{message}</p>
        <button className={styles.closeButton} onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default Alert;
