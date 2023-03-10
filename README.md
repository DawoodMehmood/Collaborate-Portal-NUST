# NUST Collaboration Portal
##### RESEARCH, INNOVATION & COMMERCIALIZATION (RIC) CENTER, NUST

## Introduction
NUST Faculty Dashboard for Industrial & Academic View is a collaborative website designed for the interaction between NUST's faculty members and industry professionals. It offers comprehensive information on faculty members specializing in various areas taught at NUST, making it easier for industry and academic communities to connect with them.

## Objectives
*	To create a user-friendly online portal that allows industry and academic professionals to collaborate with NUST faculty.
*	To provide comprehensive information about faculty members, including their areas of expertise, research projects, publications, and intellectual property.
*	To facilitate communication and information sharing between faculty members, industry professionals, and academic researchers.
*	To enable industry professionals and academic researchers to connect with faculty members for potential collaborations and partnerships.
*	To provide a platform for faculty members to showcase their work and achievements to potential collaborators and stakeholders.
*	To increase visibility and recognition of NUST faculty members and their work.
*	To enhance the reputation of NUST as a leading academic institution in Pakistan by promoting its faculty members and their research.
*	To streamline the process of connecting with NUST faculty members for industry professionals and academic researchers.
*	To provide a platform for faculty members to collaborate with other academics and researchers from different disciplines within NUST.
*	To enable faculty members to keep track of their research projects and publications, and to facilitate the dissemination of their research outputs. 


## Technology Stack

### React
In this project, React was used for the front-end development, allowing for the creation of a dynamic and interactive user interface. React allows for the creation of reusable components that can be easily integrated into the application, speeding up the development process and improving code maintainability.

### Laravel
Laravel was used for the back-end development in this project, enabling the creation of a RESTful API that communicates with the front-end.

### jsPDF
jsPDF is a JavaScript library that allows for the creation of PDF documents from HTML and SVG elements. It was used in this project to generate CVs for faculty members. jsPDF provides a simple and intuitive API that allows for the creation of custom PDF templates, making it a versatile tool for generating various types of reports.

### React Slick
React Slick is a popular carousel library for React applications. It allows for the creation of responsive and customizable carousels that can be easily integrated into the application. In this project, React Slick was used to create a carousel for displaying publications and projects related to a particular faculty member.

### Chart.js
Chart.js is a popular JavaScript library used for creating interactive and customizable charts and graphs. It provides a wide range of chart types, including bar charts, line charts, and pie charts, as well as advanced features such as animations, tooltips, and legends. Chart.js was used in this project to create various charts and graphs to visualize data related to publications and projects of faculty members.

## Structure of Application
###### Note: Project contains duplicate and un-optimized code, which is intended to be improved in “BETA” version of this project

### Front-End
Front-End is built with React,js as mentioned earlier. Two folders “public” and “src”, contains all the needed code and assets used for building the front-end of this application.
#### Public Folder Structure
Public folder has only one child folder which is named as “Images.” This images folder contains image files and other folders which contains images showed on specific components.
1. Image Files
      These Images are the images of faculty members, showed on Second Slide of Slider. Heading of that slide is: Collaborate with Top Highly Cited NUST Individuals
2. Icons
      This folder contains “NUST” icon which is displayed on Header and Footer of website.
3. Profile Images
      Contain “Profile Vector”, which is used when profile image of faculty is empty.
4. Qualities_Home_Images
      This folder contains images which are displayed on Home Page after NUST Theme Images.  Heading of these images on website are:
      *	Quality Publications
      *	High Valued Research Grants
      *	Patents & Intellectual Property
5. Themes
      This folder contains images for “NUST Research Themes.”. All 6 images are stored in this folder.
6. industry-collaborators
      This folder contains images which are shoed on last slide of slider, under the heading of “Industrial Partners for Research & Development.”
7. Research
      This is optional folder images in this folder are removed from the website. If asked this folder contains images for last slider, which showed Research Labs of NUST.
      SRC Folder Structure
8. Background-Image
      This folder contains the image which was previously used as background image of slider. It is removed for now, if required will be added/used later.
9. Background-Video
      This folder contains the video which is playing in the background of Slider. This video can be changed later because it is of very large size.
