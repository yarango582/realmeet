import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Room from './components/Room';
import appStyles from './styles/App.module.css';

function App() {
  return (
    <Router>
      <div className={appStyles.appContainer}>
        <nav className={appStyles.nav}>
          <Link to="/" className={appStyles.navLink}>
            Home
          </Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/room/:roomId" element={<Room />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
