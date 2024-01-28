import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./components/Home"
import Lobby from "./components/Lobby"
import Question from "./components/Question"
import Scoreboard from "./components/Scoreboard"

function App() {
  return (
    <div className="App">
      <>
        <Navbar />
        <div>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/lobby" element={<Lobby/>} />
            <Route path="/question" element={<Question/>} />
            <Route path="/scoreboard" element={<Scoreboard/>} />
          </Routes>
        </div>
      </>

    </div>
  );
}

export default App;
