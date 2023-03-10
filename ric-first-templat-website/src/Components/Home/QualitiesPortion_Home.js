import "../../CSS/Home/QualitiesPortion_Home.css";
import "aos/dist/aos.css";

const QualitiesPortion_Home =() =>{
    return (
        <div>
            {/* Quality Publications */}
            <div className={"quality-cover"}>
                <div className={"content"}>
                    <h1>Quality Publications</h1>
                    <h4>The quality research at NUST is determined by the fact that NUST faculty is publishing in world class journals with the highest impact factor.</h4>
                    <h4>NUST has published more than 15000 publications with more than half in impact factor publication.</h4>
                    <h4>In 2021, NUST has achieved an average impact factor of 3.8.</h4>
                </div>
                {/* Publications Image */}
                <div className={"content-logo"}>
                    <img src={process.env.PUBLIC_URL+"/Images/Qualities_Home_Images/Publications.jpeg"}/>
                </div>
            </div>
            {/* High Valued Research Grants */}
            <div className={"quality-cover"}>
                {/* Grants Image */}
                <div className={"center"}>
                    <img src={process.env.PUBLIC_URL+"/Images/Qualities_Home_Images/GrantsImage.jpeg"}/>
                </div>
                <div className={"center-content"}>
                    <h1>High Valued Research Grants</h1>
                    <h4>National and International Grants worth millions have been awarded to NUST Faculty in collaboration with International Scientist for Innovative and applied projects. </h4>
                    <h4>In 2021, NUST faculty won grants worth close to 0.5B PKR.</h4>
                </div>
            </div>
            {/* Patents & Intellectual Property */}
            <div className={"quality-cover"}>
                <div className={"content"}>
                    <h1>Patents & Intellectual Property</h1>
                    <h4>NUST has an entrenched culture of patenting novel and innovative solutions and inventions in world patent bodies.</h4>
                    <h4>Over 100-Patents have been filed and among them more than 60 have been <strong>licensed</strong> to companies for Implementation.</h4>
                </div>
                {/* Patents Image */}
                <div className={"content-logo"}>
                    <img src={process.env.PUBLIC_URL+"/Images/Qualities_Home_Images/Patents.jpeg"}/>
                </div>
            </div>
        </div>    )
}
export default QualitiesPortion_Home;