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
    if ('/login' === location.pathname || !localStorage.jwt) {
        mainMenu = <>
            <Nav.Link href="/login" onClick={refresh}>Вхід</Nav.Link>
        </>;
    } else {
        mainMenu =
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
            <Nav.Link href="/list" onClick={refresh}>Список пацієнтів</Nav.Link>
            <Nav.Link href="/patient/create">Додати нового пацієнта</Nav.Link>
            <Nav.Link href="/list_species">Довідник тварин</Nav.Link>
            <Nav.Link href="/species/createSpecies">Додати новий вид</Nav.Link>
            <Nav.Link href="#" onClick={logout}>Вихід</Nav.Link>
            </Nav>
        </Navbar.Collapse>;
    }


    return <Navbar bg="light" expand="lg">
        <Container>
            <Navbar.Brand href="/">LAPA</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    {mainMenu}
        </Container>
    </Navbar>
}


export default Menu