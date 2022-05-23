import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function NavBar() {

    let token = localStorage.getItem("token");

    function Logout() {
        localStorage.removeItem("token")
        token = null
    }
    
    if(token !== null){
        return(
            <Navbar color="dark" expand="md light">
                <Nav className="me-auto" navbar>
                <NavItem>
                    <NavLink href="/">
                    Home
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/VolcanoList">
                    Volcano List
                    </NavLink>
                </NavItem>
                <NavItem >
                    <NavLink href="/" onClick={() => Logout()}>
                    Logout
                    </NavLink>
                </NavItem>
                </Nav>
            </Navbar>
            
        )
        }else{
        return(
            <Navbar color="dark" expand="md light">
                <Nav color="light" className="me-auto" navbar>
                <NavItem>
                    <NavLink href="/">
                    Home
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/VolcanoList">
                    Volcano List
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/Register">
                    Register
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/Login">
                    Login
                    </NavLink>
                </NavItem>
                </Nav>
            </Navbar>
        )
    }
}
