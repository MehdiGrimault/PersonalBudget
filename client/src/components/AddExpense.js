import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useRef } from 'react';

function AddExpense({ id }) {
    //State
    const [show, setShow] = useState(false);
    const titleRef = useRef();
    const amountRef = useRef();

    //comportements
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevents the default form submission behavior

        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify({
            "title": titleRef.current.value,
            "amount": Number(amountRef.current.value),
            "envelopeId": Number(id)
        });

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        await fetch(`http://localhost:5500/expenses/`, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

    //affichage
    return (
        <>
            <Button variant="outline-primary" onClick={handleShow}>Add Expense</Button>
            <Modal show={show} onHide={handleClose}>
                <Form onSubmit={handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add an expense</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                ref={titleRef}
                                type="text"
                                autoFocus
                                required
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="amount"
                        >
                            <Form.Label>Amount</Form.Label>
                            <Form.Control ref={amountRef} type="number" min={0} required />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary"  type="submit" onClick={handleClose}>
                            Add Expense
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}

export default AddExpense;