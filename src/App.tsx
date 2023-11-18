import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Room from "./components/Room";
import WaitingRoom from "./components/WaitingRoom";
import appStyles from "./styles/App.module.css";
import NotFound from "./components/NotFound";

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
          <Route path="/waiting-room/:roomId" element={<WaitingRoom />} />
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
