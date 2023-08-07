import React, { useEffect, useRef } from "react";
import "../../CSS/Home/Themes.css";
import "aos/dist/aos.css";


const Themes = () => {
     /* Call this function with a string containing the ID name to
     * the element containing the number you want to do a count animation on.*/
     function incEltNbr(id, speed) {
        const elt = document.getElementById(id);
        const endNbr = Number(document.getElementById(id)?.innerHTML);
        incNbrRec(0, endNbr, elt, speed);
    }

    /* A recursive function to increase the number. */
    function incNbrRec(i, endNbr, elt, speed) {
        if (i <= endNbr) {
            elt.innerHTML = i;
            setTimeout(function () { // Delay a bit before calling the function again.
                incNbrRec(i + 2, endNbr, elt, speed);
            }, speed);
        }
    }
   
    useEffect(() => {
        incEltNbr("school", 40); // Increase speed for all elements
        incEltNbr("expert", 2);
        incEltNbr("publication", 0.01);
        incEltNbr("project", 10);
        incEltNbr("patent", 10);
        incEltNbr("technology", 25);
        incEltNbr("lab", 15);
        incEltNbr("industry", 5);
    }, []);



    return (
        <div className="main">
            {/* NUST Research Themes heading */}
            <div className={"SDG-heading"}>
                <h1>NUST Research Themes</h1>
            </div>
            {/* Div containing all the themes */}
            <div className={"themes-div"}>
                {/* Theme 1: Smart Cities */}
                <div>
                    <div className={"theme-logo-div"}>
                        {/* Image for Smart Cities theme */}
                        <img src={process.env.PUBLIC_URL + "/Images/Themes/Schools.png"} alt={"Smart Cities"} />
                    </div>
                    <div className={"Logo-description"}>
                        {/* Smart Cities theme heading */}
                        <h1>Schools</h1>
                        <p id="school">18</p>
                    </div>
                </div>
                {/* Theme 2: Green Energy */}
                <div>
                    <div className={"theme-logo-div"}>
                        {/* Image for Green Energy theme */}
                        <img src={process.env.PUBLIC_URL + "/Images/Themes/Experts.png"} />
                    </div>
                    <div className={"Logo-description "}>
                        {/* Green Energy theme heading */}
                        <h1>Experts</h1>
                        <p id="expert">790</p>
                    </div>
                </div>
                {/* Theme 3: Health & Well-Being, Food & Agriculture */}
                <div>
                    <div className={"theme-logo-div"}>
                        {/* Image for Health & Well-Being, Food & Agriculture theme */}
                        <img src={process.env.PUBLIC_URL + "/Images/Themes/Publications.png"} alt={"HEALTH & WELL-BEING, FOOD & AGRICULTURE"} />
                    </div>
                    <div className={"Logo-description"}>
                        {/* Health & Well-Being, Food & Agriculture theme heading */}
                        <h1>Publications</h1>
                        <p id="publication">16500</p>
                    </div>
                </div>
                {/* Theme 4: Pakistani Society, Business, & Economy */}
                <div>
                    <div className={"theme-logo-div"}>
                        {/* Image for Pakistani Society, Business, & Economy theme */}
                        <img src={process.env.PUBLIC_URL + "/Images/Themes/Projects.png"} alt={"PAKISTANI SOCIETY, BUSINESS, & ECONOMY"} />
                    </div>
                    <div className={"Logo-description"}>
                        {/* Pakistani Society, Business, & Economy theme heading */}
                        <h1>Projects</h1>
                        <p id="project">1000</p>
                    </div>
                </div>
                {/* Theme 5: Transformative Technology, Innovation & Shared Value Creation */}
                <div>
                    <div className={"theme-logo-div"}>
                        {/* Image for Transformative Technology, Innovation & Shared Value Creation theme */}
                        <img src={process.env.PUBLIC_URL + "/Images/Themes/Patents.png"} alt={"TRANSFORMATIVE TECHNOLOGY, INNOVATION & SHARED VALUE CREATION"} />
                    </div>
                    <div className={"Logo-description"}>
                        {/* Transformative Technology, Innovation & Shared Value Creation theme heading */}
                        <h1>Patents</h1>
                        <p id="patent">1000</p>
                    </div>
                </div>
                {/* Theme 6: Digital Futures */}
                <div>
                    <div className={"theme-logo-div"}>
                        <img src={process.env.PUBLIC_URL + "/Images/Themes/Technology.png"} alt={"DIGITAL FUTURES"} />
                    </div>
                    <div className={"Logo-description"}>
                        <h1>Technology Transfer</h1>
                        <p id="technology">70</p>
                    </div>
                </div>
                {/* Theme 6: Digital Futures */}
                <div>
                    <div className={"theme-logo-div"}>
                        <img src={process.env.PUBLIC_URL + "/Images/Themes/Labs.png"} alt={"DIGITAL FUTURES"} />
                    </div>
                    <div className={"Logo-description"}>
                        <h1>Labs</h1>
                        <p id="lab">120</p>
                    </div>
                </div>
                {/* Theme 6: Digital Futures */}
                <div>
                    <div className={"theme-logo-div"}>
                        <img src={process.env.PUBLIC_URL + "/Images/Themes/Industry.png"} alt={"DIGITAL FUTURES"} />
                    </div>
                    <div className={"Logo-description"}>
                        <h1>Industry at NUST</h1>
                        <p id="industry">300</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Themes;