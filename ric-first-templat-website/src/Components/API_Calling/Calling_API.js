import React, { useState, useEffect } from "react";
import New_Profile from "../Profile/New_Profile";
import { useParams } from "react-router-dom";
import Placeholder from 'react-bootstrap/Placeholder';

const All_Publications = [];
const All_affiliations = [];
const Profile = [];
const Calling_API = () => {

    // Retrieve the URL parameters
    const params = useParams();

    // If the ID parameter is not defined, redirect to 404 page
    if (params.id === undefined) {
        window.location.href = "/404";
    }

    // If the length of the ID parameter is greater than 12, redirect to 404 page
    if (params.id.length > 12) {
        window.location.href = "/404";
    }

    // Initialize state variables using the useState hook
    const [Publications, setPublications] = useState([]);
    const [Projects, setProjects] = useState([]);
    const [Conferences, setConferences] = useState([]);
    const [Editorials, setEditorials] = useState([]);
    const [Trainings, setTrainings] = useState([]);
    const [Supervisions, setSupervisions] = useState([]);
    const [IPs, setIPs] = useState([]);
    const [downloadCV, setDownloadCV] = useState(false);
    const [apiCallNo, setApiCallNo] = useState(8);

    // Define functions to return default objects for different data types
    const getPublicationObject = () => {
        return {
            Title: "",
            Affiliation: "",
            Category: "",
            Journal_Title: "",
            Journal_Info: "",
            Indexation: "",
            DOI: "",
            All_Authors: "",
            Publication_year: "",
            Co_Authors_Affiliations: [],
            Citations: 0,
            IF: 0,
            Quartiles: ""
        };
    };

    const getProjectObject = () => {
        return {
            Title: "",
            Cost_in_PKR: 0,
            Funding_Source_Country: "",
            Funding_From_Agency: "",
            Funding_Agency: "",
            Approval_Date: "",
            Completion_Date: "",
            Project_Status: "",
            Sector: "",
            partners: []
        };
    };

    const getPartnersObject = () => {
        return {
            COPI: "",
            Partner_Name: ""
        };
    };

    const getSupervisionsObject = () => {
        return {
            Title: "",
            StudentName: "",
            School: "",
            Degree: "",
            Program: "",
            Date: ""
        };
    };

    const getIPObject = () => {
        return {
            Title: "",
            Type: "",
            Status: "",
            Schools: [],
            Inventors: [],
            Approval_Date: ""
        };
    };

    const getProfileObject = () => {
        return {
            Name: "",
            e_mail: "",
            School: "",
            Work_Position: "",
            Work_Phone: "",
            Qualifications: [],
            Awards: [],
            KeyNotes: [],
            Experience: [],
            Professional_Memberships_Registrations: [],
            Trainings_Attended: [],
            Image_URL: "",
            google_URl: "",
            Scopus_URL: "",
            WOS_URL: "",
            facebook_URL: "",
            twitter_URL: "",
            linkedin_URL: ""
        };
    };

    const getQualificationObject = () => {
        return {
            Degree: "",
            speciality: "",
            Institution: "",
            Country: "",
            Starting_Year: "",
            Ending_Year: ""
        };
    };

    const getAwardsObject = () => {
        return {
            Title: "",
            Location: "",
            Year: ""
        };
    };

    const getExperienceObject = () => {
        return {
            job_description: "",
            org_name: "",
            Year_From: "",
            Year_To: ""
        };
    };

    const getConferenceObject = () => {
        return {
            Title: "",
            Conference_Name: "",
            Year: "",
            Authors: [],
            DOI: "",
            Citations: 0
        };
    };

    const getEditorialObject = () => {
        return {
            Title: "",
            Impact_Factor: "",
            Reviewer_Type: ""
        }
    }
    const getTrainingsObject = () => {
        return {
            Name: "",
            Date_From: "",
            Date_To: "",
            Organization_Body: "",
        }
    }
    const getMembershipObject = () => {
        return {
            Name: "",
            Reg_No: "",
            Reg_Date: "",
            Valid_Until: "",
        }
    }
    const getTrainingConObject = () => {
        return {
            Name: "",
            Completions_Date: ""
        }
    }

    useEffect(() => {
        // --------------------------------------------------------------------------------------------------------------
        async function fetchPublications() {
            await fetch(`http://localhost:8000/api/Publications/${params.id}`,)
                .then((response) => response.json()).then(
                    (data) => {

                        for (let j = 0; j < data.length; j++) {
                            if (!All_Publications.hasOwnProperty(data[j]["type"])) {
                                All_Publications[data[j]["type"]] = [];
                            }
                            const Each_Publication_Data = getPublicationObject();
                            Each_Publication_Data['Title'] = data[j]["title"];
                            Each_Publication_Data['Affiliation'] = data[j]["affiliation"];
                            Each_Publication_Data['Category'] = data[j]["category"];
                            Each_Publication_Data['Indexation'] = data[j]["indexation"];
                            Each_Publication_Data['Journal_Title'] = data[j]["journal_title"];
                            Each_Publication_Data['Journal_Info'] = data[j]["journal_info"];
                            Each_Publication_Data['DOI'] = data[j]["doi_info"];
                            Each_Publication_Data['All_Authors'] = data[j]["all_author_compute"];
                            Each_Publication_Data['Publication_year'] = data[j]["publication_year_compute"];
                            Each_Publication_Data['Citations'] = data[j]["citation_count_scopus"];
                            Each_Publication_Data['IF'] = data[j]["impact_factor"];
                            Each_Publication_Data['Quartiles'] = data[j]["int_quartiles"];
                            const authors_affiliations = data[j]["author_ids"];
                            for (let i = 0; i < authors_affiliations.length; i++) {
                                if (authors_affiliations[i]["affiliation"] !== "nust" && All_affiliations.includes(authors_affiliations[i]["institute"].trim() + ", " + authors_affiliations[i]["country"].trim()) === false) {
                                    All_affiliations.push(authors_affiliations[i]["institute"].trim() + ", " + authors_affiliations[i]["country"].trim());
                                    Each_Publication_Data['Co_Authors_Affiliations'].push(authors_affiliations[i]["institute"].trim() + ", " + authors_affiliations[i]["country"].trim());
                                }
                            }
                            All_Publications[data[j]["type"]].push(Each_Publication_Data);
                        }
                    }
                );
        }
        fetchPublications().then(() => {
            setPublications(All_Publications);
            setApiCallNo(prevState => prevState - 1)
        });
        //--------------------------------------------------------------------------------------------------------------
        async function fetchProjects() {
            await fetch(`http://localhost:8000/api/Projects/${params.id}`)
                .then((response) => response.json()).then(
                    (data) => {

                        for (let j = 0; j < data.length; j++) {
                            if (data[j]["project_status"].includes("Submitted") || data[j]["project_type"].includes("Defense") || data[j]["project_status"].includes("Cancelled/Rejected")) {
                                continue;
                            }
                            let Each_Project_Data = getProjectObject();
                            Each_Project_Data['Title'] = data[j]["title"];
                            Each_Project_Data['Cost_in_PKR'] = data[j]["cost_in_pkr"];
                            Each_Project_Data['Funding_Source_Country'] = data[j]["funding_source_country"];
                            Each_Project_Data['Funding_Agency'] = data[j]["funding_agency"];
                            Each_Project_Data['Funding_From_Agency'] = data[j]["funding_from_agency"];
                            Each_Project_Data['Approval_Date'] = data[j]["approval_date"];
                            Each_Project_Data['Completion_Date'] = data[j]["completion_date"];
                            Each_Project_Data['Project_Status'] = data[j]["project_status"];
                            Each_Project_Data['Sector'] = data[j]["project_type"];
                            const authors = data[j]["copi_ids"];
                            for (let i = 0; i < authors.length; i++) {
                                const Partners = getPartnersObject();
                                Partners["Partner_Name"] = authors[i]["name"];
                                Partners["COPI"] = authors[i]["copi"];
                                Each_Project_Data["partners"].push(Partners);
                            }
                            setProjects(Projects => [...Projects, Each_Project_Data]);
                            // All_Projects.push(Each_Project_Data);
                        }
                    }
                );
        }
        fetchProjects().then(() => {
            setApiCallNo(prevState => prevState - 1)

        });
        //--------------------------------------------------------------------------------------------------------------
        async function fetchConferences() {
            await fetch(`http://localhost:8000/api/Conferences/${params.id}`)
                .then((response) => response.json()).then(
                    (data) => {

                        for (let j = 0; j < data.length; j++) {
                            const Each_Conference_Data = getConferenceObject();
                            Each_Conference_Data['Title'] = data[j]["title_of_paper"];
                            Each_Conference_Data['Conference_Name'] = data[j]["conference"];
                            Each_Conference_Data['Year'] = data[j]["publication_year_compute"];
                            Each_Conference_Data['Citations'] = data[j]["citation_count_scopus"];
                            let authors = data[j]["author_ids"];
                            for (let i = 0; i < authors.length; i++) {
                                Each_Conference_Data['Authors'].push(authors[i]["name"]);
                            }
                            Each_Conference_Data['DOI'] = data[j]["doi_info"];
                            setConferences((prev) => [...prev, Each_Conference_Data]);
                            // All_Conferences.push(Each_Conference_Data);
                        }
                    }
                );
        }
        fetchConferences().then(() => {
            setApiCallNo(prevState => prevState - 1)
        });
        //--------------------------------------------------------------------------------------------------------------
        async function fetchSupervision() {
            await fetch(`http://localhost:8000/api/supervision/${params.id}`)
                .then((response) => response.json()).then(
                    (data) => {

                        for (let j = 0; j < data.length; j++) {
                            if(data?.supervisor_ids?.ssr_rs_super_type === "GEC"){
                                continue;
                            }
                            const supervision = getSupervisionsObject();
                            supervision["Title"] = data[j]["thesis_title"];
                            supervision["StudentName"] = data[j]["student_id"].split("-")[1].trim();
                            supervision["School"] = data[j]["student_institute"];
                            supervision["Degree"] = data[j]["student_acad_career"];
                            supervision["Program"] = data[j]["student_acad_program"];
                            supervision["Date"] = data[j]["effdt"];
                            setSupervisions((prev) => [...prev, supervision]);
                            // All_Supervisions.push(supervision);
                        }
                    }
                );
        }
        fetchSupervision().then(() => {
            setApiCallNo(prevState => prevState - 1)
        });
        //--------------------------------------------------------------------------------------------------------------
        async function fetchTrainings() {
            await fetch(`http://localhost:8000/api/trainings/${params.id}`)
                .then((response) => response.json()).then(
                    (data) => {

                        for (let j = 0; j < data.length; j++) {
                            const training = getTrainingConObject();
                            training["Name"] = data[j]["title"];
                            training["Completions_Date"] = data[j]["completion_date"];
                            setTrainings((prev) =>
                                [
                                    ...prev,
                                    training
                                ]
                            );
                        }
                    }
                );
        }
        fetchTrainings().then(() => {
            setApiCallNo(prevState => prevState - 1)
        });
        //--------------------------------------------------------------------------------------------------------------
        async function fetchEditorials() {
            await fetch(`http://localhost:8000/api/Editorials/${params.id}`)
                .then((response) => response.json()).then(
                    (data) => {
                        for (let j = 0; j < data.length; j++) {
                            const Editorial = getEditorialObject();
                            Editorial["Title"] = data[j]["title"];
                            Editorial["Impact_Factor"] = data[j]["impact_factor"];
                            Editorial["Reviewer_Type"] = data[j]["editor_reviewer_type"];
                            setEditorials((prev) => [...prev, Editorial]);
                            // All_Editorials.push(Editorial);
                        }
                    }
                );
        }
        fetchEditorials().then(() => {
            setApiCallNo(prevState => prevState - 1)
            // setSupervisions(All_Supervisions.length);
        });
        //--------------------------------------------------------------------------------------------------------------
        async function fetchIP() {
            await fetch(`http://localhost:8000/api/IP/${params.id}`)
                .then((response) => response.json()).then(
                    (data) => {

                        for (let j = 0; j < data.length; j++) {
                            const IP = getIPObject();
                            IP["Title"] = data[j]["title"];
                            IP["Type"] = data[j]["ip_type"];
                            IP["Status"] = data[j]["ip_status"][0].name;
                            for (let i = 0; i < data[j]["inventor_ids"].length; i++) {
                                IP["Inventors"].push(data[j]["inventor_ids"][i]["co_author_faculty_staff_id"].split(" - ")[0].trim());
                            }
                            for (let i = 0; i < data[j]["school"].length; i++) {
                                IP["Schools"].push(data[j]["school"][i].name);
                            }
                            IP["Approval_Date"] = data[j]["approval_date"];
                            setIPs((prev) => [...prev, IP]);
                        }
                    }
                );
        }
        fetchIP().then(() => {
            setApiCallNo(prevState => prevState - 1)
            // setSupervisions(All_Supervisions.length);
        });
        //--------------------------------------------------------------------------------------------------------------
        async function fetchProfile() {
            await fetch(`http://localhost:8000/api/Profile/${params.id}`,)
                .then((response) => response.json()).then(
                    (data) => {
                        for (let j = 0; j < data.length; j++) {
                            const profile = getProfileObject();
                            profile["Name"] = data[j]["name"];
                            profile["e_mail"] = data[j]["work_email"];
                            profile["School"] = data[j]["institute"];
                            profile["Image_URL"] = data[j]["image_128"];
                            profile["google_URl"] = data[j]["google_fms"];
                            profile["Scopus_URL"] = "";
                            profile["WOS_URL"] = "";
                            profile["Work_Phone"] = data[j]["landline_office"];
                            profile["facebook_URL"] = data[j]["facebook_fms"];
                            profile["twitter_URL"] = data[j]["twitter_fms"];
                            profile["linkedin_URL"] = data[j]["linkedin_fms"];
                            profile["Work_Position"] = data[j]["designation"].trim()
                                .replace("TVF", "Teaching Visiting Faculty")
                                .replace("Prof", "Professor")
                                .replace("TVF", "Teaching Visiting Faculty")
                                .replace("Assoc", "Associate")
                                .replace("Asst", "Assistant")
                                .replace("Lec", "Lecturer")
                                .replace("LAB ENGR", "Lab Engineer")
                                .replace("Fac", "Faculty")
                                .replace("RVF", "Research Visiting Faculty");
                            let qualifications = data[j]["fms_academic_ids"];
                            for (let i = 0; i < qualifications.length; i++) {
                                const Qualification = getQualificationObject();
                                Qualification["Degree"] = qualifications[i]["fms_acad_qualification"];
                                Qualification["speciality"] = qualifications[i]["fms_acad_special"];
                                Qualification["Institution"] = qualifications[i]["fms_acad_uni"];
                                Qualification["Country"] = qualifications[i]["fms_acad_country"];
                                Qualification["Starting_Year"] = qualifications[i]["fms_acad_dur_from"].split("-")[0];
                                Qualification["Ending_Year"] = qualifications[i]["fms_acad_dur_to"].split("-")[0];
                                profile["Qualifications"].push(Qualification);
                            }
                            for (let i = 0; i < data[j]["award_ids"].length; i++) {
                                const Award = getAwardsObject();
                                Award["Title"] = data[j]["award_ids"][i]["description"];
                                Award["Location"] = data[j]["award_ids"][i]["name"];
                                Award["Year"] = data[j]["award_ids"][i]["date"].split("-")[0];
                                if (data[j]["award_ids"][i]["name"].replace(":", "").replace("-", "").trim() === "Keynote Speaker" || data[j]["award_ids"][i]["name"].replace(":", "").replace("-", "").trim() === "Invited Speaker") {
                                    profile["KeyNotes"].push(Award);
                                }
                                else {
                                    profile["Awards"].push(Award);
                                }
                            }
                            for (let i = 0; i < data[j]["experience_ids"].length; i++) {
                                // if(data[j]["experience_ids"][i]["miltray"] === "yes"){continue}
                                const Experience = getExperienceObject();
                                Experience["job_description"] = data[j]["experience_ids"][i]["designation"].trim()
                                    .replace("Prof", "Professor")
                                    .replace("TVF", "Teaching Visiting Faculty")
                                    .replace("Assoc", "Associate")
                                    .replace("Asst", "Assistant")
                                    .replace("Lec", "Lecturer")
                                    .replace("LAB ENGR", "Lab Engineer")
                                    .replace("Fac", "Faculty");
                                Experience["org_name"] = data[j]["experience_ids"][i]["org_name"] + ",     " + data[j]["experience_ids"][i]["org_address"];
                                Experience["Year_From"] = data[j]["experience_ids"][i]["date_from"].split("-")[0];
                                Experience["Year_To"] = data[j]["experience_ids"][i]["date_to"].split("-")[0];
                                profile["Experience"].push(Experience);
                            }
                            for (let i = 0; i < data[j]["training_ids"].length; i++) {
                                const training = getTrainingsObject();
                                training["Name"] = data[j]["training_ids"][i]["name"].trim();
                                training["Date_From"] = data[j]["training_ids"][i]["date_from"].trim();
                                training["Date_To"] = data[j]["training_ids"][i]["date_to"].trim();
                                training["Organization_Body"] = data[j]["training_ids"][i]["org_body"].trim();
                                profile["Trainings_Attended"].push(training);
                            }
                            for (let i = 0; i < data[j]["profqualification_ids"].length; i++) {
                                const training = getTrainingsObject();
                                training["Name"] = data[j]["profqualification_ids"][i]["fms_profqualification_cert"].trim();
                                training["Date_From"] = data[j]["profqualification_ids"][i]["fms_profqualification_dt_from"].trim();
                                training["Date_To"] = data[j]["profqualification_ids"][i]["fms_profqualification_dt_to"].trim();
                                training["Organization_Body"] = data[j]["profqualification_ids"][i]["fms_profqualification_inst"].trim();
                                profile["Trainings_Attended"].push(training);
                            }
                            for (let i = 0; i < data[j]["fms_prof_reg_ids"].length; i++) {
                                const membershipObject = getMembershipObject();
                                membershipObject["Name"] = data[j]["fms_prof_reg_ids"][i]["reg_body"].trim();
                                membershipObject["Reg_Date"] = data[j]["fms_prof_reg_ids"][i]["reg_date"].trim();
                                membershipObject["Reg_No"] = data[j]["fms_prof_reg_ids"][i]["reg_no"].trim();
                                membershipObject["Valid_Until"] = data[j]["fms_prof_reg_ids"][i]["reg_validity"].trim();
                                profile["Professional_Memberships_Registrations"].push(membershipObject);
                            }

                            Profile.push(profile);
                        }
                    }
                );
        }
        fetchProfile().then(() => {
            // setConferences(All_Conferences.length);
            setApiCallNo(prevState => prevState - 1)
        });
    }, []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (apiCallNo === 0) {
            setDownloadCV(true);
        }
    },
        [apiCallNo]);
    //--------------------------------------------------------------------------------------------------------------
    return (
        <>
            {
                Profile.length === 0 ?
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
                        {/*<Placeholder className="w-75" />*/}
                    </div> :
                    <New_Profile
                        publications={Publications}
                        projects={Projects}
                        conferences={Conferences}
                        supervisions={Supervisions}
                        editorials={Editorials}
                        trainings={Trainings}
                        ips={IPs}
                        profile={Profile}
                        enable={downloadCV}
                    />
            }
        </>
    )
}
export default Calling_API