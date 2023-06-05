import "../../CSS/Home/QualitiesPortion_Home.css";
import "aos/dist/aos.css";

const QualitiesPortion_Home = () => {
    return (
        <div class="container quality-cover">
            <div class="row outer-row">
                <div class="col-lg content" id="portion ">
                    <div class="row"><h1 class="italic-heading">Quality Publications</h1></div>
                    <div class="row"><h5>The quality research at NUST is determined by the fact that NUST faculty is publishing in world class journals with the highest impact factor.
                        NUST has published more than 15000 publications with more than half in impact factor publication.
                        In 2021, NUST has achieved an average impact factor of 3.8.</h5></div>
                </div>
                <div class="col-lg content-logo">
                    <img src={process.env.PUBLIC_URL + "/Images/Qualities_Home_Images/Publications.jpeg"} />
                </div>
            </div>

            <div class="row outer-row">
                <div class="col-lg center content-logo">
                    <img src={process.env.PUBLIC_URL + "/Images/Qualities_Home_Images/GrantsImage.jpeg"} />
                </div>
                <div class="col-lg center-content content">
                    <div class="row"><h1 class="italic-heading">High Valued Research Grants</h1></div>
                    <div class="row"><h5>National and International Grants worth millions have been awarded to NUST Faculty in collaboration with International Scientist for Innovative and applied projects.
                        In 2021, NUST faculty won grants worth close to 0.5B PKR.</h5></div>
                </div>
            </div>

            <div class="row outer-row">
                <div class="col-lg content">
                    <div class="row"><h1 class="italic-heading">Patents & Intellectual Property</h1></div>
                    <div class="row"><h5>NUST has an entrenched culture of patenting novel and innovative solutions and inventions in world patent bodies.
                        Over 100-Patents have been filed and among them more than 60 have been to companies for Implementation.</h5>
                    </div>
                </div>
                <div class="col-lg content-logo">
                    <img src={process.env.PUBLIC_URL + "/Images/Qualities_Home_Images/Patents.jpeg"} />
                </div>
            </div>
        </div>
    )
}
export default QualitiesPortion_Home;