10. Components
       This folder contains all the components on which this website is based on. Its sub-folder includes:
       *	 ##### API_Calling
       This folder contains ‘Calling_API.js’ file which is responsible for fetching data from the back end, using specified APIs. Then sending that data to ‘New_Profile’ component for displaying it on the screen.
       *	 ##### Charts
       This folder contains two files named, “Line_Chart.js” and “Pie_Chart.js”, these files are used to display charts on Profile.
       *	 ##### Common
       This folder contains two files named, “Footer.js” and “Header.js”, these two files are common for all pages on website, as shown by the name of the folder. These two files, contain all code for “Header” and “Footer” of website.
       *	 ##### Contact Us
       This folder contains two files named, “AddressDiv.js” and “ContactUs.js”. AddressDiv.js is a separate component used in “Contact Us” page. It is used to display Address and E-Mail of RIC. ContactUs.js is contains all the code for “Contact Us” page. It also extends AddressDiv.js file.
       *	 ##### Home
       This folder contains four files, named “QualitiesPortion_Home.js”, “SearchBar.js”, “Slider.js”, and “Themes.js”.
       QualitiesPortion_Home.js file contains code, about the section below “NUST Research Themes”.
       SearchBar.js file contains code for Search Bar used in website for searching the faculty members.
       Slider.js file contains code, for Slider which is displayed on the home page of the website.
       Themes.js file contains code, for “NUST Research Themes” which are being displayed on home page after search bar.
       *	##### Middle_Pages
       Contains only one file “Middle_Page.js”, this file contains code showing search results. Whenever user do a search the page on which these results are being shown is managed by this file.
       *	##### NotFoundFiles
       This folder contains files which are used for displaying the error messages to user, whenever any in-correct data is entered. “ErrorMessage.js” is used in Middle_Page.js file, where it is used to display error message whenever any error occur in fetching the data. “PageNotFound.js” if any URL which is not stored in routes of website, user will be re-directed to this page of 404 Page Not Found.
       *	##### Profile
       This folder contains only one file, named “New_Profile.js” which contains all code for rendering the Profile Page of any faculty member.
11. CSS
       This folder contain all the CSS used in this website. All folders are named same as their corresponding Components. So, it is easy to understand which file is attached which component.
12. Icons
       This folder contains the icons used in CV, header to indicate different mediums of communication.
       Each of the component contains comments which describes each line of code in components.
### Back End
Back End is written in Laravel, but the code can easily be written in Core PHP. Main reason for using Laravel at the back end was security policy of NUST server. We can’t access the server directly, so we have added some headers which only be added through any back-end language. So, it is implemented using `HTTP Facades` in this project.
Back-End can be found in `Server` folder which is present in project folder.
Different Controllers are created, for fetching data through PAI. To map these controllers, with route `routes/api.php` file is used. Different routes map to different controllers, for fetching and returning the data.
There is total 12 Controllers defined in back-end, which serve different purposes. Each Controller Name refers to the purpose that controller is serving. Like, Conference controller is used for fetching Conferences of faculty members, etc. Then these controllers are mapped to different routes in `api.php` to allow data fetching from Front-End.
Each of the controller contain comments which describes what is happening in that controller.

## Back End APIs
* For Conferences
https://qalam.nust.edu.pk/odoocms_api?alias=ric_expert_portal_conference_pub&auth=2959527935aea37f3fa445143c8303ba&rows=10&title=abc&author_name=abc&author_cmsid=abc
* Discipline
https://qalam.nust.edu.pk/odoocms_api?alias=ric_expert_portal_faculty&auth=eda78c8a7d78ca83fcb02ff052179b9b&rows=10&empid=abc&name=abc&qf=abc&acad_spec=abc
* Editorials
https://qalam.nust.edu.pk/odoocms_api?alias=ric_expert_portal_editorial&auth=e09d3d4b09c4e553fcb1901d4b555acf&rows=10&title=abc&author_name=abc
* Intellectual Property
https://qalam.nust.edu.pk/odoocms_api?alias=ric_expert_portal_intellectual&auth=a05ea7fb84932d6ccc233e8f818e3e33&rows=10&title=abc&initiator_cmsid=abc&initiator_name=abc&inventor_cmsid=abc&inventor_name=abc
* Profile
https://qalam.nust.edu.pk/odoocms_api?alias=ric_expert_portal_faculty&auth=eda78c8a7d78ca83fcb02ff052179b9b&rows=10&empid=abc&name=abc
* Projects
https://qalam.nust.edu.pk/odoocms_api?alias=ric_expert_portal_project&auth=d05a6d2391a1a4c25e0923034eadfc31&rows=10&pi_copi_cmsid=abc&pi-copi_name=abc&title=abc
* Publications
https://qalam.nust.edu.pk/odoocms_api?alias=ric_expert_portal_journal_pub&auth=fc22151322bfdd2c3f0626798c9198bc&rows=10&author_cmsid=abc&author_name=abc&title=abc
* School Faculty
https://qalam.nust.edu.pk/odoocms_api?alias=ric_expert_portal_faculty&auth=eda78c8a7d78ca83fcb02ff052179b9b&rows=10&empid=abc&name=abc&qf=abc&acad_spec=abc&institute=SEECS
* Scopus
https://api.elsevier.com/content/search/scopus?query=DOI(".$DOI.")"
* Supervisors
https://qalam.nust.edu.pk/odoocms_api?alias=ric_expert_portal_rttm&auth=eda78c8a7d78ca83fcb02ff052179b9b&rows=10&supervisor_id=abc&supervisoer_name=abc
* Training
https://qalam.nust.edu.pk/odoocms_api?alias=ric_expert_portal_training&auth=3a4c649fa4ad67c31e815bc39c1ce5d3&rows=10&title=abc&author_name=abc&author_cmsid=abc




