import "./styles.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import VolcanoList from "./Pages/VolcanoList";
import Login from "./Pages/Login";
import Register from "./Pages/Register";

export default function App() {
  
  return (
    <Router>
      <div className="menubar">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/VolcanoList">Volcano List</a></li>
          <li><a href="/Register">Register</a></li>
          <li><a href="/Login">Login</a></li>
        </ul> 
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/VolcanoList" element={<VolcanoList />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
    </Router>
    
       
  );
}
