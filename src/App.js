import "./styles.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import VolcanoList from "./Pages/VolcanoList";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Volcano from "./Pages/Volcano";
import NavBar from "./Pages/NavBar";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Volcano" element={<Volcano />} />
        <Route path="/VolcanoList" element={<VolcanoList />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
    </Router>
    
       
  );
}
