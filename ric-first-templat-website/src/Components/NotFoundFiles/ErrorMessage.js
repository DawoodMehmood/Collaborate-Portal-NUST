import {Button} from "react-bootstrap";

export default function ErrorMessage({Message}){
    return(
        <div className={"data-not-found"}>
            <h1>{Message}</h1>
        </div>
    )
}