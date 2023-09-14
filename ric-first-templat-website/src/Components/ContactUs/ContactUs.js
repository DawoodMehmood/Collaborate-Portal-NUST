/*
This file contains code for Contact Us page.
 */

import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { faMapMarkerAlt, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import AddressDiv from "./AddressDiv";
export default function ContactUs() {

    const form = useRef();
    const MAX_FILE_SIZ = 25000000
    const [formValues, setFormValues] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
        // file: ""
    });
    const [formErrors, setFormErrors] = useState({
        name: false,
        email: false,
        subject: false,
        message: false,
        fileError: false,
    });
    const [emailSentFlags, setEmailSentFlags] = useState({
        showDiv: false,
        showOKMessage: false,
        showErrorMessage: false
    })

    const handleFileUpload = (e) => {
        const upFile = e.target.files[0];
        if (!(upFile.type === 'application/pdf' || upFile.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document")) {
            setFormErrors((prevState) => ({ ...prevState, fileError: true }))
            e.target.value = null;
        }
        else if (upFile.size > MAX_FILE_SIZ) {
            setFormErrors((prevState) => ({ ...prevState, fileError: true }))
            e.target.value = null;
        }
        else {
            setFormErrors((prevState) => ({ ...prevState, fileError: false }))
            setFormValues(prevState => ({ ...prevState, file: upFile.name }))
        }
    }
    const handleSubmit = async (event) => {
        setEmailSentFlags({ showDiv: true, showOKMessage: false, showErrorMessage: false })
        event.preventDefault();
        let errors = {
            name: false,
            email: false,
            subject: false,
            message: false,
        };
        if (formValues.name === "") {
            errors.name = true;
        }
        if (formValues.email === "") {
            errors.email = true;
        }
        else {
            let email = formValues.email;
            let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            if (!emailRegex.test(email)) {
                errors.email = true;
            }
        }
        if (formValues.subject === "") {
            errors.subject = true;
        }
        if (formValues.message === "") {
            errors.message = true;
        }
        setFormErrors(errors);
        if (!errors.name && !errors.email && !errors.subject && !errors.message) {
            // send data to server
            fetch(`http://localhost:8000/api/sendEmail`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify(
                        {
                            "name": `${formValues.name}`,
                            "email": `${formValues.email}`,
                            "subject": `${formValues.subject}`,
                            "message": `${formValues.message}`,
                            // "file":`${formValues.file}`
                        }
                    )
                }).then((response) => response.json())
                .then((data) => {
                    console.log(data)
                    if (data.Status === "OK") {
                        setEmailSentFlags(prevState => ({ ...prevState, showOKMessage: true, showErrorMessage: false }))
                    }
                    else {
                        setEmailSentFlags(prevState => ({ ...prevState, showOKMessage: false, showErrorMessage: true }))
                    }
                })

            alert('Everything is fine')
        }
    }

    const sendEmail = (e) => {
        e.preventDefault();
        toast.info("Sending Email", {
            style: {
                backgroundColor: "#2196F3",
                color: "#ffffff",
                fontSize: "14px",
            },
        });

        emailjs.sendForm('service_3cyqppx', 'template_c5pk7uw', form.current, 'SDspFi_DLdHTR9boF')
        // showing toast that email is sending
            .then((result) => {
                console.log(result.text);
                console.log("Email Sent Successfully")
                toast.success("Email Sent Successfully", {
                    style: {
                        backgroundColor: "#4CAF50",
                        color: "#ffffff",
                        fontSize: "14px",
                    },
                }); // Show success toast
                // making empty the form after sending the email
                form.current.reset();
            }, (error) => {
                console.log(error.text);
                console.log("Email Not Sent")
                toast.error("Email Not Sent", {
                    style: {
                        backgroundColor: "#f44336",
                        color: "#ffffff",
                        fontSize: "14px",
                    },
                }); // Show error toast
            });
    };

    return (
        // Renders a contact form component
        <div className={"ContactUs-div"}>
            <h1>Contact Us</h1>

            {/* Displays a Google Maps iframe */}
            <div className={"RIC-Map-Location"} >
                <p>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d293.5880568180212!2d72.98312032430579!3d33.64239765161877!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sRIC%2C%20NUST!5e0!3m2!1sen!2s!4v1677131633999!5m2!1sen!2s"
                        width="400" height="300" style={{ border: "0;" }} allowFullScreen="" loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade">
                    </iframe>
                </p>
            </div>

            {/* Displays contact information */}
            <div className={"contact-info"}>
                <AddressDiv icon={faMapMarkerAlt} text={"Research Innovation & Commercialization Center (RIC), H-12, Islamabad"} />
                <AddressDiv icon={faEnvelope} text={"collaborate@nust.edu.pk"} />
            </div>

            {emailSentFlags.showDiv ? <div>
                {emailSentFlags.showOKMessage ? <h3 className={"email-sent-flag"}>Email Sent Successfully</h3> : ""}
                {emailSentFlags.showErrorMessage ? <h3 className={"email-sent-flag email-sent-flag-false"}>Could Not Send Email. Try Again</h3> : ""}
            </div> : ""}
            {/* Displays a contact form */}
            <div className={"contact-form"}>
                <Form ref={form} onSubmit={sendEmail}>
                    <div className={"contact-form-personal"}>
                        {/* Form field for the user's name */}
                        <Form.Group controlId="formBasicName" className={"formFields"}>
                            <Form.Label>
                                Enter Your Name <span className={"required-symbol"}>*</span>
                                &nbsp; &nbsp;
                                {/* Displays an error message if the user hasn't entered their name */}
                                {!formErrors.name ? "" : <span className={"error-message"}>Name Required</span>}
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Your Name"
                                name='from_name'
                            // onChange={async (event) => { await setFormValues({ ...formValues, name: event.target.value }); }}
                            // value={formValues.name}
                            />
                        </Form.Group>

                        {/* Form field for the user's email */}
                        <Form.Group controlId="formBasicEmail" className={"formFields"}>
                            <Form.Label>
                                Email address <span className={"required-symbol"}>*</span>
                                &nbsp; &nbsp;
                                {/* Displays an error message if the user hasn't entered a valid email */}
                                {!formErrors.email ? "" : <span className={"error-message"}>Valid E-Mail Required</span>}
                            </Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                name='user_email'
                            // onChange={async (event) => { await setFormValues({ ...formValues, email: event.target.value }); }}
                            // value={formValues.email}
                            />
                        </Form.Group>
                    </div>
                    {/* Form field for the message subject */}
                    <Form.Group controlId="formBasicSubject" className={"formFields"}>
                        <Form.Label>
                            Message Subject <span className={"required-symbol"}>*</span>
                            &nbsp; &nbsp;
                            {/* Displays an error message if the user hasn't entered a subject */}
                            {!formErrors.subject ? "" : <span className={"error-message"}>Subject Required</span>}
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Subject"
                            name='subject'
                        // onChange={async (event) => { await setFormValues({ ...formValues, subject: event.target.value }); }}
                        // value={formValues.subject}
                        />
                    </Form.Group>
                    {/*Message for sending to the server*/}
                    <Form.Group controlId="formBasicMessage" className={"formFields"}>
                        <Form.Label>Message <span className={"required-symbol"}>*</span>
                            &nbsp; &nbsp;{!formErrors.message ? "" : <span className={"error-message"}>Message is Empty</span>}
                        </Form.Label>
                        <Form.Control
                            as={"textarea"}
                            placeholder="Enter Message"
                            name='message'
                        // onChange={async (event) => { await setFormValues({ ...formValues, message: event.target.value }); }}
                        // value={formValues.message}
                        />
                    </Form.Group>
                    {/*<Form.Group controlId="formBasicSubject" className={"formFields"}>*/}
                    {/*    <Form.Label>Attach File*/}
                    {/*        &nbsp; &nbsp;{!formErrors.fileError?"":<span className={"error-message"}>Either file type is not supported or file size is exceeding the limit of 25MB</span>}</Form.Label>*/}
                    {/*    <Form.Control*/}
                    {/*        type="file"*/}
                    {/*        placeholder="Subject"*/}
                    {/*        onChange={handleFileUpload}*/}
                    {/*    />*/}
                    {/*    <Form.Text muted>Only .docx and .pdf format files of 25MB supported.</Form.Text>*/}
                    {/*</Form.Group>*/}

                    <Form.Group controlId="formBasicButton" >
                        <Button variant="primary" type="submit" className={"Form-Button"}> Send Message</Button>
                    </Form.Group>
                </Form>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    closeButton={false} // Remove the close button
                    style={{
                        width: "300px", // Apply custom styles to the ToastContainer
                    }}
                />
            </div>

        </div>
    )
}