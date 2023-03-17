import react from "react";
import {Button} from "react-bootstrap";

export default function PageNotFound(){
    return(
        <div className={"page-not-found"}>
            <h1>WE ARE SORRY, 404 PAGE NOT FOUND</h1>
            <Button variant={"primary"} onClick={()=>{
                window.location.href = "/"}}>Home Page</Button>
        </div>
    )
}