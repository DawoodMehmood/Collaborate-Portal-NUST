import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import  background from "../../Background-Image/Final-Home.png";
import  video from "../../Background-Video/NUST Campus.mp4";
import slider_image from "../../Background-Video/Welcome slide.gif";
// import YouTube from 'react-youtube';

const slider = ()=> {
    let settings = {
        // dots: true,
        className:"Card-slider",
        centerPadding: "160px",
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite:true,
        lazyLoad: true,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 5000,
        cssEase: "linear",
        pauseOnHover: true,
        fade: true
    }

    const Styles = {
        backgroundImage: `url(${background})`
    }

    return (
        <>
            <div>
                <div className="row no-gutters">
                    <div style={{padding: 0}} className="col-md-6 order-md-2">
                        <img style={{width : "100%"}} src={slider_image} alt="NUST" className="img-fluid"/>
                    </div>                
                    <div style={{padding: 0}} className="col-md-6 order-md-1">
                        <video  style={{width : "100%"}} autoPlay loop muted>
                            <source src={video} type="video/mp4"/>
                        </video>
                    </div>
                </div>  
            </div>
            {/* <div className="video-container">
                <video autoPlay loop muted>
                    <source src={video} type="video/mp4"/>
                </video> */}
            {/*    <div className={"slider-content"}>*/}
            {/*        <Slider {...settings}>*/}
            {/*            <div>*/}
            {/*                <div className={'layer'}>*/}
            {/*                    <h1 className={"header-heading"}>NUST Ranks Among The Top Universities at National & International Level</h1>*/}
            {/*                    <div className={'RankingDiv'}>*/}
            {/*                        <div className={"rankings"}>*/}
            {/*                            <h1>#334</h1>*/}
            {/*                            <h2>in QS Ranking</h2>*/}
            {/*                        </div>*/}
            {/*                        <div className={'Line'}></div>*/}
            {/*                        <div className={"rankings"}>*/}
            {/*                            <h1>#67</h1>*/}
            {/*                            <h2>in Asian Ranking</h2>*/}
            {/*                        </div>*/}
            {/*                        <div className={'Line'}></div>*/}
            {/*                        <div className={"rankings"}>*/}
            {/*                            <h1>#1</h1>*/}
            {/*                            <h2>in Pakistan</h2>*/}
            {/*                        </div>*/}

            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*            <div>*/}
            {/*                <div className={'layer collaboration-slide'}>*/}
            {/*                    <div className={'collaboration-slide-heading'}>*/}
            {/*                        <h1 className={'header-heading'}>Collaborate With Top Highly Cited NUST Individuals</h1>*/}
            {/*                    </div>*/}
            {/*                    <div className={'collaboration-slide-images'}>*/}
            {/*                        <div className={'image'}>*/}
            {/*                            <img src={process.env.PUBLIC_URL+"/Images/Abdul Ghafoor.jpg"}/>*/}
            {/*                        </div> <div className={'image'}>*/}
            {/*                        <img src={process.env.PUBLIC_URL+"/Images/Dr. Haider Abbas.jpg"}/>*/}
            {/*                    </div> <div className={'image'}>*/}
            {/*                        <img src={process.env.PUBLIC_URL+"/Images/Dr Adeeb Shehzad.jpg"}/>*/}
            {/*                    </div> <div className={'image'}>*/}
            {/*                        <img src={process.env.PUBLIC_URL+"/Images/Dr Tahir Abdul Hussain Ratlamwala_PNEC_NUST.jpeg"}/>*/}
            {/*                    </div> <div className={'image'}>*/}
            {/*                        <img src={process.env.PUBLIC_URL+"/Images/Dr. Iftikhar Hussain Gul.jpg"}/>*/}
            {/*                    </div> <div className={'image'}>*/}
            {/*                        <img src={process.env.PUBLIC_URL+"/Images/Dr. Meraj Mustafa Hashmi.jpg"}/>*/}
            {/*                    </div> <div className={'image'}>*/}
            {/*                        <img src={process.env.PUBLIC_URL+"/Images/Dr. Noreen Sher Akbar.jpg"}/>*/}
            {/*                    </div> <div className={'image'}>*/}
            {/*                        <img src={process.env.PUBLIC_URL+"/Images/Dr. Safia Akram.jpg"}/>*/}
            {/*                    </div> <div className={'image'}>*/}
            {/*                        <img src={process.env.PUBLIC_URL+"/Images/Dr. Shahid Iqbal.jpg"}/>*/}
            {/*                    </div> <div className={'image'}>*/}
            {/*                        <img src={process.env.PUBLIC_URL+"/Images/Dr. Tahir Mehmood.jpg"}/>*/}
            {/*                    </div> <div className={'image'}>*/}
            {/*                        <img src={process.env.PUBLIC_URL+"/Images/Dr. Tayyaba Noor.jpg"}/>*/}
            {/*                    </div> <div className={'image'}>*/}
            {/*                        <img src={process.env.PUBLIC_URL+"/Images/Mubasher Jamil.jpg"}/>*/}
            {/*                    </div> <div className={'image'}>*/}
            {/*                        <img src={process.env.PUBLIC_URL+"/Images/Muhammad Ishaq.jpg"}/>*/}
            {/*                    </div> <div className={'image'}>*/}
            {/*                        <img src={process.env.PUBLIC_URL+"/Images/Muhammad Jawad Khan.png"}/>*/}
            {/*                    </div> <div className={'image'}>*/}
            {/*                        <img src={process.env.PUBLIC_URL+"/Images/Muhammad Moazam Fraz.jpg"}/>*/}
            {/*                    </div> <div className={'image'}>*/}
            {/*                        <img src={process.env.PUBLIC_URL+"/Images/Muhammad Usman Akram.jpg"}/>*/}
            {/*                    </div> <div className={'image'}>*/}
            {/*                        <img src={process.env.PUBLIC_URL+"/Images/Salman Raza Naqvi.jpg"}/>*/}
            {/*                    </div>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*            <div>*/}
            {/*                <div className={'layer collaboration-slide-collab'}>*/}
            {/*            <div className={'collaboration-slide-heading-collab'}>*/}
            {/*                <h1 className={'header-heading'}>Industrial Partners For Research & Development</h1>*/}
            {/*            </div>*/}
            {/*            <div className={'collaboration-slide-images-collab'}>*/}
            {/*                <div className={'image-collab'}>*/}
            {/*                    <img src={process.env.PUBLIC_URL+"/Images/industry-collaborators/image25.jpeg"}/>*/}
            {/*                </div>*/}
            {/*                <div className={'image-collab'}>*/}
            {/*                    <img src={process.env.PUBLIC_URL+"/Images/industry-collaborators/image26.jpeg"}/>*/}
            {/*                </div>*/}
            {/*                <div className={'image-collab'}>*/}
            {/*                    <img src={process.env.PUBLIC_URL+"/Images/industry-collaborators/image27.jpeg"}/>*/}
            {/*                </div>*/}
            {/*                <div className={'image-collab'}>*/}
            {/*                    <img src={process.env.PUBLIC_URL+"/Images/industry-collaborators/image28.jpeg"}/>*/}
            {/*                </div>*/}
            {/*                <div className={'image-collab'}>*/}
            {/*                    <img src={process.env.PUBLIC_URL+"/Images/industry-collaborators/image29.jpeg"}/>*/}
            {/*                </div>*/}
            {/*                <div className={'image-collab'}>*/}
            {/*                    <img src={process.env.PUBLIC_URL+"/Images/industry-collaborators/image30.jpeg"}/>*/}
            {/*                </div>*/}
            {/*                <div className={'image-collab'}>*/}
            {/*                    <img src={process.env.PUBLIC_URL+"/Images/industry-collaborators/image31.jpeg"}/>*/}
            {/*                </div>*/}
            {/*                <div className={'image-collab'}>*/}
            {/*                    <img src={process.env.PUBLIC_URL+"/Images/industry-collaborators/image32.jpeg"}/>*/}
            {/*                </div>*/}
            {/*                <div className={'image-collab'}>*/}
            {/*                    <img src={process.env.PUBLIC_URL+"/Images/industry-collaborators/image33.jpeg"}/>*/}
            {/*                </div>*/}
            {/*                <div className={'image-collab'}>*/}
            {/*                    <img src={process.env.PUBLIC_URL+"/Images/industry-collaborators/image34.jpeg"}/>*/}
            {/*                </div>*/}
            {/*                <div className={'image-collab'}>*/}
            {/*                    <img src={process.env.PUBLIC_URL+"/Images/industry-collaborators/image35.jpeg"}/>*/}
            {/*                </div>*/}
            {/*                <div className={'image-collab'}>*/}
            {/*                    <img src={process.env.PUBLIC_URL+"/Images/industry-collaborators/image36.jpeg"}/>*/}
            {/*                </div>*/}
            {/*                <div className={'image-collab'}>*/}
            {/*                    <img src={process.env.PUBLIC_URL+"/Images/industry-collaborators/image37.jpeg"}/>*/}
            {/*                </div>*/}
            {/*                <div className={'image-collab'}>*/}
            {/*                    <img src={process.env.PUBLIC_URL+"/Images/industry-collaborators/image38.jpeg"}/>*/}
            {/*                </div>*/}
            {/*                <div className={'image-collab'}>*/}
            {/*                    <img src={process.env.PUBLIC_URL+"/Images/industry-collaborators/image39.jpeg"}/>*/}
            {/*                </div>*/}
            {/*                <div className={'image-collab'}>*/}
            {/*                    <img src={process.env.PUBLIC_URL+"/Images/industry-collaborators/image40.jpeg"}/>*/}
            {/*                </div>*/}
            {/*                <div className={'image-collab'}>*/}
            {/*                    <img src={process.env.PUBLIC_URL+"/Images/industry-collaborators/image41.jpeg"}/>*/}
            {/*                </div>*/}
            {/*                <div className={'image-collab'}>*/}
            {/*                    <img src={process.env.PUBLIC_URL+"/Images/industry-collaborators/image42.jpeg"}/>*/}
            {/*                </div>*/}
            {/*                <div className={'image-collab'}>*/}
            {/*                    <img src={process.env.PUBLIC_URL+"/Images/industry-collaborators/image43.jpeg"}/>*/}
            {/*                </div>*/}
            {/*                <div className={'image-collab'}>*/}
            {/*                    <img src={process.env.PUBLIC_URL+"/Images/industry-collaborators/image44.jpeg"}/>*/}
            {/*                </div>*/}
            {/*                <div className={'image-collab'}>*/}
            {/*                    <img src={process.env.PUBLIC_URL+"/Images/industry-collaborators/image45.jpeg"}/>*/}
            {/*                </div>*/}
            {/*                <div className={'image-collab'}>*/}
            {/*                    <img src={process.env.PUBLIC_URL+"/Images/industry-collaborators/image46.jpeg"}/>*/}
            {/*                </div>*/}
            {/*                <div className={'image-collab'}>*/}
            {/*                    <img src={process.env.PUBLIC_URL+"/Images/industry-collaborators/image47.jpeg"}/>*/}
            {/*                </div>*/}
            {/*                <div className={'image-collab'}>*/}
            {/*                    <img src={process.env.PUBLIC_URL+"/Images/industry-collaborators/image48.jpeg"}/>*/}
            {/*                </div>*/}


            {/*            </div>*/}
            {/*        </div>*/}
            {/*            </div>*/}
            {/*    /!*<div>*!/*/}
            {/*    /!*    <div style={Styles} className={'Image-Header'}>*!/*/}
            {/*    /!*        <div className={'layer collaboration-faculty'}>*!/*/}
            {/*    /!*        <div className={'collaboration-slide-heading-faculty'}>*!/*/}
            {/*    /!*            <h1>NUST employs 600+ PHD Faculty</h1>*!/*/}
            {/*    /!*            <h3>Dive into the world of Highly Cited Researchers</h3>*!/*/}
            {/*    /!*        </div>*!/*/}
            {/*    /!*        <div className={'collaboration-image-faculty'}>*!/*/}
            {/*    /!*            <div className={'image-faculty'}>*!/*/}
            {/*    /!*                <img src={process.env.PUBLIC_URL+"/Images/faculty/image003.jpg"}/>*!/*/}
            {/*    /!*            </div>*!/*/}
            {/*    /!*        </div>*!/*/}
            {/*    /!*    </div>*!/*/}
            {/*    /!*</div>*!/*/}
            {/*    /!*</div>*!/*/}
            {/*            /!*        <div>*!/*/}
            {/*            /!*            <div className={'layer collaboration-research'}>*!/*/}
            {/*            /!*                <div className={'collaboration-slide-research'}>*!/*/}
            {/*            /!*                    <h1 className={'header-heading'}>Vibrant Research Eco-System</h1>*!/*/}
            {/*            /!*                </div>*!/*/}
            {/*            /!*                <div className={'collaboration-research-images'}>*!/*/}
            {/*            /!*                    <div className={'image-research'}>*!/*/}
            {/*            /!*                        <img src={process.env.PUBLIC_URL+"/Images/Research/image23.png"}/>*!/*/}
            {/*            /!*                    </div>*!/*/}
            {/*            /!*                    <div className={'image-research'}>*!/*/}
            {/*            /!*                        <img src={process.env.PUBLIC_URL+"/Images/Research/image005.jpg"}/>*!/*/}
            {/*            /!*                    </div>*!/*/}
            {/*            /!*                </div>*!/*/}
            {/*            /!*             </div>*!/*/}
            {/*            /!*        </div>*!/*/}
            {/*    /!*<div>*!/*/}
            {/*    /!*    <div style={Styles} className={'Image-Header'}>*!/*/}
            {/*    /!*        <div className={'layer collaboration-research'}>*!/*/}
            {/*    /!*            <div className={'collaboration-slide-publications'}>*!/*/}
            {/*    /!*                <h1>High Winning Ratio Among NUST Faculty for National and International Grants*!/*/}
            {/*    /!*                    99 Projects Won 100 Submitted in 2021*!/*/}
            {/*    /!*                </h1>*!/*/}
            {/*    /!*            </div>*!/*/}
            {/*    /!*            <div className={'collaboration-publication-images'}>*!/*/}
            {/*    /!*                <div className={'image-reward'}>*!/*/}
            {/*    /!*                    <img src={process.env.PUBLIC_URL+"/Images/Winning/image49.png"}/>*!/*/}
            {/*    /!*                </div>*!/*/}
            {/*    /!*            </div>*!/*/}
            {/*    /!*        </div>*!/*/}
            {/*    /!*    </div>*!/*/}
            {/*    /!*</div>*!/*/}
            {/*    /!*<div>*!/*/}
            {/*    /!*    <div style={Styles} className={'Image-Header'}>*!/*/}
            {/*    /!*        <div className={'layer collaboration-research'}>*!/*/}
            {/*    /!*            <div className={'collaboration-slide-publications'}>*!/*/}
            {/*    /!*                <h1>7000 Impact Factor Publication With International Collaboration Among 15000+ Total Publications</h1>*!/*/}
            {/*    /!*            </div>*!/*/}
            {/*    /!*            <div className={'collaboration-publication-images'}>*!/*/}
            {/*    /!*                <div className={'image-publication'}>*!/*/}
            {/*    /!*                    <img src={process.env.PUBLIC_URL+"/Images/Publications/Citation Map.png"}/>*!/*/}
            {/*    /!*                </div>*!/*/}
            {/*    /!*            </div>*!/*/}
            {/*    /!*        </div>*!/*/}
            {/*    /!*    </div>*!/*/}
            {/*    /!*</div>*!/*/}
            {/*</Slider>*/}
            {/*    </div>*/}
            {/* </div> */}
        </>
    );
}
export default slider