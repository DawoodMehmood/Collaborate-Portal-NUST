import React, {useEffect, useState} from "react";
import "../../CSS/Home/SearchBar.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Form, Button} from "react-bootstrap";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import "aos/dist/aos.css";
import Aos from "aos";
import {useNavigate} from "react-router-dom";


const SearchBar = ()=>{
    // useNavigate hook from react-router-dom library
    const navigation = useNavigate();

// State variables using useState hook
    const [search, setSearch] = useState({
        option: "select", // Default value of search option
        search: "", // Default value of search text
        schoolOption:"select" // Default value of school option
    });

    const [showSchool, setShowSchool] = useState(false) // Default value of showSchool flag

// Function to handle search option change
    async function handleOptionChange(e){
        if (e.target.value === "school") {
            setShowSchool(true) // Show school selector if school option is selected
        } else {
            setShowSchool(false) // Hide school selector for other options
        }
        await setSearch({
            ...search,
            option: e.target.value,
            schoolOption: "select" // Reset school option to default
        })
    }

// Function to handle school option change
    async function handleSchoolOptionChange(e){
        await setSearch({
            ...search,
            schoolOption: e.target.value
        })
    }

// Function to handle search text change
    async function handleSearchChange(e){
        if(e.target.value.split(" ").length > 4){
            e.target.value = e.target.value.split(" ").slice(0,4).join(" ");
        }
        if (e.target.value.length > 50){
            e.target.value = e.target.value.slice(0,50);
        }
        await setSearch({
            ...search,
            search: e.target.value
        })
    }

// Function to handle search form submission
    function handleSubmit(e){
        e.preventDefault();
        if(search.option === "select"){
            return "";
        }
        else if (search.option === "school"){
            if(search.schoolOption === "select"){
                return "";
            }
            if(search.search.trim() === ''){
                // Navigate to search results page with selected search option and school option
                navigation(`/search/${search.option}/Faculty/${search.schoolOption}`);
                window.location.reload();
            }
            else{
                // Navigate to search results page with selected search option, search text, and school option
                navigation(`/search/${search.option}/${search.search}/${search.schoolOption}`);
                window.location.reload();
            }
        }
        else if(search.search === ""){
            return "";
        }
        else{
            setShowSchool(false)
            // Navigate to find results page with selected search option and search text
            navigation(`/find/${search.option}/${search.search}`);
            window.location.reload();
        }
    }


    const schoolNames = [
        "School of Electrical Engineering and Computer Science (SEECS)",
        "School of Mechanical & Manufacturing Engineering (SMME)",
        "Atta-Ur-Rahman School of Applied Biosciences (ASAB)",
        "Centre For International Peace & Stability (CIPS)",
        "NUST Business School (NBS)",
        "Research Centre for Modelling & Simulation (RCMS)",
        "Research Institute For Microwave And Millimeter-Wave Studies (RIMMS)",
        "School of Art, Design And Architecture (SADA)",
        "School of Chemical & Materials Engineering (SCME)",
        "School of Civil & Environmental Engineering (SCEE)",
        "Institute of Geographical Information Systems (SCEE-IGIS)",
        "Institute of Environmental Sciences & Engineering (SCEE-IESE)",
        "NUST Institute of Civil Engineering (SCEE-NICE)",
        "NUST Institute of Civil Engineering (SCEE-NICE PG)",
        "School of Natural Sciences (SNS)",
        "School of Social Sciences & Humanities (S3H)",
        "U.S.-PAKISTAN Center For Advanced Studies In Energy (USPCASE)",
        "College of Aeronautical Engineering (CAE)",
        "College of Electrical & Mechanical Engineering (CEME)",
        "Military College of Engineering (MCE)",
        "Military College of Signals (MCS)",
        "Pakistan Navy Engineering College (PNEC)",
        "NUST Balochistan Campus (NBC-Quetta)",
        "University Main Office (UMO)",
        "Centre for Counseling and Career Advisory (C3A)",
        "Centre for Energy Systems (CES)",
        "NUST Institute of Peace and Conflict Studies (NIPCONS)",
        "NUST School of Health Sciences (NSHS)",
        "National Institute of Transportation (NIT-SCEE)",
        "National Institute of Transportation (NIT-Risalpur)",
        "School of Interdisciplinary Engineering & Sciences (SINES)"
    ].sort().map((school,index)=>{
        return (

            <option className={"option"} value={school.split("(")[1].slice(0,-1)} key={index}>
                {school}
            </option>
        )
    });

    return(
        <div className={"SearchBar"}>
            {/*Form to handle search query*/}
            <Form className={"Form"} onSubmit={handleSubmit}>
                {/*Dropdown to select search option*/}
                <div className={"Searching"}>
                    <Form.Select className={"option_selector"} name={"option"} onChange={handleOptionChange}>
                        <option className={"options"} defaultValue={"select"}>
                            Search By
                        </option>
                        <option className={"option"} value={"name"}>
                            Name
                        </option>
                        <option  className={"option"} value={"area_expertise"} >
                            Research Area
                        </option>
                        <option className={"option"} value={"school"}>
                            School
                        </option>
                    </Form.Select>

                    {/*Dropdown to select school*/}
                    {!showSchool ? "" :
                        <Form.Select className={"option_selector school_selector"} name={"school_option"} onChange={handleSchoolOptionChange}>
                            <option className={"options"} defaultValue={"select"} value={"select"}>
                                Select School
                            </option>
                            {schoolNames}
                        </Form.Select>}

                    {/*Input field to enter search keyword*/}
                    <Form.Control className={"search"} type="text" placeholder={showSchool?"Enter Faculty Name (Optional)":"Search Here"} onChange={handleSearchChange} value={search.search} />
                </div>
                {/*Button to submit search query*/}
                <div className={"searchButtonDiv"}>
                    <Button type={"submit"} className={"search-button"}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </Button>
                </div>
            </Form>
        </div>    )
}

export default SearchBar