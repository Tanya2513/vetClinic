import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import CreatePatient from "./patients/CreatePatient";
import List from "./patients/List";
import CardPatient from "./patients/CardPatient";
import EditPatient from "./patients/EditPatient";

import CreateSpecies from "./species/CreateSpecies";
import ListSpecies from "./species/ListSpecies";
import CardSpecies from "./species/CardSpecies";
import EditSpecies from "./species/EditSpecies";




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
                <Link to="/list">Список пациентов</Link>
              </li>
              <li>
                <Link to="/patient/create">Добавить нового пациента</Link>
              </li>
              <li>
                <Link to="/list_species">Довідник тварин</Link>
              </li>
              <li>
                <Link to="/species/createSpecies">Добавить новий вид</Link>
              </li>
            </ul>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            {/*<Route path="/patient">*/}
            {/*  <Patient />*/}
            {/*</Route>*/}
            <Route path="/patient/create">
              <CreatePatient />
            </Route>
            <Route path="/patient/:id">
              <CardPatient />
            </Route>
            <Route path="/list">
              <List />
            </Route>
            <Route path="/edit/:id">
              <EditPatient />
            </Route>

            <Route path="/species/createSpecies">
              <CreateSpecies />
            </Route>
            <Route path="/list_species">
              <ListSpecies />
            </Route>
            <Route path="/species/:id">
              <CardSpecies />
            </Route>
            <Route path="/editSpecies/:id">
              <EditSpecies />
            </Route>
          </Switch>
        </div>
      </Router>
  );
}

export default App;
