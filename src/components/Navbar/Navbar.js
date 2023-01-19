import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavigationBar() {
    return (
        <>
            <Navbar bg="dark" variant="dark" style={{"position": "absolute", "width": "100vw"}}>
                <Container>
                    <Navbar.Brand href="#home">GraphQL Demo</Navbar.Brand>
                    <Nav className="">
                        <Nav.Link href="/" style={{"color": "#fff"}} >Home</Nav.Link>
                        <Nav.Link href="/posts">Posts</Nav.Link>
                        <Nav.Link href="/signin">Sign In</Nav.Link>
                        <Nav.Link href="#pricing">Sign Up</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}

export default NavigationBar;