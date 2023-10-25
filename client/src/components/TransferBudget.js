import React, { useState, useRef, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function TransferBudget() {
    const [show, setShow] = useState(false);
    const fromEnvelopeId = useRef(null);
    const toEnvelopeId = useRef(null);
    const amount = useRef(null);
    const [envelopes, setEnvelopes] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5500/envelopes")
            .then(response => response.json())
            .then(result => {
                setEnvelopes(result.envelopes);
            });
    }, []); // Empty dependency array ensures useEffect runs once after the initial render

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Make PUT request to transfer the budget
        try {
            const requestOptions = {
                method: 'PUT',
                redirect: 'follow'
            };

            await fetch(`http://localhost:5500/envelopes/${fromEnvelopeId.current.value}/${toEnvelopeId.current.value}/${amount.current.value}`, requestOptions);
        } catch (error) {
            console.error('Error: transfer did not work', error);
        }

        // Close the modal after submitting the form
        handleClose();
    }

    return (
        <>
            <Button variant="outline-primary" onClick={handleShow}>Transfer budget</Button>
            <Modal show={show} onHide={handleClose}>
                <Form onSubmit={handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Transfer budget between two envelopes</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Select ref={fromEnvelopeId}>
                                <option key="default">From envelope</option>
                                {envelopes.map(envelope => (
                                    <option key={envelope.id} value={envelope.id}>{envelope.title}</option>
                                ))}
                            </Form.Select>
                          
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Select ref={toEnvelopeId}>
                                <option key="default">To envelope</option>
                                {envelopes.map(envelope => (
                                    <option key={envelope.id} value={envelope.id}>{envelope.title}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="budget">
                            <Form.Label>Amount</Form.Label>
                            <Form.Control ref={amount} type="number" min={0} required />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" type="submit" onClick={handleSubmit}>
                            Transfer
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}

export default TransferBudget;
