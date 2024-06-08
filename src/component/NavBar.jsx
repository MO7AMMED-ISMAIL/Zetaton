import React, { useState ,useEffect} from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';



function NavBar() {

    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if(!currentUser){
                navigate('/login');
            }
            setUser(currentUser);
        });
        return unsubscribe;
    }, [navigate]);

    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="#home">
                        {user ? user.email : ""}
                        </Navbar.Brand>
                    <Nav className="ms-auto">
                        <LinkContainer to="/home">
                            <Nav.Link>Galary</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/favorites">
                            <Nav.Link>Favorite</Nav.Link>
                        </LinkContainer>
                        {/* <Nav.Link href="#pricing">Logout</Nav.Link> */}
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}

export default NavBar
