/*
This is the largest file of React.js in this project. It contains duplicate code which can be moved to separate components
and can be rendered base on condition rendering. Its functions can be moved to separate file and that file will imported
to implement the funcionaliteis.
 */

import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faGraduationCap, faMapMarkerAlt, faPhoneFlip, faAngleUp, faAngleDown, } from "@fortawesome/free-solid-svg-icons";
import { faLinkedinIn, faTwitter } from "@fortawesome/free-brands-svg-icons";
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card from "react-bootstrap/Card";
import Line_Chart from "../Charts/Line_Chart";
import PieChart from "../Charts/Pie_Chart";
import jsPDF from 'jspdf'
import Email from '../../Icons/email.png';
import Linked from '../../Icons/linkedin.png';
import Twitter from '../../Icons/twitter.png';
import Phone from '../../Icons/phone.png';
import Placeholder from "react-bootstrap/Placeholder";
import html2canvas from 'html2canvas'
import nustLogo from '../../Icons/nustLogo.png'
import nustLogo2 from '../../Icons/nustLogo2.png'


const New_Profile = ({ publications, projects, conferences, supervisions, editorials, trainings, ips, profile, enable }) => {

    // This function is responsible for showing the ResearchProject of Faculty Member
    const showmainprofile = () => {
        setTabOptions({
            ...TabOptions,
            profile_tab: false,
            analysis_tab: true,
            allProjects_tab: false,
            researchProjects_International_tab: false,
            researchProjects_National_tab: false,
            industrialProjects_National_tab: false,
            industrialProjects_International_tab: false,
            publications_Articles_tab: false,
            publications_Books_tab: false,
            publications_Chapters_tab: false,
            Conference_tab: false,
            Patents_National_tab: false,
            Patents_International_tab: false,
            Intellectual_Property_tab: false,
            Supervision_PHD_tab: false,
            Supervision_Masters_tab: false,
            Editorial_Board_tab: false,
            Copyright_tab: false,
            Industrial_Design_tab: false,
            Trade_Marks_tab: false,
            Training_Conducted_tab: false,
            Training_Attended_tab: false,
        })
    }
    // This function is responsible for showing the ResearchProject of Faculty Member
    const showResearchProjects = () => {
        if (Project_Research.National.length > Project_Research.International.length) {
            setTabOptions({
                ...TabOptions,
                profile_tab: false,
                analysis_tab: false,
                allProjects_tab: false,
                researchProjects_International_tab: false,
                researchProjects_National_tab: true,
                industrialProjects_National_tab: false,
                industrialProjects_International_tab: false,
                publications_Articles_tab: false,
                publications_Books_tab: false,
                publications_Chapters_tab: false,
                Conference_tab: false,
                Patents_National_tab: false,
                Patents_International_tab: false,
                Intellectual_Property_tab: false,
                Training_Conducted_tab: false,
                Training_Attended_tab: false,
                Supervision_PHD_tab: false,
                Supervision_Masters_tab: false,
                Editorial_Board_tab: false,
                Copyright_tab: false,
                Industrial_Design_tab: false,
                Trade_Marks_tab: false,
            })
        }
        else {
            setTabOptions({
                ...TabOptions,
                profile_tab: false,
                analysis_tab: false,
                allProjects_tab: false,
                researchProjects_International_tab: true,
                researchProjects_National_tab: false,
                industrialProjects_National_tab: false,
                industrialProjects_International_tab: false,
                publications_Articles_tab: false,
                publications_Books_tab: false,
                publications_Chapters_tab: false,
                Conference_tab: false,
                Patents_National_tab: false,
                Patents_International_tab: false,
                Intellectual_Property_tab: false,
                Training_Conducted_tab: false,
                Training_Attended_tab: false,
                Supervision_PHD_tab: false,
                Supervision_Masters_tab: false,
                Editorial_Board_tab: false,
                Copyright_tab: false,
                Industrial_Design_tab: false,
                Trade_Marks_tab: false,
            })

        }

    }
    // This function is responsible for showing the ResearchProject of Faculty Member
    const showIndustrialProjects = () => {
        // Project_Industry.National.length + Project_Industry.International.length
        if (Project_Industry.National.length > Project_Industry.International.length) {
            setTabOptions({
                ...TabOptions,
                profile_tab: false,
                analysis_tab: false,
                allProjects_tab: false,
                researchProjects_International_tab: false,
                researchProjects_National_tab: false,
                industrialProjects_National_tab: true,
                industrialProjects_International_tab: false,
                publications_Articles_tab: false,
                publications_Books_tab: false,
                publications_Chapters_tab: false,
                Conference_tab: false,
                Patents_National_tab: false,
                Patents_International_tab: false,
                Intellectual_Property_tab: false,
                Training_Conducted_tab: false,
                Training_Attended_tab: false,
                Supervision_PHD_tab: false,
                Supervision_Masters_tab: false,
                Editorial_Board_tab: false,
                Copyright_tab: false,
                Industrial_Design_tab: false,
                Trade_Marks_tab: false,

            })
        }
        else {
            setTabOptions({
                ...TabOptions,
                profile_tab: false,
                analysis_tab: false,
                allProjects_tab: false,
                researchProjects_International_tab: false,
                researchProjects_National_tab: false,
                industrialProjects_National_tab: false,
                industrialProjects_International_tab: true,
                publications_Articles_tab: false,
                publications_Books_tab: false,
                publications_Chapters_tab: false,
                Conference_tab: false,
                Patents_National_tab: false,
                Patents_International_tab: false,
                Intellectual_Property_tab: false,
                Training_Conducted_tab: false,
                Training_Attended_tab: false,
                Supervision_PHD_tab: false,
                Supervision_Masters_tab: false,
                Editorial_Board_tab: false,
                Copyright_tab: false,
                Industrial_Design_tab: false,
                Trade_Marks_tab: false,


            })
        }


    }

    // This function is responsible for showing the Publications of Faculty Member
    const showPublications = () => {
        setTabOptions({
            ...TabOptions,
            profile_tab: false,
            analysis_tab: false,
            allProjects_tab: false,
            researchProjects_International_tab: false,
            researchProjects_National_tab: false,
            industrialProjects_National_tab: false,
            industrialProjects_International_tab: false,
            publications_Articles_tab: true,
            publications_Books_tab: false,
            publications_Chapters_tab: false,
            Conference_tab: false,
            Patents_National_tab: false,
            Patents_International_tab: false,
            Intellectual_Property_tab: false,
            Training_Conducted_tab: false,
            Training_Attended_tab: false,
            Supervision_PHD_tab: false,
            Supervision_Masters_tab: false,
            Editorial_Board_tab: false,
            Copyright_tab: false,
            Industrial_Design_tab: false,
            Trade_Marks_tab: false,
        })
    }

    // This function is responsible for showing the Industrial Projects of Faculty Member
    const showIntellectualProperties = () => {
        // largest Intellectual Property

        // setTabOptions({
        //     ...TabOptions,
        //     profile_tab: false,
        //     analysis_tab: false,
        //     allProjects_tab: false,
        //     researchProjects_International_tab: false,
        //     researchProjects_National_tab: false,
        //     industrialProjects_National_tab: false,
        //     industrialProjects_International_tab: false,
        //     publications_Articles_tab: false,
        //     publications_Books_tab: false,
        //     publications_Chapters_tab: false,
        //     Conference_tab: false,
        //     Patents_National_tab: true,
        //     Patents_International_tab: false,
        //     Intellectual_Property_tab: false,
        //     Training_Conducted_tab: false,
        //     Training_Attended_tab: false,
        //     Supervision_PHD_tab: false,
        //     Supervision_Masters_tab: false,
        //     Editorial_Board_tab: false,
        //     Copyright_tab: false,
        //     Industrial_Design_tab: false,
        //     Trade_Marks_tab: false,
        // })
        // return
        let largestIntellectualProperty = "";

        const patents = Intellectual_Property.Patents ? Intellectual_Property.Patents.length : 0;
        const industrialDesign = Intellectual_Property.Industrial_Design ? Intellectual_Property.Industrial_Design.length : 0;
        const copyRights = Intellectual_Property.Copy_Rights ? Intellectual_Property.Copy_Rights.length : 0;
        const tradeMarks = Intellectual_Property.Trade_Marks ? Intellectual_Property.Trade_Marks.length : 0;

        if (patents > industrialDesign) {
            if (patents > copyRights) {
                if (patents > tradeMarks) {
                    largestIntellectualProperty = "Patents";
                }
                else {
                    largestIntellectualProperty = "Trade Marks";
                }
            }
            else {
                if (copyRights > tradeMarks) {
                    largestIntellectualProperty = "Copy Rights";
                }
                else {
                    largestIntellectualProperty = "Trade Marks";
                }
            }
        }
        else {
            if (industrialDesign > copyRights) {
                if (industrialDesign > tradeMarks) {
                    largestIntellectualProperty = "Industrial Design";
                }
                else {
                    largestIntellectualProperty = "Trade Marks";
                }
            }
            else {
                if (copyRights > tradeMarks) {
                    largestIntellectualProperty = "Copy Rights";
                }
                else {
                    largestIntellectualProperty = "Trade Marks";
                }
            }
        }
        // Now we have largest Intellectual Property, so we will show that property
        if (largestIntellectualProperty === "Patents") {
            // select national patent is high or international patent is high
            if (Intellectual_Property.Patents ? Intellectual_Property.Patents.length : 0 > Intellectual_Property.International_Patents ? Intellectual_Property.International_Patents.length : 0) {
                setTabOptions({
                    ...TabOptions,
                    profile_tab: false,
                    analysis_tab: false,
                    allProjects_tab: false,
                    researchProjects_International_tab: false,
                    researchProjects_National_tab: false,
                    industrialProjects_National_tab: false,
                    industrialProjects_International_tab: false,
                    publications_Articles_tab: false,
                    publications_Books_tab: false,
                    publications_Chapters_tab: false,
                    Conference_tab: false,
                    Patents_National_tab: true,
                    Patents_International_tab: false,
                    Intellectual_Property_tab: false,
                    Training_Conducted_tab: false,
                    Training_Attended_tab: false,
                    Supervision_PHD_tab: false,
                    Supervision_Masters_tab: false,
                    Editorial_Board_tab: false,
                    Copyright_tab: false,
                    Industrial_Design_tab: false,
                    Trade_Marks_tab: false,



                })
            }
            else {
                setTabOptions({
                    ...TabOptions,
                    profile_tab: false,
                    analysis_tab: false,
                    allProjects_tab: false,
                    researchProjects_International_tab: false,
                    researchProjects_National_tab: false,
                    industrialProjects_National_tab: false,
                    industrialProjects_International_tab: false,
                    publications_Articles_tab: false,
                    publications_Books_tab: false,
                    publications_Chapters_tab: false,
                    Conference_tab: false,
                    Patents_National_tab: false,
                    Patents_International_tab: true,
                    Intellectual_Property_tab: false,
                    Training_Conducted_tab: false,
                    Training_Attended_tab: false,
                    Supervision_PHD_tab: false,
                    Supervision_Masters_tab: false,
                    Editorial_Board_tab: false,
                    Copyright_tab: false,
                    Industrial_Design_tab: false,
                    Trade_Marks_tab: false,
                })
            }
        }
        else if (largestIntellectualProperty === "Industrial Design") {
            setTabOptions({
                ...TabOptions,
                profile_tab: false, analysis_tab: false,
                allProjects_tab: false,
                researchProjects_International_tab: false,
                researchProjects_National_tab: false,
                industrialProjects_National_tab: false,
                industrialProjects_International_tab: false,
                publications_Articles_tab: false,
                publications_Books_tab: false,
                publications_Chapters_tab: false,
                Conference_tab: false,
                Patents_National_tab: false,
                Patents_International_tab: false,
                Intellectual_Property_tab: false,
                Training_Conducted_tab: false,
                Training_Attended_tab: false,
                Supervision_PHD_tab: false,
                Supervision_Masters_tab: false,
                Editorial_Board_tab: false,
                Industrial_Design_tab: true,
                Trade_Marks_tab: false,
            })
        }
        else if (largestIntellectualProperty === "Copy Rights") {
            setTabOptions({
                ...TabOptions,
                profile_tab: false,
                analysis_tab: false,
                allProjects_tab: false,
                researchProjects_International_tab: false,
                researchProjects_National_tab: false,
                industrialProjects_National_tab: false,
                industrialProjects_International_tab: false,
                publications_Articles_tab: false,
                publications_Books_tab: false,
                publications_Chapters_tab: false,
                Conference_tab: false,
                Patents_National_tab: false,
                Patents_International_tab: false,
                Intellectual_Property_tab: false,
                Training_Conducted_tab: false,
                Training_Attended_tab: false,
                Supervision_PHD_tab: false,
                Supervision_Masters_tab: false,
                Editorial_Board_tab: false,
                Copyright_tab: true,
                Industrial_Design_tab: false,
                Trade_Marks_tab: false,
            })
        }
        else if (largestIntellectualProperty === "Trade Marks") {
            setTabOptions({
                ...TabOptions,
                profile_tab: false,
                analysis_tab: false,
                allProjects_tab: false,
                researchProjects_International_tab: false,
                researchProjects_National_tab: false,
                industrialProjects_National_tab: false,
                industrialProjects_International_tab: false,
                publications_Articles_tab: false,
                publications_Books_tab: false,
                publications_Chapters_tab: false,
                Conference_tab: false,
                Patents_National_tab: false,
                Patents_International_tab: false,
                Intellectual_Property_tab: false,
                Training_Conducted_tab: false,
                Training_Attended_tab: false,
                Supervision_PHD_tab: false,
                Supervision_Masters_tab: false,
                Editorial_Board_tab: false,
                Industrial_Design_tab: false,
                Trade_Marks_tab: true,
            })
        }

    }

    // bar charts modal
    const [modal, setModal] = useState(false);

    const toggleModal = (chart) => {
        setModal(!modal);
    }

    // Define settings for a slider component
    const research_settings = {
        className: "Slider_Card", // Class name for the slider component
        slidesToShow: 3, // Number of slides to show at once
        slidesToScroll: 3, // Number of slides to scroll at a time
        infinite: true, // Whether the slider should loop infinitely
        lazyLoad: true, // Whether to lazy-load images for better performance
        autoplay: true, // Whether to autoplay the slider
        speed: 1000, // Speed of the slider animation
        autoplaySpeed: 4000, // Time between autoplay slides
        cssEase: "linear", // Type of easing for slider animation
        pauseOnHover: true, // Whether to pause the slider on hover
        rows: 1, // Number of rows for the slider
    };
    // Define state variables with initial values using the useState hook
    // This hook contains code for amount granted to projects, which is displayed on the home screen of profile
    const [AmountGranted, setAmountGranted] = useState(0); // Amount granted for a project

    // This hook is used for deciding, which Sub-Tabs of Profile Tab should be displayed
    const [profileData, setProfileData] = useState({ // Data for a user profile
        Qualifications: false, // For displaying Qualifications
        Experience: false, // For Displaying Experience
        Awards: false, // For Displaying Awards Section
        Talks: false, // For Displaying Invited Speaker Section
        Memberships: false, // For Displaying Memberships Section
    });

    // Below Code is contain different states for showing different option Tabs on the left side of profile, below the image of Faculty Member.
    // e.g, Tabs of Qualifications, Experiences, Publications, etc.
    // Their usage can be seen in dive containing "Options" class. These states are being used for conditional rendering of different dives
    // to give different options to user based on data returned by API.
    const [CollapseOptions, setOptions] = useState({ // Options for collapsing sections
        project_options: false,
        research_project_options: false,
        industrial_project_options: false,
        publications_options: false,
        patents_options: false,
        supervised_projects_options: false,
        training_options: false,
        ip_options: false,
        National_research_options: false,
        International_research_options: false,
        National_Industrial_options: false,
        International_Industrial_options: false,
        Profile_options: false,
    });

    // Below Code is contain different states for showing different windows on the right side of profile.
    // e.g, List of Qualifications, Experiences, Publications, etc.
    // Their usage can be seen in dive containing "Main_Body" class. These states are being used for conditional rendering of different dives
    // based on options selected by the user.
    const [TabOptions, setTabOptions] = useState({ // Options for different tabs
        profile_tab: false,
        analysis_tab: true,
        allProjects_tab: false,
        researchProjects_International_tab: false,
        researchProjects_National_tab: false,
        industrialProjects_National_tab: false,
        industrialProjects_International_tab: false,
        publications_Articles_tab: false,
        publications_Books_tab: false,
        publications_Chapters_tab: false,
        Conference_tab: false,
        Patents_National_tab: false,
        Patents_International_tab: false,
        Intellectual_Property_tab: false,
        Training_Conducted_tab: false,
        Training_Attended_tab: false,
        Supervision_PHD_tab: false,
        Supervision_Masters_tab: false,
        Editorial_Board_tab: false,
        Copyright_tab: false,
        Industrial_Design_tab: false,
        Trade_Marks_tab: false,
    });

    // This state array contains images of Universities, with whom faculty member has worked with.
    // This is only visible when Google Cloud API Key is added in the "fetchData" function.
    const [Research_Images, setResearch_Images] = useState([]); // Images for research projects

    // There are two main types of Projects.
    // 1. Research
    // 2. Industry
    //
    // Below state is dividing Research Projects in two different groups, National and International
    const [Project_Research, setProject_Research] = useState({ // Data for research projects
        National: [],
        International: [],
    });

    // Below state is dividing Industry Projects in two different groups, National and International
    const [Project_Industry, setProject_Industry] = useState({ // Data for industry projects
        National: [],
        International: [],
    });
    const [Research_Articles, setResearch_Articles] = useState([]); // State Holding array of research articles
    const [Book_Chapters, setBook_Chapters] = useState([]); // State Holding array of Book Chapter
    const [publications_data, setPublications] = useState({}); // State Holding array of Publications
    const [Books, setBooks] = useState([]); // State Holding array of Books

    // This state holds different types of intellectual properties - Patents, Industrial Design, Copy Rights, and trademarks - as empty arrays.
    const [Intellectual_Property, setIntellectual_Property] = useState({
        Patents: [],
        Industrial_Design: [],
        Copy_Rights: [],
        Trade_Marks: [],
    }); // State Holding different Types of IPs

    // PhD and MS Supervisions are displayed on the portal and this state object is holding those arrays
    const [Supervision, setSupervision] = useState({
        PHD: [],
        Masters: [],
    });// State Holding different Types of Supervisions

    const [Project_Pie_Chart_Date, setProject_Pie_Chart_Date] = useState({}); // // State Holding data for Project Pie Chart
    const [Publications_Pie_Chart_Date, setPublications_Pie_Chart_Date] = useState({}); // State Holding data for Publications Pie Chart
    // Scopus ID is found on runtime, through DOI of Publications and this state is responsible for holding that ID
    const [ScopusID, setScopusID] = useState("");
    // State to hold total Citations of Publications
    const [Citations, setCitations] = useState(0);
    const sliderInfo = useRef({
        "linksArray": [],
        "counter": 0,
    });
    // This state is not being used yet, but is intended to flag out if image fetch is complete or not, for slider.
    const [fetchedImagesComplete, setFetchedImages] = useState(false);

    //Managing Projects for Displaying
    const [projects_data, setProjects] = useState({});

    let temp_amount = 0;

    // This function receives an image URL and retrieves that image from Internet
    const fetchImage = async (
        image_URL //Image URL Passed
    ) => {
        await fetch(image_URL) // Fetching Image from URL
            .then(async response => {
                if (response.status === 200) { // Checking Response Status
                    const imageBlob = await response.blob(); // Converting Response to Blob
                    const imageObjectURL = URL.createObjectURL(imageBlob); // Creating Image Object URL
                    setResearch_Images(prevState => { return ([...prevState, imageObjectURL,]) }); //Updating State to, which will eventually show images on slider on profile Page.
                }
                else {
                    return Promise.reject(response); // Error in fetching the image, so rejecting the response
                }
            })
            .catch(error => {
                // console.error('There was an error!', error);
            }
            );

    }

    // This function is responsible for fetching google response from given keyword.
    //  University names are passed to this function and this function is responsible for fetching the response from Google
    const fetchData = async (query) => {
        const CSE_ID = 'd06601e240fe24053'; // Google Search Engine ID. This ID is unique with each user account, so it can't be used with any other account
        // This should be changed when a new developer works on it. Otherwise, the slider will not work
        const API_KEY = 'AIzaSyDqZ7TrcdXktx2VglZAoBGdCSLlKDIeUVU'; // This is the API key, this key enables and counts, how many requests have been sent to
        // Without this key, google search will not happen. There are only 100 free requests against
        // each API key, so whenever this count reaches new API key should be added.

        // URL to search to google for given keyword
        await fetch(`https://customsearch.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CSE_ID}&q=${query} Logo&searchType=image`)
            .then(response => {
                // Extracting information from google response
                if (response.status === 200) {
                    return response.json()
                }
                return Promise.reject(response);
            })
            .then((data) => {
                // Checking if the current Image URL is already presesnt in fetched array, if not then add it otherwise don't do any action on it and just return.
                // Taking only the first element of array
                if (sliderInfo.current.linksArray.includes(data.items[0].link)) return
                sliderInfo.current.linksArray.push(data.items[0].link);

                // Passing URL to another function to fetch image from this URL
                fetchImage(data.items[0].link)
            })
            .catch((error) => {
                // console.log(error);
            })
    };
    // This function is responsible for fetching the Scopus Link of am employee and it takes in Paper DOI
    const fetchScopusInfo = async (article_DOI) => {
        // let returnValue=false;

        // This link is calling the backend and that backend will fetch the Scopus ID of Faculty Member
        fetch("http://localhost:8000/api/Author", {
            method: 'post',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                'DOI': `${article_DOI}`
            })
        }).then(response => {
            if (response.status === 200) {
                response = response.json();
                return response;
            }
            else {
                return Promise.reject(response);
            }
        }).then(data => {
            // All authors if Paper found, now finding our faculty member
            const authors = data["abstracts-retrieval-response"]["authors"]["author"];

            // Loop over all faculty members
            authors.map((author) => {
                let old_name = profile[0].Name.split(" ");

                // Converting Faculty Name to Sentence Case.
                let new_name = old_name.map(part => {
                    return part.toLowerCase().charAt(0).toUpperCase() + part.slice(1).toLowerCase();
                })
                // Joining Parts of Name to create a new Name
                new_name = new_name.join(' ')
                // Matching Names to find the ID
                if (new_name === author["ce:given-name"] + " " + author["ce:surname"]) {
                    setScopusID(() => { return (author["@auid"]) })
                }
                else if (new_name.includes(author["ce:given-name"]) || new_name.includes(author["ce:surname"])) {
                    setScopusID(() => { return (author["@auid"]) })
                }
            })
        })
    }

    // THis function is responsible for updating the state variable, which holds data for Projects Pie Chart
    async function UpdateProjectPiData(type) {
        // If project type is "National", add it to National State Array
        if (type === "National") {
            await setProject_Pie_Chart_Date((prev) => {
                if (prev['National Projects'] === undefined) {
                    return (
                        { ...prev, 'National Projects': 1 }
                    )
                }
                return (
                    { ...prev, 'National Projects': prev['National Projects'] + 1 }
                )
            })
        }

        // If project type is "International", add it to "International" State Array
        else {
            await setProject_Pie_Chart_Date((prev) => {
                if (prev['International Projects'] === undefined) {
                    return (
                        { ...prev, 'International Projects': 1 }
                    )
                }
                return (
                    { ...prev, 'International Projects': prev['International Projects'] + 1 }
                )
            })
        }
    }

    // THis function is responsible for updating the state variable, which holds data for Publications Pie Chart
    async function UpdatePublicationPiData(type, length) {
        // Pie Chart data for Publications, there are four main types and there is a state array associated with each type
        // whenever a type matches with any Type array, it is put in that array.
        if (type === "Conferences") {
            await setPublications_Pie_Chart_Date(prevState => {
                if (length === 0)
                    return prevState
                return { ...prevState, 'Conference Proceedings': length }
            })
        }
        else if (type === "Chapter") {
            await setPublications_Pie_Chart_Date(prevState => {
                return { ...prevState, 'Chapters': length }
            })
        }
        else if (type === "Book") {
            await setPublications_Pie_Chart_Date(prevState => {
                return { ...prevState, 'Books': length }
            })
        }
        else if (type === "Article") {
            await setPublications_Pie_Chart_Date(prevState => {
                if (prevState["Articles"] === undefined)
                    return { ...prevState, 'Articles': length }
                return { ...prevState, 'Articles': prevState["Articles"] + length }
            })
        }
    }

    // This method is responsible for, separating the publications based on year, which will be shown on table on the Home Page of Profile
    // This method also calculates total citations of all articles. This was the main reason, this method was separated, doing all work in single loop
    const separations_data = (publication) => {
        let citations = 0;
        publication.map((article) => {
            citations = Number(article.Citations) + citations;
            // If publicaion year exists, then increment it otherwise add it in state array and put its value to 1
            if (publications_data.hasOwnProperty(article.Publication_year)) {
                publications_data[article.Publication_year] += 1;
                setPublications({ ...publications_data });
            } else {
                publications_data[article.Publication_year] = 1;
                setPublications({ ...publications_data });
            }
        });
        setCitations(prevState => prevState + citations);
    }
    useEffect(() => {
        // This is just mapping over the array of passed Supervisions, and separate separating the Master supervisions from PHD
        supervisions.map((supervision) => {
            if (supervision.Degree === "Doctoral") {
                setSupervision((prev) => ({
                    ...prev,
                    PHD: [...prev.PHD, supervision],
                }));
            }
            else if (supervision.Degree === "Post Graduate") {
                setSupervision((prev) => ({
                    ...prev,
                    Masters: [...prev.Masters, supervision],
                }));
            }
        })
    }, [supervisions]);

    useEffect(() => {
        // Sorting out the array of passed of IPs, before separating based on its categories
        ips.sort((a, b) => (a.Approval_Date < b.Approval_Date) ? 1 : -1);
        // Mapping over the array of IPs, and separating based on the Type of IPs
        ips.map((ip) => {
            if (ip.Type === "Patent") {
                setIntellectual_Property((prev) => ({
                    ...prev,
                    Patents: [...prev.Patents, ip]
                }));
            }
            else if (ip.Type === "Industrial Design") {
                setIntellectual_Property((prev) => ({
                    ...prev,
                    Industrial_Design: [...prev.Industrial_Design, ip],
                }));
            }
            else if (ip.Type === "Copyright") {
                setIntellectual_Property((prev) => ({
                    ...prev,
                    Copy_Rights: [...prev.Copy_Rights, ip],
                }));
            }
            else if (ip.Type === "Trademark") {
                setIntellectual_Property((prev) => ({
                    ...prev,
                    Trade_Marks: [...prev.Trade_Marks, ip],
                }));
            }
        })
    }, [ips]);

    useEffect(() => {

        // Sorting out Publications before further processing
        const values = Object.values(publications);
        for (let i = 0; i < values.length; i++) {
            values[i].sort((a, b) => (a.Publication_year < b.Publication_year) ? 1 : -1);
        }

        // This loop is responsible for calling the function which finds the Scopus ID.
        // Finding Articles Array
        if (publications.hasOwnProperty("Article")) {
            const article_array = publications["Article"];
            for (let i = article_array.length - 1; i > 0; i--) {
                // looping over articles array and finding the proper article for searching on Scopus
                if (article_array[i]["Publication_year"] === "") continue // If there is no publication year, then don't use this paper
                if (article_array[i]["Indexation"] === "HEC - W Cat") { // If Paper has indexation type of "HEC - W Cat", then proceed
                    const DOI = article_array[i]["DOI"].replace("DOI ", "").replace("DOI", "").replace("doi ", "").replace("doi", "") // Cleaning DOI
                    if (DOI.includes("https://") || DOI.includes("http://")) { // Separating and creating a new DOI from existing one
                        const split = DOI.split("/");
                        let doi = "";
                        for (let j = 0; j < split.length; j++) {
                            if (j < 3) {
                                continue;
                            }
                            else {
                                if (j === split.length - 1) {
                                    doi += split[j];
                                }
                                else {
                                    doi = doi + split[j] + "/";
                                }
                            }
                        }
                        // Passing the DOI to method to find its Scopus Link
                        fetchScopusInfo(doi).then();
                    }
                    else {
                        // If DOI is already of in the required form, don't change it just pass it to fetch function and it will do the job for you.
                        fetchScopusInfo(DOI).then()
                    }
                    break;
                }
            }
        }

        // Publications array contains differnt types of objects, now separating these objects in separate State arrays.
        for (let prop in publications) {

            if (prop === "Data Paper") {
                continue;
            }
            else if (prop === "Book Chapter") {
                UpdatePublicationPiData("Chapter", publications[prop].length)
                    .then(() => {
                        setBook_Chapters(publications[prop]);
                    });
            }
            else if (prop === "Book") {
                UpdatePublicationPiData("Book", publications[prop].length).then(() => {
                    setBooks(publications[prop]);
                })
            }
            else {
                UpdatePublicationPiData("Article", publications[prop].length).then(
                    () => {
                        setResearch_Articles(prevState => [...prevState, ...publications[prop]]);
                    }
                );
            }
            // Finding Author's Universities and then sending those names to function responsible for fetching Image URLs of Co-Author Working Universities
            publications[prop].map((item) => {
                if (sliderInfo.current.counter < 20) {
                    if (item.Co_Authors_Affiliations.length !== 0) {
                        item.Co_Authors_Affiliations.map((co_author) => {
                            fetchData(co_author).then(
                                () => {
                                    sliderInfo.current.counter++;
                                });
                        })
                    }
                }
            });
            // setFetchedImages(true);
            // Calling Method which separates the data based on Publication Year
            separations_data(publications[prop]);
        }

    }, [publications]);

    useEffect(() => {

        // Sorting Out Projects Before further processing
        projects.sort((a, b) => (a.Approval_Date < b.Approval_Date) ? 1 : -1);

        /*
        There are two main categories of Projects:
        1. Research Projects
        2. Industry Projects
         */
        async function separateProjects() {
            // Mapping over all projects and separating Research and Industrial Projects
            await projects.map((project) => {
                // This condition represents Industrial Projects
                if (project.Sector === "Consultancy/Industrial/Sipi-Off") {
                    // Now Checking if the project is International or Not.
                    // Add it to appropriate state array based on value
                    if (project.Funding_From_Agency.trim().includes("International")) {
                        // First passing the data to Pie Chart function, which retrieves data for Pie Chart from this Project Object and then updating the state array
                        UpdateProjectPiData("International").then(() => {
                            setProject_Industry((prev) => ({
                                ...prev,
                                International: [...prev.International, project],
                            }));
                        })
                    }
                    else {
                        // First passing the data to Pie Chart function, which retrieves data for Pie Chart from this Project Object and then updating the state array
                        UpdateProjectPiData("National").then(() => {
                            setProject_Industry((prev) => ({
                                ...prev,
                                National: [...prev.National, project],
                            }));
                        })


                    }
                }
                // Else it is a Research Project
                else {
                    if (project.Funding_From_Agency.trim().includes("International")) {
                        // Now Checking if the project is International or Not.
                        // Add it to appropriate state array based on value
                        UpdateProjectPiData("International").then(() => {
                            // First passing the data to Pie Chart function, which retrieves data for Pie Chart from this Project Object and then updating the state array
                            setProject_Research((prev) => {
                                return ({
                                    ...prev,
                                    International: [...prev.International, project]
                                })
                            }
                            );
                        })
                    }
                    else {
                        // First passing the data to Pie Chart function, which retrieves data for Pie Chart from this Project Object and then updating the state array
                        UpdateProjectPiData("National").then(() => {
                            setProject_Research((prev) => {
                                return ({
                                    ...prev,
                                    National: [...prev.National, project]
                                })
                            });
                        })
                    }
                }
                // Now separating projects based on year, for displaying yearly projects on graph on home Page of profile
                if (projects_data.hasOwnProperty(project.Approval_Date.substring(0, 4))) {
                    projects_data[project.Approval_Date.substring(0, 4)] += 1;
                    setProjects({ ...projects_data });
                }
                else {
                    projects_data[project.Approval_Date.substring(0, 4)] = 1;
                    setProjects({ ...projects_data });
                }
                // Calculating amount granted to faculty member
                // eslint-disable-next-line react-hooks/exhaustive-deps
                temp_amount = temp_amount + Number((project.Cost_in_PKR / 1000000).toFixed(2));
            });
        }

        // Calling above method and then setting up the amount granted to faculty member
        separateProjects().then(() => {
            temp_amount = temp_amount.toFixed(1);
            setAmountGranted(temp_amount)
        });
    }, [projects]);

    useEffect(() => {
        // Passing Conferences array to Publications Pie Chart function for adding it to Pie Chart
        UpdatePublicationPiData("Conferences", conferences.length).then()
        let citations = 0;

        // Sorting out Conferences array before performing any functionalities over it.
        conferences.sort((a, b) => (a.Year < b.Year) ? 1 : -1);
        // Mapping over the array and separating each conference based on year
        // also calculating total citations by accumulating citations of each conference and adding it to total citations state variable
        conferences.map((conference) => {
            if (publications_data.hasOwnProperty(conference.Year)) {
                publications_data[conference.Year] += 1;
                setPublications({ ...publications_data });
            } else {
                publications_data[conference.Year] = 1;
                setPublications({ ...publications_data });
            }
            citations = Number(conference.Citations) + citations;
        });
        setCitations(prevState => prevState + citations);

    }, [conferences]);

    // This useEffect is not complete yet.
    useEffect(() => {
        console.log("Fetched Images: ", fetchedImagesComplete);
        if (fetchedImagesComplete && Research_Images.length < 3) {
            console.log("Fetched Images Copmleted: ", fetchedImagesComplete);




            /*
            Update This Portion
             */




        }
    }, [fetchedImagesComplete]);

    // This method is called whenever "Download CV" button is clicked on Profile Page and it is also responsible for creating PDF for CV
    const openCV = () => {
        const check = document.getElementById('roundImageFaculty');
        check.style.backgroundColor = 'transparent';

        html2canvas(check, { backgroundColor: null }).then((canvas) => {
            const ctx = canvas.getContext('2d');

            // Set canvas background to transparent
            // ctx.clearRect(10, 10, canvas.width, canvas.height);

            const imgData = canvas.toDataURL("image/png");

            // const pdf = new jsPDF("p", "mm", "a4");
            // Creating PDF Object
            const doc = new jsPDF('p', 'pt', 'a4');
            //Working on waterMark of page
            // for (let i = 1; i <= doc.getNumberOfPages(); i++) {
            //     doc.setPage(i);
            //     doc.addImage(nustLogo2, 'PNG', 0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height);
            //   }


            // Calculate the width of the text field based on the length of the profile name
            const nameTextWidth = doc.getTextWidth(profile[0].Name);
            console.log("nameTextWidth:", nameTextWidth);

            // Assume profile[0] contains user data including email and Twitter handle
            let hasEmail = profile[0].e_mail.trim() !== "";
            let hasTwitter = profile[0].twitter_URL.trim() !== "";
            let hasLinkedin = profile[0].linkedin_URL.trim() !== "";
            let hasPhone = profile[0].Work_Phone.trim() !== "";


            let rect1Width = 595;
            let rect1Height = 125;


            // Check if the name fits in one line
            if (nameTextWidth <= 250) {
                // Check for the presence of email, phone, twitter, and LinkedIn
                if (hasEmail && hasPhone && !hasLinkedin && !hasTwitter) {
                    rect1Height = 150;
                } else if (hasEmail && hasPhone && hasLinkedin && !hasTwitter) {
                    rect1Height = 180;
                } else if (hasEmail && hasPhone && !hasLinkedin && hasTwitter) {
                    rect1Height = 180;
                } else if (hasEmail && hasPhone && hasLinkedin && hasTwitter) {
                    rect1Height = 210;
                }
            } else {
                // If the user has more than one line of text in their name, check if they have email, phone, LinkedIn, and Twitter
                if (hasEmail && hasPhone && !hasLinkedin && !hasTwitter) {
                    rect1Height = 180;
                } else if (hasEmail && hasPhone && hasLinkedin && !hasTwitter) {
                    rect1Height = 160;
                } else if (hasEmail && hasPhone && !hasLinkedin && hasTwitter) {
                    rect1Height = 160;
                } else if (hasEmail && hasPhone && hasLinkedin && hasTwitter) {
                    rect1Height = 190;
                }
            }
            // // If the user has both an email and a Twitter handle, increase the dimensions of the blue area
            // if (hasEmail && hasPhone && !hasLinkedin && !hasTwitter) {
            //     rect1Width = 595;
            //     rect1Height = 130;

            // } else if (hasEmail && hasPhone && hasLinkedin && !hasTwitter) {
            //     rect1Width = 595
            //     rect1Height = 180
            // } else if (hasEmail && hasPhone && !hasLinkedin && hasTwitter) {
            //     rect1Width = 595
            //     rect1Height = 180
            // } else if (hasEmail && hasPhone && hasLinkedin && hasTwitter) {
            //     rect1Width = 595
            //     rect1Height = 210
            // }

            // X-Axis and Y-Axis Positions of To Blue Area of CV
            let rect1X = 0;
            const rect1Y = 0;
            // const rect1Width = 595;
            // const rect1Height = 230;
            // Draw the Header Rectangle
            doc.setFillColor(91, 126, 222);
            doc.rect(rect1X, rect1Y, rect1Width, rect1Height, 'F');

            // Fill the rectangle with text
            // Now adding Text on Blue Rectangle
            doc.setFontSize(30);
            doc.setTextColor(255, 255, 255);
            doc.text(
                `${profile[0].Name}`,  // Text to be Displayed
                20,  // x-axis position
                rect1Y + 40, // y-axis position
                { maxWidth: 420 } // maximum width of text field box
            );
            let y;
            // Calculating how many lines text will take if we specify width size to 320
            if (doc.splitTextToSize(profile[0].Name, 420).length === 1) {
                y = 60;
            }
            else {
                y = doc.splitTextToSize(profile[0].Name, 420).length * 25 + 40;
            }
            doc.setFontSize(12);
            doc.text(
                `${profile[0].Work_Position}`, // Text to be Displayed
                20, // x-axis position
                y, // y-axis position
                { maxWidth: 320 } // maximum width of text field box
            );
            doc.text(
                `${profile[0].School}`, // Text to be Displayed
                20, // x-axis position
                y + 20, // y-axis position
                { maxWidth: 320 } // maximum width of text field box
            );



            // Adding Image to PDF
            if (rect1Height <= 130) {
                doc.addImage(imgData, "PNG", 465, 15, 100, 100, "Image of Faculty Member", "NUST");
            }
            else if (rect1Height <= 180) {
                doc.addImage(imgData, "JPEG", 465, 26, 100, 100, "Image of Faculty Member", "NUST");
            }
            else if (rect1Height <= 210) {
                doc.addImage(imgData, "JPEG", 440, 40, 125, 125, "Image of Faculty Member", "NUST");
            }
            else if (rect1Height <= 230) {
                doc.addImage(imgData, "JPEG", 450, 60, 150, 150, "Image of Faculty Member", "NUST");
            }



            // if (profile[0].Image_URL !== "") {
            //     const img = new Image();
            //     img.crossOrigin = "Anonymous";
            //     img.src = "data:image/png;base64," + atob(profile[0].Image_URL);
            //     doc.addImage(img, "JPEG", 450, 50, 125, 125, "Image of Faculty Member", "NUST");
            // }

            // img.onload = function() {
            //     // const canvas = document.createElement('canvas');
            //     // const ctx = canvas.getContext('2d');

            //     // canvas.width = 125;
            //     // canvas.height = 125;

            //     // ctx.drawImage(img, 0, 0,canvas.width,canvas.height);

            //     // const canvasData = canvas.toDataURL("image/jpeg");






            // }
            // img.onerror = function() {
            //     console.log("Error loading image:", img.src);
            // };


            // create a new canvas element

            //}



            // // add a red rectangle to the canvas
            // ctx.fillStyle = 'red';
            // ctx.fillRect(0, 0, canvas.width, canvas.height);

            // // add the canvas as an image to the PDF document
            // const canvasData = canvas.toDataURL('image/jpeg');
            // doc.addImage(canvasData, 'JPEG', 430, 50, 125, 125, "Image of Faculty Member", "NUST");






            /* Original */
            // Loading Image from bas14 code provided by the NUST Server
            // if(profile[0].Image_URL!=="") {
            //     const img = new Image();
            //     img.src = "data:image/png;base64," + atob(profile[0].Image_URL);

            //     doc.addImage(img, 'jpeg', 430, 50, 125, 125, "Image of Faculty Member", "NUST");
            // }


            /*
                Adding Contact Information and Social Media Links
             */
            // Code for adding Email with its logo
            //Write code to add Icon in PDF using JsPDF

            if (doc.splitTextToSize(profile[0].School, 320).length === 1) {
                y += 20;
            }
            else {
                y = doc.splitTextToSize(profile[0].School, 320).length * 20 + y;
            }

            if (profile[0].e_mail.trim() !== "") {
                doc.addImage(Email, "JPEG", rect1X + 10, y, 40, 25);
                //write code to add text on the right side of this image
                doc.text(`${profile[0].e_mail}`, rect1X + 50, y + 18, { maxWidth: 320 });
            }

            // // Code for adding Phone with its logo
            // //Write code to add Icon in PDF using JsPDF
            // y=doc.splitTextToSize(profile[0].e_mail,320).length*20+120;
            if (doc.splitTextToSize(profile[0].e_mail, 320).length === 1) {
                y += 28;
            }
            else {
                y = doc.splitTextToSize(profile[0].e_mail, 320).length * 28 + y;
            }
            if (profile[0].Work_Phone.trim() !== "") {
                doc.addImage(Phone, "JPEG", rect1X + 20, y, 20, 13);
                //write code to add text on the right side of this image
                doc.text(`${profile[0].Work_Phone}`, rect1X + 50, y + 10, { maxWidth: 320 });
            }
            // Code for adding LinkedIn with its logo
            //Write code to add Icon in PDF using JsPDF

            if (doc.splitTextToSize(profile[0].Work_Phone, 320).length === 1) {
                y += 25;
            }
            else {
                y = doc.splitTextToSize(profile[0].Work_Phone, 320).length * 25 + y;
            }
            if (profile[0].linkedin_URL.trim() !== "") {
                doc.addImage(Linked, "JPEG", rect1X + 15, y, 30, 22);
                //write code to add text on the right side of this image
                doc.text(`${profile[0].linkedin_URL}`, rect1X + 50, y + 12, { maxWidth: 300 });
            }
            // Code for adding Twitter with its logo
            //Write code to add Icon in PDF using JsPDF
            if (doc.splitTextToSize(profile[0].linkedin_URL, 320).length === 1) {
                y += 25;
            }
            else {
                y = doc.splitTextToSize(profile[0].linkedin_URL, 320).length * 25 + y;
            }
            if (profile[0].twitter_URL.trim() !== "") {
                doc.addImage(Twitter, "JPEG", rect1X + 18, y, 25, 20);
                //     write code to add text on the right side of this image
                doc.text(`${profile[0].twitter_URL}`, rect1X + 50, y + 15, { maxWidth: 300 });
            }
            /*
                Now Adding, Education, Experience, and Awards
             */

            // These are the variables for determining the position of the text in complete CV
            /*
                lastFieldHeight ==> This variable represents the starting height of new section after adding some spaces
                to final position of last section.
                title ==> Will hold the heading text of section.
             */
            let lastFieldHeight = rect1Height + 30;
            let title = "";
            let heading_x_axis = 0;
            let printing_string = "";

            // Below is the procedure to write Qualifications, it is same for all other sections of CV
            /*
                If qualifications are provided, then first add its heading, then find height of heading after that add '5'
                pixels more to it and start adding fields of this section.
             */
            if (profile[0].Qualifications.length > 0) {

                doc.setFontSize(15);
                doc.setTextColor(0, 0, 0);
                title = "Qualifications";
                doc.setFont("helvetica", "bolditalic");
                doc.text(title, rect1X + 20, lastFieldHeight);
                doc.setFont("helvetica", "normal");
                lastFieldHeight += doc.getTextDimensions(title).h + 5;
                profile[0].Qualifications.map((qualification, index) => {
                    if ((index + 1) >= 10) {
                        heading_x_axis = 35;
                    }
                    else {
                        heading_x_axis = 40;
                    }
                    doc.setFontSize(11);
                    doc.setTextColor(0, 0, 0);
                    doc.text(`${index + 1}. ${qualification.Degree}, ${qualification.speciality}`, heading_x_axis, lastFieldHeight, { maxWidth: 450 });
                    doc.setFontSize(8);
                    doc.setTextColor(0, 0, 0);

                    /*
                        Find the height of sub-field and add '5' pixels to it, then add its description
                     */
                    lastFieldHeight += (doc.splitTextToSize(`${index + 1}. ${qualification.Degree}, ${qualification.speciality}`, 450).length) * 10;
                    printing_string = `${qualification.Institution} (${qualification.Starting_Year} - ${qualification.Ending_Year})`.replace(/^\s*\n/gm, "").trim()
                    doc.text(printing_string, 53, lastFieldHeight, { maxWidth: 400 });
                    /*
                        After adding one field completely along with its description, add '20' pixel gap to start adding new fields
                     */
                    printing_string = `${qualification.Institution} (${qualification.Starting_Year} - ${qualification.Ending_Year})`.replace(/^\s*\n/gm, "").trim()
                    if ((doc.splitTextToSize(`${qualification.Institution} (${qualification.Starting_Year} - ${qualification.Ending_Year})`, 450).length === 1)) {
                        lastFieldHeight += (doc.splitTextToSize(`${qualification.Institution} (${qualification.Starting_Year} - ${qualification.Ending_Year})`, 450).length) + 18;
                    }
                    else {
                        lastFieldHeight += (doc.splitTextToSize(`${qualification.Institution} (${qualification.Starting_Year} - ${qualification.Ending_Year})`, 450).length * 4) + 18;

                    }

                })
            }

            // Same procedure is repeated for below loops. This can be optimized based and duplicate can be moved to a single function performing the tasks
            if (profile[0].Experience.length > 0) {
                lastFieldHeight = lastFieldHeight + 10;
                doc.setFontSize(15);
                doc.setTextColor(0, 0, 0);
                title = "Experience";
                if (lastFieldHeight > (doc.getCurrentPageInfo()["pageContext"]["mediaBox"]["topRightY"] - 150)) {
                    doc.addPage('a4', 'portrait');
                    lastFieldHeight = 45;
                }
                doc.setFont("helvetica", "bolditalic");
                doc.text(title, rect1X + 20, lastFieldHeight);
                doc.setFont("helvetica", "normal");
                lastFieldHeight += doc.getTextDimensions(title).h + 5;
                profile[0].Experience.map((experience, index) => {
                    doc.setFontSize(11);
                    doc.setTextColor(0, 0, 0);
                    if ((index + 1) >= 10) {
                        heading_x_axis = 35;
                    }
                    else {
                        heading_x_axis = 40;
                    }
                    printing_string = `${index + 1}. ${experience.job_description} ( ${experience.Year_From} - ${experience.Year_To})`.replace(/^\s*\n/gm, "").trim()
                    doc.text(printing_string, heading_x_axis, lastFieldHeight, { maxWidth: 450 });
                    doc.setFontSize(8);
                    doc.setTextColor(0, 0, 0);
                    lastFieldHeight += doc.splitTextToSize(`${index + 1}. ${experience.job_description} ( ${experience.Year_From} - ${experience.Year_To})`, 450).length * 12;
                    printing_string = `${experience.org_name}`.replace(/^\s*\n/gm, "").trim()
                    doc.text(printing_string, rect1X + 55, lastFieldHeight, { maxWidth: 450 });
                    if ((doc.splitTextToSize(`${experience.org_name}`, 450).length === 1)) {
                        lastFieldHeight += (doc.splitTextToSize(`${experience.org_name}`, 450).length) + 18;
                    }
                    else {
                        lastFieldHeight += ((doc.splitTextToSize(`${experience.org_name}`, 450).length) * 4) + 18;
                    }
                }

                )
            }

            if (profile[0].Awards.length > 0) {
                lastFieldHeight = lastFieldHeight + 10;
                doc.setFontSize(15);
                doc.setTextColor(0, 0, 0);
                title = "Awards"
                if (lastFieldHeight > (doc.getCurrentPageInfo()["pageContext"]["mediaBox"]["topRightY"] - 150)) {
                    doc.addPage('a4', 'portrait');
                    lastFieldHeight = 45;
                }
                doc.setFont("helvetica", "bolditalic");
                doc.text(title, rect1X + 20, lastFieldHeight);
                doc.setFont("helvetica", "normal");
                lastFieldHeight += doc.getTextDimensions(title).h + 5;
                profile[0].Awards.map((award, index) => {
                    if (lastFieldHeight > (doc.getCurrentPageInfo()["pageContext"]["mediaBox"]["topRightY"] - 100)) {
                        doc.addPage('a4', 'portrait');
                        lastFieldHeight = 45;
                    }
                    doc.setFontSize(11);
                    doc.setTextColor(0, 0, 0);
                    if ((index + 1) >= 10) {
                        heading_x_axis = 35;
                    }
                    else {
                        heading_x_axis = 40;
                    }
                    printing_string = `${index + 1}. ${(award.Location).replace(":", "").replace("-", "")}`.replace(/^\s*\n/gm, "").trim()
                    doc.text(printing_string, heading_x_axis, lastFieldHeight, { maxWidth: 450 });
                    doc.setFontSize(8);
                    doc.setTextColor(0, 0, 0);
                    lastFieldHeight += doc.splitTextToSize(`${index + 1}. ${(award.Location).replace(":", "").replace("-", "")}`, 450).length * 12;
                    printing_string = `${award.Title} ${(award.Year) === "" ? "" : `(${award.Year})`}`.replace(/^\s*\n/gm, "").trim()
                    doc.text(printing_string, 53, lastFieldHeight, { maxWidth: 450 });
                    if ((doc.splitTextToSize(`${award.Title} ${(award.Year) === "" ? "" : `(${award.Year})`}`, 450).length === 1)) {
                        lastFieldHeight += (doc.splitTextToSize(`${award.Title} ${(award.Year) === "" ? "" : `(${award.Year})`}`, 450).length) + 18;
                    }
                    else {
                        lastFieldHeight += ((doc.splitTextToSize(`${award.Title} ${(award.Year) === "" ? "" : `(${award.Year})`}`, 450).length) * 4) + 18;
                    }
                })
            }

            if (profile[0].KeyNotes.length > 0) {
                lastFieldHeight = lastFieldHeight + 5;
                doc.setFontSize(15);
                doc.setTextColor(0, 0, 0);
                title = "Invited Talks & Key Note Speaker"
                if (lastFieldHeight > (doc.getCurrentPageInfo()["pageContext"]["mediaBox"]["topRightY"] - 150)) {
                    doc.addPage('a4', 'portrait');
                    lastFieldHeight = 45;
                }
                doc.setFont("helvetica", "bolditalic");
                doc.text(title, rect1X + 20, lastFieldHeight);
                doc.setFont("helvetica", "normal");
                lastFieldHeight += doc.getTextDimensions(title).h + 5;
                profile[0].KeyNotes.map((keyNotes, index) => {
                    if (lastFieldHeight > (doc.getCurrentPageInfo()["pageContext"]["mediaBox"]["topRightY"] - 100)) {
                        doc.addPage('a4', 'portrait');
                        lastFieldHeight = 45;
                    }
                    doc.setFontSize(11);
                    doc.setTextColor(0, 0, 0);
                    if ((index + 1) >= 10) {
                        heading_x_axis = 35;
                    }
                    else {
                        heading_x_axis = 40;
                    }
                    doc.text(`${index + 1}. ${keyNotes.Location} ${(keyNotes.Year) === "" ? "" : `(${keyNotes.Year})`}`, heading_x_axis, lastFieldHeight, { maxWidth: 450 });
                    doc.setFontSize(8);
                    doc.setTextColor(0, 0, 0);
                    lastFieldHeight += doc.splitTextToSize(`${index + 1}. ${keyNotes.Location} ${(keyNotes.Year) === "" ? "" : `(${keyNotes.Year})`}`, 450).length * 12;
                    doc.text(`${keyNotes.Title}`, 53, lastFieldHeight, { maxWidth: 450 });
                    if ((doc.splitTextToSize(`${keyNotes.Title}`, 450).length === 1)) {
                        lastFieldHeight += (doc.splitTextToSize(`${keyNotes.Title}`, 450).length) + 18;
                    }
                    else {
                        lastFieldHeight += ((doc.splitTextToSize(`${keyNotes.Title}`, 450).length) * 4) + 18;
                    }

                })
            }

            if (profile[0].Professional_Memberships_Registrations.length > 0) {
                lastFieldHeight = lastFieldHeight + 5;
                doc.setFontSize(15);
                doc.setTextColor(0, 0, 0);
                title = "Professional Memberships"
                if (lastFieldHeight > (doc.getCurrentPageInfo()["pageContext"]["mediaBox"]["topRightY"] - 150)) {
                    doc.addPage('a4', 'portrait');
                    lastFieldHeight = 45;
                }
                doc.setFont("helvetica", "bolditalic");
                doc.text(title, rect1X + 20, lastFieldHeight);
                doc.setFont("helvetica", "normal");
                lastFieldHeight += doc.getTextDimensions(title).h + 5;
                profile[0].Professional_Memberships_Registrations.map((memberships, index) => {
                    if (lastFieldHeight > (doc.getCurrentPageInfo()["pageContext"]["mediaBox"]["topRightY"] - 100)) {
                        doc.addPage('a4', 'portrait');
                        lastFieldHeight = 45;
                    }
                    doc.setFontSize(11);
                    doc.setTextColor(0, 0, 0);
                    if ((index + 1) >= 10) {
                        heading_x_axis = 35;
                    }
                    else {
                        heading_x_axis = 40;
                    }
                    doc.text(`${(index + 1) + ". Member of " + memberships.Name}`, heading_x_axis, lastFieldHeight, { maxWidth: 450 });
                    if ((doc.splitTextToSize(`${(index + 1) + ". Member of " + memberships.Name}`, 450).length === 1)) {
                        lastFieldHeight += (doc.splitTextToSize(`${(index + 1) + ". Member of " + memberships.Name}`, 450).length) + 18;
                    }
                    else {
                        lastFieldHeight += ((doc.splitTextToSize(`${(index + 1) + ". Member of " + memberships.Name}`, 450).length) * 4) + 18;
                    }

                })
            }

            /*
                Basic Profile Completed, Moving towards work profile
            */
            let common_index = 0;
            if (Project_Research.National.length > 0 || Project_Research.International.length > 0) {
                lastFieldHeight = lastFieldHeight + 10;
                doc.setFontSize(15);
                doc.setTextColor(0, 0, 0);
                title = "Research Projects";
                if (lastFieldHeight > (doc.getCurrentPageInfo()["pageContext"]["mediaBox"]["topRightY"] - 150)) {
                    doc.addPage('a4', 'portrait');
                    lastFieldHeight = 45;
                }
                doc.setFont("helvetica", "bolditalic");
                doc.text(title, rect1X + 20, lastFieldHeight);
                doc.setFont("helvetica", "normal");
                lastFieldHeight += doc.getTextDimensions(title).h + 5;
                common_index = 1;
            }

            if (Project_Research.National.length > 0) {
                lastFieldHeight = lastFieldHeight + 10;
                doc.setFontSize(14);
                doc.setTextColor(0, 0, 0);
                title = "National Projects";
                if (lastFieldHeight > (doc.getCurrentPageInfo()["pageContext"]["mediaBox"]["topRightY"] - 150)) {
                    doc.addPage('a4', 'portrait');
                    lastFieldHeight = 45;
                }
                doc.setFont("helvetica", "bolditalic");
                doc.text(title, rect1X + 20, lastFieldHeight);
                doc.setFont("helvetica", "normal");
                lastFieldHeight += doc.getTextDimensions(title).h + 5;

                Project_Research.National.map((researchProject, index) => {
                    if (lastFieldHeight > (doc.getCurrentPageInfo()["pageContext"]["mediaBox"]["topRightY"] - 100)) {
                        doc.addPage('a4', 'portrait');
                        lastFieldHeight = 45;
                    }
                    doc.setFontSize(11);
                    doc.setTextColor(0, 0, 0);
                    if ((index + 1) >= 10) {
                        heading_x_axis = 35;
                    }
                    else {
                        heading_x_axis = 40;
                    }
                    printing_string = `${index + 1}. ${researchProject.Title}`.replace(/^\s*\n/gm, "").trim()
                    doc.text(printing_string, heading_x_axis, lastFieldHeight, { maxWidth: 450 });
                    lastFieldHeight += doc.splitTextToSize(printing_string, 450).length * 12;
                    doc.setFontSize(8);
                    doc.setTextColor(0, 0, 0);
                    printing_string = `${researchProject.Funding_Agency.replace("+", "")}, Rs: ${(researchProject.Cost_in_PKR / 1000000).toFixed(2)}M, ${researchProject["Project_Status"] === "Completed" ? researchProject["Project_Status"] + " ( " + researchProject["Approval_Date"] + " - " + researchProject["Completion_Date"] + " )" : researchProject["Project_Status"].substring(11) + " ( " + researchProject["Approval_Date"] + " )"}`.replace(/^\s*\n/gm, "").trim()
                    doc.text(printing_string, 53, lastFieldHeight, { maxWidth: 450 });
                    if ((doc.splitTextToSize(printing_string, 450).length === 1)) {
                        lastFieldHeight += (doc.splitTextToSize(printing_string, 450).length) + 18;
                    }
                    else {
                        lastFieldHeight += ((doc.splitTextToSize(printing_string, 450).length) * 4) + 18;
                    }
                    common_index += 1;
                })
            }
            if (Project_Research.International.length > 0) {
                lastFieldHeight = lastFieldHeight + 10;
                doc.setFontSize(14);
                doc.setTextColor(0, 0, 0);
                title = "International Projects";
                if (lastFieldHeight > (doc.getCurrentPageInfo()["pageContext"]["mediaBox"]["topRightY"] - 150)) {
                    doc.addPage('a4', 'portrait');
                    lastFieldHeight = 45;
                }
                doc.setFont("helvetica", "bolditalic");
                doc.text(title, rect1X + 20, lastFieldHeight);
                doc.setFont("helvetica", "normal");
                lastFieldHeight += doc.getTextDimensions(title).h + 5;
                Project_Research.International.map((researchProject, index) => {
                    if (lastFieldHeight > (doc.getCurrentPageInfo()["pageContext"]["mediaBox"]["topRightY"] - 100)) {
                        doc.addPage('a4', 'portrait');
                        lastFieldHeight = 45;
                    }
                    doc.setFontSize(11);
                    doc.setTextColor(0, 0, 0);
                    if ((index + 1) >= 10) {
                        heading_x_axis = 35;
                    }
                    else {
                        heading_x_axis = 40;
                    }
                    printing_string = `${index + 1}. ${researchProject.Title}`.replace(/^\s*\n/gm, "").trim()
                    doc.text(printing_string, heading_x_axis, lastFieldHeight, { maxWidth: 450 });

                    lastFieldHeight += doc.splitTextToSize(printing_string, 450).length * 12;
                    doc.setFontSize(8);
                    doc.setTextColor(0, 0, 0);
                    printing_string = `${researchProject.Funding_Agency.replace("+", "")}, Rs: ${(researchProject.Cost_in_PKR / 1000000).toFixed(2)}M, ${researchProject["Project_Status"] === "Completed" ? researchProject["Project_Status"] + " ( " + researchProject["Approval_Date"] + " - " + researchProject["Completion_Date"] + " )" : researchProject["Project_Status"].substring(11) + " ( " + researchProject["Approval_Date"] + " )"}`.replace(/^\s*\n/gm, "").trim()

                    doc.text(printing_string, 40, lastFieldHeight, { maxWidth: 450 });
                    if ((doc.splitTextToSize(printing_string, 450).length === 1)) {
                        lastFieldHeight += (doc.splitTextToSize(printing_string, 450).length) + 18;
                    }
                    else {
                        lastFieldHeight += ((doc.splitTextToSize(printing_string, 450).length) * 4) + 18;
                    }
                    common_index += 1;
                })
            }

            if (Project_Industry.National.length > 0 || Project_Industry.International.length > 0) {
                lastFieldHeight = lastFieldHeight + 10;
                doc.setFontSize(18);
                doc.setTextColor(0, 0, 0);
                title = "Industry Projects"
                if (lastFieldHeight > (doc.getCurrentPageInfo()["pageContext"]["mediaBox"]["topRightY"] - 150)) {
                    doc.addPage('a4', 'portrait');
                    lastFieldHeight = 45;
                }
                doc.setFont("helvetica", "bolditalic");
                doc.text(title, rect1X + 20, lastFieldHeight);
                doc.setFont("helvetica", "normal");
                lastFieldHeight += doc.getTextDimensions(title).h + 5;
                common_index = 1;
            }

            if (Project_Industry.National.length > 0) {
                lastFieldHeight = lastFieldHeight + 10;
                doc.setFontSize(14);
                doc.setTextColor(0, 0, 0);
                title = "National Projects";
                if (lastFieldHeight > (doc.getCurrentPageInfo()["pageContext"]["mediaBox"]["topRightY"] - 150)) {
                    doc.addPage('a4', 'portrait');
                    lastFieldHeight = 45;
                }
                doc.setFont("helvetica", "bolditalic");
                doc.text(title, rect1X + 20, lastFieldHeight);
                doc.setFont("helvetica", "normal");
                lastFieldHeight += doc.getTextDimensions(title).h + 5;
                Project_Industry.National.map((industryProject, index) => {
                    if (lastFieldHeight > (doc.getCurrentPageInfo()["pageContext"]["mediaBox"]["topRightY"] - 100)) {
                        doc.addPage('a4', 'portrait');
                        lastFieldHeight = 45;
                    }
                    doc.setFontSize(11);
                    doc.setTextColor(0, 0, 0);
                    if ((index + 1) >= 10) {
                        heading_x_axis = 35;
                    }
                    else {
                        heading_x_axis = 40;
                    }
                    printing_string = `${index + 1}. ${industryProject.Title}`.replace(/^\s*\n/gm, "").trim()
                    doc.text(printing_string, heading_x_axis, lastFieldHeight, { maxWidth: 500 });
                    lastFieldHeight += doc.splitTextToSize(printing_string, 450).length * 12;

                    doc.setFontSize(8);
                    doc.setTextColor(0, 0, 0);

                    printing_string = `${industryProject.Funding_Agency.replace("+", "")}, Rs: ${(industryProject.Cost_in_PKR / 1000000).toFixed(2)}M, ${industryProject["Project_Status"] === "Completed" ? industryProject["Project_Status"] + " ( " + industryProject["Approval_Date"] + " - " + industryProject["Completion_Date"] + " )" : industryProject["Project_Status"].substring(11) + " ( " + industryProject["Approval_Date"] + " )"}`.replace(/^\s*\n/gm, "").trim()
                    doc.text(printing_string, 53, lastFieldHeight, { maxWidth: 450 });
                    if ((doc.splitTextToSize(printing_string, 450).length === 1)) {
                        lastFieldHeight += (doc.splitTextToSize(printing_string, 450).length) + 18;
                    }
                    else {
                        lastFieldHeight += ((doc.splitTextToSize(printing_string, 450).length) * 4) + 18;
                    }
                    common_index += 1;
                })
            }
            if (Project_Industry.International.length > 0) {
                lastFieldHeight = lastFieldHeight + 10;
                doc.setFontSize(14);
                doc.setTextColor(0, 0, 0);
                title = "International Projects";
                if (lastFieldHeight > (doc.getCurrentPageInfo()["pageContext"]["mediaBox"]["topRightY"] - 150)) {
                    doc.addPage('a4', 'portrait');
                    lastFieldHeight = 45;
                }
                doc.setFont("helvetica", "bolditalic");
                doc.text(title, rect1X + 20, lastFieldHeight);
                doc.setFont("helvetica", "normal");
                lastFieldHeight += doc.getTextDimensions(title).h + 5;
                Project_Industry.International.map((industryProject, index) => {
                    if (lastFieldHeight > (doc.getCurrentPageInfo()["pageContext"]["mediaBox"]["topRightY"] - 100)) {
                        doc.addPage('a4', 'portrait');
                        lastFieldHeight = 45;
                    }
                    if ((index + 1) >= 10) {
                        heading_x_axis = 35;
                    }
                    else {
                        heading_x_axis = 40;
                    }
                    printing_string = `${index + 1}. ${industryProject.Title}`.replace(/^\s*\n/gm, "").trim()
                    doc.setFontSize(11);
                    doc.setTextColor(0, 0, 0);
                    doc.text(printing_string, heading_x_axis, lastFieldHeight, { maxWidth: 500 });
                    lastFieldHeight += doc.splitTextToSize(printing_string, 450).length * 12;
                    doc.setFontSize(8);
                    doc.setTextColor(0, 0, 0);
                    printing_string = `${industryProject.Funding_Agency.replace("+", "")}, Rs: ${(industryProject.Cost_in_PKR / 1000000).toFixed(2)}M, ${industryProject["Project_Status"] === "Completed" ? industryProject["Project_Status"] + " ( " + industryProject["Approval_Date"] + " - " + industryProject["Completion_Date"] + " )" : industryProject["Project_Status"].substring(11) + " ( " + industryProject["Approval_Date"] + " )"}`.replace(/^\s*\n/gm, "").trim()

                    doc.text(printing_string, 40, lastFieldHeight, { maxWidth: 450 });
                    if ((doc.splitTextToSize(printing_string, 450).length === 1)) {
                        lastFieldHeight += (doc.splitTextToSize(printing_string, 450).length) + 18;
                    }
                    else {
                        lastFieldHeight += ((doc.splitTextToSize(printing_string, 450).length) * 4) + 18;
                    }
                    common_index += 1;
                })
            }

            if (Research_Articles.length > 0) {
                lastFieldHeight = lastFieldHeight + 10;
                doc.setFontSize(15);
                doc.setTextColor(0, 0, 0);
                title = "Research Articles"
                if (lastFieldHeight > (doc.getCurrentPageInfo()["pageContext"]["mediaBox"]["topRightY"] - 150)) {
                    doc.addPage('a4', 'portrait');
                    lastFieldHeight = 45;
                }
                doc.setFont("helvetica", "bolditalic");
                doc.text(title, rect1X + 20, lastFieldHeight);
                doc.setFont("helvetica", "normal");
                lastFieldHeight += doc.getTextDimensions(title).h + 5;

                Research_Articles.map((article, index) => {
                    if (lastFieldHeight > (doc.getCurrentPageInfo()["pageContext"]["mediaBox"]["topRightY"] - 100)) {
                        doc.addPage('a4', 'portrait');
                        lastFieldHeight = 45;
                    }
                    if ((index + 1) >= 10) {
                        heading_x_axis = 35;
                    }
                    else {
                        heading_x_axis = 40;
                    }
                    doc.setFontSize(11);
                    doc.setTextColor(0, 0, 0);
                    printing_string = `${index + 1}. ${article.Title}`.replace(/^\s*\n/gm, "").trim()
                    doc.text(printing_string, heading_x_axis, lastFieldHeight, { maxWidth: 500 });
                    lastFieldHeight += doc.splitTextToSize(printing_string, 500).length * 12;
                    doc.setFontSize(8);
                    doc.setTextColor(0, 0, 0);
                    printing_string = `Authors: ${article.All_Authors.trim().substring(0, article.All_Authors.length - 2)}`.replace(/^\s*\n/gm, "").trim()
                    doc.text(`${printing_string}`, 40, lastFieldHeight, { maxWidth: 450 });
                    lastFieldHeight += doc.splitTextToSize(printing_string, 450).length * 11;
                    printing_string = `${article.Journal_Title} ${Pub_Info(article.Journal_Info, article.Publication_year, index)}`.replace(/^\s*\n/gm, "").trim()
                    doc.text(printing_string, 40, lastFieldHeight, { maxWidth: 450 });
                    if ((doc.splitTextToSize(printing_string, 500).length === 1)) {
                        lastFieldHeight += (doc.splitTextToSize(printing_string, 450).length) + 18;
                    }
                    else {
                        lastFieldHeight += ((doc.splitTextToSize(printing_string, 450).length) * 4) + 18;
                    }
                })
            }

            if (conferences.length > 0) {
                lastFieldHeight = lastFieldHeight + 10;
                doc.setFontSize(15);
                doc.setTextColor(0, 0, 0);
                title = "Conference Proceedings"
                if (lastFieldHeight > (doc.getCurrentPageInfo()["pageContext"]["mediaBox"]["topRightY"] - 150)) {
                    doc.addPage('a4', 'portrait');
                    lastFieldHeight = 45;
                }
                doc.setFont("helvetica", "bolditalic");
                doc.text(title, rect1X + 20, lastFieldHeight);
                doc.setFont("helvetica", "normal");
                lastFieldHeight += doc.getTextDimensions(title).h + 5;

                conferences.map((conference, index) => {
                    if (lastFieldHeight > (doc.getCurrentPageInfo()["pageContext"]["mediaBox"]["topRightY"] - 100)) {
                        doc.addPage('a4', 'portrait');
                        lastFieldHeight = 45;
                    }
                    if ((index + 1) >= 10) {
                        heading_x_axis = 35;
                    }
                    else {
                        heading_x_axis = 40;
                    }
                    doc.setFontSize(11);
                    doc.setTextColor(0, 0, 0);
                    printing_string = `${index + 1}. ${conference.Title}`.replace(/^\s*\n/gm, "").trim()
                    doc.text(printing_string, heading_x_axis, lastFieldHeight, { maxWidth: 500 });
                    lastFieldHeight += doc.splitTextToSize(printing_string, 500).length * 12;
                    doc.setFontSize(8);
                    doc.setTextColor(0, 0, 0);
                    printing_string = `Authors: ${conference.Authors.join(", ")}`.replace(/^\s*\n/gm, "").trim()
                    doc.text(printing_string, 40, lastFieldHeight, { maxWidth: 500 });
                    lastFieldHeight += doc.splitTextToSize(printing_string, 500).length * 11;
                    printing_string = `${conference.Conference_Name + " (" + conference.Year + ")"}`.replace(/^\s*\n/gm, "").trim()
                    doc.text(printing_string, 40, lastFieldHeight, { maxWidth: 500 });
                    if ((doc.splitTextToSize(printing_string, 500).length === 1)) {
                        lastFieldHeight += (doc.splitTextToSize(printing_string, 500).length) + 18;
                    }
                    else {
                        lastFieldHeight += ((doc.splitTextToSize(printing_string, 500).length) * 4) + 18;
                    }
                })
            }

            if (editorials.length > 0) {
                lastFieldHeight = lastFieldHeight + 10;
                doc.setFontSize(15);
                doc.setTextColor(0, 0, 0);
                title = "Editorial Activities"
                if (lastFieldHeight > (doc.getCurrentPageInfo()["pageContext"]["mediaBox"]["topRightY"] - 150)) {
                    doc.addPage('a4', 'portrait');
                    lastFieldHeight = 45;
                }
                doc.setFont("helvetica", "bolditalic");
                doc.text(title, rect1X + 20, lastFieldHeight);
                doc.setFont("helvetica", "normal");
                lastFieldHeight += doc.getTextDimensions(title).h + 5;

                editorials.map((editorial, index) => {
                    if (lastFieldHeight > (doc.getCurrentPageInfo()["pageContext"]["mediaBox"]["topRightY"] - 100)) {
                        doc.addPage('a4', 'portrait');
                        lastFieldHeight = 45;
                    }
                    if ((index + 1) >= 10) {
                        heading_x_axis = 35;
                    }
                    else {
                        heading_x_axis = 40;
                    }
                    doc.setFontSize(11);
                    doc.setTextColor(0, 0, 0);
                    printing_string = `${index + 1}. ${editorial.Title}`.replace(/^\s*\n/gm, "").trim()
                    doc.text(printing_string, heading_x_axis, lastFieldHeight, { maxWidth: 500 });
                    lastFieldHeight += doc.splitTextToSize(printing_string, 500).length * 12;
                    doc.setFontSize(8);
                    doc.setTextColor(0, 0, 0);
                    printing_string = `${editorial.Reviewer_Type}`.replace(/^\s*\n/gm, "").trim()
                    doc.text(`${editorial.Reviewer_Type}`, rect1X + 40, lastFieldHeight, { maxWidth: 500 });
                    lastFieldHeight += doc.splitTextToSize(printing_string, 500).length * 11;
                    printing_string = `${editorial.Impact_Factor.trim() === "" ? "" : "IF: " + editorial.Impact_Factor}`.replace(/^\s*\n/gm, "").trim()

                    doc.text(printing_string, rect1X + 40, lastFieldHeight, { maxWidth: 450 });
                    if ((doc.splitTextToSize(printing_string, 500).length === 1)) {
                        lastFieldHeight += (doc.splitTextToSize(printing_string, 500).length) + 18;
                    }
                    else {
                        lastFieldHeight += ((doc.splitTextToSize(printing_string, 500).length) * 4) + 18;
                    }
                })
            }

            if (Book_Chapters.length > 0) {
                lastFieldHeight = lastFieldHeight + 10;
                doc.setFontSize(15);
                doc.setTextColor(0, 0, 0);
                title = "Book Chapters"
                if (lastFieldHeight > (doc.getCurrentPageInfo()["pageContext"]["mediaBox"]["topRightY"] - 150)) {
                    doc.addPage('a4', 'portrait');
                    lastFieldHeight = 45;
                }
                doc.setFont("helvetica", "bolditalic");
                doc.text(title, rect1X + 20, lastFieldHeight);
                doc.setFont("helvetica", "normal");
                lastFieldHeight += doc.getTextDimensions(title).h + 5;

                Book_Chapters.map((chapter, index) => {
                    if (lastFieldHeight > (doc.getCurrentPageInfo()["pageContext"]["mediaBox"]["topRightY"] - 100)) {
                        doc.addPage('a4', 'portrait');
                        lastFieldHeight = 45;
                    }
                    if ((index + 1) >= 10) {
                        heading_x_axis = 35;
                    }
                    else {
                        heading_x_axis = 40;
                    }
                    doc.setFontSize(11);
                    doc.setTextColor(0, 0, 0);
                    printing_string = `${index + 1}. ${chapter.Title}`.replace(/^\s*\n/gm, "").trim()
                    doc.text(printing_string, heading_x_axis, lastFieldHeight, { maxWidth: 500 });
                    lastFieldHeight += doc.splitTextToSize(printing_string, 500).length * 12;

                    doc.setFontSize(8);
                    doc.setTextColor(0, 0, 0);
                    printing_string = `Authors: ${(chapter.All_Authors).trim().substring(0, chapter.All_Authors.length - 2)}`.replace(/^\s*\n/gm, "").trim()
                    doc.text(
                        printing_string, 40, lastFieldHeight, { maxWidth: 500 });
                    lastFieldHeight += doc.splitTextToSize(printing_string, 500).length * 11;
                    printing_string = `${chapter.Journal_Title} ${'(' + chapter.Journal_Info + ')'} (${chapter.Publication_year})`.replace(/^\s*\n/gm, "").trim()
                    doc.text(printing_string, 40, lastFieldHeight, { maxWidth: 500 });
                    if ((doc.splitTextToSize(printing_string, 500).length === 1)) {
                        lastFieldHeight += (doc.splitTextToSize(printing_string, 500).length) + 18;
                    }
                    else {
                        lastFieldHeight += ((doc.splitTextToSize(printing_string, 500).length) * 4) + 18;
                    }
                })
            }

            if (Books.length > 0) {
                lastFieldHeight = lastFieldHeight + 10;
                doc.setFontSize(15);
                doc.setTextColor(0, 0, 0);
                title = "Books Published"
                if (lastFieldHeight > (doc.getCurrentPageInfo()["pageContext"]["mediaBox"]["topRightY"] - 150)) {
                    doc.addPage('a4', 'portrait');
                    lastFieldHeight = 45;
                }
                doc.setFont("helvetica", "bolditalic");
                doc.text(title, rect1X + 20, lastFieldHeight);
                doc.setFont("helvetica", "normal");
                lastFieldHeight += doc.getTextDimensions(title).h + 5;
                Books.map((book, index) => {
                    if (lastFieldHeight > (doc.getCurrentPageInfo()["pageContext"]["mediaBox"]["topRightY"] - 100)) {
                        doc.addPage('a4', 'portrait');
                        lastFieldHeight = 45;
                    }
                    doc.setFontSize(11);
                    doc.setTextColor(0, 0, 0);
                    printing_string = `${(index + 1)}. ${book.Title}`.replace(/^\s*\n/gm, "").trim()
                    doc.text(printing_string, heading_x_axis, lastFieldHeight, { maxWidth: 500 });
                    lastFieldHeight += doc.splitTextToSize(printing_string, 500).length * 12;
                    doc.setFontSize(8);
                    doc.setTextColor(0, 0, 0);
                    printing_string = `Authors: ${(book.All_Authors).trim().substring(0, book.All_Authors.length - 2)}`.replace(/^\s*\n/gm, "").trim()

                    doc.text(printing_string, 40, lastFieldHeight, { maxWidth: 450 });
                    if ((doc.splitTextToSize(printing_string, 500).length === 1)) {
                        lastFieldHeight += (doc.splitTextToSize(printing_string, 500).length) + 18;
                    }
                    else {
                        lastFieldHeight += ((doc.splitTextToSize(printing_string, 500).length) * 4) + 18;
                    }
                })
            }


            if (trainings.length > 0 || profile[0].Trainings_Attended.length > 0) {
                lastFieldHeight = lastFieldHeight + 10;
                doc.setFontSize(18);
                doc.setTextColor(0, 0, 0);
                title = "Trainings"
                if (lastFieldHeight > (doc.getCurrentPageInfo()["pageContext"]["mediaBox"]["topRightY"] - 150)) {
                    doc.addPage('a4', 'portrait');
                    lastFieldHeight = 45;
                }
                doc.setFont("helvetica", "bolditalic");
                doc.text(title, rect1X + 20, lastFieldHeight);
                doc.setFont("helvetica", "normal");
                lastFieldHeight += doc.getTextDimensions(title).h + 5;
                // common_index = 1;
            }

            if (trainings.length > 0) {
                lastFieldHeight = lastFieldHeight + 10;
                doc.setFontSize(14);
                doc.setTextColor(0, 0, 0);
                title = "Trainings Conducted";
                if (lastFieldHeight > (doc.getCurrentPageInfo()["pageContext"]["mediaBox"]["topRightY"] - 150)) {
                    doc.addPage('a4', 'portrait');
                    lastFieldHeight = 45;
                }
                doc.setFont("helvetica", "bolditalic");
                doc.text(title, rect1X + 20, lastFieldHeight);
                doc.setFont("helvetica", "normal");
                lastFieldHeight += doc.getTextDimensions(title).h + 5;
                trainings.map((training, index) => {
                    if (lastFieldHeight > (doc.getCurrentPageInfo()["pageContext"]["mediaBox"]["topRightY"] - 100)) {
                        doc.addPage('a4', 'portrait');
                        lastFieldHeight = 45;
                    }
                    if ((index + 1) >= 10) {
                        heading_x_axis = 35;
                    }
                    else {
                        heading_x_axis = 40;
                    }
                    doc.setFontSize(11);
                    doc.setTextColor(0, 0, 0);
                    printing_string = `${(index + 1)}. ${training.Name} ( ${training.Completions_Date} )`.replace(/^\s*\n/gm, "").trim()
                    doc.text(printing_string, heading_x_axis, lastFieldHeight, { maxWidth: 450 });
                    if ((doc.splitTextToSize(printing_string, 500).length === 1)) {
                        lastFieldHeight += (doc.splitTextToSize(printing_string, 500).length) + 18;
                    }
                    else {
                        lastFieldHeight += ((doc.splitTextToSize(printing_string, 500).length) * 4) + 18;
                    }
                })
            }

            if (profile[0].Trainings_Attended.length !== 0) {
                lastFieldHeight = lastFieldHeight + 10;
                doc.setFontSize(14);
                doc.setTextColor(0, 0, 0);
                title = "Trainings Attended";
                if (lastFieldHeight > (doc.getCurrentPageInfo()["pageContext"]["mediaBox"]["topRightY"] - 150)) {
                    doc.addPage('a4', 'portrait');
                    lastFieldHeight = 45;
                }
                doc.setFont("helvetica", "bolditalic");
                doc.text(title, rect1X + 20, lastFieldHeight);
                doc.setFont("helvetica", "normal");
                lastFieldHeight += doc.getTextDimensions(title).h + 5;
                profile[0].Trainings_Attended.map((training, index) => {
                    if (lastFieldHeight > (doc.getCurrentPageInfo()["pageContext"]["mediaBox"]["topRightY"] - 100)) {
                        doc.addPage('a4', 'portrait');
                        lastFieldHeight = 45;
                    }
                    if ((index + 1) >= 10) {
                        heading_x_axis = 35;
                    }
                    else {
                        heading_x_axis = 40;
                    }
                    doc.setFontSize(11);
                    doc.setTextColor(0, 0, 0);
                    printing_string = `${(index + 1)}. ${training.Name} (${training.Date_From} ) - ( ${training.Date_To})`.replace(/^\s*\n/gm, "").trim()
                    doc.text(printing_string, heading_x_axis, lastFieldHeight, { maxWidth: 450 });
                    if ((doc.splitTextToSize(printing_string, 500).length === 1)) {
                        lastFieldHeight += (doc.splitTextToSize(printing_string, 500).length) + 18;
                    }
                    else {
                        lastFieldHeight += ((doc.splitTextToSize(printing_string, 500).length) * 4) + 18;
                    }
                })
            }

            if (Intellectual_Property.Patents.length > 0) {
                lastFieldHeight = lastFieldHeight + 10;
                doc.setFontSize(15);
                doc.setTextColor(0, 0, 0);
                title = "Patents"
                if (lastFieldHeight > (doc.getCurrentPageInfo()["pageContext"]["mediaBox"]["topRightY"] - 150)) {
                    doc.addPage('a4', 'portrait');
                    lastFieldHeight = 45;
                }
                doc.setFont("helvetica", "bolditalic");
                doc.text(title, rect1X + 20, lastFieldHeight);
                doc.setFont("helvetica", "normal");
                lastFieldHeight += doc.getTextDimensions(title).h + 5;

                Intellectual_Property.Patents.map((ip, index) => {
                    if (lastFieldHeight > (doc.getCurrentPageInfo()["pageContext"]["mediaBox"]["topRightY"] - 100)) {
                        doc.addPage('a4', 'portrait');
                        lastFieldHeight = 45;
                    }
                    if ((index + 1) >= 10) {
                        heading_x_axis = 35;
                    }
                    else {
                        heading_x_axis = 40;
                    }
                    doc.setFontSize(11);
                    doc.setTextColor(0, 0, 0);
                    printing_string = `${index + 1}. ${ip.Title}`.replace(/^\s*\n/gm, "").trim()

                    doc.text(printing_string, heading_x_axis, lastFieldHeight, { maxWidth: 500 });
                    lastFieldHeight += doc.splitTextToSize(printing_string, 500).length * 12;
                    doc.setFontSize(8);
                    doc.setTextColor(0, 0, 0);
                    printing_string = `Authors: ${ip.Inventors.join(", ")}`.replace(/^\s*\n/gm, "").trim()

                    doc.text(printing_string, 40, lastFieldHeight, { maxWidth: 500 });
                    lastFieldHeight += doc.splitTextToSize(printing_string, 500).length * 11;
                    printing_string = `${ip.Schools.join(", ")}`.replace(/^\s*\n/gm, "").trim()

                    doc.text(printing_string, 40, lastFieldHeight, { maxWidth: 500 });
                    if ((doc.splitTextToSize(printing_string, 500).length === 1)) {
                        lastFieldHeight += (doc.splitTextToSize(printing_string, 500).length) + 18;
                    }
                    else {
                        lastFieldHeight += ((doc.splitTextToSize(printing_string, 500).length) * 4) + 18;
                    }
                })
            }

            if (Intellectual_Property.Industrial_Design.length > 0) {
                lastFieldHeight = lastFieldHeight + 10;
                doc.setFontSize(15);
                doc.setTextColor(0, 0, 0);
                title = "Industrial Designs"
                if (lastFieldHeight > (doc.getCurrentPageInfo()["pageContext"]["mediaBox"]["topRightY"] - 150)) {
                    doc.addPage('a4', 'portrait');
                    lastFieldHeight = 45;
                }
                doc.setFont("helvetica", "bolditalic");
                doc.text(title, rect1X + 20, lastFieldHeight);
                doc.setFont("helvetica", "normal");
                lastFieldHeight += doc.getTextDimensions(title).h + 5;
                Intellectual_Property.Industrial_Design.map((ip, index) => {
                    if (lastFieldHeight > (doc.getCurrentPageInfo()["pageContext"]["mediaBox"]["topRightY"] - 100)) {
                        doc.addPage('a4', 'portrait');
                        lastFieldHeight = 45;
                    }
                    if ((index + 1) >= 10) {
                        heading_x_axis = 35;
                    }
                    else {
                        heading_x_axis = 40;
                    }
                    doc.setFontSize(11);
                    doc.setTextColor(0, 0, 0);
                    printing_string = `${index + 1}. ${ip.Title}`.replace(/^\s*\n/gm, "").trim()
                    doc.text(printing_string, heading_x_axis, lastFieldHeight, { maxWidth: 500 });
                    lastFieldHeight += doc.splitTextToSize(printing_string, 500).length * 12;

                    doc.setFontSize(8);
                    doc.setTextColor(0, 0, 0);
                    printing_string = `Authors: ${ip.Inventors.join(", ")}`.replace(/^\s*\n/gm, "").trim()
                    doc.text(`Authors: ${ip.Inventors.join(", ")}`, 40, lastFieldHeight, { maxWidth: 500 });
                    lastFieldHeight += doc.splitTextToSize(printing_string, 500).length * 11;

                    printing_string = `${ip.Schools.join(", ")}`.replace(/^\s*\n/gm, "").trim()
                    doc.text(`${ip.Schools.join(", ")}`, 40, lastFieldHeight, { maxWidth: 500 });
                    if ((doc.splitTextToSize(printing_string, 500).length === 1)) {
                        lastFieldHeight += (doc.splitTextToSize(printing_string, 500).length) + 18;
                    }
                    else {
                        lastFieldHeight += ((doc.splitTextToSize(printing_string, 500).length) * 4) + 18;
                    }
                })
            }

            if (Intellectual_Property.Trade_Marks.length > 0) {
                lastFieldHeight = lastFieldHeight + 10;
                doc.setFontSize(15);
                doc.setTextColor(0, 0, 0);
                title = "Industrial Designs"
                if (lastFieldHeight > (doc.getCurrentPageInfo()["pageContext"]["mediaBox"]["topRightY"] - 150)) {
                    doc.addPage('a4', 'portrait');
                    lastFieldHeight = 45;
                }
                doc.setFont("helvetica", "bolditalic");
                doc.text(title, rect1X + 20, lastFieldHeight);
                doc.setFont("helvetica", "normal");
                lastFieldHeight += doc.getTextDimensions(title).h + 5;
                Intellectual_Property.Trade_Marks.map((ip, index) => {
                    if (lastFieldHeight > (doc.getCurrentPageInfo()["pageContext"]["mediaBox"]["topRightY"] - 100)) {
                        doc.addPage('a4', 'portrait');
                        lastFieldHeight = 45;
                    }
                    if ((index + 1) >= 10) {
                        heading_x_axis = 35;
                    }
                    else {
                        heading_x_axis = 40;
                    }
                    doc.setFontSize(11);
                    doc.setTextColor(0, 0, 0);
                    printing_string = `${index + 1}. ${ip.Title}`.replace(/^\s*\n/gm, "").trim()
                    doc.text(`${index + 1}. ${ip.Title}`, heading_x_axis, lastFieldHeight, { maxWidth: 500 });
                    lastFieldHeight += doc.splitTextToSize(printing_string, 500).length * 12;
                    doc.setFontSize(8);
                    doc.setTextColor(0, 0, 0);

                    printing_string = `${ip.Inventors.join(", ")}`.replace(/^\s*\n/gm, "").trim()
                    doc.text(printing_string, 40, lastFieldHeight, { maxWidth: 500 });
                    lastFieldHeight += doc.splitTextToSize(printing_string, 500).length * 11;
                    printing_string = `${ip.Schools.join(", ")}`.replace(/^\s*\n/gm, "").trim()
                    doc.text(printing_string, 40, lastFieldHeight, { maxWidth: 500 });
                    if ((doc.splitTextToSize(printing_string, 500).length === 1)) {
                        lastFieldHeight += (doc.splitTextToSize(printing_string, 500).length) + 18;
                    }
                    else {
                        lastFieldHeight += ((doc.splitTextToSize(printing_string, 500).length) * 4) + 18;
                    }
                })
            }

            if (Intellectual_Property.Copy_Rights.length > 0) {
                lastFieldHeight = lastFieldHeight + 10;
                doc.setFontSize(15);
                doc.setTextColor(0, 0, 0);
                title = "Copy Rights"
                if (lastFieldHeight > (doc.getCurrentPageInfo()["pageContext"]["mediaBox"]["topRightY"] - 150)) {
                    doc.addPage('a4', 'portrait');
                    lastFieldHeight = 45;
                }
                doc.setFont("helvetica", "bolditalic");
                doc.text(title, rect1X + 20, lastFieldHeight);
                doc.setFont("helvetica", "normal");
                lastFieldHeight += doc.getTextDimensions(title).h + 5;
                Intellectual_Property.Copy_Rights.map((ip, index) => {
                    if (lastFieldHeight > (doc.getCurrentPageInfo()["pageContext"]["mediaBox"]["topRightY"] - 100)) {
                        doc.addPage('a4', 'portrait');
                        lastFieldHeight = 45;
                    }
                    if ((index + 1) >= 10) {
                        heading_x_axis = 35;
                    }
                    else {
                        heading_x_axis = 40;
                    }
                    doc.setFontSize(11);
                    doc.setTextColor(0, 0, 0);
                    printing_string = `${index + 1}. ${ip.Title}`.replace(/^\s*\n/gm, "").trim()
                    doc.text(printing_string, heading_x_axis, lastFieldHeight, { maxWidth: 500 });
                    lastFieldHeight += doc.splitTextToSize(printing_string, 500).length * 12;
                    doc.setFontSize(8);
                    doc.setTextColor(0, 0, 0);
                    printing_string = `${ip.Inventors.join(", ")}`.replace(/^\s*\n/gm, "").trim()
                    doc.text(printing_string, 40, lastFieldHeight, { maxWidth: 500 });
                    lastFieldHeight += doc.splitTextToSize(printing_string, 500).length * 11;
                    printing_string = `${ip.Schools.join(", ")}`.replace(/^\s*\n/gm, "").trim()
                    doc.text(printing_string, 40, lastFieldHeight, { maxWidth: 500 });
                    if ((doc.splitTextToSize(printing_string, 500).length === 1)) {
                        lastFieldHeight += (doc.splitTextToSize(printing_string, 500).length) + 18;
                    }
                    else {
                        lastFieldHeight += ((doc.splitTextToSize(printing_string, 500).length) * 4) + 18;
                    }
                })
            }

            if (Supervision.PHD.length > 0) {
                lastFieldHeight = lastFieldHeight + 5;
                doc.setFontSize(15);
                doc.setTextColor(0, 0, 0);
                title = "PHD Supervisions"
                if (lastFieldHeight > (doc.getCurrentPageInfo()["pageContext"]["mediaBox"]["topRightY"] - 150)) {
                    doc.addPage('a4', 'portrait');
                    lastFieldHeight = 45;
                }
                doc.setFont("helvetica", "bolditalic");
                doc.text(title, rect1X + 20, lastFieldHeight);
                doc.setFont("helvetica", "normal");
                lastFieldHeight += doc.getTextDimensions(title).h + 5;
                Supervision.PHD.map((supervision, index) => {
                    if (lastFieldHeight > (doc.getCurrentPageInfo()["pageContext"]["mediaBox"]["topRightY"] - 100)) {
                        doc.addPage('a4', 'portrait');
                        lastFieldHeight = 45;
                    }
                    if ((index + 1) >= 10) {
                        heading_x_axis = 35;
                    }
                    else {
                        heading_x_axis = 40;
                    }
                    doc.setFontSize(11);
                    doc.setTextColor(0, 0, 0);
                    printing_string = `${index + 1}. ${supervision.Title}`.replace(/^\s*\n/gm, "").trim()
                    doc.text(printing_string, heading_x_axis, lastFieldHeight, { maxWidth: 500 });
                    lastFieldHeight += doc.splitTextToSize(printing_string, 500).length * 12;

                    doc.setFontSize(8);
                    doc.setTextColor(0, 0, 0);
                    printing_string = `${supervision.StudentName} - ${(supervision.Program).split(" - ")[0]} - ${supervision.School}`.replace(/^\s*\n/gm, "").trim()
                    doc.text(printing_string, 40, lastFieldHeight, { maxWidth: 500 });
                    if ((doc.splitTextToSize(printing_string, 500).length === 1)) {
                        lastFieldHeight += (doc.splitTextToSize(printing_string, 500).length) + 18;
                    }
                    else {
                        lastFieldHeight += ((doc.splitTextToSize(printing_string, 500).length) * 4) + 18;
                    }
                })
            }

            if (Supervision.Masters.length > 0) {
                lastFieldHeight = lastFieldHeight + 10;
                doc.setFontSize(15);
                doc.setTextColor(0, 0, 0);
                title = "Masters Supervision"
                if (lastFieldHeight > (doc.getCurrentPageInfo()["pageContext"]["mediaBox"]["topRightY"] - 150)) {
                    doc.addPage('a4', 'portrait');
                    lastFieldHeight = 45;
                }
                doc.setFont("helvetica", "bolditalic");
                doc.text(title, rect1X + 20, lastFieldHeight);
                doc.setFont("helvetica", "normal");
                lastFieldHeight += doc.getTextDimensions(title).h + 5;
                Supervision.Masters.map((supervision, index) => {
                    if (lastFieldHeight > (doc.getCurrentPageInfo()["pageContext"]["mediaBox"]["topRightY"] - 100)) {
                        doc.addPage('a4', 'portrait');
                        lastFieldHeight = 45;
                    }
                    if ((index + 1) >= 10) {
                        heading_x_axis = 35;
                    }
                    else {
                        heading_x_axis = 40;
                    }
                    doc.setFontSize(11);
                    doc.setTextColor(0, 0, 0);
                    printing_string = `${index + 1}. ${supervision.Title}`.replace(/^\s*\n/gm, "").trim()
                    doc.text(printing_string, heading_x_axis, lastFieldHeight, { maxWidth: 500 });
                    lastFieldHeight += doc.splitTextToSize(printing_string, 500).length * 12;
                    doc.setFontSize(8);
                    doc.setTextColor(0, 0, 0);

                    printing_string = `${supervision.StudentName} - ${(supervision.Program).split(" - ")[0]} - ${supervision.School}`.replace(/^\s*\n/gm, "").trim()
                    doc.text(printing_string, 40, lastFieldHeight, { maxWidth: 500 });
                    if ((doc.splitTextToSize(printing_string, 500).length === 1)) {
                        lastFieldHeight += (doc.splitTextToSize(printing_string, 500).length) + 18;
                    }
                    else {
                        lastFieldHeight += ((doc.splitTextToSize(printing_string, 500).length) * 4) + 18;
                    }
                })
            }


            doc.save(`${profile[0].Name}.pdf`);
        })
    }
    const Pub_Info = (pub_info, year) => {
        if (pub_info === "NULL" || pub_info === "") {
            return (' (' + year + ')');
        }
        else {
            let final_String = "";
            const values = pub_info.split(', ');
            if (values.length > 2) {
                if (values[0].trim().includes('Volume ') || values[0].trim().includes('Volume:') || values[0].trim().includes('Vol.')) {
                    if (values[0].trim().includes('Volume:')) {
                        final_String = final_String + `${values[0].trim().split(':')[1]} (${year})`;
                    }
                    else {
                        final_String = final_String + `${values[0].trim().split(' ')[1]} (${year})`;
                    }
                }
                if (values[1].trim().includes('Issue ') || values[1].trim().includes('Issue:') || values[1].trim().includes('No.') || values[1].trim().includes('Number')) {
                    if (values[1].trim().includes('Issue:')) {
                        final_String = final_String + ` ${values[1].trim().split(':')[1]}, `;
                    }
                    else {
                        final_String = final_String + ` ${values[1].trim().split(' ')[1]}, `;
                    }
                }
                if (values[2].trim().includes('Pages ') || values[2].trim().includes('Pages:') || values[2].trim().includes('Article Number ') || values[2].trim().includes('Article Number:')) {
                    if (values[2].trim().includes('Pages:')) {
                        final_String = final_String + `${values[2].trim().split(':')[1]}`;
                    }
                    else if (values[2].trim().includes('Pages ')) {
                        final_String = final_String + `${values[2].trim().split(' ')[1]}`;
                    }
                    else if (values[2].trim().includes('Article Number:')) {
                        final_String = final_String + `${values[2].trim().split(':')[1]}`;
                    }
                    else {
                        final_String = final_String + `${values[2].trim().split(' ')[2]}`;
                    }
                }
            }
            else {
                if (pub_info.includes(year)) return pub_info
                return pub_info + ' (' + year + ')';
            }

            return (final_String);

        }
    }
    const Research_Articles_List = Research_Articles.map((article, index) => {
        return (
            <>
                <Card
                    key={index}
                    bg="light"
                    text="dark"
                    style={{ width: '100%' }}
                >
                    <Card.Header className={"project_header"}>
                        {(index + 1) + ". " + article.Title}
                    </Card.Header>
                    <Card.Body>
                        <Card.Subtitle className="mb-2 text-muted">
                            {`Authors: ${article.All_Authors.trim().substring(0, article.All_Authors.length - 2)}`}
                            <br />
                            <i>{`${article.Journal_Title}, `}</i>&nbsp;<strong className={"strong-color"}>{`${Pub_Info(article.Journal_Info, article.Publication_year, index)}`}</strong>
                            <br />
                            Impact Factor: {article.IF === "" ? <strong className={"strong-color"}>0</strong> : <strong className={"strong-color"}>{`${article.IF} `}</strong>}  &nbsp; &nbsp; Citations: {article.Citations === "" ? <strong className={"strong-color"}>0</strong> : <strong className={"strong-color"}>{`${article.Citations} `}</strong>} &nbsp; &nbsp;  Quartiles: {article.Quartiles === "" ? <strong className={"strong-color"}>0</strong> : <strong className={"strong-color"}>{`${article.Quartiles} `}</strong>}
                        </Card.Subtitle>

                        <Button variant="primary" onClick={() => {
                            if (article.DOI.includes("http")) {
                                window.open(article.DOI, '_blank');
                            }
                            else {
                                window.open("https://doi.org/" + article.DOI, '_blank');
                            }
                        }}>Open</Button>
                    </Card.Body>
                </Card>
            </>
        );
    })
    const Book_Chapters_List = Book_Chapters.map((chapter, index) => {
        return (
            <>
                <Card
                    key={index}
                    bg="light"
                    text="dark"
                    style={{ width: '100%' }}
                >
                    <Card.Header className={"project_header"}>
                        {(index + 1) + ". " + chapter.Title}
                    </Card.Header>
                    <Card.Body>
                        <Card.Subtitle className="mb-2 text-muted">
                            {`Authors: ${(chapter.All_Authors).trim().substring(0, chapter.All_Authors.length - 2)}`}
                            <br />
                            <i>{`${chapter.Journal_Title}: `}</i>
                            <strong className={"strong-color"}>{`${'(' + chapter.Journal_Info + ')'} (${chapter.Publication_year})`}</strong>
                            <br />Citations: {chapter.Citations === "" ? <strong className={"strong-color"}>0</strong> : <strong className={"strong-color"}>{`${chapter.Citations} `}</strong>}

                        </Card.Subtitle>
                        <Button variant="primary" onClick={() => {
                            window.open(chapter.DOI, '_blank');
                        }}>Open</Button>
                    </Card.Body>
                </Card>
            </>
        );
    })
    const Book_List = Books.map((book, index) => {
        return (
            <>
                <Card
                    key={index}
                    bg="light"
                    text="dark"
                    style={{ width: '100%' }}
                >
                    <Card.Header className={"project_header"}>
                        {(index + 1) + ". " + book.Title}
                    </Card.Header>
                    <Card.Body>
                        <Card.Subtitle className="mb-2 text-muted">{`${book.Journal_Title} ${'(' + book.Journal_Info + ')'}`}
                            <br />
                            {`Authors: ${(book.All_Authors).trim().substring(0, book.All_Authors.length - 2)}`}
                            <br />Citations: {book.Citations === "" ? <strong className={"strong-color"}>0</strong> : <strong className={"strong-color"}>{`${book.Citations} `}</strong>}

                        </Card.Subtitle>
                        <Button variant="primary" onClick={() => {
                            window.open(book.DOI, '_blank');
                        }}>Open</Button>
                    </Card.Body>
                </Card>
            </>
        );
    })
    const Conferences = conferences.map((conference, index) => {
        return (
            <>
                <Card
                    key={index}
                    bg="light"
                    text="dark"
                    style={{ width: '100%' }}
                >
                    <Card.Header className={"project_header"}>
                        {(index + 1) + ". " + conference.Title}
                    </Card.Header>
                    <Card.Body>
                        <Card.Subtitle className="mb-2 text-muted">
                            {"Authors: " + conference.Authors.join(", ")}
                            <br />
                            <i>{conference.Conference_Name + " (" + conference.Year + ")"}</i>
                            <br />Citations: {conference.Citations === "" ? <strong className={"strong-color"}>0</strong> : <strong className={"strong-color"}>{`${conference.Citations} `}</strong>}

                        </Card.Subtitle>
                        <Button variant="primary" onClick={() => {
                            if (conference.DOI.includes("https://doi.org/")) {
                                window.open(conference.DOI, '_blank');
                            }
                            else {
                                window.open("https://doi.org/" + conference.DOI, '_blank');
                            }
                        }}>Open</Button>
                    </Card.Body>
                </Card>
            </>
        );
    })
    const Research_international_List = Project_Research.International.map((research, index) => {
        return (
            <>
                <Card
                    key={index}
                    bg="light"
                    text="dark"
                    style={{ width: '100%' }}
                >
                    <Card.Header className={"project_header"}>
                        {index + 1 + ". " + research.Title}
                    </Card.Header>
                    <Card.Body>
                        <Card.Subtitle className="mb-2 text-muted">
                            <span className="bold">{research.Funding_Agency.replace("+", "")}</span>{`, Rs: ${(research.Cost_in_PKR / 1000000).toFixed(2)}M, `}
                            {research["Project_Status"] === "Completed" ?
                                <>
                                    <span className="bold">{research["Project_Status"]}</span>
                                    <span> ( {
                                        research["Approval_Date"] + " - " + research["Completion_Date"]
                                    } )
                                    </span> </> :
                                <>
                                    <span className="bold">{(research["Project_Status"]).substring(11)}</span>
                                    <span> ( {
                                        research["Approval_Date"]
                                    } )
                                    </span>
                                </>}
                        </Card.Subtitle>
                    </Card.Body>
                </Card>
            </>
        );
    })
    const Research_national_List = Project_Research.National.map((research, index) => {
        return (
            <><Card
                key={index}
                bg="light"
                text="dark"
                style={{ width: '100%' }}
            >
                <Card.Header className={"project_header"}>
                    {index + 1 + ". " + research.Title}
                </Card.Header>
                <Card.Body>
                    <Card.Subtitle className="mb-2 text-muted">
                        <span className="bold">{research.Funding_Agency.replace("+", "")}</span>{`, Rs: ${(research.Cost_in_PKR / 1000000).toFixed(2)}M, `}
                        {research["Project_Status"] === "Completed" ?
                            <>
                                <span className="bold">{research["Project_Status"]}</span>
                                <span> ( {
                                    research["Approval_Date"] + " - " + research["Completion_Date"]
                                } )
                                </span> </> :
                            <>
                                <span className="bold">{(research["Project_Status"]).substring(11)}</span>
                                <span> ( {
                                    research["Approval_Date"]
                                } )
                                </span>
                            </>}
                    </Card.Subtitle>
                </Card.Body>
            </Card>
            </>
        );
    })
    const Industry_National_List = Project_Industry.National.map((industry, index) => {
        return (
            <>
                <Card
                    key={index}
                    bg="light"
                    text="dark"
                    style={{ width: '100%' }}
                >
                    <Card.Header className={"project_header"}>
                        {index + 1 + ". " + industry.Title}
                    </Card.Header>
                    <Card.Body>
                        <Card.Subtitle className="mb-2 text-muted">
                            <span className="bold">{industry.Funding_Agency.replace("+", "")}</span>{`, Rs: ${(industry.Cost_in_PKR / 1000000).toFixed(2)}M, `}
                            {industry["Project_Status"] === "Completed" ?
                                <>
                                    <span className="bold">{industry["Project_Status"]}</span>
                                    <span> ( {
                                        industry["Approval_Date"] + " - " + industry["Completion_Date"]
                                    } )
                                    </span> </> :
                                <>
                                    <span className="bold">{(industry["Project_Status"]).substring(11)}</span>
                                    <span> ( {
                                        industry["Approval_Date"]
                                    } )
                                    </span>
                                </>}
                        </Card.Subtitle>
                    </Card.Body>
                </Card>
            </>
        );
    })
    const Industry_International_List = Project_Industry.International.map((industry, index) => {
        return (
            <>
                <Card
                    key={index}
                    bg="light"
                    text="dark"
                    style={{ width: '100%' }}
                >
                    <Card.Header className={"project_header"}>
                        {index + 1 + ". " + industry.Title}
                    </Card.Header>
                    <Card.Body>
                        <Card.Subtitle className="mb-2 text-muted">
                            <span className="bold">{industry.Funding_Agency.replace("+", "")}</span>{`, Rs: ${(industry.Cost_in_PKR / 1000000).toFixed(2)}M, `}
                            {industry["Project_Status"] === "Completed" ?
                                <>
                                    <span className="bold">{industry["Project_Status"]}</span>
                                    <span> ( {
                                        industry["Approval_Date"] + " - " + industry["Completion_Date"]
                                    } )
                                    </span> </> :
                                <>
                                    <span className="bold">{(industry["Project_Status"]).substring(11)}</span>
                                    <span> ( {
                                        industry["Approval_Date"]
                                    } )
                                    </span>
                                </>}
                        </Card.Subtitle>
                    </Card.Body>
                </Card>
            </>
        );
    })
    const Editorials = editorials.map((editorial, index) => {
        return (
            <>
                <Card
                    key={index}
                    bg="light"
                    text="dark"
                    style={{ width: '100%' }}
                >
                    <Card.Header className={"project_header"}>
                        {(index + 1) + ". " + editorial.Title}
                    </Card.Header>
                    <Card.Body>
                        <Card.Subtitle className="mb-2 text-muted">
                            {editorial.Reviewer_Type}
                            <br />
                            IF: <strong className={"strong-color"}>{editorial.Impact_Factor}</strong>
                        </Card.Subtitle>
                    </Card.Body>
                </Card>

            </>
        );
    })
    const Trainings = trainings.map((training, index) => {
        return (
            <>
                <Card
                    key={index}
                    bg="light"
                    text="dark"
                    style={{ width: '100%' }}
                >
                    <Card.Header className={"project_header"}>
                        {(index + 1) + ". " + training.Name + " ( " + training.Completions_Date + " )"}
                    </Card.Header>
                </Card>

            </>
        );
    })
    const IPS_Design = Intellectual_Property.Industrial_Design.map((ip, index) => {
        return (
            <>

                <Card
                    key={index}
                    bg="light"
                    text="dark"
                    style={{ width: '100%' }}
                >
                    <Card.Header className={"project_header"}>
                        {index + 1 + ". " + ip.Title}
                    </Card.Header>
                    <Card.Body>
                        <Card.Subtitle className="mb-2 text-muted">
                            <strong className={"strong-color"}>Status: </strong> {`${ip.Status} `}
                            &nbsp; &nbsp; &nbsp;<strong className={"strong-color"}>Approval Date: </strong>
                            {`${ip.Approval_Date}`}
                            <br />
                            {`${ip.Inventors.length === 1 ? ip.Inventors.map((inventor) => { return inventor }) : ip.Inventors.map((inventor) => { return " " + inventor })} \n`}
                            <br />
                            {`${ip.Schools.length === 1 ? ip.Schools.map((school) => { return school }) : ip.Schools.map((school) => { return " " + school })} \n`}
                        </Card.Subtitle>
                    </Card.Body>
                </Card>

            </>
        );

    })
    const IPS_TradeMark = Intellectual_Property.Trade_Marks.map((ip, index) => {
        return (
            <>

                <Card
                    key={index}
                    bg="light"
                    text="dark"
                    style={{ width: '100%' }}
                >
                    <Card.Header className={"project_header"}>
                        {index + 1 + ". " + ip.Title}
                    </Card.Header>
                    <Card.Body>
                        <Card.Subtitle className="mb-2 text-muted">
                            <strong className={"strong-color"}>Status: </strong> {`${ip.Status} `}
                            &nbsp; &nbsp; &nbsp;<strong className={"strong-color"}>Approval Date: </strong>
                            {`${ip.Approval_Date}`}
                            <br />
                            {`${ip.Inventors.length === 1 ? ip.Inventors.map((inventor) => { return inventor }) : ip.Inventors.map((inventor) => { return " " + inventor })} \n`}
                            <br />
                            {`${ip.Schools.length === 1 ? ip.Schools.map((school) => { return school }) : ip.Schools.map((school) => { return " " + school })} \n`}
                        </Card.Subtitle>
                    </Card.Body>
                </Card>

            </>
        );

    })
    const IPS_CopyRight = Intellectual_Property.Copy_Rights.map((ip, index) => {
        return (
            <>

                <Card
                    key={index}
                    bg="light"
                    text="dark"
                    style={{ width: '100%' }}
                >
                    <Card.Header className={"project_header"}>
                        {index + 1 + ". " + ip.Title}
                    </Card.Header>
                    <Card.Body>
                        <Card.Subtitle className="mb-2 text-muted">
                            <strong className={"strong-color"}>Status: </strong> {`${ip.Status} `}
                            &nbsp; &nbsp; &nbsp;<strong className={"strong-color"}>Approval Date: </strong>
                            {`${ip.Approval_Date}`}
                            <br />
                            {`${ip.Inventors.length === 1 ? ip.Inventors.map((inventor) => { return inventor }) : ip.Inventors.map((inventor) => { return " " + inventor })} \n`}
                            <br />
                            {`${ip.Schools.length === 1 ? ip.Schools.map((school) => { return school }) : ip.Schools.map((school) => { return " " + school })} \n`}
                        </Card.Subtitle>
                    </Card.Body>
                </Card>
            </>
        );

    })
    const IPS_Patent = Intellectual_Property.Patents.map((ip, index) => {
        return (
            <>

                <Card
                    key={index}
                    bg="light"
                    text="dark"
                    style={{ width: '100%' }}
                >
                    <Card.Header className={"project_header"}>
                        {index + 1 + ". " + ip.Title}
                    </Card.Header>
                    <Card.Body>
                        <Card.Subtitle className="mb-2 text-muted">
                            <strong className={"strong-color"}>Status: </strong> {`${ip.Status} `}
                            &nbsp; &nbsp; &nbsp;<strong className={"strong-color"}>Approval Date: </strong>
                            {`${ip.Approval_Date}`}
                            <br />
                            {`${ip.Inventors.join(", ")}`}
                            <br />
                            {`${ip.Schools.join(", ")}`}
                        </Card.Subtitle>
                    </Card.Body>
                </Card>
            </>
        );
    })
    const Doctoral = Supervision.PHD.map((supervision, index) => {
        return (
            <>

                <Card
                    key={index}
                    bg="light"
                    text="dark"
                    style={{ width: '100%' }}
                >
                    <Card.Header className={"project_header"}>
                        {index + 1 + ". " + supervision.Title}
                    </Card.Header>
                    <Card.Body>
                        <Card.Subtitle className="mb-2 text-muted">
                            <i>{`${supervision.StudentName}`}</i>{` - ${(supervision.Program).split(" - ")[0]} - ${supervision.School}`}
                        </Card.Subtitle>
                    </Card.Body>
                </Card>
            </>
        );
    })
    const MS = Supervision.Masters.map((supervision, index) => {
        return (<>
            <Card
                key={index}
                bg="light"
                text="dark"
                style={{ width: '100%' }}
            >
                <Card.Header className={"project_header"}>
                    {index + 1 + ". " + supervision.Title}
                </Card.Header>
                <Card.Body>
                    <Card.Subtitle className="mb-2 text-muted">
                        <i>{`${supervision.StudentName}`}</i>{` - ${(supervision.Program).split(" - ")[0]} - ${supervision.School}`}
                    </Card.Subtitle>
                </Card.Body>
            </Card>
        </>);
    })
    const qualifications = profile[0].Qualifications.map((qualification, index) => {

        return (
            <Card
                key={index}
                bg="light"
                text="dark"
                style={{ width: '100%' }}
            >
                <Card.Header className={"project_header"}>
                    {qualification.Degree} {qualification.speciality}
                </Card.Header>
                <Card.Body>
                    <Card.Subtitle className="mb-2 text-muted">
                        {`${qualification.Institution}, ${qualification.Country} (${qualification.Starting_Year} - ${qualification.Ending_Year})`}
                    </Card.Subtitle>
                </Card.Body>
            </Card>
        );
    })
    const awards = profile[0].Awards.map((award, index) => {
        return (

            <Card
                key={index}
                bg="light"
                text="dark"
                style={{ width: '100%' }}
            >
                <Card.Header className={"project_header"}>
                    {index + 1 + ". " + `${(award.Location).replace(":", "").replace("-", "")}`}
                </Card.Header>
                <Card.Body>
                    <Card.Subtitle className="mb-2 text-muted">
                        {`${award.Title} 
                                            ${(award.Year) === "" ? "" : `(${award.Year})`}`}
                    </Card.Subtitle>
                </Card.Body>
            </Card>

        );
    })
    const keynotes = profile[0].KeyNotes.map((award, index) => {
        return (
            <Card
                key={index}
                bg="light"
                text="dark"
                style={{ width: '100%' }}
            >
                <Card.Header className={"project_header"}>
                    {index + 1 + ". " + award.Title}
                </Card.Header>
                <Card.Body>
                    <Card.Subtitle className="mb-2 text-muted">
                        {`${(award.Location).replace(":", "").replace("-", "")} 
                            ${(award.Year) === "" ? "" : `(${award.Year})`}`}
                    </Card.Subtitle>
                </Card.Body>
            </Card>
        );
    })
    const experience = profile[0].Experience.map((experience, index) => {
        return (
            <Card
                key={index}
                bg="light"
                text="dark"
                style={{ width: '100%' }}
            >
                <Card.Header className={"project_header"}>
                    {index + 1 + ". " + experience.job_description + " (" + experience.Year_From + " - " + experience.Year_To + ")"}
                </Card.Header>
                <Card.Body>
                    <Card.Subtitle className="mb-2 text-muted">
                        {`${experience.org_name}`}
                    </Card.Subtitle>
                </Card.Body>
            </Card>
        );
    })
    const Trainings_Attended = profile[0].Trainings_Attended.map((training, index) => {
        return (
            <>
                <Card
                    key={index}
                    bg="light"
                    text="dark"
                    style={{ width: '100%' }}
                >
                    <Card.Header className={"project_header"}>
                        {(index + 1) + ". " + training.Name}
                    </Card.Header>
                    <Card.Body>
                        <Card.Subtitle>
                            {`Organized By: ${training.Organization_Body} (${training.Date_From} ) - ( ${training.Date_To})`}
                        </Card.Subtitle>
                    </Card.Body>
                </Card>

            </>
        );
    })
    const Professional_Memberships = profile[0].Professional_Memberships_Registrations.map((memberships, index) => {
        return (
            <>
                <Card
                    key={index}
                    bg="light"
                    text="dark"
                    style={{ width: '100%' }}
                >
                    <Card.Header className={"project_header"}>
                        {(index + 1) + ". Member of " + memberships.Name}
                    </Card.Header>
                    {/*<Card.Body>*/}
                    {/*    <Card.Subtitle>*/}
                    {/*        {`Membership# ${memberships.Reg_No}  Registrations Date: (${memberships.Reg_Date})  Valid Untill: (${memberships.Valid_Until})  `}*/}
                    {/*    </Card.Subtitle>*/}
                    {/*</Card.Body>*/}
                </Card>

            </>
        );
    })


    //Zain's Code
    let divCount = 0;

    if (Project_Research.National.length + Project_Research.International.length !== 0) {
        divCount++;
    }

    if (Project_Industry.National.length + Project_Industry.International.length !== 0) {
        divCount++;
    }

    if (AmountGranted != 0) {
        divCount++;
    }

    if (Research_Articles_List.length + Books.length + Book_Chapters.length + Conferences.length !== 0) {
        divCount++;
    }

    if (Citations !== 0) {
        divCount++;
    }

    if (IPS_Patent.length + IPS_Design.length + IPS_CopyRight.length + IPS_TradeMark.length !== 0) {
        divCount++;
    }

    const [isiPadView, setiPadView] = useState(false)

    const handleWindowSizeChange = () => {
        setiPadView(window.innerWidth <= 1200 && window.innerWidth > 910)
    }

    useEffect(() => {
        // Add event listener for window resize
        window.addEventListener('resize', handleWindowSizeChange);

        // Initial call to set the variableValue based on the window size
        handleWindowSizeChange();

        // Cleanup: remove event listener when component is unmounted
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        };
    }, []);

    return (
        <>
            {modal && (
                <>
                    <div className="modal-wrapper" onClick={toggleModal}></div>
                    <div className="modal-container">
                        <div className={modal ? "modal-barchart1" : "profile-charts-div"}>
                            {Research_Articles.length + Books.length + Book_Chapters.length + conferences.length === 0 ? "" : <PieChart data={Publications_Pie_Chart_Date} title={"Projects"} />}
                            {projects.length === 0 ? "" : <PieChart data={Project_Pie_Chart_Date} title={"Projects"} />}
                        </div>
                        <div className={modal ? "modal-barchart1" : "profile-charts-div"}>
                            {Research_Articles.length + Books.length + Book_Chapters.length === 0 ? "" : <Line_Chart data={publications_data} title={"Publications"} />}
                            {projects.length === 0 ? "" : <Line_Chart data={projects_data} title={"Projects"} />}
                        </div>
                    </div>
                </>
            )}
            <div className={"User_Profile"} style={{}}>
                {/* <div className="img_buttons"> */}
                <div className={"faculty_info"}>
                    {isiPadView ? (
                        <div className={"Options"}>
                            <div className={"analytics"}>
                                <Button
                                    onClick={() => setTabOptions({
                                        ...TabOptions,
                                        profile_tab: false,
                                        analysis_tab: true,
                                        allProjects_tab: false,
                                        researchProjects_International_tab: false,
                                        researchProjects_National_tab: false,
                                        industrialProjects_National_tab: false,
                                        industrialProjects_International_tab: false,
                                        publications_Articles_tab: false,
                                        publications_Books_tab: false,
                                        publications_Chapters_tab: false,
                                        Conference_tab: false,
                                        Patents_National_tab: false,
                                        Patents_International_tab: false,
                                        Intellectual_Property_tab: false,
                                        Supervision_PHD_tab: false,
                                        Supervision_Masters_tab: false,
                                        Editorial_Board_tab: false,
                                        Copyright_tab: false,
                                        Industrial_Design_tab: false,
                                        Trade_Marks_tab: false,
                                        Training_Conducted_tab: false,
                                        Training_Attended_tab: false,
                                    })}>
                                    Home
                                </Button>
                            </div>
                            <div className={"profile"}>
                                <Button
                                    onClick={() => {
                                        setOptions({
                                            ...CollapseOptions,
                                            Profile_options: !CollapseOptions.Profile_options
                                        })
                                        setProfileData((prevState) => {
                                            return {
                                                ...prevState,
                                                Qualifications: true,
                                                Awards: false,
                                                Experience: false,
                                                Talks: false,
                                                Memberships: false
                                            }
                                        });
                                        setTabOptions({
                                            ...TabOptions,
                                            analysis_tab: false,
                                            profile_tab: true,
                                            allProjects_tab: false,
                                            researchProjects_International_tab: false,
                                            researchProjects_National_tab: false,
                                            industrialProjects_National_tab: false,
                                            industrialProjects_International_tab: false,
                                            publications_Articles_tab: false,
                                            publications_Books_tab: false,
                                            publications_Chapters_tab: false,
                                            Conference_tab: false,
                                            Patents_National_tab: false,
                                            Patents_International_tab: false,
                                            Intellectual_Property_tab: false,
                                            Training_Conducted_tab: false,
                                            Training_Attended_tab: false,
                                            Supervision_PHD_tab: false,
                                            Supervision_Masters_tab: false,
                                            Editorial_Board_tab: false,
                                            Copyright_tab: false,
                                            Industrial_Design_tab: false,
                                            Trade_Marks_tab: false,
                                        })

                                    }}
                                    aria-controls="profile-options-area" aria-expanded={CollapseOptions.Profile_options}
                                >
                                    Profile
                                    <h5>{CollapseOptions.Profile_options ?
                                        <FontAwesomeIcon icon={faAngleUp} className={'arrow'} /> :
                                        <FontAwesomeIcon icon={faAngleDown} className={'arrow'} />}</h5>
                                </Button>
                                <Collapse in={CollapseOptions.Profile_options}>
                                    <div id={"profile-options-area"}>
                                        {profile[0].Qualifications.length > 0 ? <Button onClick={() => {
                                            setProfileData({
                                                ...profileData,
                                                Qualifications: true,
                                                Awards: false,
                                                Experience: false,
                                                Talks: false,
                                                Memberships: false,
                                            });
                                            setTabOptions({
                                                ...TabOptions,
                                                analysis_tab: false,
                                                profile_tab: true,
                                                allProjects_tab: false,
                                                researchProjects_International_tab: false,
                                                researchProjects_National_tab: false,
                                                industrialProjects_National_tab: false,
                                                industrialProjects_International_tab: false,
                                                publications_Articles_tab: false,
                                                publications_Books_tab: false,
                                                publications_Chapters_tab: false,
                                                Conference_tab: false,
                                                Patents_National_tab: false,
                                                Patents_International_tab: false,
                                                Intellectual_Property_tab: false,
                                                Training_Conducted_tab: false,
                                                Training_Attended_tab: false,
                                                Supervision_PHD_tab: false,
                                                Supervision_Masters_tab: false,
                                                Editorial_Board_tab: false,
                                                Copyright_tab: false,
                                                Industrial_Design_tab: false,
                                                Trade_Marks_tab: false,
                                            })
                                        }}>Qualifications</Button> : ""}
                                        {profile[0].Experience.length > 0 ? <Button onClick={() => {
                                            setProfileData({
                                                ...profileData,
                                                Qualifications: false,
                                                Awards: false,
                                                Experience: true,
                                                Talks: false,
                                                Memberships: false,
                                            });
                                            setTabOptions({
                                                ...TabOptions,
                                                analysis_tab: false,
                                                profile_tab: true,
                                                allProjects_tab: false,
                                                researchProjects_International_tab: false,
                                                researchProjects_National_tab: false,
                                                industrialProjects_National_tab: false,
                                                industrialProjects_International_tab: false,
                                                publications_Articles_tab: false,
                                                publications_Books_tab: false,
                                                publications_Chapters_tab: false,
                                                Conference_tab: false,
                                                Patents_National_tab: false,
                                                Patents_International_tab: false,
                                                Intellectual_Property_tab: false,
                                                Training_Conducted_tab: false,
                                                Training_Attended_tab: false,
                                                Supervision_PHD_tab: false,
                                                Supervision_Masters_tab: false,
                                                Editorial_Board_tab: false,
                                                Copyright_tab: false,
                                                Industrial_Design_tab: false,
                                                Trade_Marks_tab: false,
                                            })
                                        }}>Experience</Button> : ""}
                                        {profile[0].Awards.length > 0 ? <Button onClick={() => {
                                            setProfileData({
                                                ...profileData,
                                                Qualifications: false,
                                                Awards: true,
                                                Experience: false,
                                                Talks: false,
                                                Memberships: false,
                                            });

                                            setTabOptions({
                                                ...TabOptions,
                                                analysis_tab: false,
                                                profile_tab: true,
                                                allProjects_tab: false,
                                                researchProjects_International_tab: false,
                                                researchProjects_National_tab: false,
                                                industrialProjects_National_tab: false,
                                                industrialProjects_International_tab: false,
                                                publications_Articles_tab: false,
                                                publications_Books_tab: false,
                                                publications_Chapters_tab: false,
                                                Conference_tab: false,
                                                Patents_National_tab: false,
                                                Patents_International_tab: false,
                                                Intellectual_Property_tab: false,
                                                Training_Conducted_tab: false,
                                                Training_Attended_tab: false,
                                                Supervision_PHD_tab: false,
                                                Supervision_Masters_tab: false,
                                                Editorial_Board_tab: false,
                                                Copyright_tab: false,
                                                Industrial_Design_tab: false,
                                                Trade_Marks_tab: false,
                                            })

                                        }}>Awards</Button> : ""}
                                        {profile[0].KeyNotes.length > 0 ? <Button onClick={() => {
                                            setProfileData({
                                                ...profileData,
                                                Qualifications: false,
                                                Awards: false,
                                                Experience: false,
                                                Talks: true,
                                                Memberships: false,
                                            });
                                            setTabOptions({
                                                ...TabOptions,
                                                analysis_tab: false,
                                                profile_tab: true,
                                                allProjects_tab: false,
                                                researchProjects_International_tab: false,
                                                researchProjects_National_tab: false,
                                                industrialProjects_National_tab: false,
                                                industrialProjects_International_tab: false,
                                                publications_Articles_tab: false,
                                                publications_Books_tab: false,
                                                publications_Chapters_tab: false,
                                                Conference_tab: false,
                                                Patents_National_tab: false,
                                                Patents_International_tab: false,
                                                Intellectual_Property_tab: false,
                                                Training_Conducted_tab: false,
                                                Training_Attended_tab: false,
                                                Supervision_PHD_tab: false,
                                                Supervision_Masters_tab: false,
                                                Editorial_Board_tab: false,
                                                Copyright_tab: false,
                                                Industrial_Design_tab: false,
                                                Trade_Marks_tab: false,
                                            })
                                        }}>Invited Speaker & Keynotes</Button> : ""}
                                        {profile[0].Professional_Memberships_Registrations.length <= 0 ? "" : <Button onClick={() => {
                                            setProfileData({
                                                ...profileData,
                                                Qualifications: false,
                                                Awards: false,
                                                Experience: false,
                                                Talks: false,
                                                Memberships: true,
                                            });
                                            setTabOptions({
                                                ...TabOptions,
                                                analysis_tab: false,
                                                profile_tab: true,
                                                allProjects_tab: false,
                                                researchProjects_International_tab: false,
                                                researchProjects_National_tab: false,
                                                industrialProjects_National_tab: false,
                                                industrialProjects_International_tab: false,
                                                publications_Articles_tab: false,
                                                publications_Books_tab: false,
                                                publications_Chapters_tab: false,
                                                Conference_tab: false,
                                                Patents_National_tab: false,
                                                Patents_International_tab: false,
                                                Intellectual_Property_tab: false,
                                                Training_Conducted_tab: false,
                                                Training_Attended_tab: false,
                                                Supervision_PHD_tab: false,
                                                Supervision_Masters_tab: false,
                                                Editorial_Board_tab: false,
                                                Copyright_tab: false,
                                                Industrial_Design_tab: false,
                                                Trade_Marks_tab: false,
                                            })
                                        }}>Memberships</Button>}
                                    </div>
                                </Collapse>
                            </div>
                            {projects.length === 0 ? "" : <div className={"Projects"}>
                                <Button
                                    onClick={() => setOptions({
                                        ...CollapseOptions,
                                        project_options: !CollapseOptions.project_options
                                    })}
                                    aria-controls="Project-options-area" aria-expanded={CollapseOptions.project_options}>
                                    Projects


                                    <span className={"number projects"}>{Research_national_List.length + Research_international_List.length + Industry_National_List.length + Industry_International_List.length}</span>


                                    <h5>{CollapseOptions.project_options ?
                                        <FontAwesomeIcon icon={faAngleUp} className={'arrow'} /> :
                                        <FontAwesomeIcon icon={faAngleDown} className={'arrow'} />}</h5>
                                </Button>
                                <Collapse in={CollapseOptions.project_options}>
                                    <div id={"Project-options-area"}>
                                        {Project_Research.National.length === 0 && Project_Research.International.length === 0 ? "" :
                                            <Button
                                                onClick={() => setOptions({
                                                    ...CollapseOptions,
                                                    research_project_options: !CollapseOptions.research_project_options
                                                })}
                                                aria-controls={"research-project-options-area"} aria-expanded={CollapseOptions.research_project_options}>
                                                Research Projects
                                                <span className={"internal-projects"}>{Project_Research.National.length + Project_Research.International.length} </span>
                                                <h5>{CollapseOptions.research_project_options ?
                                                    <FontAwesomeIcon icon={faAngleUp} className={'arrow'} /> :
                                                    <FontAwesomeIcon icon={faAngleDown} className={'arrow'} />}</h5>
                                            </Button>}
                                        <Collapse in={CollapseOptions.research_project_options}>
                                            <div id={"research-project-options-area"}>
                                                {Project_Research.National.length === 0 ? "" : <Button onClick={() => {
                                                    setTabOptions({
                                                        ...TabOptions,
                                                        profile_tab: false, analysis_tab: false,
                                                        allProjects_tab: false,
                                                        researchProjects_International_tab: false,
                                                        researchProjects_National_tab: true,
                                                        industrialProjects_National_tab: false,
                                                        industrialProjects_International_tab: false,
                                                        publications_Articles_tab: false,
                                                        publications_Books_tab: false,
                                                        publications_Chapters_tab: false,
                                                        Conference_tab: false,
                                                        Patents_National_tab: false,
                                                        Patents_International_tab: false,
                                                        Intellectual_Property_tab: false,
                                                        Training_Conducted_tab: false,
                                                        Training_Attended_tab: false,
                                                        Supervision_PHD_tab: false,
                                                        Supervision_Masters_tab: false,
                                                        Editorial_Board_tab: false,
                                                        Copyright_tab: false,
                                                        Industrial_Design_tab: false,
                                                        Trade_Marks_tab: false,
                                                    })
                                                }}>National <span className={"number internal_national"}>{Research_national_List.length}</span></Button>}
                                                {Project_Research.International.length === 0 ? "" : <Button onClick={() => {
                                                    setTabOptions({
                                                        ...TabOptions,
                                                        profile_tab: false, analysis_tab: false,
                                                        allProjects_tab: false,
                                                        researchProjects_International_tab: true,
                                                        researchProjects_National_tab: false,
                                                        industrialProjects_National_tab: false,
                                                        industrialProjects_International_tab: false,
                                                        publications_Articles_tab: false,
                                                        publications_Books_tab: false,
                                                        publications_Chapters_tab: false,
                                                        Conference_tab: false,
                                                        Patents_National_tab: false,
                                                        Patents_International_tab: false,
                                                        Intellectual_Property_tab: false,
                                                        raining_Conducted_tab: false,
                                                        Training_Attended_tab: false,
                                                        Supervision_PHD_tab: false,
                                                        Supervision_Masters_tab: false,
                                                        Editorial_Board_tab: false,
                                                        Copyright_tab: false,
                                                        Industrial_Design_tab: false,
                                                        Trade_Marks_tab: false,
                                                    })
                                                }}>International <span className={"internal_international"}>{Research_international_List.length}</span></Button>}
                                            </div>
                                        </Collapse>
                                        {Project_Industry.National.length === 0 && Project_Industry.International.length === 0 ? "" : <Button onClick={() => setOptions({
                                            ...CollapseOptions,
                                            industrial_project_options: !CollapseOptions.industrial_project_options
                                        })}
                                            aria-controls={"industrial-project-options-area"}
                                            aria-expanded={CollapseOptions.industrial_project_options}>
                                            Industrial Projects <span className={"internal-projects"}>{Project_Industry.National.length + Project_Industry.International.length}</span>
                                            <h5>{CollapseOptions.industrial_project_options ?
                                                <FontAwesomeIcon icon={faAngleUp} className={'arrow'} /> :
                                                <FontAwesomeIcon icon={faAngleDown} className={'arrow'} />}</h5>
                                        </Button>}
                                        <Collapse in={CollapseOptions.industrial_project_options}>
                                            <div id={"industrial-project-options-area"}>
                                                {Project_Industry.National.length === 0 ? "" : <Button onClick={() => {
                                                    setTabOptions({
                                                        ...TabOptions,
                                                        profile_tab: false, analysis_tab: false,
                                                        allProjects_tab: false,
                                                        researchProjects_International_tab: false,
                                                        researchProjects_National_tab: false,
                                                        industrialProjects_National_tab: true,
                                                        industrialProjects_International_tab: false,
                                                        publications_Articles_tab: false,
                                                        publications_Books_tab: false,
                                                        publications_Chapters_tab: false,
                                                        Conference_tab: false,
                                                        Patents_National_tab: false,
                                                        Patents_International_tab: false,
                                                        Intellectual_Property_tab: false,
                                                        Training_Conducted_tab: false,
                                                        Training_Attended_tab: false,
                                                        Supervision_PHD_tab: false,
                                                        Supervision_Masters_tab: false,
                                                        Editorial_Board_tab: false,
                                                        Copyright_tab: false,
                                                        Industrial_Design_tab: false,
                                                        Trade_Marks_tab: false,
                                                    })
                                                }}>National <span className={"number internal_national"}>{Industry_National_List.length}</span></Button>}
                                                {Project_Industry.International.length === 0 ? "" : <Button onClick={() => {
                                                    setTabOptions({
                                                        ...TabOptions,
                                                        profile_tab: false, analysis_tab: false,
                                                        allProjects_tab: false,
                                                        researchProjects_International_tab: false,
                                                        researchProjects_National_tab: false,
                                                        industrialProjects_National_tab: false,
                                                        industrialProjects_International_tab: true,
                                                        publications_Articles_tab: false,
                                                        publications_Books_tab: false,
                                                        publications_Chapters_tab: false,
                                                        Conference_tab: false,
                                                        Patents_National_tab: false,
                                                        Patents_International_tab: false,
                                                        Intellectual_Property_tab: false,
                                                        Training_Conducted_tab: false,
                                                        Training_Attended_tab: false,
                                                        Supervision_PHD_tab: false,
                                                        Supervision_Masters_tab: false,
                                                        Editorial_Board_tab: false,
                                                        Copyright_tab: false,
                                                        Industrial_Design_tab: false,
                                                        Trade_Marks_tab: false,
                                                    })
                                                }}>International <span className={"internal_international"}>{Industry_International_List.length}</span></Button>}
                                            </div>
                                        </Collapse>
                                    </div>
                                </Collapse>
                            </div>}
                            {Research_Articles.length === 0 && Books.length === 0 && Book_Chapters.length === 0 && conferences.length === 0 && editorials.length === 0 ? "" : <div className={"publications"}>
                                <Button
                                    onClick={() => setOptions({
                                        ...CollapseOptions,
                                        publications_options: !CollapseOptions.publications_options
                                    })}
                                    aria-controls="Publications-options-area"
                                    aria-expanded={CollapseOptions.publications_options}>
                                    Publications <span className={"number"}>{Research_Articles_List.length + Books.length + Book_Chapters.length + Conferences.length}</span>
                                    <h5>{CollapseOptions.publications_options ?
                                        <FontAwesomeIcon icon={faAngleUp} className={'arrow'} /> :
                                        <FontAwesomeIcon icon={faAngleDown} className={'arrow'} />}</h5>
                                </Button>
                                <Collapse in={CollapseOptions.publications_options}>
                                    <div id={"Publications-options-area"}>
                                        {Research_Articles.length === 0 ? "" : <Button onClick={() => {
                                            setTabOptions({
                                                ...TabOptions,
                                                profile_tab: false, analysis_tab: false,
                                                allProjects_tab: false,
                                                researchProjects_International_tab: false,
                                                researchProjects_National_tab: false,
                                                industrialProjects_National_tab: false,
                                                industrialProjects_International_tab: false,
                                                publications_Articles_tab: true,
                                                publications_Books_tab: false,
                                                publications_Chapters_tab: false,
                                                Conference_tab: false,
                                                Patents_National_tab: false,
                                                Patents_International_tab: false,
                                                Intellectual_Property_tab: false,
                                                Training_Conducted_tab: false,
                                                Training_Attended_tab: false,
                                                Supervision_PHD_tab: false,
                                                Supervision_Masters_tab: false,
                                                Editorial_Board_tab: false,
                                                Copyright_tab: false,
                                                Industrial_Design_tab: false,
                                                Trade_Marks_tab: false,
                                            })
                                        }}>Research Articles <span className={"internal-articles"}>{Research_Articles_List.length}</span></Button>}
                                        {conferences.length === 0 ? "" : <Button onClick={() => {
                                            setTabOptions({
                                                ...TabOptions,
                                                profile_tab: false, analysis_tab: false,
                                                allProjects_tab: false,

                                                researchProjects_International_tab: false,
                                                researchProjects_National_tab: false,
                                                industrialProjects_National_tab: false,
                                                industrialProjects_International_tab: false,
                                                publications_Articles_tab: false,
                                                publications_Books_tab: false,
                                                publications_Chapters_tab: false,
                                                Conference_tab: true,
                                                Patents_National_tab: false,
                                                Patents_International_tab: false,
                                                Intellectual_Property_tab: false,
                                                Training_Conducted_tab: false,
                                                Training_Attended_tab: false,
                                                Supervision_PHD_tab: false,
                                                Supervision_Masters_tab: false,
                                                Editorial_Board_tab: false,
                                                Copyright_tab: false,
                                                Industrial_Design_tab: false,
                                                Trade_Marks_tab: false,
                                            })
                                        }}>Conference Proceedings <span className={"internal-conference"}>{Conferences.length}</span></Button>}
                                        {editorials.length === 0 ? "" : <Button onClick={() => {
                                            setTabOptions({
                                                ...TabOptions,
                                                profile_tab: false, analysis_tab: false,
                                                allProjects_tab: false,

                                                researchProjects_International_tab: false,
                                                researchProjects_National_tab: false,
                                                industrialProjects_National_tab: false,
                                                industrialProjects_International_tab: false,
                                                publications_Articles_tab: false,
                                                publications_Books_tab: false,
                                                publications_Chapters_tab: false,
                                                Conference_tab: false,
                                                Patents_National_tab: false,
                                                Patents_International_tab: false,
                                                Intellectual_Property_tab: false,
                                                Training_Conducted_tab: false,
                                                Training_Attended_tab: false,
                                                Supervision_PHD_tab: false,
                                                Supervision_Masters_tab: false,
                                                Editorial_Board_tab: true,
                                                Copyright_tab: false,
                                                Industrial_Design_tab: false,
                                                Trade_Marks_tab: false,
                                            })
                                        }}>Editorial Activities <span className={"internal-editorials"}>{Editorials.length}</span></Button>}
                                        {Books.length === 0 ? "" : <Button onClick={() => {
                                            setTabOptions({
                                                ...TabOptions,
                                                profile_tab: false, analysis_tab: false,
                                                allProjects_tab: false,

                                                researchProjects_International_tab: false,
                                                researchProjects_National_tab: false,
                                                industrialProjects_National_tab: false,
                                                industrialProjects_International_tab: false,
                                                publications_Articles_tab: false,
                                                publications_Books_tab: true,
                                                publications_Chapters_tab: false,
                                                Conference_tab: false,
                                                Patents_National_tab: false,
                                                Patents_International_tab: false,
                                                Intellectual_Property_tab: false,
                                                Training_Conducted_tab: false,
                                                Training_Attended_tab: false,
                                                Supervision_PHD_tab: false,
                                                Supervision_Masters_tab: false,
                                                Editorial_Board_tab: false,
                                                Copyright_tab: false,
                                                Industrial_Design_tab: false,
                                                Trade_Marks_tab: false,
                                            })
                                        }}>Books <span className={"internal-chapter internal-book"}>{Books.length}</span></Button>}
                                        {Book_Chapters.length === 0 ? "" : <Button onClick={() => {
                                            setTabOptions({
                                                ...TabOptions,
                                                profile_tab: false, analysis_tab: false,
                                                allProjects_tab: false,


                                                researchProjects_International_tab: false,
                                                researchProjects_National_tab: false,
                                                industrialProjects_National_tab: false,
                                                industrialProjects_International_tab: false,
                                                publications_Articles_tab: false,
                                                publications_Books_tab: false,
                                                publications_Chapters_tab: true,
                                                Conference_tab: false,
                                                Patents_National_tab: false,
                                                Patents_International_tab: false,
                                                Intellectual_Property_tab: false,
                                                Training_Conducted_tab: false,
                                                Training_Attended_tab: false,
                                                Supervision_PHD_tab: false,
                                                Supervision_Masters_tab: false,
                                                Editorial_Board_tab: false,
                                                Copyright_tab: false,
                                                Industrial_Design_tab: false,
                                                Trade_Marks_tab: false,
                                            })
                                        }}>Book Chapters <span className={"internal-chapter"}>{Book_Chapters.length}</span></Button>}
                                    </div>
                                </Collapse>
                            </div>}
                            {ips.length === 0 ? "" : <div className={"IP"}>
                                <Button
                                    onClick={() => setOptions({ ...CollapseOptions, ip_options: !CollapseOptions.ip_options })}
                                    aria-controls="IP-options-area" aria-expanded={CollapseOptions.ip_options}>
                                    Intellectual Property <span className={"ip_number"}>{IPS_Patent.length + IPS_Design.length + IPS_CopyRight.length + IPS_TradeMark.length}</span>
                                    <h5>{CollapseOptions.ip_options ? <FontAwesomeIcon icon={faAngleUp} className={'arrow'} /> :
                                        <FontAwesomeIcon icon={faAngleDown} className={'arrow'} />}</h5>
                                </Button>
                                <Collapse in={CollapseOptions.ip_options}>
                                    <div id={"IP-options-area"}>
                                        {Intellectual_Property.Patents.length === 0 &&
                                            Intellectual_Property.Patents.length === 0 ? "" : <Button onClick={() => setOptions({
                                                ...CollapseOptions,
                                                patents_options: !CollapseOptions.patents_options
                                            })}
                                                aria-controls="Patent-options-area"
                                                aria-expanded={CollapseOptions.patents_options}>
                                            Patents <span className={"patents"}>{IPS_Patent.length}</span>
                                            <h5>{CollapseOptions.patents_options ?
                                                <FontAwesomeIcon icon={faAngleUp} className={'arrow'} /> :
                                                <FontAwesomeIcon icon={faAngleDown} className={'arrow'} />}</h5>
                                        </Button>}
                                        <Collapse in={CollapseOptions.patents_options}>
                                            <div id={"Patent-options-area"}>
                                                {Intellectual_Property.Patents.length === 0 ? "" : <Button onClick={() => {
                                                    setTabOptions({
                                                        ...TabOptions,
                                                        profile_tab: false, analysis_tab: false,
                                                        allProjects_tab: false,
                                                        researchProjects_International_tab: false,
                                                        researchProjects_National_tab: false,
                                                        industrialProjects_National_tab: false,
                                                        industrialProjects_International_tab: false,
                                                        publications_Articles_tab: false,
                                                        publications_Books_tab: false,
                                                        publications_Chapters_tab: false,
                                                        Conference_tab: false,
                                                        Patents_National_tab: true,
                                                        Patents_International_tab: false,
                                                        Intellectual_Property_tab: false,
                                                        Training_Conducted_tab: false,
                                                        Training_Attended_tab: false,
                                                        Supervision_PHD_tab: false,
                                                        Supervision_Masters_tab: false,
                                                        Editorial_Board_tab: false,
                                                        Copyright_tab: false,
                                                        Industrial_Design_tab: false,
                                                        Trade_Marks_tab: false,
                                                    })
                                                }}>National <span className={"number internal_national"}>{IPS_Patent.length}</span></Button>}

                                                {!false ? "" : <Button onClick={() => {
                                                    setTabOptions({
                                                        ...TabOptions,
                                                        profile_tab: false, analysis_tab: false,
                                                        allProjects_tab: false,
                                                        researchProjects_International_tab: false,
                                                        researchProjects_National_tab: false,
                                                        industrialProjects_National_tab: false,
                                                        industrialProjects_International_tab: false,
                                                        publications_Articles_tab: false,
                                                        publications_Books_tab: false,
                                                        publications_Chapters_tab: false,
                                                        Conference_tab: false,
                                                        Patents_National_tab: false,
                                                        Patents_International_tab: true,
                                                        Intellectual_Property_tab: false,
                                                        Training_Conducted_tab: false,
                                                        Training_Attended_tab: false,
                                                        Supervision_PHD_tab: false,
                                                        Supervision_Masters_tab: false,
                                                        Editorial_Board_tab: false,
                                                        Copyright_tab: false,
                                                        Industrial_Design_tab: false,
                                                        Trade_Marks_tab: false,
                                                    })
                                                }}>International</Button>}
                                            </div>
                                        </Collapse>
                                        {Intellectual_Property.Industrial_Design.length === 0 ? "" : <Button onClick={() => {
                                            setTabOptions({
                                                ...TabOptions,
                                                profile_tab: false, analysis_tab: false,
                                                allProjects_tab: false,
                                                researchProjects_International_tab: false,
                                                researchProjects_National_tab: false,
                                                industrialProjects_National_tab: false,
                                                industrialProjects_International_tab: false,
                                                publications_Articles_tab: false,
                                                publications_Books_tab: false,
                                                publications_Chapters_tab: false,
                                                Conference_tab: false,
                                                Patents_National_tab: false,
                                                Patents_International_tab: false,
                                                Intellectual_Property_tab: false,
                                                Training_Conducted_tab: false,
                                                Training_Attended_tab: false,
                                                Supervision_PHD_tab: false,
                                                Supervision_Masters_tab: false,
                                                Editorial_Board_tab: false,
                                                Copyright_tab: false,
                                                Industrial_Design_tab: true,
                                                Trade_Marks_tab: false,
                                            })
                                        }}>
                                            Industrial Designs <span className={"ips_ids"}>{IPS_Design.length}</span>
                                        </Button>}
                                        {Intellectual_Property.Copy_Rights.length === 0 ? "" : <Button onClick={() => {
                                            setTabOptions({
                                                ...TabOptions,
                                                profile_tab: false, analysis_tab: false,
                                                allProjects_tab: false,
                                                researchProjects_International_tab: false,
                                                researchProjects_National_tab: false,
                                                industrialProjects_National_tab: false,
                                                industrialProjects_International_tab: false,
                                                publications_Articles_tab: false,
                                                publications_Books_tab: false,
                                                publications_Chapters_tab: false,
                                                Conference_tab: false,
                                                Patents_National_tab: false,
                                                Patents_International_tab: false,
                                                Intellectual_Property_tab: false,
                                                Training_Conducted_tab: false,
                                                Training_Attended_tab: false,
                                                Supervision_PHD_tab: false,
                                                Supervision_Masters_tab: false,
                                                Editorial_Board_tab: false,
                                                Copyright_tab: true,
                                                Industrial_Design_tab: false,
                                                Trade_Marks_tab: false,
                                            })
                                        }}>
                                            Copyrights <span className={"ips_cps"}>{IPS_CopyRight.length}</span>
                                        </Button>}
                                        {Intellectual_Property.Trade_Marks.length === 0 ? "" : <Button onClick={() => {
                                            setTabOptions({
                                                ...TabOptions,
                                                profile_tab: false, analysis_tab: false,
                                                allProjects_tab: false,

                                                researchProjects_International_tab: false,
                                                researchProjects_National_tab: false,
                                                industrialProjects_National_tab: false,
                                                industrialProjects_International_tab: false,
                                                publications_Articles_tab: false,
                                                publications_Books_tab: false,
                                                publications_Chapters_tab: false,
                                                Conference_tab: false,
                                                Patents_National_tab: false,
                                                Patents_International_tab: false,
                                                Intellectual_Property_tab: false,
                                                Training_Conducted_tab: false,
                                                Training_Attended_tab: false,
                                                Supervision_PHD_tab: false,
                                                Supervision_Masters_tab: false,
                                                Editorial_Board_tab: false,
                                                Copyright_tab: false,
                                                Industrial_Design_tab: false,
                                                Trade_Marks_tab: true,
                                            })
                                        }}>
                                            Trade Marks <span className={"number ips_tds"}>{IPS_TradeMark.length}</span>
                                        </Button>}
                                    </div>
                                </Collapse>
                            </div>}
                            {Trainings.length + profile[0].Trainings_Attended.length === 0 ? "" : <div className={"trainings"}>
                                <Button
                                    onClick={() => setOptions({
                                        ...CollapseOptions,
                                        training_options: !CollapseOptions.training_options
                                    })}
                                    aria-controls="trainings-options-area" aria-expanded={CollapseOptions.training_options}>
                                    Trainings <span className={"trainings_number"}>{Trainings.length + profile[0].Trainings_Attended.length}</span>
                                    <h5>{CollapseOptions.training_options ?
                                        <FontAwesomeIcon icon={faAngleUp} className={'arrow'} /> :
                                        <FontAwesomeIcon icon={faAngleDown} className={'arrow'} />}</h5>
                                </Button>
                                <Collapse in={CollapseOptions.training_options}>
                                    <div id={"trainings-options-area"}>
                                        {profile[0].Trainings_Attended.length === 0 ? "" : <Button
                                            onClick={() => {
                                                setTabOptions({
                                                    ...TabOptions,
                                                    profile_tab: false, analysis_tab: false,
                                                    allProjects_tab: false,
                                                    researchProjects_International_tab: false,
                                                    researchProjects_National_tab: false,
                                                    industrialProjects_National_tab: false,
                                                    industrialProjects_International_tab: false,
                                                    publications_Articles_tab: false,
                                                    publications_Books_tab: false,
                                                    publications_Chapters_tab: false,
                                                    Conference_tab: false,
                                                    Patents_National_tab: false,
                                                    Patents_International_tab: false,
                                                    Intellectual_Property_tab: false,
                                                    Supervision_PHD_tab: false,
                                                    Supervision_Masters_tab: false,
                                                    Training_Attended_tab: true,
                                                    Training_Conducted_tab: false,
                                                    Editorial_Board_tab: false,
                                                    Copyright_tab: false,
                                                    Industrial_Design_tab: false,
                                                    Trade_Marks_tab: false,
                                                })
                                            }}>Attended <span className={"trainings_number"}>{profile[0].Trainings_Attended.length}</span></Button>}
                                        {Trainings.length === 0 ? "" : <Button onClick={() => {
                                            setTabOptions({
                                                ...TabOptions,
                                                profile_tab: false, analysis_tab: false,
                                                allProjects_tab: false,

                                                researchProjects_International_tab: false,
                                                researchProjects_National_tab: false,
                                                industrialProjects_National_tab: false,
                                                industrialProjects_International_tab: false,
                                                publications_Articles_tab: false,
                                                publications_Books_tab: false,
                                                publications_Chapters_tab: false,
                                                Conference_tab: false,
                                                Patents_National_tab: false,
                                                Patents_International_tab: false,
                                                Intellectual_Property_tab: false,
                                                Supervision_PHD_tab: false,
                                                Supervision_Masters_tab: false,
                                                Training_Attended_tab: false,
                                                Training_Conducted_tab: true,
                                                Editorial_Board_tab: false,
                                                Copyright_tab: false,
                                                Industrial_Design_tab: false,
                                                Trade_Marks_tab: false,
                                            })
                                        }}>Conducted <span
                                            className={"trainings_number-conducted"}>{Trainings.length}</span></Button>}
                                    </div>
                                </Collapse>
                            </div>}
                            {supervisions.length === 0 ? "" : <div className={"supervisions"}>
                                <Button
                                    onClick={() => setOptions({
                                        ...CollapseOptions,
                                        supervised_projects_options: !CollapseOptions.supervised_projects_options
                                    })}
                                    aria-controls="supervision-options-area"
                                    aria-expanded={CollapseOptions.supervised_projects_options}>
                                    Supervisions <span className={"supervisions-number"}>{supervisions.length}</span>
                                    <h5>{CollapseOptions.supervised_projects_options ?
                                        <FontAwesomeIcon icon={faAngleUp} className={'arrow'} /> :
                                        <FontAwesomeIcon icon={faAngleDown} className={'arrow'} />}</h5>
                                </Button>
                                <Collapse in={CollapseOptions.supervised_projects_options}>
                                    <div id={"supervision-options-area"}>
                                        {Supervision.PHD.length === 0 ? "" : <Button onClick={() => {
                                            setTabOptions({
                                                ...TabOptions,
                                                profile_tab: false, analysis_tab: false,
                                                allProjects_tab: false,
                                                researchProjects_International_tab: false,
                                                researchProjects_National_tab: false,
                                                industrialProjects_National_tab: false,
                                                industrialProjects_International_tab: false,
                                                publications_Articles_tab: false,
                                                publications_Books_tab: false,
                                                publications_Chapters_tab: false,
                                                Conference_tab: false,
                                                Patents_National_tab: false,
                                                Patents_International_tab: false,
                                                Intellectual_Property_tab: false,
                                                Training_tab: false,
                                                Supervision_PHD_tab: true,
                                                Supervision_Masters_tab: false,
                                                Training_Conducted_tab: false,
                                                Training_Attended_tab: false,
                                                Editorial_Board_tab: false,
                                                Trade_Marks_tab: false,
                                                Industrial_Design_tab: false,
                                                Copyright_tab: false
                                            })
                                        }}>Phd Supervision <span className={"internal-supervisions"}>{Doctoral.length}</span></Button>}
                                        {Supervision.Masters.length === 0 ? "" : <Button onClick={() => {
                                            setTabOptions({
                                                ...TabOptions,
                                                profile_tab: false, analysis_tab: false,
                                                allProjects_tab: false,
                                                researchProjects_International_tab: false,
                                                researchProjects_National_tab: false,
                                                industrialProjects_National_tab: false,
                                                industrialProjects_International_tab: false,
                                                publications_Articles_tab: false,
                                                publications_Books_tab: false,
                                                publications_Chapters_tab: false,
                                                Conference_tab: false,
                                                Patents_National_tab: false,
                                                Patents_International_tab: false,
                                                Intellectual_Property_tab: false,
                                                Training_tab: false,
                                                Supervision_PHD_tab: false,
                                                Supervision_Masters_tab: true,
                                                Training_Conducted_tab: false,
                                                Training_Attended_tab: false,
                                                Editorial_Board_tab: false,
                                                Trade_Marks_tab: false,
                                                Industrial_Design_tab: false,
                                                Copyright_tab: false

                                            })
                                        }}>MS Supervision  <span className={"internal-supervisions-ms"}>{MS.length}</span></Button>}
                                    </div>
                                </Collapse>
                            </div>}
                        </div>) : null
                    }
                    <div className="">
                        <div id="roundImageFaculty" className={"faculty_profile_pic"}>
                            <img
                                src={profile[0].Image_URL.trim() === "" ? process.env.PUBLIC_URL + "/Images/Profile Images/Profile_Vector.jpg" : "data:image/png;base64," + atob(profile[0].Image_URL)} alt={"Avatar"}
                                referrerPolicy={"no-referrer"}
                                className={'faculty_img'}
                            />
                        </div>
                        <div className={"faculty_personal_info"}>
                            <h1 className={'Name_Faculty'}>{profile[0].Name}</h1>
                            <div className={window.innerWidth < 910 ? "row" : "fonts"}>
                                <div style={{ fontSize: "1em" }} className="details col-sm"><FontAwesomeIcon icon={faGraduationCap} className={'font'} /><h3 className={"designation"}>{profile[0].Work_Position}</h3></div>
                                <div style={{ fontSize: "1em" }} className="details col-sm"><FontAwesomeIcon icon={faMapMarkerAlt} className={'font'} /><h3 className={"department"}>{profile[0].School}</h3></div>
                            </div>
                            <div className={window.innerWidth < 910 ? "row" : "fonts"}>
                                <a className="emailMeButton" href={"mailto:" + profile[0].e_mail + "?cc=ddresearch@nust.edu.pk&subject=Hello%20from%20HTML&body=This%20is%20the%20body%20of%20the%20email."}>Send Email</a>

                                {/* <div style={{ fontSize: "1em" }} className="details col-sm"><FontAwesomeIcon icon={faEnvelope} className={'font'} /><h3>{profile[0].e_mail}</h3></div>
                                <div style={{ fontSize: "1em" }} className="details col-sm"><FontAwesomeIcon icon={faPhoneFlip} className={'font'} /><h3> {profile[0].Work_Phone} </h3></div> */}
                            </div>
                        </div>
                    </div>
                    <div className={"profile_links"}>
                        <div className={"links"}>
                            <ul className={"featured-Icons"}>
                                <li className={"li"}>
                                    <a href={`${profile[0].linkedin_URL}`} className={profile[0].linkedin_URL.trim() === "" ? "disabled_link" : ""} target={"_blank"}>
                                        <FontAwesomeIcon icon={faLinkedinIn} className={"social_font"} />
                                    </a>
                                </li>
                                <li className={"li"}>
                                    <a href={`${profile[0].twitter_URL}`} className={profile[0].twitter_URL.trim() === "" ? "disabled_link" : ""} target={"_blank"}>
                                        <FontAwesomeIcon icon={faTwitter} className={"social_font"} />
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className={"profile_links_1"}>
                            <a href={`https://www.scopus.com/authid/detail.uri?authorId=${ScopusID}`} className={ScopusID === "" ? "disabled" : "research-info"} target={'_blank'}>Scopus</a>
                            <a href={`${profile[0].google_URl}`} className={profile[0].google_URl.trim() === "" ? "disabled" : "research-info"} target={'_blank'}>Google Scholars</a>
                        </div>
                        <div className={"profile_links_2"}>
                            <button onClick={openCV} className={enable ? "CV-button" : "disabled"}> Download CV</button>
                        </div>
                    </div>
                    {/* </div> */}
                    {!isiPadView ? (
                        <div className={"Options"}>
                            <div className={"analytics"}>
                                <Button
                                    onClick={() => setTabOptions({
                                        ...TabOptions,
                                        profile_tab: false,
                                        analysis_tab: true,
                                        allProjects_tab: false,
                                        researchProjects_International_tab: false,
                                        researchProjects_National_tab: false,
                                        industrialProjects_National_tab: false,
                                        industrialProjects_International_tab: false,
                                        publications_Articles_tab: false,
                                        publications_Books_tab: false,
                                        publications_Chapters_tab: false,
                                        Conference_tab: false,
                                        Patents_National_tab: false,
                                        Patents_International_tab: false,
                                        Intellectual_Property_tab: false,
                                        Supervision_PHD_tab: false,
                                        Supervision_Masters_tab: false,
                                        Editorial_Board_tab: false,
                                        Copyright_tab: false,
                                        Industrial_Design_tab: false,
                                        Trade_Marks_tab: false,
                                        Training_Conducted_tab: false,
                                        Training_Attended_tab: false,
                                    })}>
                                    Home
                                </Button>
                            </div>
                            <div className={"profile"}>
                                <Button
                                    onClick={() => {
                                        setOptions({
                                            ...CollapseOptions,
                                            Profile_options: !CollapseOptions.Profile_options
                                        })
                                        setProfileData((prevState) => {
                                            return {
                                                ...prevState,
                                                Qualifications: true,
                                                Awards: false,
                                                Experience: false,
                                                Talks: false,
                                                Memberships: false
                                            }
                                        });
                                        setTabOptions({
                                            ...TabOptions,
                                            analysis_tab: false,
                                            profile_tab: true,
                                            allProjects_tab: false,
                                            researchProjects_International_tab: false,
                                            researchProjects_National_tab: false,
                                            industrialProjects_National_tab: false,
                                            industrialProjects_International_tab: false,
                                            publications_Articles_tab: false,
                                            publications_Books_tab: false,
                                            publications_Chapters_tab: false,
                                            Conference_tab: false,
                                            Patents_National_tab: false,
                                            Patents_International_tab: false,
                                            Intellectual_Property_tab: false,
                                            Training_Conducted_tab: false,
                                            Training_Attended_tab: false,
                                            Supervision_PHD_tab: false,
                                            Supervision_Masters_tab: false,
                                            Editorial_Board_tab: false,
                                            Copyright_tab: false,
                                            Industrial_Design_tab: false,
                                            Trade_Marks_tab: false,
                                        })

                                    }}
                                    aria-controls="profile-options-area" aria-expanded={CollapseOptions.Profile_options}
                                >
                                    Profile
                                    <h5>{CollapseOptions.Profile_options ?
                                        <FontAwesomeIcon icon={faAngleUp} className={'arrow'} /> :
                                        <FontAwesomeIcon icon={faAngleDown} className={'arrow'} />}</h5>
                                </Button>
                                <Collapse in={CollapseOptions.Profile_options}>
                                    <div id={"profile-options-area"}>
                                        {profile[0].Qualifications.length > 0 ? <Button onClick={() => {
                                            setProfileData({
                                                ...profileData,
                                                Qualifications: true,
                                                Awards: false,
                                                Experience: false,
                                                Talks: false,
                                                Memberships: false,
                                            });
                                            setTabOptions({
                                                ...TabOptions,
                                                analysis_tab: false,
                                                profile_tab: true,
                                                allProjects_tab: false,
                                                researchProjects_International_tab: false,
                                                researchProjects_National_tab: false,
                                                industrialProjects_National_tab: false,
                                                industrialProjects_International_tab: false,
                                                publications_Articles_tab: false,
                                                publications_Books_tab: false,
                                                publications_Chapters_tab: false,
                                                Conference_tab: false,
                                                Patents_National_tab: false,
                                                Patents_International_tab: false,
                                                Intellectual_Property_tab: false,
                                                Training_Conducted_tab: false,
                                                Training_Attended_tab: false,
                                                Supervision_PHD_tab: false,
                                                Supervision_Masters_tab: false,
                                                Editorial_Board_tab: false,
                                                Copyright_tab: false,
                                                Industrial_Design_tab: false,
                                                Trade_Marks_tab: false,
                                            })
                                        }}>Qualifications</Button> : ""}
                                        {profile[0].Experience.length > 0 ? <Button onClick={() => {
                                            setProfileData({
                                                ...profileData,
                                                Qualifications: false,
                                                Awards: false,
                                                Experience: true,
                                                Talks: false,
                                                Memberships: false,
                                            });
                                            setTabOptions({
                                                ...TabOptions,
                                                analysis_tab: false,
                                                profile_tab: true,
                                                allProjects_tab: false,
                                                researchProjects_International_tab: false,
                                                researchProjects_National_tab: false,
                                                industrialProjects_National_tab: false,
                                                industrialProjects_International_tab: false,
                                                publications_Articles_tab: false,
                                                publications_Books_tab: false,
                                                publications_Chapters_tab: false,
                                                Conference_tab: false,
                                                Patents_National_tab: false,
                                                Patents_International_tab: false,
                                                Intellectual_Property_tab: false,
                                                Training_Conducted_tab: false,
                                                Training_Attended_tab: false,
                                                Supervision_PHD_tab: false,
                                                Supervision_Masters_tab: false,
                                                Editorial_Board_tab: false,
                                                Copyright_tab: false,
                                                Industrial_Design_tab: false,
                                                Trade_Marks_tab: false,
                                            })
                                        }}>Experience</Button> : ""}
                                        {profile[0].Awards.length > 0 ? <Button onClick={() => {
                                            setProfileData({
                                                ...profileData,
                                                Qualifications: false,
                                                Awards: true,
                                                Experience: false,
                                                Talks: false,
                                                Memberships: false,
                                            });

                                            setTabOptions({
                                                ...TabOptions,
                                                analysis_tab: false,
                                                profile_tab: true,
                                                allProjects_tab: false,
                                                researchProjects_International_tab: false,
                                                researchProjects_National_tab: false,
                                                industrialProjects_National_tab: false,
                                                industrialProjects_International_tab: false,
                                                publications_Articles_tab: false,
                                                publications_Books_tab: false,
                                                publications_Chapters_tab: false,
                                                Conference_tab: false,
                                                Patents_National_tab: false,
                                                Patents_International_tab: false,
                                                Intellectual_Property_tab: false,
                                                Training_Conducted_tab: false,
                                                Training_Attended_tab: false,
                                                Supervision_PHD_tab: false,
                                                Supervision_Masters_tab: false,
                                                Editorial_Board_tab: false,
                                                Copyright_tab: false,
                                                Industrial_Design_tab: false,
                                                Trade_Marks_tab: false,
                                            })

                                        }}>Awards</Button> : ""}
                                        {profile[0].KeyNotes.length > 0 ? <Button onClick={() => {
                                            setProfileData({
                                                ...profileData,
                                                Qualifications: false,
                                                Awards: false,
                                                Experience: false,
                                                Talks: true,
                                                Memberships: false,
                                            });
                                            setTabOptions({
                                                ...TabOptions,
                                                analysis_tab: false,
                                                profile_tab: true,
                                                allProjects_tab: false,
                                                researchProjects_International_tab: false,
                                                researchProjects_National_tab: false,
                                                industrialProjects_National_tab: false,
                                                industrialProjects_International_tab: false,
                                                publications_Articles_tab: false,
                                                publications_Books_tab: false,
                                                publications_Chapters_tab: false,
                                                Conference_tab: false,
                                                Patents_National_tab: false,
                                                Patents_International_tab: false,
                                                Intellectual_Property_tab: false,
                                                Training_Conducted_tab: false,
                                                Training_Attended_tab: false,
                                                Supervision_PHD_tab: false,
                                                Supervision_Masters_tab: false,
                                                Editorial_Board_tab: false,
                                                Copyright_tab: false,
                                                Industrial_Design_tab: false,
                                                Trade_Marks_tab: false,
                                            })
                                        }}>Invited Speaker & Keynotes</Button> : ""}
                                        {profile[0].Professional_Memberships_Registrations.length <= 0 ? "" : <Button onClick={() => {
                                            setProfileData({
                                                ...profileData,
                                                Qualifications: false,
                                                Awards: false,
                                                Experience: false,
                                                Talks: false,
                                                Memberships: true,
                                            });
                                            setTabOptions({
                                                ...TabOptions,
                                                analysis_tab: false,
                                                profile_tab: true,
                                                allProjects_tab: false,
                                                researchProjects_International_tab: false,
                                                researchProjects_National_tab: false,
                                                industrialProjects_National_tab: false,
                                                industrialProjects_International_tab: false,
                                                publications_Articles_tab: false,
                                                publications_Books_tab: false,
                                                publications_Chapters_tab: false,
                                                Conference_tab: false,
                                                Patents_National_tab: false,
                                                Patents_International_tab: false,
                                                Intellectual_Property_tab: false,
                                                Training_Conducted_tab: false,
                                                Training_Attended_tab: false,
                                                Supervision_PHD_tab: false,
                                                Supervision_Masters_tab: false,
                                                Editorial_Board_tab: false,
                                                Copyright_tab: false,
                                                Industrial_Design_tab: false,
                                                Trade_Marks_tab: false,
                                            })
                                        }}>Memberships</Button>}
                                    </div>
                                </Collapse>
                            </div>
                            {projects.length === 0 ? "" : <div className={"Projects"}>
                                <Button
                                    onClick={() => setOptions({
                                        ...CollapseOptions,
                                        project_options: !CollapseOptions.project_options
                                    })}
                                    aria-controls="Project-options-area" aria-expanded={CollapseOptions.project_options}>
                                    Projects


                                    <span className={"number projects"}>{Research_national_List.length + Research_international_List.length + Industry_National_List.length + Industry_International_List.length}</span>


                                    <h5>{CollapseOptions.project_options ?
                                        <FontAwesomeIcon icon={faAngleUp} className={'arrow'} /> :
                                        <FontAwesomeIcon icon={faAngleDown} className={'arrow'} />}</h5>
                                </Button>
                                <Collapse in={CollapseOptions.project_options}>
                                    <div id={"Project-options-area"}>
                                        {Project_Research.National.length === 0 && Project_Research.International.length === 0 ? "" :
                                            <Button
                                                onClick={() => setOptions({
                                                    ...CollapseOptions,
                                                    research_project_options: !CollapseOptions.research_project_options
                                                })}
                                                aria-controls={"research-project-options-area"} aria-expanded={CollapseOptions.research_project_options}>
                                                Research Projects
                                                <span className={"internal-projects"}>{Project_Research.National.length + Project_Research.International.length} </span>
                                                <h5>{CollapseOptions.research_project_options ?
                                                    <FontAwesomeIcon icon={faAngleUp} className={'arrow'} /> :
                                                    <FontAwesomeIcon icon={faAngleDown} className={'arrow'} />}</h5>
                                            </Button>}
                                        <Collapse in={CollapseOptions.research_project_options}>
                                            <div id={"research-project-options-area"}>
                                                {Project_Research.National.length === 0 ? "" : <Button onClick={() => {
                                                    setTabOptions({
                                                        ...TabOptions,
                                                        profile_tab: false, analysis_tab: false,
                                                        allProjects_tab: false,
                                                        researchProjects_International_tab: false,
                                                        researchProjects_National_tab: true,
                                                        industrialProjects_National_tab: false,
                                                        industrialProjects_International_tab: false,
                                                        publications_Articles_tab: false,
                                                        publications_Books_tab: false,
                                                        publications_Chapters_tab: false,
                                                        Conference_tab: false,
                                                        Patents_National_tab: false,
                                                        Patents_International_tab: false,
                                                        Intellectual_Property_tab: false,
                                                        Training_Conducted_tab: false,
                                                        Training_Attended_tab: false,
                                                        Supervision_PHD_tab: false,
                                                        Supervision_Masters_tab: false,
                                                        Editorial_Board_tab: false,
                                                        Copyright_tab: false,
                                                        Industrial_Design_tab: false,
                                                        Trade_Marks_tab: false,
                                                    })
                                                }}>National <span className={"number internal_national"}>{Research_national_List.length}</span></Button>}
                                                {Project_Research.International.length === 0 ? "" : <Button onClick={() => {
                                                    setTabOptions({
                                                        ...TabOptions,
                                                        profile_tab: false, analysis_tab: false,
                                                        allProjects_tab: false,
                                                        researchProjects_International_tab: true,
                                                        researchProjects_National_tab: false,
                                                        industrialProjects_National_tab: false,
                                                        industrialProjects_International_tab: false,
                                                        publications_Articles_tab: false,
                                                        publications_Books_tab: false,
                                                        publications_Chapters_tab: false,
                                                        Conference_tab: false,
                                                        Patents_National_tab: false,
                                                        Patents_International_tab: false,
                                                        Intellectual_Property_tab: false,
                                                        raining_Conducted_tab: false,
                                                        Training_Attended_tab: false,
                                                        Supervision_PHD_tab: false,
                                                        Supervision_Masters_tab: false,
                                                        Editorial_Board_tab: false,
                                                        Copyright_tab: false,
                                                        Industrial_Design_tab: false,
                                                        Trade_Marks_tab: false,
                                                    })
                                                }}>International <span className={"internal_international"}>{Research_international_List.length}</span></Button>}
                                            </div>
                                        </Collapse>
                                        {Project_Industry.National.length === 0 && Project_Industry.International.length === 0 ? "" : <Button onClick={() => setOptions({
                                            ...CollapseOptions,
                                            industrial_project_options: !CollapseOptions.industrial_project_options
                                        })}
                                            aria-controls={"industrial-project-options-area"}
                                            aria-expanded={CollapseOptions.industrial_project_options}>
                                            Industrial Projects <span className={"internal-projects"}>{Project_Industry.National.length + Project_Industry.International.length}</span>
                                            <h5>{CollapseOptions.industrial_project_options ?
                                                <FontAwesomeIcon icon={faAngleUp} className={'arrow'} /> :
                                                <FontAwesomeIcon icon={faAngleDown} className={'arrow'} />}</h5>
                                        </Button>}
                                        <Collapse in={CollapseOptions.industrial_project_options}>
                                            <div id={"industrial-project-options-area"}>
                                                {Project_Industry.National.length === 0 ? "" : <Button onClick={() => {
                                                    setTabOptions({
                                                        ...TabOptions,
                                                        profile_tab: false, analysis_tab: false,
                                                        allProjects_tab: false,
                                                        researchProjects_International_tab: false,
                                                        researchProjects_National_tab: false,
                                                        industrialProjects_National_tab: true,
                                                        industrialProjects_International_tab: false,
                                                        publications_Articles_tab: false,
                                                        publications_Books_tab: false,
                                                        publications_Chapters_tab: false,
                                                        Conference_tab: false,
                                                        Patents_National_tab: false,
                                                        Patents_International_tab: false,
                                                        Intellectual_Property_tab: false,
                                                        Training_Conducted_tab: false,
                                                        Training_Attended_tab: false,
                                                        Supervision_PHD_tab: false,
                                                        Supervision_Masters_tab: false,
                                                        Editorial_Board_tab: false,
                                                        Copyright_tab: false,
                                                        Industrial_Design_tab: false,
                                                        Trade_Marks_tab: false,
                                                    })
                                                }}>National <span className={"number internal_national"}>{Industry_National_List.length}</span></Button>}
                                                {Project_Industry.International.length === 0 ? "" : <Button onClick={() => {
                                                    setTabOptions({
                                                        ...TabOptions,
                                                        profile_tab: false, analysis_tab: false,
                                                        allProjects_tab: false,
                                                        researchProjects_International_tab: false,
                                                        researchProjects_National_tab: false,
                                                        industrialProjects_National_tab: false,
                                                        industrialProjects_International_tab: true,
                                                        publications_Articles_tab: false,
                                                        publications_Books_tab: false,
                                                        publications_Chapters_tab: false,
                                                        Conference_tab: false,
                                                        Patents_National_tab: false,
                                                        Patents_International_tab: false,
                                                        Intellectual_Property_tab: false,
                                                        Training_Conducted_tab: false,
                                                        Training_Attended_tab: false,
                                                        Supervision_PHD_tab: false,
                                                        Supervision_Masters_tab: false,
                                                        Editorial_Board_tab: false,
                                                        Copyright_tab: false,
                                                        Industrial_Design_tab: false,
                                                        Trade_Marks_tab: false,
                                                    })
                                                }}>International <span className={"internal_international"}>{Industry_International_List.length}</span></Button>}
                                            </div>
                                        </Collapse>
                                    </div>
                                </Collapse>
                            </div>}
                            {Research_Articles.length === 0 && Books.length === 0 && Book_Chapters.length === 0 && conferences.length === 0 && editorials.length === 0 ? "" : <div className={"publications"}>
                                <Button
                                    onClick={() => setOptions({
                                        ...CollapseOptions,
                                        publications_options: !CollapseOptions.publications_options
                                    })}
                                    aria-controls="Publications-options-area"
                                    aria-expanded={CollapseOptions.publications_options}>
                                    Publications <span className={"number"}>{Research_Articles_List.length + Books.length + Book_Chapters.length + Conferences.length}</span>
                                    <h5>{CollapseOptions.publications_options ?
                                        <FontAwesomeIcon icon={faAngleUp} className={'arrow'} /> :
                                        <FontAwesomeIcon icon={faAngleDown} className={'arrow'} />}</h5>
                                </Button>
                                <Collapse in={CollapseOptions.publications_options}>
                                    <div id={"Publications-options-area"}>
                                        {Research_Articles.length === 0 ? "" : <Button onClick={() => {
                                            setTabOptions({
                                                ...TabOptions,
                                                profile_tab: false, analysis_tab: false,
                                                allProjects_tab: false,
                                                researchProjects_International_tab: false,
                                                researchProjects_National_tab: false,
                                                industrialProjects_National_tab: false,
                                                industrialProjects_International_tab: false,
                                                publications_Articles_tab: true,
                                                publications_Books_tab: false,
                                                publications_Chapters_tab: false,
                                                Conference_tab: false,
                                                Patents_National_tab: false,
                                                Patents_International_tab: false,
                                                Intellectual_Property_tab: false,
                                                Training_Conducted_tab: false,
                                                Training_Attended_tab: false,
                                                Supervision_PHD_tab: false,
                                                Supervision_Masters_tab: false,
                                                Editorial_Board_tab: false,
                                                Copyright_tab: false,
                                                Industrial_Design_tab: false,
                                                Trade_Marks_tab: false,
                                            })
                                        }}>Research Articles <span className={"internal-articles"}>{Research_Articles_List.length}</span></Button>}
                                        {conferences.length === 0 ? "" : <Button onClick={() => {
                                            setTabOptions({
                                                ...TabOptions,
                                                profile_tab: false, analysis_tab: false,
                                                allProjects_tab: false,

                                                researchProjects_International_tab: false,
                                                researchProjects_National_tab: false,
                                                industrialProjects_National_tab: false,
                                                industrialProjects_International_tab: false,
                                                publications_Articles_tab: false,
                                                publications_Books_tab: false,
                                                publications_Chapters_tab: false,
                                                Conference_tab: true,
                                                Patents_National_tab: false,
                                                Patents_International_tab: false,
                                                Intellectual_Property_tab: false,
                                                Training_Conducted_tab: false,
                                                Training_Attended_tab: false,
                                                Supervision_PHD_tab: false,
                                                Supervision_Masters_tab: false,
                                                Editorial_Board_tab: false,
                                                Copyright_tab: false,
                                                Industrial_Design_tab: false,
                                                Trade_Marks_tab: false,
                                            })
                                        }}>Conference Proceedings <span className={"internal-conference"}>{Conferences.length}</span></Button>}
                                        {editorials.length === 0 ? "" : <Button onClick={() => {
                                            setTabOptions({
                                                ...TabOptions,
                                                profile_tab: false, analysis_tab: false,
                                                allProjects_tab: false,

                                                researchProjects_International_tab: false,
                                                researchProjects_National_tab: false,
                                                industrialProjects_National_tab: false,
                                                industrialProjects_International_tab: false,
                                                publications_Articles_tab: false,
                                                publications_Books_tab: false,
                                                publications_Chapters_tab: false,
                                                Conference_tab: false,
                                                Patents_National_tab: false,
                                                Patents_International_tab: false,
                                                Intellectual_Property_tab: false,
                                                Training_Conducted_tab: false,
                                                Training_Attended_tab: false,
                                                Supervision_PHD_tab: false,
                                                Supervision_Masters_tab: false,
                                                Editorial_Board_tab: true,
                                                Copyright_tab: false,
                                                Industrial_Design_tab: false,
                                                Trade_Marks_tab: false,
                                            })
                                        }}>Editorial Activities <span className={"internal-editorials"}>{Editorials.length}</span></Button>}
                                        {Books.length === 0 ? "" : <Button onClick={() => {
                                            setTabOptions({
                                                ...TabOptions,
                                                profile_tab: false, analysis_tab: false,
                                                allProjects_tab: false,

                                                researchProjects_International_tab: false,
                                                researchProjects_National_tab: false,
                                                industrialProjects_National_tab: false,
                                                industrialProjects_International_tab: false,
                                                publications_Articles_tab: false,
                                                publications_Books_tab: true,
                                                publications_Chapters_tab: false,
                                                Conference_tab: false,
                                                Patents_National_tab: false,
                                                Patents_International_tab: false,
                                                Intellectual_Property_tab: false,
                                                Training_Conducted_tab: false,
                                                Training_Attended_tab: false,
                                                Supervision_PHD_tab: false,
                                                Supervision_Masters_tab: false,
                                                Editorial_Board_tab: false,
                                                Copyright_tab: false,
                                                Industrial_Design_tab: false,
                                                Trade_Marks_tab: false,
                                            })
                                        }}>Books <span className={"internal-chapter internal-book"}>{Books.length}</span></Button>}
                                        {Book_Chapters.length === 0 ? "" : <Button onClick={() => {
                                            setTabOptions({
                                                ...TabOptions,
                                                profile_tab: false, analysis_tab: false,
                                                allProjects_tab: false,


                                                researchProjects_International_tab: false,
                                                researchProjects_National_tab: false,
                                                industrialProjects_National_tab: false,
                                                industrialProjects_International_tab: false,
                                                publications_Articles_tab: false,
                                                publications_Books_tab: false,
                                                publications_Chapters_tab: true,
                                                Conference_tab: false,
                                                Patents_National_tab: false,
                                                Patents_International_tab: false,
                                                Intellectual_Property_tab: false,
                                                Training_Conducted_tab: false,
                                                Training_Attended_tab: false,
                                                Supervision_PHD_tab: false,
                                                Supervision_Masters_tab: false,
                                                Editorial_Board_tab: false,
                                                Copyright_tab: false,
                                                Industrial_Design_tab: false,
                                                Trade_Marks_tab: false,
                                            })
                                        }}>Book Chapters <span className={"internal-chapter"}>{Book_Chapters.length}</span></Button>}
                                    </div>
                                </Collapse>
                            </div>}
                            {ips.length === 0 ? "" : <div className={"IP"}>
                                <Button
                                    onClick={() => setOptions({ ...CollapseOptions, ip_options: !CollapseOptions.ip_options })}
                                    aria-controls="IP-options-area" aria-expanded={CollapseOptions.ip_options}>
                                    Intellectual Property <span className={"ip_number"}>{IPS_Patent.length + IPS_Design.length + IPS_CopyRight.length + IPS_TradeMark.length}</span>
                                    <h5>{CollapseOptions.ip_options ? <FontAwesomeIcon icon={faAngleUp} className={'arrow'} /> :
                                        <FontAwesomeIcon icon={faAngleDown} className={'arrow'} />}</h5>
                                </Button>
                                <Collapse in={CollapseOptions.ip_options}>
                                    <div id={"IP-options-area"}>
                                        {Intellectual_Property.Patents.length === 0 &&
                                            Intellectual_Property.Patents.length === 0 ? "" : <Button onClick={() => setOptions({
                                                ...CollapseOptions,
                                                patents_options: !CollapseOptions.patents_options
                                            })}
                                                aria-controls="Patent-options-area"
                                                aria-expanded={CollapseOptions.patents_options}>
                                            Patents <span className={"patents"}>{IPS_Patent.length}</span>
                                            <h5>{CollapseOptions.patents_options ?
                                                <FontAwesomeIcon icon={faAngleUp} className={'arrow'} /> :
                                                <FontAwesomeIcon icon={faAngleDown} className={'arrow'} />}</h5>
                                        </Button>}
                                        <Collapse in={CollapseOptions.patents_options}>
                                            <div id={"Patent-options-area"}>
                                                {Intellectual_Property.Patents.length === 0 ? "" : <Button onClick={() => {
                                                    setTabOptions({
                                                        ...TabOptions,
                                                        profile_tab: false, analysis_tab: false,
                                                        allProjects_tab: false,
                                                        researchProjects_International_tab: false,
                                                        researchProjects_National_tab: false,
                                                        industrialProjects_National_tab: false,
                                                        industrialProjects_International_tab: false,
                                                        publications_Articles_tab: false,
                                                        publications_Books_tab: false,
                                                        publications_Chapters_tab: false,
                                                        Conference_tab: false,
                                                        Patents_National_tab: true,
                                                        Patents_International_tab: false,
                                                        Intellectual_Property_tab: false,
                                                        Training_Conducted_tab: false,
                                                        Training_Attended_tab: false,
                                                        Supervision_PHD_tab: false,
                                                        Supervision_Masters_tab: false,
                                                        Editorial_Board_tab: false,
                                                        Copyright_tab: false,
                                                        Industrial_Design_tab: false,
                                                        Trade_Marks_tab: false,
                                                    })
                                                }}>National <span className={"number internal_national"}>{IPS_Patent.length}</span></Button>}

                                                {!false ? "" : <Button onClick={() => {
                                                    setTabOptions({
                                                        ...TabOptions,
                                                        profile_tab: false, analysis_tab: false,
                                                        allProjects_tab: false,
                                                        researchProjects_International_tab: false,
                                                        researchProjects_National_tab: false,
                                                        industrialProjects_National_tab: false,
                                                        industrialProjects_International_tab: false,
                                                        publications_Articles_tab: false,
                                                        publications_Books_tab: false,
                                                        publications_Chapters_tab: false,
                                                        Conference_tab: false,
                                                        Patents_National_tab: false,
                                                        Patents_International_tab: true,
                                                        Intellectual_Property_tab: false,
                                                        Training_Conducted_tab: false,
                                                        Training_Attended_tab: false,
                                                        Supervision_PHD_tab: false,
                                                        Supervision_Masters_tab: false,
                                                        Editorial_Board_tab: false,
                                                        Copyright_tab: false,
                                                        Industrial_Design_tab: false,
                                                        Trade_Marks_tab: false,
                                                    })
                                                }}>International</Button>}
                                            </div>
                                        </Collapse>
                                        {Intellectual_Property.Industrial_Design.length === 0 ? "" : <Button onClick={() => {
                                            setTabOptions({
                                                ...TabOptions,
                                                profile_tab: false, analysis_tab: false,
                                                allProjects_tab: false,
                                                researchProjects_International_tab: false,
                                                researchProjects_National_tab: false,
                                                industrialProjects_National_tab: false,
                                                industrialProjects_International_tab: false,
                                                publications_Articles_tab: false,
                                                publications_Books_tab: false,
                                                publications_Chapters_tab: false,
                                                Conference_tab: false,
                                                Patents_National_tab: false,
                                                Patents_International_tab: false,
                                                Intellectual_Property_tab: false,
                                                Training_Conducted_tab: false,
                                                Training_Attended_tab: false,
                                                Supervision_PHD_tab: false,
                                                Supervision_Masters_tab: false,
                                                Editorial_Board_tab: false,
                                                Copyright_tab: false,
                                                Industrial_Design_tab: true,
                                                Trade_Marks_tab: false,
                                            })
                                        }}>
                                            Industrial Designs <span className={"ips_ids"}>{IPS_Design.length}</span>
                                        </Button>}
                                        {Intellectual_Property.Copy_Rights.length === 0 ? "" : <Button onClick={() => {
                                            setTabOptions({
                                                ...TabOptions,
                                                profile_tab: false, analysis_tab: false,
                                                allProjects_tab: false,
                                                researchProjects_International_tab: false,
                                                researchProjects_National_tab: false,
                                                industrialProjects_National_tab: false,
                                                industrialProjects_International_tab: false,
                                                publications_Articles_tab: false,
                                                publications_Books_tab: false,
                                                publications_Chapters_tab: false,
                                                Conference_tab: false,
                                                Patents_National_tab: false,
                                                Patents_International_tab: false,
                                                Intellectual_Property_tab: false,
                                                Training_Conducted_tab: false,
                                                Training_Attended_tab: false,
                                                Supervision_PHD_tab: false,
                                                Supervision_Masters_tab: false,
                                                Editorial_Board_tab: false,
                                                Copyright_tab: true,
                                                Industrial_Design_tab: false,
                                                Trade_Marks_tab: false,
                                            })
                                        }}>
                                            Copyrights <span className={"ips_cps"}>{IPS_CopyRight.length}</span>
                                        </Button>}
                                        {Intellectual_Property.Trade_Marks.length === 0 ? "" : <Button onClick={() => {
                                            setTabOptions({
                                                ...TabOptions,
                                                profile_tab: false, analysis_tab: false,
                                                allProjects_tab: false,

                                                researchProjects_International_tab: false,
                                                researchProjects_National_tab: false,
                                                industrialProjects_National_tab: false,
                                                industrialProjects_International_tab: false,
                                                publications_Articles_tab: false,
                                                publications_Books_tab: false,
                                                publications_Chapters_tab: false,
                                                Conference_tab: false,
                                                Patents_National_tab: false,
                                                Patents_International_tab: false,
                                                Intellectual_Property_tab: false,
                                                Training_Conducted_tab: false,
                                                Training_Attended_tab: false,
                                                Supervision_PHD_tab: false,
                                                Supervision_Masters_tab: false,
                                                Editorial_Board_tab: false,
                                                Copyright_tab: false,
                                                Industrial_Design_tab: false,
                                                Trade_Marks_tab: true,
                                            })
                                        }}>
                                            Trade Marks <span className={"number ips_tds"}>{IPS_TradeMark.length}</span>
                                        </Button>}
                                    </div>
                                </Collapse>
                            </div>}
                            {Trainings.length + profile[0].Trainings_Attended.length === 0 ? "" : <div className={"trainings"}>
                                <Button
                                    onClick={() => setOptions({
                                        ...CollapseOptions,
                                        training_options: !CollapseOptions.training_options
                                    })}
                                    aria-controls="trainings-options-area" aria-expanded={CollapseOptions.training_options}>
                                    Trainings <span className={"trainings_number"}>{Trainings.length + profile[0].Trainings_Attended.length}</span>
                                    <h5>{CollapseOptions.training_options ?
                                        <FontAwesomeIcon icon={faAngleUp} className={'arrow'} /> :
                                        <FontAwesomeIcon icon={faAngleDown} className={'arrow'} />}</h5>
                                </Button>
                                <Collapse in={CollapseOptions.training_options}>
                                    <div id={"trainings-options-area"}>
                                        {profile[0].Trainings_Attended.length === 0 ? "" : <Button
                                            onClick={() => {
                                                setTabOptions({
                                                    ...TabOptions,
                                                    profile_tab: false, analysis_tab: false,
                                                    allProjects_tab: false,
                                                    researchProjects_International_tab: false,
                                                    researchProjects_National_tab: false,
                                                    industrialProjects_National_tab: false,
                                                    industrialProjects_International_tab: false,
                                                    publications_Articles_tab: false,
                                                    publications_Books_tab: false,
                                                    publications_Chapters_tab: false,
                                                    Conference_tab: false,
                                                    Patents_National_tab: false,
                                                    Patents_International_tab: false,
                                                    Intellectual_Property_tab: false,
                                                    Supervision_PHD_tab: false,
                                                    Supervision_Masters_tab: false,
                                                    Training_Attended_tab: true,
                                                    Training_Conducted_tab: false,
                                                    Editorial_Board_tab: false,
                                                    Copyright_tab: false,
                                                    Industrial_Design_tab: false,
                                                    Trade_Marks_tab: false,
                                                })
                                            }}>Attended <span className={"trainings_number"}>{profile[0].Trainings_Attended.length}</span></Button>}
                                        {Trainings.length === 0 ? "" : <Button onClick={() => {
                                            setTabOptions({
                                                ...TabOptions,
                                                profile_tab: false, analysis_tab: false,
                                                allProjects_tab: false,

                                                researchProjects_International_tab: false,
                                                researchProjects_National_tab: false,
                                                industrialProjects_National_tab: false,
                                                industrialProjects_International_tab: false,
                                                publications_Articles_tab: false,
                                                publications_Books_tab: false,
                                                publications_Chapters_tab: false,
                                                Conference_tab: false,
                                                Patents_National_tab: false,
                                                Patents_International_tab: false,
                                                Intellectual_Property_tab: false,
                                                Supervision_PHD_tab: false,
                                                Supervision_Masters_tab: false,
                                                Training_Attended_tab: false,
                                                Training_Conducted_tab: true,
                                                Editorial_Board_tab: false,
                                                Copyright_tab: false,
                                                Industrial_Design_tab: false,
                                                Trade_Marks_tab: false,
                                            })
                                        }}>Conducted <span
                                            className={"trainings_number-conducted"}>{Trainings.length}</span></Button>}
                                    </div>
                                </Collapse>
                            </div>}
                            {supervisions.length === 0 ? "" : <div className={"supervisions"}>
                                <Button
                                    onClick={() => setOptions({
                                        ...CollapseOptions,
                                        supervised_projects_options: !CollapseOptions.supervised_projects_options
                                    })}
                                    aria-controls="supervision-options-area"
                                    aria-expanded={CollapseOptions.supervised_projects_options}>
                                    Supervisions <span className={"supervisions-number"}>{supervisions.length}</span>
                                    <h5>{CollapseOptions.supervised_projects_options ?
                                        <FontAwesomeIcon icon={faAngleUp} className={'arrow'} /> :
                                        <FontAwesomeIcon icon={faAngleDown} className={'arrow'} />}</h5>
                                </Button>
                                <Collapse in={CollapseOptions.supervised_projects_options}>
                                    <div id={"supervision-options-area"}>
                                        {Supervision.PHD.length === 0 ? "" : <Button onClick={() => {
                                            setTabOptions({
                                                ...TabOptions,
                                                profile_tab: false, analysis_tab: false,
                                                allProjects_tab: false,
                                                researchProjects_International_tab: false,
                                                researchProjects_National_tab: false,
                                                industrialProjects_National_tab: false,
                                                industrialProjects_International_tab: false,
                                                publications_Articles_tab: false,
                                                publications_Books_tab: false,
                                                publications_Chapters_tab: false,
                                                Conference_tab: false,
                                                Patents_National_tab: false,
                                                Patents_International_tab: false,
                                                Intellectual_Property_tab: false,
                                                Training_tab: false,
                                                Supervision_PHD_tab: true,
                                                Supervision_Masters_tab: false,
                                                Training_Conducted_tab: false,
                                                Training_Attended_tab: false,
                                                Editorial_Board_tab: false,
                                                Trade_Marks_tab: false,
                                                Industrial_Design_tab: false,
                                                Copyright_tab: false
                                            })
                                        }}>Phd Supervision <span className={"internal-supervisions"}>{Doctoral.length}</span></Button>}
                                        {Supervision.Masters.length === 0 ? "" : <Button onClick={() => {
                                            setTabOptions({
                                                ...TabOptions,
                                                profile_tab: false, analysis_tab: false,
                                                allProjects_tab: false,
                                                researchProjects_International_tab: false,
                                                researchProjects_National_tab: false,
                                                industrialProjects_National_tab: false,
                                                industrialProjects_International_tab: false,
                                                publications_Articles_tab: false,
                                                publications_Books_tab: false,
                                                publications_Chapters_tab: false,
                                                Conference_tab: false,
                                                Patents_National_tab: false,
                                                Patents_International_tab: false,
                                                Intellectual_Property_tab: false,
                                                Training_tab: false,
                                                Supervision_PHD_tab: false,
                                                Supervision_Masters_tab: true,
                                                Training_Conducted_tab: false,
                                                Training_Attended_tab: false,
                                                Editorial_Board_tab: false,
                                                Trade_Marks_tab: false,
                                                Industrial_Design_tab: false,
                                                Copyright_tab: false

                                            })
                                        }}>MS Supervision  <span className={"internal-supervisions-ms"}>{MS.length}</span></Button>}
                                    </div>
                                </Collapse>
                            </div>}
                        </div>) : null}
                </div>
                <div className={"Main_Body"}>

                    {!TabOptions.analysis_tab ?
                        <div className="gotoprofile" onClick={showmainprofile}>
                            <i className="fa-solid fa-house-user"></i>
                        </div>
                        : ""}
                    {!TabOptions.analysis_tab ? "" : <div className={"analysis"}>
                        <div className={"analysis_tab_header"}>
                            <div className={"about_heading"}>
                                <h1 >
                                    <span>{profile[0].Name}</span>
                                </h1>
                                <h6 className={"introduction"}>
                                    <strong>Dr {profile[0].Name}</strong> is working as <strong>{profile[0].Work_Position}</strong> in the <strong>{profile[0].School}</strong>, NUST.
                                    <strong>Dr {profile[0].Name}</strong> has a PhD in <strong>{profile[0].Qualifications[0]["speciality"]}</strong>.
                                    &nbsp;<strong>Dr {profile[0].Name}</strong> has published <strong>{Research_Articles_List.length + Books.length + Book_Chapters.length + Conferences.length} </strong> research articles & conference papers having a citation count of <strong>{Citations}</strong>,
                                    carried out <strong>{(Project_Research.National.length + Project_Research.International.length) + Project_Industry.National.length + Project_Industry.International.length}</strong> projects and filed <strong>{IPS_Patent.length + IPS_Design.length + IPS_CopyRight.length + IPS_TradeMark.length}</strong> intellectual property. </h6>
                            </div>
                            <hr />
                        </div>
                        <div className={`work_details row ${divCount === 1 ? "one" :
                            divCount === 2 ? "two" :
                                divCount === 3 ? "three" :
                                    divCount === 4 ? "four" :
                                        divCount === 5 ? "five" : "six"}`}>
                            {Project_Research.National.length + Project_Research.International.length !== 0 &&
                                <div className={"detail_work_div col-lg"} onClick={showResearchProjects}>
                                    <h6>Research Projects</h6>
                                    <h1>{Project_Research.National.length + Project_Research.International.length}</h1>
                                </div>
                            }
                            {Project_Industry.National.length + Project_Industry.International.length !== 0 &&
                                <div className={"detail_work_div col-lg"} onClick={showIndustrialProjects}>
                                    <h6>Industry Projects</h6>
                                    <h1>{Project_Industry.National.length + Project_Industry.International.length}</h1>
                                </div>
                            }
                            {AmountGranted != 0.0 &&
                                <div className={"detail_work_div col-lg"}>
                                    <h6>Amount Granted</h6>
                                    <h1>{AmountGranted}M</h1>
                                </div>
                            }
                            {Research_Articles_List.length + Books.length + Book_Chapters.length + Conferences.length !== 0 &&
                                <div className={"detail_work_div col-lg"} onClick={showPublications}>
                                    <h6>Publications</h6>
                                    <h1>{Research_Articles_List.length + Books.length + Book_Chapters.length + Conferences.length}</h1>
                                </div>
                            }
                            {Citations !== 0 &&
                                <div className={"detail_work_div col-lg"}>
                                    <h6>Citations</h6>
                                    <h1>{Citations}</h1>
                                </div>
                            }
                            {IPS_Patent.length + IPS_Design.length + IPS_CopyRight.length + IPS_TradeMark.length !== 0 &&
                                <div className={"detail_work_div col-lg"} onClick={showIntellectualProperties}>
                                    <h6>Intellectual Property</h6>
                                    <h1>{IPS_Patent.length + IPS_Design.length + IPS_CopyRight.length + IPS_TradeMark.length}</h1>
                                </div>
                            }
                        </div>
                        {!modal &&
                            enable ? <>
                            <div className={"profile-charts-div"} onClick={toggleModal}>
                                {Research_Articles.length + Books.length + Book_Chapters.length + conferences.length === 0 ? "" : <PieChart data={Publications_Pie_Chart_Date} title={"Projects"} />}
                                {projects.length === 0 ? "" : <PieChart data={Project_Pie_Chart_Date} title={"Projects"} />}
                            </div>
                            <div className={"profile-charts-div"} onClick={toggleModal}>
                                {Research_Articles.length + Books.length + Book_Chapters.length === 0 ? "" : <Line_Chart data={publications_data} title={"Publications"} />}
                                {projects.length === 0 ? "" : <Line_Chart data={projects_data} title={"Projects"} />}
                            </div>

                        </> : <div className={"Loading_Div"}>
                            <Placeholder as="p" animation="glow" className={"Profile_Loading"}>
                                <Placeholder xs={12} />
                            </Placeholder>
                            <Placeholder as="p" animation="wave" className={"Profile_Loading"}>
                                <Placeholder xs={12} />
                            </Placeholder>
                            <Placeholder as="p" animation="glow" className={"Profile_Loading"}>
                                <Placeholder xs={12} />
                            </Placeholder>
                            <Placeholder as="p" animation="wave" className={"Profile_Loading"}>
                                <Placeholder xs={12} />
                            </Placeholder>
                            <Placeholder as="p" animation="glow" className={"Profile_Loading"}>
                                <Placeholder xs={12} />
                            </Placeholder>
                            {/*<Placeholder className="w-75" />*/}
                        </div>}

                        <div>
                            {Research_Images.length !== 0 ? <div className={"Research_Collaborations"}>
                                <h1 className={"Research-Collaborators"}>Research Collaborators</h1>
                                <Slider {...research_settings}>
                                    {Research_Images.map((image, index) =>
                                    (
                                        <div className={"industry-collab"}>
                                            <img
                                                src={image}
                                                className={"industry-collab-img"}
                                                alt={image} />

                                        </div>
                                    )
                                    )}
                                </Slider>
                            </div> : ""}
                        </div>
                    </div>}
                    {!TabOptions.profile_tab ? "" : <div className={"Profile"}>
                        {!profileData.Qualifications ? "" : <div className={"Profile_Qualification profile_field"}>
                            {qualifications}
                        </div>}
                        {!profileData.Experience ? "" :
                            <div className={"Profile_Experience profile_field"}>
                                {experience}
                            </div>}
                        {!profileData.Awards ? "" :
                            <div className={"Profile_Awards profile_field"}>
                                {awards}
                            </div>
                        }
                        {!profileData.Talks ? "" : <div className={"Profile_KeyNotes profile_field"}>
                            {keynotes}
                        </div>}
                        {!profileData.Memberships ? "" : <div className={"Profile_Professional_Membership profile_field"}>
                            {Professional_Memberships}
                        </div>}
                    </div>}
                    {!TabOptions.researchProjects_National_tab ? "" : <div className={"researchNational_Tab"}>
                        <div className={"researchNational_Tab_header"}>
                            {Research_national_List}
                        </div>
                    </div>}
                    {!TabOptions.researchProjects_International_tab ? "" : <div className={"researchInterNational_Tab"}>
                        <div className={"researchInterNational_Tab_header"}>
                            {Research_international_List}
                        </div>
                    </div>}
                    {!TabOptions.industrialProjects_National_tab ? "" : <div className={"industrialNational_Tab"}>
                        <div className={"industrialNational_Tab_header"}>
                            {Industry_National_List}
                        </div>
                    </div>}
                    {!TabOptions.industrialProjects_International_tab ? "" : <div className={"industrialInterNational_Tab"}>
                        <div className={"industrialInterNational_Tab_header"}>
                            {Industry_International_List}
                        </div>
                    </div>}
                    {!TabOptions.publications_Articles_tab ? "" : <div className={"publications_Articles_Tab"}>
                        <div className={"publications_Articles_Tab_header"}>
                            {Research_Articles_List}
                        </div>
                    </div>}
                    {!TabOptions.publications_Books_tab ? "" : <div className={"publications_Books_Tab"}>
                        <div className={"publications_Books_Tab_header"}>
                            {Book_List}
                        </div>
                    </div>}
                    {!TabOptions.publications_Chapters_tab ? "" : <div className={"publications_Chapters_Tab"}>
                        <div className={"publications_Chapters_Tab_header"}>
                            {Book_Chapters_List}
                        </div>
                    </div>}
                    {!TabOptions.Conference_tab ? "" : <div className={"Conference_Tab"}>
                        <div className={"Conference_Tab_header"}>
                            {Conferences}
                        </div>
                    </div>}
                    {!TabOptions.Editorial_Board_tab ? "" : <div className={"Editorial_Tab"}>
                        <div className={"Editorial_Tab_header"}>
                            {Editorials}
                        </div>
                    </div>}
                    {!TabOptions.Patents_International_tab ? "" : <div className={"Patents_International_Tab"}>
                        <div className={"Patents_International_Tab_header"}>
                            <h1 className={"Patents_International_Tab_header_text"}>International Patents Tab</h1>
                        </div>
                    </div>}
                    {!TabOptions.Patents_National_tab ? "" : <div className={"Patents_National_Tab"}>
                        <div className={"Patents_National_Tab_header"}>
                            {IPS_Patent}
                        </div>
                    </div>}
                    {!TabOptions.Intellectual_Property_tab ? "" : <div className={"Intellectual_Property_Tab"}>
                        <div className={"Intellectual_Property_Tab_header"}>
                            <h1 className={"Intellectual_Property_Tab_header_text"}>Intellectual Property Tab</h1>
                        </div>
                    </div>}
                    {!TabOptions.Industrial_Design_tab ? "" : <div className={"Intellectual_Property_ID_Tab"}>
                        <div className={"Intellectual_Property_ID_Tab_header"}>
                            {IPS_Design}
                        </div>
                    </div>}
                    {!TabOptions.Trade_Marks_tab ? "" : <div className={"TradeMark_Tab"}>
                        <div className={"TradeMark_Tab_header"}>
                            {IPS_TradeMark}
                        </div>
                    </div>}
                    {!TabOptions.Copyright_tab ? "" : <div className={"Copyright_Tab"}>
                        <div className={"Copyright_Tab_header"}>
                            {IPS_CopyRight}
                        </div>
                    </div>}
                    {!TabOptions.Training_Attended_tab ? "" : <div className={"Training_Attended_Tab"}>
                        <div>
                            {Trainings_Attended}
                        </div>
                    </div>}
                    {!TabOptions.Training_Conducted_tab ? "" : <div className={"Training_Conducted_Tab"}>
                        <div className={"Training_Conducted_Tab_header"}>
                            {Trainings}
                        </div>
                    </div>}
                    {!TabOptions.Supervision_Masters_tab ? "" : <div className={"Supervision_Masters_Tab"}>
                        <div className={"Supervision_Masters_Tab_header"}>
                            {MS}
                        </div>
                    </div>}
                    {!TabOptions.Supervision_PHD_tab ? "" : <div className={"Supervision_PHD_Tab"}>
                        <div className={"Supervision_PHD_Tab_header"}>
                            {Doctoral}
                        </div>
                    </div>}
                </div>

            </div>
        </>
    )
}
export default New_Profile;