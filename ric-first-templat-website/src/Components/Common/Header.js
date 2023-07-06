import React from "react";
const Header = () =>{

    return(
        <nav class="navbar navbar-expand-lg bg-body-tertiary" style={{ backgroundColor: "#6A0DAD" }}>
            <div class="container-fluid">
                <a class="navbar-brand" href="https://nust.edu.pk">
                    <img src={process.env.PUBLIC_URL + "/Images/Icons/NUSTLogo.png"} width="65" alt="NUST"/>
                </a>
                <a class="navbar-brand" href="/">Research Collaboration Portal<sup style={{color: "yellow"}}>Beta</sup></a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="/">Home</a>
                        </li>
                        {/* <li class="nav-item">
                            <a class="nav-link" href="https://research.nust.edu.pk/">About</a>
                        </li> */}
                        <li class="nav-item">
                            <a class="nav-link" href="/contact">Contact Us</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        
    )
}
export default Header;