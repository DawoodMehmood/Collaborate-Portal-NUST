import React, { useState, useEffect } from "react";
import "../../CSS/Home/SearchBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Button } from "react-bootstrap";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  // useNavigate hook from react-router-dom library
  const navigation = useNavigate();

  // State variables using useState hook
  const [search, setSearch] = useState({
    option: "select", // Default value of search option
    search: "", // Default value of search text
    schoolOption: "select", // Default value of school option
    chatbotOption: 'select',
    thing: 'select',
    chatbotSearch:''
  });

  const [showSchool, setShowSchool] = useState(false); // Default value of showSchool flag
  const [showSDG, setShowSDG] = useState(false); // Default value of showSDG flag
  const [showThings, setShowThings] = useState(false); // Default value of things flag
  const [showChatbotOptions, setShowChatbotOptions] = useState(false); // Default value of chatbot options flag
  const [placeholderValue, setPlaceholderValue] = useState("Keyword"); // Placeholder value for the search input
  const [disableSearch, setdisableSearch] = useState(false); // Placeholder value for the search input
  const [displayChatbotSearch, setDisplayChatbotSearch] = useState(false); // Placeholder value for the search input

  // Function to handle search option change
  async function handleOptionChange(e) {
    setdisableSearch(false); // Hide school selector for other options
    setDisplayChatbotSearch(false);
    const selectedOption = e.target.value;
    if (e.target.value === "school") {
      setShowSchool(true); // Show school selector if school option is selected
      setShowSDG(false); // Hide school selector for other options
      setShowChatbotOptions(false);
      setShowThings(false);
    } else if (e.target.value === "sdg") {
      setShowSDG(true); // Show school selector if school option is selected
      setShowSchool(false); // Hide school selector for other options
      setShowChatbotOptions(false);
      setShowThings(false);
    } else if (e.target.value === "chatbot") {
      setdisableSearch(true);
      setShowSDG(false);
      setShowSchool(false);
      setShowChatbotOptions(true);
      setShowThings(true);
    } else {
      setShowSchool(false); // Hide school selector for other options
      setShowSDG(false); // Hide school selector for other options
      setShowChatbotOptions(false);
      setShowThings(false);
    }

    let placeholder = "Keyword";
    if (selectedOption === "name") {
      placeholder = "Enter faculty name";
    } else if (selectedOption === "school") {
      placeholder = "Enter faculty name (optional)";
    } else if (selectedOption === "chatbot") {
      placeholder = "Enter name";
    } else if (selectedOption === "area_expertise") {
      placeholder = "Keyword(s)";
    } else if (selectedOption === "outside") {
      placeholder = "Enter University Name";
    } else if (selectedOption === "sdg") {
      placeholder = "";
      setdisableSearch(true);
    }

    await setSearch({
      ...search,
      option: e.target.value,
      schoolOption: "select", // Reset school option to default
      search: "", // Reset the search text when the option changes
      thing: 'select',
      chatbotOption: 'select'
    });
    setPlaceholderValue(placeholder);
  }

  // Function to handle school option change
  async function handleSchoolOptionChange(e) {
    setDisplayChatbotSearch(false);

    await setSearch({
      ...search,
      schoolOption: e.target.value,
    });
  }

  // Function to handle thing option change
  async function handleThingsOptionChange(e) {
    setDisplayChatbotSearch(false);

    await setSearch({
      ...search,
      thing: e.target.value
    });
  }

  // Function to handle chatbot option change
  async function handleChatbotOptionChange(e) {
    const selectedChatbotOption = e.target.value;
    setDisplayChatbotSearch(false);

    if (e.target.value === "School") {
      setShowSchool(true); // Show school selector if school option is selected
    } else if(e.target.value === "University"){
      setShowSchool(false);
    }

    let placeholder = "Enter value";
    if (selectedChatbotOption === "School") {
      placeholder = "Press Enter";
      setdisableSearch(true);
    } else if (selectedChatbotOption === "University") {
      placeholder = "Enter university name in collaboration with NUST";
      setdisableSearch(false);
    } else if(selectedChatbotOption === "select"){
      setdisableSearch(true);
    }

    setPlaceholderValue(placeholder);
    await setSearch({
      ...search,
      search: '',
      // thing: 'select',
      chatbotOption: e.target.value,
    });
  }

  // Function to handle search text change
  async function handleSearchChange(e) {
    // if (e.target.value.split(" ").length > 4) {
    //     e.target.value = e.target.value.split(" ").slice(0, 4).join(" ");
    // }
    // if (e.target.value.length > 50) {
    //     e.target.value = e.target.value.slice(0, 50);
    // }
    await setSearch({
      ...search,
      search: e.target.value,
    });
  }

  // Function to handle search text change
  async function handleChatbotSearchChange(e) {
    // if (e.target.value.split(" ").length > 4) {
    //     e.target.value = e.target.value.split(" ").slice(0, 4).join(" ");
    // }
    // if (e.target.value.length > 50) {
    //     e.target.value = e.target.value.slice(0, 50);
    // }
    await setSearch({
      ...search,
      chatbotSearch: e.target.value,
    });
  }

  // Function to handle search form submission
  function handleSubmit(e) {
    e.preventDefault();
    if (search.option === "select") {
      navigation(`/find/area_expertise/${search.search}`);
      // navigation(`/find/${search.option}/${search.search}`);
      window.location.reload();
    } else if (search.option === "school") {
      if (search.schoolOption === "select") {
        return "";
      }
      if (search.search.trim() === "") {
        // Navigate to search results page with selected search option and school option
        navigation(`/search/${search.option}/Faculty/${search.schoolOption}`);
        window.location.reload();
      } else {
        // Navigate to search results page with selected search option, search text, and school option
        navigation(
          `/search/${search.option}/${search.search}/${search.schoolOption}`
        );
        window.location.reload();
      }
    } else if (search.option === "sdg") {
      if (search.schoolOption === "select") {
        return "";
      }
      // Navigate to search results page with selected search option and school option
      navigation(`/search/${search.option}/Result/${search.schoolOption}`);
      window.location.reload();
    } else if (search.option === "outside") {
      navigation(`/find/outside/${search.search}`);
      window.location.reload();
    } else if (search.option === "chatbot") {
      if(search.chatbotOption === 'select' || search.thing === 'select'){
        return '';
      } 
      if(search.chatbotOption === 'School'){
        if (search.schoolOption === "select" || search.thing === 'select') {
          return "";
        }
      } 
      if(search.chatbotOption === 'University'){
        if (search.thing === 'select') {
          return "";
        }
      }
      setDisplayChatbotSearch(true);
      
    } else if (search.search === "") {
      return "";
    } else {
      setShowSchool(false);
      // Navigate to find results page with selected search option and search text
      navigation(`/find/${search.option}/${search.search}`);
      window.location.reload();
    }
  }

  // Function to handle search form submission
  function handlechatbotSubmit(e) {
    console.log("searching", search.option);
    e.preventDefault();
    if(search.chatbotOption === 'University'){
      navigation(`/find/${search.option}/${search.chatbotOption}/${search.search}/${search.thing}/${search.chatbotSearch}`);
      window.location.reload();
    } else if(search.chatbotOption === 'School'){
      navigation(`/find/${search.option}/${search.chatbotOption}/${search.schoolOption}/${search.thing}/${search.chatbotSearch}`);
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
    "School of Health Sciences (NSHS)",
    "National Institute of Transportation (NIT-SCEE)",
    "National Institute of Transportation (NIT-Risalpur)",
    "School of Interdisciplinary Engineering & Sciences (SINES)",
  ]
    .sort()
    .map((school, index) => {
      return (
        <option
          className={"option"}
          value={school.split("(")[1].slice(0, -1)}
          key={index}
        >
          {school}
        </option>
      );
    });


    const chatbotOption = ["Affiliated University", "NUST School"]
    .sort()
    .map((chatbotOption, index) => {
      return (
        <option className={"option"} value={chatbotOption.split(" ")[1]} key={index}>
          {chatbotOption}
        </option>
      );
    });


  const things = (search.chatbotOption === 'University' ? ["Projects"] : ["Publications", "Projects", "IP"])
  .sort()
  .map((thing, index) => {
    return (
      <option className={"option"} value={thing} key={index}>
        {thing}
      </option>
    );
  });

  const sdgNames = [
    "No poverty",
    "Zero Hunger",
    "Good Health and Well-being",
    "Quality Education",
    "Gender Equality",
    "Clean Water and Sanitation",
    "Affordable and Clean Energy",
    "Decent Work and Economic Growth",
    "Industry, Innovation and Infrastructure",
    "Reduced Inequality",
    "Sustainable cities and Communities",
    "Responsible Consumption and Production",
    "Climate Action",
    "Life Below Water",
    "Life on Land",
    "Peace and Justice Strong Institutions",
    "Partnerships to achieve the Goal",
  ]
    .sort()
    .map((sdgNames, index) => {
      return (
        <option className={"option"} value={sdgNames} key={index}>
          {index + 1}-{sdgNames}
        </option>
      );
    });

  return (
    <>
        <div className={"SearchBar"}>
      {/*Form to handle search query*/}
      <Form className={"Form"} onSubmit={handleSubmit}>
        {/*Dropdown to select search option*/}
        <div className={"Searching"}>
          <Form.Select
            className={"option_selector"}
            name={"option"}
            onChange={handleOptionChange}
          >
            <option className={"options"} defaultValue={"select"}>
              Search By
            </option>
            <option className={"option"} value={"name"}>
              Name
            </option>
            <option className={"option"} value={"area_expertise"}>
              Research Area
            </option>
            <option className={"option"} value={"school"}>
              School
            </option>
            <option className={"option"} value={"outside"}>
              Outside Nust
            </option>
            <option className={"option"} value={"sdg"}>
              SDG
            </option>
            <option className={"option"} value={"chatbot"}>
              Chatbot
            </option>
          </Form.Select>


          {showChatbotOptions ? (
            <Form.Select
              className={"option_selector school_selector"}
              name={"chatbot_option"}
              onChange={handleChatbotOptionChange}
            >
              <option
                className={"options"}
                defaultValue={'select'}
                value={'select'}
              >
                Select
              </option>
              {chatbotOption}
            </Form.Select>
          ) : (
            ""
          )}

          {/*Dropdown to select school*/}
          {showSchool ? (
            <Form.Select
              className={"option_selector school_selector"}
              name={"school_option"}
              onChange={handleSchoolOptionChange}
            >
              <option
                className={"options"}
                defaultValue={"select"}
                value={"select"}
              >
                Select School
              </option>
              {schoolNames}
            </Form.Select>
          ) : (
            ""
          )}

          {showThings ? (
            <Form.Select
              className={"option_selector school_selector"}
              name={"things_option"}
              onChange={handleThingsOptionChange}
            >
              <option
                className={"options"}
                defaultValue={'select'}
                value={'select'}
              >
                Select
              </option>
              {things}
            </Form.Select>
          ) : (
            ""
          )}

          {/*Dropdown to select by SDG*/}
          {showSDG ? (
            <Form.Select
              className={"option_selector school_selector"}
              name={"sdg_option"}
              onChange={handleSchoolOptionChange}
            >
              <option
                className={"options"}
                defaultValue={"select"}
                value={"select"}
              >
                Select Sdg
              </option>
              {sdgNames}
            </Form.Select>
          ) : (
            ""
          )}

          {/*Input field to enter search keyword*/}
          {disableSearch ? (
            <Form.Control
              className={"search"}
              type="text"
              placeholder={placeholderValue}
              onChange={handleSearchChange}
              value={search.search}
              disabled
            />
          ) : (
            <Form.Control
              className={"search"}
              type="text"
              placeholder={placeholderValue}
              onChange={handleSearchChange}
              value={search.search}
              required={search.option === 'chatbot'}
            />
          )}
        </div>
        {/*Button to submit search query*/}
        <div className={"searchButtonDiv"}>
          <Button type={"submit"} className={"search-button"}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </Button>
        </div>
      </Form>
    </div>

    {displayChatbotSearch ? (
      <>
      {/* chatbot search bar */}
    <div className={"SearchBar"}>
    {/*Form to handle search query*/}
    <Form className={"Form"} onSubmit={handlechatbotSubmit}>
      {/*Dropdown to select search option*/}
      <div className={"Searching"}>
        {/*Input field to enter chatbot search question*/}
          <Form.Control
            className={"search"}
            type="text"
            placeholder='Enter your question'
            onChange={handleChatbotSearchChange}
            value={search.chatbotSearch}
            required={search.option === 'chatbot'}
          />
      </div>
      {/*Button to submit search query*/}
      <div className={"searchButtonDiv"}>
        <Button type={"submit"} className={"search-button"}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </Button>
      </div>
    </Form>
  </div></>
    ):(<></>)}
  </>

  );
};

export default SearchBar;
