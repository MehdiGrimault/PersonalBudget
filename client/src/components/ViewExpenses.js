import { Button, Modal, Stack } from 'react-bootstrap';
import { useEffect, useState } from 'react';

function ViewExpenses({ id }) {
    // State
    const [show, setShow] = useState(false);
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5500/envelopes/${id}/expenses`)
            .then(response => response.json())
            .then(result => setExpenses(result.expenses))
            .catch(error => console.error('Erreur lors de la récupération des dépenses :', error));
    }, [id]); // Ajoutez 'id' à la liste des dépendances pour réexécuter l'effet lorsque 'id' change

    // Comportements
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDelete = async (expenseId, e) => {
        e.preventDefault(); // Empêcher le comportement par défaut du bouton
    
        try {
            let requestOptions = {
                method: 'DELETE',
                redirect: 'follow'
            };
    
            const response = await fetch(`http://localhost:5500/expenses/${expenseId}`, requestOptions);
            if (response.ok) {
                console.log('Dépense supprimée avec succès.');
                // Mettez à jour l'état des dépenses après la suppression
                setExpenses(prevExpenses => prevExpenses.filter(expense => expense.id !== expenseId));
            } else {
                console.error('La suppression de la dépense a échoué.');
            }
        } catch (error) {
            console.error('Erreur lors de la suppression de la dépense :', error);
        }
    }

    // Affichage
    return (
        <>
            <Button variant="outline-primary" onClick={handleShow}>View Expenses</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>View expenses</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Stack direction="vertical" gap="2">
                        {expenses.map(expense => (
                            <Stack direction="horizontal" gap="2" key={expense.id}>
                                <div className="me-auto fs-4">{expense.title}</div>
                                <div className="fs-5">{expense.amount}€</div>
                                <Button className="sm" variant="outline-danger" onClick={(e) => handleDelete(expense.id, e)}>x</Button>
                            </Stack>
                        ))}
                    </Stack>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ViewExpenses;
