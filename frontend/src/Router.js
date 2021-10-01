import './App.css';
import {
    BrowserRouter,
    Switch,
    Route
} from "react-router-dom";
import CreatePatient from "./patients/CreatePatient";
import List from "./patients/List";
import CardPatient from "./patients/CardPatient";
import EditPatient from "./patients/EditPatient";
import Hospitalize from "./patients/Hospitalize";
import CreateSpecies from "./species/CreateSpecies";
import ListSpecies from "./species/ListSpecies";
import CardSpecies from "./species/CardSpecies";
import EditSpecies from "./species/EditSpecies";
import {useState} from "react";
import Discharge from "./patients/Discharge";
import Login from "./auth/Login";
import Menu from "./Menu";
import Home from "./patients/Home";

function Router() {

    const [dataNow, setDataNow] = useState(null);

    function refresh() {
        setDataNow(Date.now());
    }

    return (
        <BrowserRouter>
            <Menu refresh = {refresh}/>
                {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                <Switch>
                    {/*<Route path="/patient">*/}
                    {/*  <Patient />*/}
                    {/*</Route>*/}
                    <Route path="/patient/create">
                        <CreatePatient/>
                    </Route>
                    <Route path="/patient/:id">
                        <CardPatient/>
                    </Route>
                    <Route path="/list">
                        <List dateNow={dataNow}/>
                    </Route>
                    <Route path="/edit/:id">
                        <EditPatient/>
                    </Route>
                    <Route path="/species/createSpecies">
                        <CreateSpecies/>
                    </Route>
                    <Route path="/list_species">
                        <ListSpecies/>
                    </Route>
                    <Route path="/species/:id">
                        <CardSpecies/>
                    </Route>
                    <Route path="/editSpecies/:id">
                        <EditSpecies/>
                    </Route>
                    <Route path="/hospitalize/:id">
                        <Hospitalize/>
                    </Route>
                    <Route path="/discharge/:id">
                        <Discharge/>
                    </Route>
                    <Route path="/login">
                        <Login/>
                    </Route>
                    <Route path="/">
                        <Home/>
                    </Route>
                </Switch>
        </BrowserRouter>
    );
}

export default Router;
