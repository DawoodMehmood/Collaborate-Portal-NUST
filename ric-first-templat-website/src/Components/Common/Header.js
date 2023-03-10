/*
This code defines a header section of a website. The header contains a logo of NUST,
the name of the portal, and a navigation menu with links to Home, About and Contact Us pages.
The header is divided into two portions - Logos-Portion and Links-Portion.
The Logos-Portion contains the NUST logo and the name of the portal, while the Links-Portion contains
the navigation menu. The navigation menu is defined using an unordered list (ul) with list items (li)
that contain links to the different pages of the portal.
 */
import React from "react";
// import '../../CSS/Common/Header.css'
const Header = () =>{

    return(
        <div className={"Header"}>
            <div className={"Logos-Portion"}>
                {/* Logos and their links */}
                <div className={"logo"}>
                    {/* Link to NUST website */}
                    <a href={"https://nust.edu.pk"} about={"_blank"}>
                        {/* NUST Logo Image */}
                        <img src={process.env.PUBLIC_URL+"/Images/Icons/NUSTLogo.png"}/>
                    </a>
                </div>
                {/* Logo name */}
                <div className={"logo-name-div"}>
                    {/* Link to the portal's homepage */}
                    <a href={"/"} about={"_blank"}>
                        Research Collaboration Portal
                    </a>
                </div>
            </div>
            <div className={"Links-Portion"}>
                {/* Navigation Links */}
                <ul className={'ul'}>
                    <li className={'li'}>
                        {/* Link to the portal's homepage */}
                        <a href={"/"}>Home</a>
                    </li>
                    <li className={'li'}>
                        {/* Link to the 'About' page of NUST Research Portal */}
                        <a href={"https://research.nust.edu.pk/"}  about={"_blank"}>About</a>
                    </li>
                    <li className={'li'}>
                        {/* Link to the portal's contact page */}
                        <a href={"/contact"}>Contact Us</a>
                    </li>
                </ul>
            </div>
        </div>
    )
}
export default Header;