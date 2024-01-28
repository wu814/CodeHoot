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
      <h1>Welcome to Codehoot!</h1>
      <div className="probStatement">Click start whenever everyone is ready. Who doth comeout triumphant over their peers?</div>

      <div className='container'>
        <input
          type="text"
          className="username-input"
          placeholder="username"
        />
        <button className='startButton'>Let's Code!</button>
      </div>
      {/* <Router>
        <div>
          <Routes>
            <Route path="/" component={Home} />
            <Route path="/lobby" component={Lobby} />
            <Route path="/question" component={Question} />
            <Route path="/scoreboard" component={Scoreboard} />
          </Routes>
        </div>
      </Router> */}
      
    </div>
  );
}

export default App;
