import NotFoundImage from "../assets/notfound.svg";
import styles from "./styles/NotFound.module.css";

const NotFound = () => {
  return (
    <div className={styles.container}>
      <img
        className={styles.container__image}
        src={NotFoundImage}
        alt="NotFound 404"
      />
    </div>
  );
};

export default NotFound;
