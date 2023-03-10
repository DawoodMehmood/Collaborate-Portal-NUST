import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './CSS/Profile/card.css';
import './CSS/Profile/New_Profile.css';
import './CSS/Profile/Profile_Slider.css';
import './CSS/Common/Header.css';
import './CSS/Chart/chart.css';
import './CSS/Middle_Page/Middle_Page.css';
import './CSS/Profile/Profile_Tabs.css';
import './CSS/Temp/temp.css';
import './CSS/ContactUs/AddressDiv.css';
import './CSS/ContactUs/contactus.css';
import './CSS/Home/Slider.css';
import './CSS/NotFoundFiles/NotFound.css';
import Header from "./Components/Common/Header";
import Footer from "./Components/Common/Footer";
import Calling_API from "./Components/API_Calling/Calling_API";
import Middle_Page from "./Components/Middle_Pages/Middle_Page";
import ContactUs from "./Components/ContactUs/ContactUs";
import Slider from "./Components/Home/Slider";
import SearchBar from "./Components/Home/SearchBar";
import Themes from "./Components/Home/Themes";
import PageNotFound from "./Components/NotFoundFiles/PageNotFound";
import QualitiesPortion_Home from "./Components/Home/QualitiesPortion_Home";
import {Routes, Route} from "react-router-dom";
function App() {

  return (
      <>
          <Header />
            <Routes>
                  <Route exact path={"/"} element={
                      <>
                          <Slider />
                          <SearchBar />
                          <Themes />
                          <QualitiesPortion_Home />
                      </>
                  } />
                <Route path={"/find/:option/:search"} element={
                    <>
                        <Middle_Page />
                    </>
                } />
                <Route path={"/search/:option/:search/:school"} element={
                    <>
                        <Middle_Page />
                    </>
                } />
                <Route path={"/profile/:name/:id"} element={
                    <>
                        <Calling_API />
                    </>
                } />
                <Route path={"/contact"} element={
                    <>
                        <ContactUs />
                    </>
                } />

                <Route path={"*"} element={
                <PageNotFound />
                } />
            </Routes>
          <Footer />
      </>
  );
}

export default App;
