import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {useHistory, useLocation} from 'react-router-dom'

function Menu({refresh}) {

    const location = useLocation();
    const {push} = useHistory();

    function  logout(){
        localStorage.removeItem('jwt');
        push('/login');
    }

    let mainMenu = null;
    if ('/login' === location.pathname) {
        mainMenu = <>
        </>;
    } else {
        mainMenu = <>
            <Nav.Link href="/list" onClick={refresh}>Список пациентов</Nav.Link>
            <Nav.Link href="/patient/create">Добавить нового пациента</Nav.Link>
            <Nav.Link href="/list_species">Довідник тварин</Nav.Link>
            <Nav.Link href="/species/createSpecies">Добавить новий вид</Nav.Link>
            <Nav.Link href="#" onClick={logout}>Выход</Nav.Link>

        </>;
    }


    return <Navbar bg="light" expand="lg">
        <Container>
            <Navbar.Brand href="#home">VET_CLINIC</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    {mainMenu}
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
}


export default Menu