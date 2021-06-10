import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import CreatePatient from "./CreatePatient";

function App() {
  return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/users">Users</Link>
              </li>
            </ul>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            {/*<Route path="/pacient">*/}
            {/*  <Patient />*/}
            {/*</Route>*/}
            <Route path="/patient/create">
              <CreatePatient />
            </Route>
            {/*<Route path="/list">*/}
            {/*  <List />*/}
            {/*</Route>*/}
            {/*<Route path="/">*/}
            {/*  <Home />*/}
            {/*</Route>*/}
          </Switch>
        </div>
      </Router>
  );
}

export default App;
