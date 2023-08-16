/*
There is duplication of code in this file which is intended to be updated later in the beta version of this project.
 */
import { useNavigate, useParams, useLocation } from "react-router-dom";
import SearchBar from "../Home/SearchBar";
import ErrorMessage from "../NotFoundFiles/ErrorMessage";
import React, { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Placeholder from "react-bootstrap/Placeholder";
import { Form } from "react-bootstrap";
import { fetchPublicationswithid, fetchProjectswithid, fetchIPwithid, fetchConferenceswithid } from "../../APIs/FacultyDatawithCms";
import CustomModal from "../Modal/Modal";
import industryData from "../../APIs/industry.json";
import labData from "../../APIs/labs.json";
import schoolIcon from "../../Icons/school.png";
import LoadingComponent from "../Loading/LoadingComponent";


const Middle_Page = () => {
    const [sortedCardList, setSortedCardList] = useState([]);
    // Function to open a new window with the specified title.


    const [filteredIndustryData, setFilteredIndustryData] = useState([]);
    const [filteredLabData, setFilteredLabData] = useState([]);
    /*<<<<<<<<<<<<<<<<<<<----------------->>>>>>>>>>>>>>>>>>>>>>>*/
    /*<<<<<<<<<<<<<<<<<<<----------------->>>>>>>>>>>>>>>>>>>>>>>*/
    const [DisplayPublications, setDisplayPublications] = useState([]);

    const [DisplayProjects, setDisplayProjects] = useState([]);

    const [DisplayIPs, setDisplayIPs] = useState([]);

    const [DisplaySchools, setDisplaySchools] = useState([]);

    const [DisplayExperts, setDisplayExperts] = useState([]);

    const [dataToSend, setdataToSend] = useState([])



    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState(null);


    // const [sortingOption, setSortingOption] = useState("");

    const [cards, setCards] = useState([]);

    // State that is used to check either show sorted card or full data of card in Profile variable
    const [isSorted, setIsSorted] = useState(false);


    const [sortedCards2, setSortedCards2] = useState([]);

    const [islabsData, setlabsData] = useState('');

    const [isindustryData, setindustryData] = useState('');

    /*<<<<<<<<<<<<<<<<<<<----------------->>>>>>>>>>>>>>>>>>>>>>>*/

    //State to indicate Error in fetching the data
    const [searchErrors, setSearchErrors] = useState(false);

    //State to monitor if any error occurred while doing search in "Research Area"
    const [searchErrorsCounter, setSearchErrorsCounter] = useState(1);
    // State to store all profiles retrieved from API
    const [Profile, setProfile] = useState([]);

    // To handle Loading Animation on Screen
    const [loading, setLoading] = useState(true);

    //To count total Publications
    const [publications, setPublications] = useState(0);

    //To count total Projects
    const [projects, setProjects] = useState(0);

    //To count total IPs
    const [ips, setIps] = useState(0);

    //To count total Experts Found
    const [Experts, setExperts] = useState(0)

    // State to monitor total number of Profiles being fetched till now, during Research Area search
    const [ProfileCounter, setProfileCounter] = useState(Math.random() * 1000);

    //To store Author CMS IDs
    let AuthorIDs = useRef({});

    // Storing Profiles in Temporary array for sorting out after retrieval
    let ProfilesHolder = useRef([]);

    // Showing the search word from the search bar
    const location = useLocation();
    const currentUrl = location.pathname;
    const encodedWord = currentUrl.substring(currentUrl.lastIndexOf("/") + 1);
    const searchWord = decodeURIComponent(encodedWord);

    const closeModal = () => {
        setdataToSend([]);
        setIsModalOpen(false);
        setModalData(null);
    };

    const handleButtonClick = (data) => {
        setModalData(data);
        setIsModalOpen(true);
    };

    const project_Publications_Ips_Faculty = (data, type) => {
        // setdataToSend([]);
        const datatosend = [];
        if (type === "IP") {
            for (let i = 0; i <= DisplayIPs.length; i++) {
                if (DisplayIPs[i]?.initiator_cms_id === data) {
                    datatosend.push(DisplayIPs[i]);
                    continue;
                }
                for (let j = 0; j < DisplayIPs[i]?.inventor_ids?.length; j++) {
                    if (DisplayIPs[i]?.inventor_ids?.co_author_faculty_staff_id?.includes(data)) {
                        datatosend.push(DisplayIPs[i]);
                    }
                }
            }
            setdataToSend(datatosend);
            setModalData("IP")
        } else if (type === "publications") {
            for (let i = 0; i <= DisplayPublications?.length; i++) {
                for (let j = 0; j < DisplayPublications[i]?.author_ids?.length; j++) {
                    if (DisplayPublications[i]?.author_ids[j]?.co_author_faculty_staff_id?.includes(data)
                        || DisplayPublications[i]?.author_ids[j]?.combined_faculty_staff_id?.includes(data)
                        || DisplayPublications[i]?.author_ids[j]?.faculty_student_author_compute?.includes(data)
                    ) {
                        datatosend.push(DisplayPublications[i]);
                    }
                }
            }
            setModalData("publications")
            setdataToSend(datatosend);

        } else if (type === "projects") {
            for (let i = 0; i <= DisplayProjects.length; i++) {
                for (let j = 0; j < DisplayProjects[i]?.copi_ids?.length; j++) {
                    if (DisplayProjects[i]?.copi_ids[j]?.co_author_faculty_staff_id?.includes(data)) {
                        datatosend.push(DisplayProjects[i]);
                    }
                }
            }
            setModalData("projects");
            setdataToSend(datatosend);
        }

    };
    const lengthCalculator = (type) => {
        let length = 0;
        Profile.map((item) => {
            if (type === "publications") {
                length += item.no_of_publications;
            } else if (type === "projects") {
                length += item.no_of_projects;
            } else if (type === " ") {
                length += item.no_of_IPs;
            }
        })
        return length;
    }

    useEffect(() => {
        if (dataToSend.length > 0) {
            setIsModalOpen(true);
        }
    }, [dataToSend])


    const handleSortingOptionChange = (event, school) => {
        const selectedOption = event.target.value;
        if (school) {
            if (school === "remove") {
                setIsSorted(false);
                return;
            } else {
                setSortedCardList(filterTopSchools(school))
                setIsSorted(true);
            }
        }
        else if (params.option === "school") {
            // sortCardsforschool
            if (selectedOption === "projects") {
                setSortedCardList(sortCardsforschool("no_of_projects"));
                setIsSorted(true);
                setCards("projects");
            } else if (selectedOption === "publications") {
                setSortedCardList(sortCardsforschool("no_of_publications"));
                setIsSorted(true);
                setCards("publication");
            } else if (selectedOption === "IP") {
                setSortedCardList(sortCardsforschool("no_of_IPs"));
                setIsSorted(true);
                setCards("IP");
                // Implement sorting logic based on IP
            } else {
                // Handle default case or clear sorting
                setIsSorted(false);
                setCards(Profile);
            }
        }
        else {

            if (selectedOption === "projects") {
                setSortedCardList(sortCards("Projects"));
                setIsSorted(true);
                setCards("projects");
            } else if (selectedOption === "publications") {
                setSortedCardList(sortCards("Publications"));
                setIsSorted(true);
                setCards("publication");
            } else if (selectedOption === "IP") {
                setSortedCardList(sortCards("IPs"));
                setIsSorted(true);
                setCards("IP");
                // Implement sorting logic based on IP
            } else {
                // Handle default case or clear sorting
                setIsSorted(false);
                setCards(Profile);
            }
        }
    };
    /*<<<<<<<<<<<<<<<<<<<----------------->>>>>>>>>>>>>>>>>>>>>>>*/

    const labsAndIndustryData = (keyword, type) => {
        if (type === 'industry') {
            setModalData('industry')
            setdataToSend(filteredIndustryData);

        }
        else if (type === "lab") {
            setModalData('lab')
            setdataToSend(filteredLabData);
        }
    }

    //if anyone tries to change the length of keywords passed through URL, then move to Error Page
    const params = useParams();
    if (params.search.split(" ").length > 4 || params.search.length > 50) {
        window.location.href = "/404";
    }

    //States of this page for handling the different operations happening on this page

    //State to store search parameters
    const [Parameter, setParameter] = useState({
        option: params.option,
        search: params.search,
        school: params.school
    });

    // Function to handle the visit of school website
    const handlevisitschool = () => {
        if (params.school === "ASAB") {
            window.open("https://asab.nust.edu.pk/", "_blank");
        }
         else if (params.school === "CIPS") {
            window.open("https://cips.nust.edu.pk/", "_blank");
        } 
         else if (params.school === "SCEE") {
            window.open("https://scee.nust.edu.pk/", "_blank");
        } 
         else if (params.school === "C3A") {
            window.open("https://c3a.nust.edu.pk/", "_blank");
        } 
         else if (params.school === "CES") {
            window.open("https://uspcase.nust.edu.pk/", "_blank");
        } 
         else if (params.school === "CAE") {
            window.open("https://cae.nust.edu.pk/", "_blank");
        } 
         else if (params.school === "CEME") {
            window.open("https://ceme.nust.edu.pk/", "_blank");
        } 
         else if (params.school === "SCEE-IESE") {
            window.open("https://iese.nust.edu.pk/", "_blank");
        } 
         else if (params.school === "SCEE-IGIS") {
            window.open("https://igis.nust.edu.pk/", "_blank");
        } 
         else if (params.school === "MCE") {
            window.open("https://mce.nust.edu.pk/", "_blank");
        } 
         else if (params.school === "NBC-Quetta") {
            window.open("https://nbc.nust.edu.pk/", "_blank");
        } 
         else if (params.school === "NBS") {
            window.open("https://nbs.nust.edu.pk/", "_blank");
        } 
         else if (params.school === "SCEE-NICE PG") {
            window.open("https://scee.nust.edu.pk/", "_blank");
        } 
         else if (params.school === "SCEE-NICE") {
            window.open("https://scee.nust.edu.pk/", "_blank");
        } 
         else if (params.school === "NIPCONS") {
            window.open("https://nipcons.nust.edu.pk/", "_blank");
        } 
         else if (params.school === "NSHS") {
            window.open("https://nshs.nust.edu.pk/", "_blank");
        } 
         else if (params.school === "NIT-Risalpur") {
            window.open("https://nit.nust.edu.pk/", "_blank");
        } 
         else if (params.school === "NIT-SCEE") {
            window.open("https://nit.nust.edu.pk/", "_blank");
        } 
         else if (params.school === "PNEC") {
            window.open("https://pnec.nust.edu.pk/", "_blank");
        } 
         else if (params.school === "RCMS") {
            window.open("https://nust.edu.pk/", "_blank");
        } 
         else if (params.school === "RIMMS") {
            window.open("https://nust.edu.pk/", "_blank");
        } 
         else if (params.school === "RIMMS") {
            window.open("https://sada.nust.edu.pk/", "_blank");
        } 
         else if (params.school === "SCME") {
            window.open("https://scme.nust.edu.pk/", "_blank");
        } 
         else if (params.school === "SCME") {
            window.open("https://scme.nust.edu.pk/", "_blank");
        } 
         else if (params.school === "SEECS") {
            window.open("https://seecs.nust.edu.pk/", "_blank");
        } 
         else if (params.school === "SINES") {
            window.open("https://sines.nust.edu.pk/", "_blank");
        } 
         else if (params.school === "SMME") {
            window.open("https://smme.nust.edu.pk/", "_blank");
        } 
         else if (params.school === "SNS") {
            window.open("https://sns.nust.edu.pk/", "_blank");
        } 
         else if (params.school === "S3H") {
            window.open("https://s3h.nust.edu.pk/", "_blank");
        } 
         else if (params.school === "USPCASE") {
            window.open("https://uspcase.nust.edu.pk/", "_blank");
        } 
         else if (params.school === "UMO") {
            window.open("https://nust.edu.pk/", "_blank");
        } 
         else if (params.school === "MCS") {
            window.open("https://mcs.nust.edu.pk/", "_blank");
        } 
         else {
            window.open("https://nust.edu.pk/", "_blank");
        } 

    }

    //To fetch all publication which are to be displayed in popup
    async function displayPublications() {
        try {
            const response = await fetch("http://localhost:8000/api/Publications", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    title: Parameter.search,
                }),
            });

            if (response.status === 200) {
                const data = await response.json();
                setDisplayPublications(data);
            } else {
                setSearchErrorsCounter((prevState) => prevState + 1);
            }
        } catch (error) {
            setSearchErrorsCounter((prevState) => prevState + 1);
        }
    }

    //To fetch all Projects which are to be displayed in popup
    async function displayProjects() {
        try {
            const response = await fetch("http://localhost:8000/api/Projects", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    title: Parameter.search,
                }),
            });

            if (response.status === 200) {
                const data = await response.json();
                setDisplayProjects(data);
            } else {
                setSearchErrorsCounter((prevState) => prevState + 1);
            }
        } catch (error) {
            setSearchErrorsCounter((prevState) => prevState + 1);
        }
    }

    //To fetch all IPs which are to be displayed in popup
    async function displayIPs() {
        try {
            const response = await fetch("http://localhost:8000/api/IP", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    title: Parameter.search,
                }),
            });

            if (response.status === 200) {
                const data = await response.json();
                setDisplayIPs(data);
            } else {
                setSearchErrorsCounter((prevState) => prevState + 1);
            }
        } catch (error) {
            setSearchErrorsCounter((prevState) => prevState + 1);
        }
    }



    /*<<<<<<<<<<<<<<<<<<<--------------------------------------------->>>>>>>>>>>>>>>>>>>>>>>*/
    // Different Objects to change state of Page
    // This method will return the object of
    const getProfileObject = () => {
        return {
            Code: "",
            Name: "",
            e_mail: "",
            School: "",
            Image_URL: "",
            no_of_publications: 0,
            no_of_projects: 0,
            no_of_IPs: 0,
        }
    }

    // This method will decrement the profile counter called when, faculty profile's API call is completed, resulting in error or correct response
    async function decrementProfileCounter() {
        setProfileCounter(prevState => {
            return prevState - 1;
        });
    }

    // This method will increment the counter whenever any API call is made for fetching Faculty Profile
    async function incrementProfileCounter() {
        setProfileCounter(prevState => {
            return prevState + 1;
        });
    }
    var schools = {}
    // This method is updating Profile State Array and adding new profile, when it is being retrieved
    async function UpdateProfileData(profile) {

        await setProfile(Profile => {
            return ([...Profile, profile])
        });
    }

    // Maintaining total number of profiles being fetched so far and showing it to user, when research area option is being selected.
    async function UpdateExpertCounter() {
        setExperts(prevState => {
            return prevState + 1;
        })
    }

    // Profiles are being fetched from Profile API then separating only PHD faculty members, to show as result to the user.
    async function separateProfiles(data) {
        setProfileCounter(0);
        for (let j = 0; j < data.length; j++) {
            incrementProfileCounter().then();
            if (!(data[j]["emp_acad_qualification"] === "PhD")) {
                decrementProfileCounter().then();
                continue;
            }
            const profile = getProfileObject();
            profile["Code"] = data[j]["code"];
            profile["e_mail"] = data[j]["work_email"];
            profile["School"] = data[j]["institute"];
            profile["Name"] = data[j]["name"];
            profile["Image_URL"] = data[j]["image_128"];
            await fetchPublicationswithid(data[j]["code"]).then((data) => { profile["no_of_publications"] = data.length });
            await fetchConferenceswithid(data[j]["code"]).then((data) => { profile["no_of_publications"] = profile["no_of_publications"] + data.length });
            await fetchProjectswithid(data[j]["code"]).then((data) => { profile["no_of_projects"] = data.length });
            await fetchIPwithid(data[j]["code"]).then((data) => { profile["no_of_IPs"] = data.length });

            ProfilesHolder.current.push(profile);
            UpdateProfileData(profile).then(() => {
                UpdateExpertCounter().then();
                decrementProfileCounter();
            });
        }
    }

    // In case when Profiles are being through research are option, then we need to fetch the profile of each faculty member based on
    // their CMS ID, so this method is doing that work for us.
    async function fetchProfileWithID(cmsID) {
        incrementProfileCounter().then();
        const profile = getProfileObject();
        await fetch(`http://localhost:8000/api/Profile/${cmsID}`)
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                }
                else {
                    return Promise.reject(response);
                }
            }).then(
                data => {
                    profile["Code"] = cmsID;
                    profile["e_mail"] = data[0]["work_email"];
                    profile["Name"] = data[0]["name"];
                    profile["School"] = data[0]["institute"];
                    profile["Image_URL"] = data[0]["image_128"];
                    ProfilesHolder.current.push(profile);
                    UpdateProfileData(profile).then(() => {
                        UpdateExpertCounter().then();
                        decrementProfileCounter();
                        if (loading) changeLoading();
                    })
                }
            ).catch((error) => {
                decrementProfileCounter();
            });
    }
    // To shift the loading screen
    async function changeLoading() {
        setLoading(false);
    }

    useEffect(() => {
        displayProjects();
        displayPublications();
        displayIPs();
        setFilteredIndustryData(industryData.filter(item => item.description?.toLowerCase().includes(Parameter.search?.toLowerCase())));
        //To Fetch Profile of Faculty from API
        async function fetchProfile() {
            await fetch("http://localhost:8000/api/Profile", {
                method: "POST",
                headers: { "Content-Type": "application/json", "Accept": "application/json" },
                body: JSON.stringify({ "name": `${Parameter.search}`, })
            })
                .then((response) => {
                    if (response.status === 200) { return response.json(); }
                    else {
                        setSearchErrors(true);
                    }
                }).then(
                    (data) => { separateProfiles(data); })
                .catch((error) => {
                    changeLoading()
                }
                );
            ;
        }
        // To Fetch Publications of Facu
        async function fetchPublications() {
            await fetch(`http://localhost:8000/api/Publications`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(
                    {
                        "title": `${Parameter.search}`,
                    }
                )
            })
                .then((response) => {
                    if (response.status === 200) {
                        return response.json();
                    }
                    else {
                        setSearchErrorsCounter(prevState => prevState + 1)
                    }
                })
                .then((data) => {
                    setProfileCounter(0)
                    for (let j = 0; j < data.length; j++) {
                        const authors = data[j]["author_ids"];
                        for (let i = 0; i < authors.length; i++) {
                            if (authors[i]["affiliation"] === "nust") {
                                const CmsId = authors[i]["co_author_faculty_staff_id"].split(" - ")[1];
                                if (CmsId === undefined) continue;
                                let profileData = {
                                    Publications: 1,
                                    Projects: 0,
                                    IPs: 0,
                                }
                                if (AuthorIDs.current.hasOwnProperty(CmsId)) {
                                    let currentValues = AuthorIDs.current[CmsId];
                                    currentValues.Publications = currentValues.Publications + 1
                                    AuthorIDs.current[CmsId] = currentValues;
                                }
                                else {
                                    AuthorIDs.current[CmsId] = profileData;
                                    fetchProfileWithID(CmsId);

                                }
                            }
                        }
                    }
                    setPublications(data.length)
                })
        }

        // To Fetch Projects
        async function fetchProjects() {
            await fetch(`http://localhost:8000/api/Projects`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify(
                        {
                            "title": `${Parameter.search}`,
                        }
                    )
                })
                .then((response) => {
                    if (response.status === 200) {
                        return response.json();
                    }
                    else {
                        setSearchErrorsCounter(prevState => prevState + 1)
                    }
                })
                .then((data) => {
                    let project_counter = 0;
                    for (let j = 0; j < data.length; j++) {
                        if (data[j]["project_status"].includes("Submitted") || data[j]["project_type"] === "Defense" || data[j]["project_status"].includes("Cancelled/Rejected")) {
                            continue;
                        }
                        let authors = data[j]["copi_ids"];
                        project_counter = project_counter + 1;
                        for (let i = 0; i < authors.length; i++) {
                            if (authors[i]["copi"] === "nust") {
                                const CmsId = authors[i]["co_author_faculty_staff_id"].split(" - ")[1];
                                if (CmsId === undefined) continue;
                                let profileData = {
                                    Publications: 0,
                                    Projects: 1,
                                    IPs: 0,
                                }
                                if (AuthorIDs.current.hasOwnProperty(CmsId)) {
                                    let currentValues = AuthorIDs.current[CmsId];
                                    currentValues.Projects = currentValues.Projects + 1
                                    AuthorIDs.current[CmsId] = currentValues;
                                }
                                else {
                                    AuthorIDs.current[CmsId] = profileData;
                                    fetchProfileWithID(CmsId);

                                }
                            }
                        }
                    }
                    setProjects(project_counter)
                })
        }

        // To Fetch IPs
        async function fetchIPs() {
            await fetch(`http://localhost:8000/api/IP`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify(
                        {
                            "title": `${Parameter.search}`,
                        }
                    )
                })
                .then((response) => {
                    if (response.status === 200) {
                        return response.json();
                    }
                    else {
                        setSearchErrorsCounter(prevState => prevState + 1)
                    }
                })
                .then((data) => {
                    setIps(data.length)
                    for (let j = 0; j < data.length; j++) {
                        let authors_ip = data[j]["inventor_ids"];
                        for (let i = 0; i < authors_ip.length; i++) {
                            if (authors_ip[i]["affiliation"] === "nust") {
                                const CmsId = authors_ip[i]["co_author_faculty_staff_id"].split(" - ")[1];
                                if (CmsId === undefined) continue;
                                let profileData = {
                                    Publications: 0,
                                    Projects: 0,
                                    IPs: 1,
                                }
                                if (AuthorIDs.current.hasOwnProperty(CmsId)) {
                                    let currentValues = AuthorIDs.current[CmsId];
                                    currentValues.IPs = currentValues.IPs + 1
                                    AuthorIDs.current[CmsId] = currentValues;
                                }
                                else {
                                    AuthorIDs.current[CmsId] = profileData;
                                    fetchProfileWithID(CmsId);

                                }
                            }
                        }
                    }
                })
        }

        // To Fetch Discipline
        async function fetchDiscipline() {
            await fetch(`http://localhost:8000/api/Discie`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify({ "discipline": `${Parameter.search}`, })
                })
                .then((response) => {
                    if (response.status === 200) { return response.json(); }
                    else { setSearchErrors(true); }
                })
                .then((data) => { separateProfiles(data) })
                .catch(() => { changeLoading() });
        }

        // To Fetch SchoolFaculty
        async function fetchSchoolFaculty() {
            let school = Parameter.school;
            if (school === "USPCASE") {
                school = "USPCAS"
            } else if (Parameter.school === "NBC-Quetta") {
                school = "NBC"
            }

            await fetch(`http://localhost:8000/api/schoolFaculty`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(
                    {
                        "school": `${school}`,
                        "faculty": `${Parameter.search}`,
                    })
            })
                .then((response) => {
                    if (response.status === 200) {
                        return response.json();
                    }
                    else {
                        setSearchErrors(true);
                    }
                })
                .then((data) => {
                    separateProfiles(data)
                })
                .catch(() => {
                    changeLoading()
                });
        }

        if (Parameter.option === "name") {
            fetchProfile().then(() => { });
        }
        else if (Parameter.option === "area_expertise") {
            setFilteredLabData(
                labData.filter(
                    item =>
                        (item.description?.toLowerCase().includes(Parameter.search?.toLowerCase())) ||
                        (item.introduction?.toLowerCase().includes(Parameter.search?.toLowerCase()))
                )
            );
            fetchPublications().then(() => {
                fetchProjects().then(() => {
                    fetchIPs().then(() => {
                        /*
                        Counter is added in each fetch function to check if all the fetch functions have been executed
                        and each has thrown an error. Then the error is set to true.
                        If no response is received from the server, the error is set to true.
                        If error is not thrown, but the response is empty, then another error is shown.
                         */
                        if (searchErrorsCounter === 3) {
                            setSearchErrors(true);
                        }
                        changeLoading().then()
                    });
                });
            });
        }
        // else if(Parameter.option === "discipline"){
        //         fetchDiscipline().then(() => {});
        // }
        else if (Parameter.option === "school") {
            setFilteredLabData(
                labData.filter(
                    item =>
                    (item.school && typeof item.school === "string" && item.school.toLowerCase().includes(Parameter.school && typeof Parameter.school === "string" && Parameter.school.toLowerCase()))
                )
            );
            fetchSchoolFaculty().then(() => { });
        }
    }, [Parameter])

    useEffect(() => {
        Profile.sort((a, b) => {
            if (a.Name < b.Name) return -1
            if (a.Name > b.Name) return 1
        })
    }, [Profile])
    useEffect(() => {
        if (ProfileCounter === 0) {
            setProfile(ProfilesHolder.current.sort((a, b) => (a.Name > b.Name) ? 1 : -1));
            changeLoading().then(() => { });
        }
    }, [ProfileCounter])


    useEffect(() => {
        const sortedProfile = Profile.sort((a, b) => {
            const publicationCountA = AuthorIDs.current[a.Code]?.Publications || 0;
            const publicationCountB = AuthorIDs.current[b.Code]?.Publications || 0;
            return publicationCountB - publicationCountA; // Sort in descending order
        });

        const filteredSortedProfile = sortedProfile.filter((profile) => {
            const publicationCount = AuthorIDs.current[profile.Code]?.Publications || 0;
            return publicationCount > 0;
        });

        setSortedCards2(filteredSortedProfile);
    }, [Profile, AuthorIDs]);

    const handleProfile = (cmsId, Name) => {
        window.open(`/profile/${Name}/${cmsId}`, "_blank");
    }

    // Sorting Card for School
    const sortCardsforschool = (x) => {
        const sortedCards = Profile.filter((profile) => {
            const projectCount = profile?.[x];
            schools = {}
            return projectCount > 0;
        }).sort((a, b) => {
            const projectCountA = a?.[x];
            const projectCountB = b?.[x];
            // Sort in descending order
            return projectCountB - projectCountA;
        }).map((profile, index) => {
            return (
                <>
                    <div className={"Card-Profile"} >
                        <div className={"Card-Header"}>
                            <div className={"Card-Image"}>
                                <img src={profile.Image_URL.trim() === "" ? process.env.PUBLIC_URL + "/Images/Profile Images/Profile_Vector.jpg" : "data:image/png;base64," + atob(profile.Image_URL)} alt={"Avatar"} />
                            </div>
                            <div className={"Card-Button"}>
                                <Button variant={"outline-primary"} onClick={() => {
                                    handleProfile(profile.Code, profile.Name);
                                }}>Visit Profile</Button>
                            </div>
                        </div>
                        <div className={"Card-Body"}>
                            <div className={"Card-Title"}>
                                <h2>{profile.Name}</h2>
                            </div>
                            <div className={"Card-Email"}>
                                <h3>{profile.e_mail}</h3>
                            </div>
                            <div className={"Card-Text"}>
                                <p>{profile.School}</p>
                            </div>
                            {Parameter.option === "name" ? "" :
                                Parameter.option === "school" ?
                                    <><div className={"Card-Text"}>
                                        {profile?.no_of_publications === 0 || profile?.no_of_publications === undefined ? "" :
                                            <span><i>Publications</i>: <h6 style={{ display: "inline" }}>{profile?.no_of_publications}</h6></span>
                                        }
                                    </div>
                                        <div className={"Card-Text"}>
                                            {profile?.no_of_projects === 0 || profile?.no_of_projects === undefined ? "" :
                                                <span><i>Projects</i>: <strong style={{ display: "inline" }}>{profile?.no_of_projects}</strong></span>
                                            }
                                        </div>
                                        <div className={"Card-Text"}>
                                            {profile?.no_of_IPs === 0 || profile?.no_of_IPs === undefined ? "" :
                                                <span><i>IPs</i>: <h6 style={{ display: "inline", margin: 0, padding: 0 }}>{profile?.no_of_IPs}</h6></span>
                                            }
                                        </div></>
                                    :
                                    <>

                                        <div className={"Card-Text"}>
                                            {AuthorIDs.current[profile.Code].Publications === 0 || AuthorIDs.current[profile.Code].Publications === undefined ? "" :
                                                <button style={{ color: "black", margin: 0, padding: 0 }} className={"Button-Style"} onClick={() => project_Publications_Ips_Faculty(profile.Code, "publications")}>
                                                    <span><i>Publications</i>: <h6 style={{ display: "inline" }}>{AuthorIDs.current[profile.Code].Publications}</h6></span>
                                                </button>
                                            }
                                        </div>

                                        <div className={"Card-Text"}>
                                            {AuthorIDs.current[profile.Code].Projects === 0 || AuthorIDs.current[profile.Code].Projects === undefined ? "" :
                                                <button style={{ color: "black", margin: 0, padding: 0 }} className={"Button-Style"} onClick={() => project_Publications_Ips_Faculty(profile.Code, "projects")}>

                                                    <span><i>Projects</i>: <strong style={{ display: "inline" }}>{AuthorIDs.current[profile.Code].Projects}</strong></span>
                                                </button>
                                            }
                                        </div>
                                        <div className={"Card-Text"}>
                                            {AuthorIDs.current[profile.Code].IPs === 0 || AuthorIDs.current[profile.Code].IPs === undefined ? (
                                                ""
                                            ) : (
                                                <button style={{ color: "black", margin: 0, padding: 0 }} onClick={() => {
                                                    project_Publications_Ips_Faculty(profile.Code, "IP");
                                                }}>
                                                    <span><i>IPs</i>: <h6 style={{ display: "inline", margin: 0, padding: 0 }}>{AuthorIDs.current[profile.Code].IPs}</h6></span>
                                                </button>
                                            )}
                                        </div>
                                    </>
                            }
                        </div>
                    </div>
                </>

            )
        })
        return sortedCards;
    }
    // Sorting Card for Research Area
    const sortCards = (x) => {
        const sortedCards = Profile.filter((profile) => {
            const author = AuthorIDs.current[profile.Code];
            const projectCount = author?.[x];
            schools = {}
            return projectCount > 0;
        }).sort((a, b) => {
            const authorA = AuthorIDs.current[a.Code];
            const authorB = AuthorIDs.current[b.Code];
            const projectCountA = authorA?.[x];
            const projectCountB = authorB?.[x];

            // Sort in descending order
            return projectCountB - projectCountA;
        }).map((profile, index) => {
            return (
                <>
                    <div className={"Card-Profile"} >
                        <div className={"Card-Header"}>
                            <div className={"Card-Image"}>
                                <img src={profile.Image_URL.trim() === "" ? process.env.PUBLIC_URL + "/Images/Profile Images/Profile_Vector.jpg" : "data:image/png;base64," + atob(profile.Image_URL)} alt={"Avatar"} />
                            </div>
                            <div className={"Card-Button"}>
                                <Button variant={"outline-primary"} onClick={() => {
                                    handleProfile(profile.Code, profile.Name);
                                }}>Visit Profile</Button>
                            </div>
                        </div>
                        <div className={"Card-Body"}>
                            <div className={"Card-Title"}>
                                <h2>{profile.Name}</h2>
                            </div>
                            <div className={"Card-Email"}>
                                <h3>{profile.e_mail}</h3>
                            </div>
                            <div className={"Card-Text"}>
                                <p>{profile.School}</p>
                            </div>
                            {Parameter.option === "name" || Parameter.option === "school" ? "" :
                                <>
                                    <div className={"Card-Text"}>
                                        {AuthorIDs.current[profile.Code].Publications === 0 || AuthorIDs.current[profile.Code].Publications === undefined ? "" :
                                            <button style={{ color: "black", margin: 0, padding: 0 }} className={"Button-Style"} onClick={() => project_Publications_Ips_Faculty(profile.Code, "publications")}>
                                                <span><i>Publications</i>: <h6 style={{ display: "inline" }}>{AuthorIDs.current[profile.Code].Publications}</h6></span>
                                            </button>
                                        }
                                    </div>
                                    <div className={"Card-Text"}>
                                        {AuthorIDs.current[profile.Code].Projects === 0 || AuthorIDs.current[profile.Code].Projects === undefined ? "" :
                                            <button style={{ color: "black", margin: 0, padding: 0 }} className={"Button-Style"} onClick={() => project_Publications_Ips_Faculty(profile.Code, "projects")}>

                                                <span><i>Projects</i>: <strong style={{ display: "inline" }}>{AuthorIDs.current[profile.Code].Projects}</strong></span>
                                            </button>
                                        }
                                    </div>
                                    <div className={"Card-Text"}>
                                        {AuthorIDs.current[profile.Code].IPs === 0 || AuthorIDs.current[profile.Code].IPs === undefined ? (
                                            ""
                                        ) : (
                                            <button style={{ color: "black", margin: 0, padding: 0 }} onClick={() => {
                                                project_Publications_Ips_Faculty(profile.Code, "IP");
                                            }}>
                                                <span><i>IPs</i>: <h6 style={{ display: "inline", margin: 0, padding: 0 }}>{AuthorIDs.current[profile.Code].IPs}</h6></span>
                                            </button>
                                        )}
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                </>

            )
        })
        return sortedCards;
    }

    // This method will filter the top schools
    const filterTopSchools = (school) => {
        const filteredCards = Profile.filter((profile) => {
            return profile.School === school;
        }).map((profile, index) => {
            return (
                <>
                    <div className={"Card-Profile"} >
                        <div className={"Card-Header"}>
                            <div className={"Card-Image"}>
                                <img src={profile.Image_URL.trim() === "" ? process.env.PUBLIC_URL + "/Images/Profile Images/Profile_Vector.jpg" : "data:image/png;base64," + atob(profile.Image_URL)} alt={"Avatar"} />
                            </div>
                            <div className={"Card-Button"}>
                                <Button variant={"outline-primary"} onClick={() => {
                                    handleProfile(profile.Code, profile.Name);
                                }}>Visit Profile</Button>
                            </div>
                        </div>
                        <div className={"Card-Body"}>
                            <div className={"Card-Title"}>
                                <h2>{profile.Name}</h2>
                            </div>
                            <div className={"Card-Email"}>
                                <h3>{profile.e_mail}</h3>
                            </div>
                            <div className={"Card-Text"}>
                                <p>{profile.School}</p>
                            </div>
                            {Parameter.option === "name" || Parameter.option === "school" ? "" :
                                <>
                                    <div className={"Card-Text"}>
                                        {AuthorIDs.current[profile.Code].Publications === 0 || AuthorIDs.current[profile.Code].Publications === undefined ? "" :
                                            <button style={{ color: "black", margin: 0, padding: 0 }} className={"Button-Style"} onClick={() => project_Publications_Ips_Faculty(profile.Code, "publications")}>
                                                <span><i>Publications</i>: <h6 style={{ display: "inline" }}>{AuthorIDs.current[profile.Code].Publications}</h6></span>
                                            </button>
                                        }
                                    </div>
                                    <div className={"Card-Text"}>
                                        {AuthorIDs.current[profile.Code].Projects === 0 || AuthorIDs.current[profile.Code].Projects === undefined ? "" :
                                            <button style={{ color: "black", margin: 0, padding: 0 }} className={"Button-Style"} onClick={() => project_Publications_Ips_Faculty(profile.Code, "projects")}>
                                                <span><i>Projects</i>: <strong style={{ display: "inline" }}>{AuthorIDs.current[profile.Code].Projects}</strong></span>
                                            </button>
                                        }
                                    </div>
                                    <div className={"Card-Text"}>
                                        {AuthorIDs.current[profile.Code].IPs === 0 || AuthorIDs.current[profile.Code].IPs === undefined ? (
                                            ""
                                        ) : (
                                            <button style={{ color: "black", margin: 0, padding: 0 }} onClick={() => {
                                                project_Publications_Ips_Faculty(profile.Code, "IP");
                                            }}>
                                                <span><i>IPs</i>: <h6 style={{ display: "inline", margin: 0, padding: 0 }}>{AuthorIDs.current[profile.Code].IPs}</h6></span>
                                            </button>
                                        )}
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                </>
            )
        })
        return filteredCards;
    }

    // Count the schools
    const schoolCount = {};
    Profile.forEach((profile) => {
        const school = profile.School;
        if (!schoolCount[school]) {
            schoolCount[school] = 1;
        } else {
            schoolCount[school]++;
        }
    });

    // Get the top 3 schools by count
    const topSchools = Object.keys(schoolCount)
        .sort((a, b) => schoolCount[b] - schoolCount[a])
        .slice(0, 3);

    // Render the row of top schools
    const TopSchoolsRow = () => (
        <div className="row">
            {topSchools.map((school) => (
                <div onClick={(event) => handleSortingOptionChange(event, school)} className="col-md top-schools" key={school} style={{ backgroundColor: "rgb(106, 13, 173)", color: "white" }}>{school}: <b>{schoolCount[school]}</b></div>
            ))}
            {topSchools?.length > 0 && <div className="removesort" onClick={(event) => handleSortingOptionChange(event, "remove")}>
                <i className="fa-solid fa-house-user"></i>
            </div>}
        </div>
    );
    // Cards data without sorting i.e default sorted
    const Cards = Profile.map((profile, index) => {
        return (
            <>
                <div className={"Card-Profile schoolcountcard"}>
                    <div className={"Card-Header"}>
                        <div className={"Card-Image"}>
                            <img src={profile.Image_URL.trim() === "" ? process.env.PUBLIC_URL + "/Images/Profile Images/Profile_Vector.jpg" : "data:image/png;base64," + atob(profile.Image_URL)} alt={"Avatar"} />
                        </div>
                        <div className={"Card-Button"}>
                            <Button variant={"outline-primary"} onClick={() => {
                                handleProfile(profile.Code, profile.Name);
                            }}>Visit Profile</Button>
                        </div>
                    </div>
                    <div className={"Card-Body"}>
                        <div className={"Card-Title"}>
                            <h2>{profile.Name}</h2>
                        </div>
                        <div className={"Card-Email"}>
                            <h3>{profile.e_mail}</h3>
                        </div>
                        <div className={"Card-Text"}>
                            <p>{profile.School}</p>
                        </div>

                        {Parameter.option === "name" ? (
                            ""
                        ) : Parameter.option === "school" ? (
                            <>
                                <div className={"Card-Text"}>
                                    {profile?.no_of_publications === 0 || profile?.no_of_publications === undefined ? (
                                        ""
                                    ) : (
                                        <button style={{ color: "black", margin: 0, padding: 0 }} onClick={() => project_Publications_Ips_Faculty(profile.Code, "publications")}>
                                            <span><i>Publications</i>: <h6 style={{ display: "inline", margin: 0, padding: 0 }}>{profile?.no_of_publications}</h6></span>
                                        </button>
                                    )}
                                </div>
                                <div className={"Card-Text"}>
                                    {profile?.no_of_projects === 0 || profile?.no_of_projects === undefined ? (
                                        ""
                                    ) : (
                                        <button style={{ color: "black", margin: 0, padding: 0 }} onClick={() => project_Publications_Ips_Faculty(profile.Code, "projects")}>
                                            <span><i>Projects</i>: <strong style={{ display: "inline", margin: 0, padding: 0 }}>{profile?.no_of_projects}</strong></span>
                                        </button>
                                    )}
                                </div>
                                <div className={"Card-Text"}>
                                    {profile?.no_of_IPs === 0 || profile?.no_of_IPs === undefined ? (
                                        ""
                                    ) : (
                                        <button style={{ color: "black", margin: 0, padding: 0 }} onClick={() => project_Publications_Ips_Faculty(profile.Code, "ips")}>
                                            <span><i>IPs</i>: <h6 style={{ display: "inline", margin: 0, padding: 0 }}>{profile?.no_of_IPs}</h6></span>
                                        </button>
                                    )}
                                </div>
                            </>
                        ) : (
                            <>
                                <div className={"Card-Text"}>
                                    {AuthorIDs.current[profile.Code].Publications === 0 || AuthorIDs.current[profile.Code].Publications === undefined ? (
                                        ""
                                    ) : (
                                        <button style={{ color: "black", margin: 0, padding: 0 }} onClick={() => project_Publications_Ips_Faculty(profile.Code, "publications")}>
                                            <span><i>Publications</i>: <h6 style={{ display: "inline", margin: 0, padding: 0 }}>{AuthorIDs.current[profile.Code].Publications}</h6></span>
                                        </button>
                                    )}
                                </div>
                                <div className={"Card-Text"}>
                                    {AuthorIDs.current[profile.Code].Projects === 0 || AuthorIDs.current[profile.Code].Projects === undefined ? (
                                        ""
                                    ) : (
                                        <button style={{ color: "black", margin: 0, padding: 0 }} onClick={() => project_Publications_Ips_Faculty(profile.Code, "projects")}>
                                            <span><i>Projects</i>: <strong style={{ display: "inline", margin: 0, padding: 0 }}>{AuthorIDs.current[profile.Code].Projects}</strong></span>
                                        </button>
                                    )}
                                </div>
                                <div className={"Card-Text"}>
                                    {AuthorIDs.current[profile.Code].IPs === 0 || AuthorIDs.current[profile.Code].IPs === undefined ? (
                                        ""
                                    ) : (
                                        <button style={{ color: "black", margin: 0, padding: 0 }} onClick={() => {
                                            project_Publications_Ips_Faculty(profile.Code, "IP");
                                        }}>
                                            <span><i>IPs</i>: <h6 style={{ display: "inline", margin: 0, padding: 0 }}>{AuthorIDs.current[profile.Code].IPs}</h6></span>
                                        </button>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </>
        );
    });


    // const sortedCards = Cards.sort((a, b) => b.props.children[0].props.children[1].props.children.props.date - a.props.children[0].props.children[1].props.children.props.date);


    // If Research Area option is selected, only then show these tabs, otherwise don't show them
    return (

        //col-md
        <div className="middle-page">
            <SearchBar />

            <h4 style={{ textAlign: "center" }}>Showing results for: {searchWord.toUpperCase()}</h4>
            {Parameter.option === "school" && (
                <>
                    <div className="result-stats nonclickable row">
                        {Profile.length > 0 && (
                            <button>
                                Experts: <h6>{Profile.length}</h6>
                            </button>
                        )}
                        {lengthCalculator("publications") > 0 && (
                            <button>
                                Publications: <h6>{lengthCalculator("publications")}</h6>
                            </button>
                        )}
                        {lengthCalculator("projects") > 0 && (
                            <button>
                                Projects: <h6>{lengthCalculator("projects")}</h6>
                            </button>
                        )}
                        {lengthCalculator("ips") > 0 && (
                            <button>
                                Intellectual Property: <h6>{lengthCalculator("ips")}</h6>
                            </button>
                        )}
                    </div>

                    <div className="result-stats row">
                        {filteredLabData.length > 0 && (
                            <>
                                {<button onClick={() => labsAndIndustryData(Parameter.school, 'lab')}>
                                    Lab Equipment: <h6>
                                        {filteredLabData.length}
                                    </h6>
                                </button>}
                            </>
                        )}
                    </div>
                    <div className="school_visit_icon">
                        <img onClick={handlevisitschool} src={schoolIcon} alt="visit school icon" />
                    </div>

                </>

            )}
            {Parameter.option === "area_expertise" && (
                <div className="result-stats row">
                    {Experts !== 0 && (
                        <button>
                            Experts: <h6>{Profile.length}</h6>
                        </button>
                    )}
                    {publications !== 0 && (
                        <button onClick={() => handleButtonClick(DisplayPublications)}>
                            Publications: <h6>{DisplayPublications.length}</h6>
                        </button>
                    )}
                    {projects !== 0 && (
                        <button onClick={() => handleButtonClick(DisplayProjects)}>
                            Projects: <h6>{DisplayProjects.filter(project => project.copi_ids[0]?.project_status !== "submitted").length}</h6>
                        </button>
                    )}
                    {ips !== 0 && (
                        <button onClick={() => handleButtonClick(DisplayIPs)}>
                            Intellectual Property: <h6>{DisplayIPs.length}</h6>
                        </button>
                    )}
                    {(
                        <>
                            {filteredLabData.length > 0 && <button onClick={() => labsAndIndustryData(Parameter.search, 'lab')}>
                                Lab Equipment: <h6>
                                    {filteredLabData.length}
                                </h6>
                            </button>}
                            {filteredIndustryData.length > 0 && <button onClick={() => labsAndIndustryData(Parameter.search, 'industry')}>
                                Industry:
                                <h6>
                                    {filteredIndustryData.length}
                                </h6>
                            </button>}
                        </>
                    )}


                </div>
            )}
            {cards !== "projects" && cards !== "publications" && cards !== "IP" &&
                <div>
                    {Parameter.option === "area_expertise" && <TopSchoolsRow />}
                </div>}
            {Parameter.option !== "name" &&
                <div className="button-container">
                    <button className={"dropdown-button"}>
                        <div className={"Searching"}>
                            <Form.Select className={""} name={"Sort"} onChange={handleSortingOptionChange}>
                                <option className={""} value={""}>
                                    Sort By Default
                                </option>
                                <option className={""} value={"projects"}>
                                    Sort by Project
                                </option>
                                <option className={""} value={"publications"} >
                                    Sort by Publication
                                </option>
                                <option className={""} value={"IP"}>
                                    Sort by IP
                                </option>
                            </Form.Select>
                        </div>
                    </button>
                </div>}

            {/*Modal*/}
            <CustomModal
                isModalOpen={isModalOpen}
                closeModal={closeModal}
                modalData={modalData}
                DisplayPublications={DisplayPublications}
                DisplayProjects={DisplayProjects}
                DisplayIPs={DisplayIPs}
                islabsData={islabsData}
                isindustryData={isindustryData}
                dataToSend={dataToSend}
            />
            {/*If the loading is true, then the loading animation is shown.*/}
            {loading ?
                // <div className={"Loading_Div"}>
                //     <Placeholder as="p" animation="glow" className={"Profile_Loading"}>
                //         <Placeholder xs={12} />
                //     </Placeholder>
                //     <Placeholder as="p" animation="wave" className={"Profile_Loading"}>
                //         <Placeholder xs={12} />
                //     </Placeholder>
                //     <Placeholder as="p" animation="glow" className={"Profile_Loading"}>
                //         <Placeholder xs={12} />
                //     </Placeholder>
                //     <Placeholder as="p" animation="wave" className={"Profile_Loading"}>
                //         <Placeholder xs={12} />
                //     </Placeholder>
                //     <Placeholder as="p" animation="glow" className={"Profile_Loading"}>
                //         <Placeholder xs={12} />
                //     </Placeholder>
                // </div>
                <LoadingComponent/>
                // Fetching data from server is complete, now if any error occurred then the error message is shown.
                // by changing the state of searchErrors to true.
                : !searchErrors ?
                    // In case no error occurred, then check if the response is empty or not.
                    // If the response is empty, then show the error message of no results found.
                    // Else show the results.
                    Profile.length === 0 ? <ErrorMessage Message={"No Results Found"} /> :
                        <div className={"Search-Results"}>
                            {isSorted == true ? (
                                <>
                                    {sortedCardList} {/* Invoke the sortedCardList function by adding parentheses */}
                                </>
                            ) : (
                                /* Default case: Render Cards */
                                <>
                                    {Cards} {/* Render the Cards component */}
                                </>
                            )}
                        </div> :
                    // If any error occurred, then show the error message.
                    <ErrorMessage Message={"Error in Fetching Data"} />
            }

        </div>
    );
}

export default Middle_Page;

