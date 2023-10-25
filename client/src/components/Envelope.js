import { Card, ProgressBar, Stack } from "react-bootstrap";
import { currencyFormatter } from "../utils";
import UpdateEnvelope from "./UpdateEnvelope.js";
import DeleteEnvelope from "./DeleteEnvelope.js"

export default function Envelope({ id, title, expense, budget, gray }) {
    const classNames = [];
    if (expense > budget) {
        classNames.push("bg-danger", "bg-opacity-10");
    }
    else if (gray) {
        classNames.push("bg-light");
    }
    return (
        <Card className={classNames.join(" ")}>
            <Card.Body>
                <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
                    <div className="me-2">{title}</div>
                    <div className="d-flex align-items-baseline">{currencyFormatter.format(expense)}
                    <span className="text-muted fs-6 ms-1">
                     / {currencyFormatter.format(budget)}
                    </span>
                    </div>
                </Card.Title>
                <ProgressBar className="rounded-pill" variant={getProgressBarVariant(expense,budget)} min={0} max={budget} now={expense}></ProgressBar>
                <Stack direction="horizontal" gap="2" className="mt-4">
                    <DeleteEnvelope id={id}/>
                    <UpdateEnvelope id={id}/>
                </Stack>
            </Card.Body>
        </Card>
    )
}

function getProgressBarVariant(expense,budget) {
    const ratio = expense / budget;
    if (ratio < 0.5) return "primary";
    if (ratio < 0.75) return "warning";
    return "danger";
}