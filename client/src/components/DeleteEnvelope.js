import Button from 'react-bootstrap/Button';

function DeleteEnvelope( {id} ) {
    //State

    //comportements
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevents the default form submission behavior

        let requestOptions = {
            method: 'DELETE',
            redirect: 'follow'
          };
          
          fetch(`http://localhost:5500/envelopes/${id}`, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

    //affichage
    return (
        <>
            <Button variant="outline-primary" onClick={handleSubmit}>Delete Envelope</Button>
        </>
    );
}

export default DeleteEnvelope;