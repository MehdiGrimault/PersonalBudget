import { Stack, Container } from "react-bootstrap";
import Envelope from "./components/Envelope.js";
import { useEffect, useState } from "react";
import NewEnvelope from "./components/NewEnvelope.js";
import TotalBudget from "./components/TotalBudget.js";
import TransferBudget from "./components/TransferBudget.js";
import {Form} from "react-bootstrap";

function App() {
  // Récupérer la valeur du budget à partir du localStorage lors du chargement initial
  const initialBudget = localStorage.getItem('budget') || '';
  const [budget, setBudget] = useState(initialBudget);

  // Mettre à jour le localStorage chaque fois que la valeur du budget change
  useEffect(() => {
    localStorage.setItem('budget', budget);
  }, [budget]);

  const handleBudgetChange = (event) => {
    setBudget(event.target.value);
  };



  const [envelopes, setEnvelopes] = useState([]);
  const [expenses, setExpenses] = useState([]);

  fetch("http://localhost:5500/envelopes")
    .then(response => {
      return response.json();
    })
    .then(result => {
      setEnvelopes(result.envelopes);
    });


  useEffect(() => {
    const fetchExpenses = async () => {
      const updatedExpenses = [];
      for (const envelope of envelopes) {
        try {
          const response = await fetch(`http://localhost:5500/envelopes/${envelope.id}/expenses`);
          const result = await response.json();
          const totalAmount = Number(result.expenses.reduce((acc, item) => acc + item.amount, 0));
          updatedExpenses.push({ envelopeId: envelope.id, amount: totalAmount });
        } catch (error) {
          console.error(`Error fetching expenses for envelope ${envelope.id}:`, error);
          updatedExpenses.push({ envelopeId: envelope.id, amount: 0 });
        }
      }
      setExpenses(updatedExpenses);
    };

    fetchExpenses();
  }, [envelopes]);


  return (
    <Container className="my-4">
      <div className="my-4">
        <h1 className="me-auto">My budget</h1>
      </div>
      <Form className="mb-3 mr-3">
        <Form.Label className="mb-3 mr-3">
          Please enter your total budget:
          <Form.Control 
            type="number"
            value={budget}
            onChange={handleBudgetChange}
          />
        </Form.Label>
      </Form>
      <Stack direction="horizontal" gap="2" className="mb-4">
        <NewEnvelope />
        <TransferBudget />
      </Stack>
      <div className="my-4">
        <TotalBudget title={"Total"} expense={envelopes.reduce((acc, item) => acc + item.budget, 0)} budget={budget} gray />
      </div>
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px, 1fr))",
        gap: "1rem",
        alignItems: "flex-start"
      }}>
        {envelopes.map((envelope) => {
          const expenseData = expenses.find(expense => expense.envelopeId === envelope.id);
          const amount = expenseData ? expenseData.amount : 0;

          return (
            <Envelope
              key={envelope.id}
              id={envelope.id}
              title={envelope.title}
              expense={amount}
              budget={envelope.budget}
              gray
            />
          );
        })}
      </div>
    </Container>
  );
}

export default App;
