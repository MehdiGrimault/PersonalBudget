import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useRef } from 'react';

function NewEnvelope() {
    //State
    const [show, setShow] = useState(false);
    const titleRef = useRef();
    const budgetRef = useRef();

    //comportements
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevents the default form submission behavior

        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
    
        let raw = JSON.stringify({
            "title": titleRef.current.value,
            "budget": Number(budgetRef.current.value)
        });
    
        try {
            let requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };
    
            let response = await fetch("http://localhost:5500/envelopes/", requestOptions);
            if (response.ok) {
                console.log("Envelope created successfully!");
                handleClose(); // Close the modal upon successful creation
            } else {
                console.error("Error creating envelope:", response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    //affichage
    return (
        <>
            <Button variant="primary" onClick={handleShow}>Create a new envelope</Button>
            <Modal show={show} onHide={handleClose}>
                <Form onSubmit={handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create a new envelope</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                ref={titleRef}
                                type="text"
                                placeholder="ex: energy"
                                autoFocus
                                required
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="budget"
                        >
                            <Form.Label>Budget</Form.Label>
                            <Form.Control ref={budgetRef} type="number" min={0} required />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" type="submit" onClick={handleClose}>
                            Create envelope
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}

export default NewEnvelope;