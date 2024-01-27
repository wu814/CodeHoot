import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./components/Home"
import Lobby from "./components/Lobby"
import Question from "./components/Question"
import Scoreboard from "./components/Scoreboard"

function App() {
  return (
    <div className="App">
      {/* <Router>
        <div>
          <Navbar />
          <Route exact path="/" component={Home} />
          <Route path="/lobby" component={Lobby} />
          <Route path="/question" component={Question} />
          <Route path="/scoreboard" component={Scoreboard} />
        </div>
      </Router> */}
      <h1>Welcome to CodeHoot</h1>
      
    </div>
  );
}

export default App;
