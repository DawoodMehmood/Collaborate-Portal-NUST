import React, {useEffect} from "react";
import "../../CSS/Home/Themes.css";
import "aos/dist/aos.css";



const Themes = () =>{
    return(
        <div>
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
                        <img src={process.env.PUBLIC_URL+"/Images/Themes/image20.png"} alt={"Smart Cities"}/>
                    </div>
                    <div className={"Logo-description"}>
                        {/* Smart Cities theme heading */}
                        <h1>SMART CITIES</h1>
                    </div>
                </div>
                {/* Theme 2: Green Energy */}
                <div>
                    <div className={"theme-logo-div"}>
                        {/* Image for Green Energy theme */}
                        <img src={process.env.PUBLIC_URL+"/Images/Themes/image22.png"}/>
                    </div>
                    <div className={"Logo-description "}>
                        {/* Green Energy theme heading */}
                        <h1>GREEN ENERGY</h1>
                    </div>
                </div>
                {/* Theme 3: Health & Well-Being, Food & Agriculture */}
                <div>
                    <div className={"theme-logo-div"}>
                        {/* Image for Health & Well-Being, Food & Agriculture theme */}
                        <img src={process.env.PUBLIC_URL+"/Images/Themes/image26.png"} alt={"HEALTH & WELL-BEING, FOOD & AGRICULTURE"}/>
                    </div>
                    <div className={"Logo-description"}>
                        {/* Health & Well-Being, Food & Agriculture theme heading */}
                        <h1>HEALTH & WELL-BEING, FOOD & AGRICULTURE</h1>
                    </div>
                </div>
                {/* Theme 4: Pakistani Society, Business, & Economy */}
                <div>
                    <div className={"theme-logo-div"}>
                        {/* Image for Pakistani Society, Business, & Economy theme */}
                        <img src={process.env.PUBLIC_URL+"/Images/Themes/image24.png"} alt={"PAKISTANI SOCIETY, BUSINESS, & ECONOMY"}/>
                    </div>
                    <div className={"Logo-description"}>
                        {/* Pakistani Society, Business, & Economy theme heading */}
                        <h1>PAKISTANI SOCIETY, BUSINESS, & ECONOMY</h1>
                    </div>
                </div>
                {/* Theme 5: Transformative Technology, Innovation & Shared Value Creation */}
                <div>
                    <div className={"theme-logo-div"}>
                        {/* Image for Transformative Technology, Innovation & Shared Value Creation theme */}
                        <img src={process.env.PUBLIC_URL+"/Images/Themes/image23.png"} alt={"TRANSFORMATIVE TECHNOLOGY, INNOVATION & SHARED VALUE CREATION"}/>
                    </div>
                    <div className={"Logo-description"}>
                        {/* Transformative Technology, Innovation & Shared Value Creation theme heading */}
                        <h1>TRANSFORMATIVE TECHNOLOGY, INNOVATION & SHARED VALUE CREATION</h1>
                    </div>
                </div>
                {/* Theme 6: Digital Futures */}
                <div >
                <div className={"theme-logo-div"}>
                    <img src={process.env.PUBLIC_URL+"/Images/Themes/image21.png"} alt={"DIGITAL FUTURES"}/>
                </div>
                <div className={"Logo-description"}>
                    <h1>DIGITAL FUTURES</h1>
                </div>
            </div>
        </div>
        </div>
    )
}
export default Themes;