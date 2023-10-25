import { Stack, Container } from "react-bootstrap";
import Envelope from "./components/Envelope.js";
import { useEffect, useState } from "react";
import NewEnvelope from "./components/NewEnvelope.js";
import TotalBudget from "./components/TotalBudget.js";
import TransferBudget from "./components/TransferBudget.js";

function App() {
  const [envelopes, setEnvelopes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5500/envelopes")
      .then(response => {
        return response.json();
      })
      .then(result => {
        setEnvelopes(result.envelopes);
      });
  })

  return (
    <Container className="my-4">
      <div className="my-4">
      <h1 className="me-auto">My budget</h1>
      </div>
      <Stack direction="horizontal" gap="2" className="mb-4">
        <NewEnvelope/>
        <TransferBudget/>
      </Stack>
      <div className="my-4">
        <TotalBudget title={"Total"} expense={envelopes.reduce((acc, item) => acc + item.budget, 0)} budget={5200} gray />
      </div>
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px, 1fr))",
        gap: "1rem",
        alignItems: "flex-start"
      }}>
        {envelopes.map(envelope => (
          <Envelope key={envelope.id} id={envelope.id} title={envelope.title} expense={0} budget={envelope.budget} gray />
        ))}
      </div>
    </Container>
  );
}

export default App;
