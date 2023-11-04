import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div>
      <nav className="app-navigation">
        <ul className="app-navigation__list">
          <li className="app-navigation__list-item">
            <Link
              className="app-navigation__list-item-link"
              to="/create-room"
              role="button"
            >
              Crear Sala
            </Link>
          </li>
          <li className="app-navigation__list-item">
            <Link
              className="app-navigation__list-item-link"
              to="/join-room"
              role="button"
            >
              Unirse a Sala
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
