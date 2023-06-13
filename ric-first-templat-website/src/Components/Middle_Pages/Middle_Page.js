/*
There is duplication of code in this file which is intended to be updated later in the beta version of this project.
 */
import { useNavigate, useParams } from "react-router-dom";
import SearchBar from "../Home/SearchBar";
import ErrorMessage from "../NotFoundFiles/ErrorMessage";
import React, { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Placeholder from "react-bootstrap/Placeholder";
import { Form } from "react-bootstrap";

import CustomModal from "../Modal/Modal";

const Middle_Page = () => {
    // Function to open a new window with the specified title.

    /*<<<<<<<<<<<<<<<<<<<----------------->>>>>>>>>>>>>>>>>>>>>>>*/
    const closeModal = () => {
        setIsModalOpen(false);
        setModalData(null);
    };

    const handleButtonClick = (data) => {
        setModalData(data);
        setIsModalOpen(true);
    };


    const handleSortingOptionChange = (event) => {
        const selectedOption = event.target.value;
        if (selectedOption === "projects") {
            setCards("projects");
        } else if (selectedOption === "publication") {
            setCards("publications");
            // Implement sorting logic based on publication
        } else if (selectedOption === "IP") {
            setCards("IP");
            // Implement sorting logic based on IP
        } else {
            // Handle default case or clear sorting
            setCards(Profile);
        }

    };
    /*<<<<<<<<<<<<<<<<<<<----------------->>>>>>>>>>>>>>>>>>>>>>>*/

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


    /*<<<<<<<<<<<<<<<<<<<----------------->>>>>>>>>>>>>>>>>>>>>>>*/
    const [DisplayPublications, setDisplayPublications] = useState([]);

    const [DisplayProjects, setDisplayProjects] = useState([]);

    const [DisplayIPs, setDisplayIPs] = useState([]);

    const [DisplayExperts, setDisplayExperts] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState(null);


    // const [sortingOption, setSortingOption] = useState("");

    const [cards, setCards] = useState([]);


    const [sortedCards2, setSortedCards2] = useState([]);
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


    /*<<<<<<<<<<<<<<<<<<<----------------->>>>>>>>>>>>>>>>>>>>>>>*/

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

    //To fetch all Experts which are to be displayed in popup
    async function displaySchoolFaculty() {
        await fetch(`http://localhost:8000/api/schoolFaculty`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(
                {
                    "school": `${Parameter.school}`,
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

    /*<<<<<<<<<<<<<<<<<<<--------------------------------------------->>>>>>>>>>>>>>>>>>>>>>>*/
    // Different Objects to change state of Page
    // This method will return the object of
    const getProfileObject = () => {
        return {
            Code: "",
            Name: "",
            e_mail: "",
            School: "",
            Image_URL: ""
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
        await fetch(`http://127.0.0.1:8000/api/Profile/${cmsID}`)
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
        displaySchoolFaculty();

        //To Fetch Profile of Faculty from API
        async function fetchProfile() {
            await fetch("http://127.0.0.1:8000/api/Profile", {
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
            await fetch(`http://localhost:8000/api/schoolFaculty`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(
                    {
                        "school": `${Parameter.school}`,
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
        else if (Parameter.option === "school") { fetchSchoolFaculty().then(() => { }); }
    }, [])

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
    // useEffect(() => {
    //     Profile.sort((a, b) => {
    //         const publicationsA = AuthorIDs.current[a.Code]?.Publications || 0;
    //         const publicationsB = AuthorIDs.current[b.Code]?.Publications || 0;
    //         return publicationsB - publicationsA;
    //     });
    // }, [Profile, AuthorIDs]);

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
    // Profile.forEach(profile => {
    //     if (typeof profile.Publications !== 'number') {
    //         console.log('Invalid Publications value:', profile.Publications);
    //     }
    // });

    //Card to sort projects
    const Cards1 = Profile.filter((profile) => {
        const projectCount = AuthorIDs.current[profile.Code].Projects;
        return projectCount > 0;
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
                                        <span><i>Publications</i>: <h6
                                            style={{ display: "inline" }}>{AuthorIDs.current[profile.Code].Publications}</h6></span>}
                                </div>
                                <div className={"Card-Text"}>
                                    {AuthorIDs.current[profile.Code].Projects === 0 || AuthorIDs.current[profile.Code].Projects === undefined ? "" : <span><i>Projects</i>: <strong
                                        style={{ display: "inline" }}>{AuthorIDs.current[profile.Code].Projects}</strong></span>}
                                </div>
                                <div className={"Card-Text"}>
                                    {AuthorIDs.current[profile.Code].IPs === 0 || AuthorIDs.current[profile.Code].IPs === undefined ? "" : <span><i>IPs</i>: <h6 style={{ display: "inline" }}>{AuthorIDs.current[profile.Code].IPs}</h6></span>}
                                </div>
                            </>
                        }
                    </div>
                </div>
            </>

        )
    })

    //card to sort publications
    const renderedCards2 = sortedCards2.map((profile, index) => {
            return (
                <>
                    <div className={"Card-Profile"}>
                        <div className={"Card-Header"}>
                            <div className={"Card-Image"}>
                                <img
                                    src={
                                        profile.Image_URL.trim() === ""
                                            ? process.env.PUBLIC_URL +
                                            "/Images/Profile Images/Profile_Vector.jpg"
                                            : "data:image/png;base64," + atob(profile.Image_URL)
                                    }
                                    alt={"Avatar"}
                                />
                            </div>
                            <div className={"Card-Button"}>
                                <Button
                                    variant={"outline-primary"}
                                    onClick={() => {
                                        handleProfile(profile.Code, profile.Name);
                                    }}
                                >
                                    Visit Profile
                                </Button>
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
                            {Parameter.option === "name" || Parameter.option === "school" ? (
                                ""
                            ) : (
                                <>
                                    <div className={"Card-Text"}>
                                        {console.log('Condition:', AuthorIDs.current[profile.Code].Publications === 0 || AuthorIDs.current[profile.Code].Publications === undefined)}
                                        {AuthorIDs.current[profile.Code].Publications === 0 ||
                                            AuthorIDs.current[profile.Code].Publications === undefined ? (
                                            ""
                                        ) : (
                                            <span>
                                                <i>Publications</i>:{" "}
                                                <h6
                                                    style={{ display: "inline" }}
                                                >
                                                    {AuthorIDs.current[profile.Code].Publications}
                                                </h6>
                                            </span>
                                        )}
                                    </div>
                                    <div className={"Card-Text"}>
                                        {AuthorIDs.current[profile.Code].Projects === 0 ||
                                            AuthorIDs.current[profile.Code].Projects === undefined ? (
                                            ""
                                        ) : (
                                            <span>
                                                <i>Projects</i>:{" "}
                                                <strong
                                                    style={{ display: "inline" }}
                                                >
                                                    {AuthorIDs.current[profile.Code].Projects}
                                                </strong>
                                            </span>
                                        )}
                                    </div>
                                    <div className={"Card-Text"}>
                                        {AuthorIDs.current[profile.Code].IPs === 0 ||
                                            AuthorIDs.current[profile.Code].IPs === undefined ? (
                                            ""
                                        ) : (
                                            <span>
                                                <i>IPs</i>:{" "}
                                                <h6 style={{ display: "inline" }}>
                                                    {AuthorIDs.current[profile.Code].IPs}
                                                </h6>
                                            </span>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </>
            );
        });


    //card to sort IPs
    const Cards3 = Profile.filter((profile) => {
        const ipCount = AuthorIDs.current[profile.Code].IPs;
        return ipCount > 0;
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
                        {Parameter.option === "name" || Parameter.option === "school" ? "" : <><div className={"Card-Text"}>
                            {AuthorIDs.current[profile.Code].Publications === 0 || AuthorIDs.current[profile.Code].Publications === undefined ? "" :
                                <span><i>Publications</i>: <h6
                                    style={{ display: "inline" }}>{AuthorIDs.current[profile.Code].Publications}</h6></span>}
                        </div>
                            <div className={"Card-Text"}>
                                {AuthorIDs.current[profile.Code].Projects === 0 || AuthorIDs.current[profile.Code].Projects === undefined ? "" : <span><i>Projects</i>: <strong
                                    style={{ display: "inline" }}>{AuthorIDs.current[profile.Code].Projects}</strong></span>}
                            </div>
                            <div className={"Card-Text"}>
                                {AuthorIDs.current[profile.Code].IPs === 0 || AuthorIDs.current[profile.Code].IPs === undefined ? "" : <span><i>IPs</i>: <h6 style={{ display: "inline" }}>{AuthorIDs.current[profile.Code].IPs}</h6></span>}
                            </div></>}
                    </div>
                </div>
            </>
        );
    });

    // Sort the Cards array in decreasing order if cards === "publications"
    const Cards = Profile.map((profile, index) => {
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
                        {Parameter.option === "name" || Parameter.option === "school" ? "" : <><div className={"Card-Text"}>
                            {AuthorIDs.current[profile.Code].Publications === 0 || AuthorIDs.current[profile.Code].Publications === undefined ? "" :
                                <span><i>Publications</i>: <h6
                                    style={{ display: "inline" }}>{AuthorIDs.current[profile.Code].Publications}</h6></span>}
                        </div>
                            <div className={"Card-Text"}>
                                {AuthorIDs.current[profile.Code].Projects === 0 || AuthorIDs.current[profile.Code].Projects === undefined ? "" : <span><i>Projects</i>: <strong
                                    style={{ display: "inline" }}>{AuthorIDs.current[profile.Code].Projects}</strong></span>}
                            </div>
                            <div className={"Card-Text"}>
                                {AuthorIDs.current[profile.Code].IPs === 0 || AuthorIDs.current[profile.Code].IPs === undefined ? "" : <span><i>IPs</i>: <h6 style={{ display: "inline" }}>{AuthorIDs.current[profile.Code].IPs}</h6></span>}
                            </div></>}
                    </div>
                </div>
            </>

        )
    })
    // const sortedCards = Cards.sort((a, b) => b.props.children[0].props.children[1].props.children.props.date - a.props.children[0].props.children[1].props.children.props.date);

    // If Research Area option is selected, only then show these tabs, otherwise don't show them
    return (
        <div className="middle-page">
            <SearchBar />
            {Parameter.option === "area_expertise" && (
                <div className="result-stats row">
                    {Experts !== 0 && (
                        <button className="col-md">
                            Experts: <h6>{Profile.length}</h6>
                        </button>
                    )}
                    {publications !== 0 && (
                        <button className="col-md" onClick={() => handleButtonClick(DisplayPublications)}>
                            Publications: <h6>{DisplayPublications.length}</h6>
                        </button>
                    )}
                    {projects !== 0 && (
                        <button className="col-md" onClick={() => handleButtonClick(DisplayProjects)}>
                            Projects: <h6>{DisplayProjects.length}</h6>
                        </button>
                    )}
                    {ips !== 0 && (
                        <button className="col-md" onClick={() => handleButtonClick(DisplayIPs)}>
                            Intellectual Property: <h6>{DisplayIPs.length}</h6>
                        </button>
                    )}

                </div>
            )}
            <div className="button-container">
                <button className={"dropdown-button"}>

                    {/*Dropdown to select search option*/}
                    <div className={"Searching"}>
                        {/* <Form.Select className={"option_selector"} name={"option"} onChange={handleOptionChange}> */}
                        <Form.Select className={""} name={"Sort"} onChange={handleSortingOptionChange}>
                            <option className={""} value={""}>
                                Sort By
                            </option>
                            <option className={""} value={"projects"}>
                                Sort by project
                            </option>
                            <option className={""} value={"publications"} >
                                Sort by publication
                            </option>
                            <option className={""} value={"IP"}>
                                Sort by IP
                            </option>
                        </Form.Select>
                    </div>
                </button>
            </div>

            {/*Modal*/}
            <CustomModal
                isModalOpen={isModalOpen}
                closeModal={closeModal}
                modalData={modalData}
                DisplayPublications={DisplayPublications}
                DisplayProjects={DisplayProjects}
                DisplayIPs={DisplayIPs}
            />
            {/*If the loading is true, then the loading animation is shown.*/}
            {loading ?
                <div className={"Loading_Div"}>
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
                </div>
                // Fetching data from server is complete, now if any error occurred then the error message is shown.
                // by changing the state of searchErrors to true.
                : !searchErrors ?
                    // In case no error occurred, then check if the response is empty or not.
                    // If the response is empty, then show the error message of no results found.
                    // Else show the results.
                    Profile.length === 0 ? <ErrorMessage Message={"No Results Found"} /> :
                        <div className={"Search-Results"}>
                            {cards === "projects" ? (
                                <>
                                    {Cards1} {/* Invoke the Cards1 function by adding parentheses */}
                                </>
                            ) : cards === "publications" ? (
                                <>
                                    {renderedCards2}
                                </>
                            ) : cards === "IP" ? (
                                <>
                                    {Cards3}
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

        </div >
    );
}

export default Middle_Page;