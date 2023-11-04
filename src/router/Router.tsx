import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CreateRoom, Home, JoinRoom, Room } from "../components";


export const AppRouter = () => {
    return (
        <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/join-room" element={<JoinRoom />} />
            <Route path="/create-room" element={<CreateRoom />}/>
            <Route path="/room" element={<Room />}/>
        </Routes>
        </Router>
    );
};