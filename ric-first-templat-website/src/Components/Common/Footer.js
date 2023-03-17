/*
This code represents the footer of a web page. It consists of three main sections:

logo_portion: This section contains the NUST logo and the name of the research collaboration portal.
footer-social-media: This section contains social media icons that link to the corresponding NUST research pages on Facebook, Twitter, LinkedIn, and Instagram.
footer-copyright: This section contains the copyright information.
Each section is enclosed in a div element with a specific className. The className is used to apply specific styles to the section using CSS.

The social media icons are implemented using Font Awesome icons. The Font Awesome library is imported in the code using import { FontAwesomeIcon } from "@fortawesome/react-fontawesome".
 */

import React from "react";
import '../../CSS/Common/Footer.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faSquareFacebook, faLinkedinIn, faTwitterSquare, faInstagram} from "@fortawesome/free-brands-svg-icons"

const Footer = () =>{
    return(
        <div className={"Footer"}>
            <div className={"logo_portion"}>
                <div className={"Logo"}>
                    {/* Link to NUST website */}
                    <a href={"https://nust.edu.pk"} about={"_blank"}>
                        {/* NUST logo */}
                        <img src={process.env.PUBLIC_URL+"/Images/Icons/NUSTLogo.png"}/>
                    </a>
                </div>
                <div className={"logo-name"}>
                    {/* Link to home page */}
                    <a href={"/"} about={"_blank"}>
                        {/* Portal name */}
                        <h2>Research Collaboration Portal</h2>
                    </a>
                </div>
            </div>
            <div className={"footer-social-media"}>
                {/* List of social media icons */}
                <ul>
                    {/* Facebook icon */}
                    <li className={"icon"}>
                        <a href={"https://www.facebook.com/NUSTResearch/"}>
                            <FontAwesomeIcon icon={faSquareFacebook} className={"icon facebook"}/>
                        </a>
                    </li>
                    {/* LinkedIn icon */}
                    {/* <li className={"icon"}><a href={"/"}> <FontAwesomeIcon icon={faLinkedinIn} className={"icon linkedin"} /> </a></li> */}
                    {/* Twitter icon */}
                    <li className={"icon"}>
                        <a href={"https://twitter.com/research_nust?lang=en"}>
                            <FontAwesomeIcon icon={faTwitterSquare} className={"icon twitter"} />
                        </a>
                    </li>
                    {/* Instagram icon */}
                    {/* <li className={"icon"}><a href={"/"}><FontAwesomeIcon icon={faInstagram} className={"icon instagram"} /></a></li> */}
                </ul>
            </div>
            <div className={"footer-copyright"}>
                {/* RIC copyright */}
                <span>
            <small>Copyright &#169; RIC</small>
        </span>
            </div>
        </div>

    )
}
export default Footer;