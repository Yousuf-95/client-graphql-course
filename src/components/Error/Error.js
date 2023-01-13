import Container from 'react-bootstrap/Container';


function Error({errorMessage}) {
    if(!errorMessage){
        errorMessage = "Error in loading this page, please try again."
    }

    return (
        <>
            <Container>
                <div className='d-flex flex-column justify-content-center align-items-center min-vh-100 fs-3'><p>{errorMessage}</p></div>
            </Container>
        </>
    );
}


export default Error;