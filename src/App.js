import './App.css';
import { Route, Routes } from "react-router-dom"
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
            <Route path="/" component={Home} />
            <Route path="/lobby" component={Lobby} />
            <Route path="/question" component={Question} />
            <Route path="/scoreboard" component={Scoreboard} />
          </Routes>
        </div>
      </>
      <h1>Welcome to CodeHoot</h1>
    
    </div>
  );
}

export default App;
