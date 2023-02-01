import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { AuthContext } from '../../context/authContext';

function NavigationBar() {
    const {authState} = useContext(AuthContext);

    return (
        <>
            <Navbar bg="dark" variant="dark" style={{"position": "absolute", "width": "100vw", "top": "0"}}>
                <Container>
                    <Navbar.Brand href="#home">GraphQL Demo</Navbar.Brand>
                    <Nav className="">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/posts">Posts</Nav.Link>
                        {authState.isAuthenticated === false && <Nav.Link href="/signin">Sign In</Nav.Link>}
                        {authState.isAuthenticated === false && <Nav.Link href="/signup">Sign Up</Nav.Link>}
                        
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}

export default NavigationBar;