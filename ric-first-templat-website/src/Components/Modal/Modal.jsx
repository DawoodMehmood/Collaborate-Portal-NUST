import React from 'react';
import { Card } from 'react-bootstrap';
import Modal from 'react-modal';

// Add this line before rendering any modals
Modal.setAppElement('#root');

const CustomModal = ({ isModalOpen, closeModal, modalData, DisplayPublications, DisplayProjects, DisplayIPs, islabsData, isindustryData }) => {



    return (
        <div>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Modal"
            >
                {modalData && (
                    <div>
                        {modalData === DisplayPublications && (
                            <div>
                                <h1 style={{ fontWeight: 'bold', textAlign: 'center' }}>Publications</h1>
                                {DisplayPublications.map((publication, index) => (
                                    <Card key={publication.id} text="dark" style={{ width: '100%' }}>
                                        <Card.Header>{(index + 1) + ". " + publication.title}</Card.Header>
                                        <Card.Body>
                                            <Card.Subtitle class="mb-2 text-muted">
                                                Authors: {publication.all_author_compute === "" ? <strong class={"strong-color"}>0</strong> : <strong class={"strong-color"}>{`${publication.all_author_compute} `}</strong>}
                                                <br />
                                                <i>{`${publication.journal_info}, `}</i>
                                                <br />
                                                Impact Factor: {publication.impact_factor === "" ? <strong class={"strong-color"}>0</strong> : <strong class={"strong-color"}>{`${publication.impact_factor} `}</strong>}  &nbsp; &nbsp; Citations: <strong class={"strong-color"}>0</strong>  &nbsp; &nbsp;  Quartiles: <strong class={"strong-color"}>1</strong>
                                            </Card.Subtitle>
                                        </Card.Body>
                                    </Card>
                                ))}
                            </div>
                        )}


                        {modalData === DisplayProjects && (
                            <div>
                                <h1 style={{ fontWeight: 'bold', textAlign: 'center' }}>Projects</h1>
                                {DisplayProjects
                                    .filter(project => project.copi_ids[0]?.project_status !== "submitted") // Filter projects by project status
                                    .map((project, index) => (
                                        <Card key={project.id} text="dark" style={{ width: '100%' }}>
                                            <Card.Header>{(index + 1) + ". " + project.title}</Card.Header>
                                            <Card.Body>
                                                <Card.Subtitle class="mb-2 text-muted">
                                                    Author: {project.copi_ids[0]?.name !== undefined && project.copi_ids[0]?.name !== "" ? (
                                                        <strong class={"strong-color"}>{`${project.copi_ids[0].name} `}</strong>
                                                    ) : (
                                                        <strong class={"strong-color"}>0</strong>
                                                    )}
                                                    <br />
                                                    <strong class={"strong-color"}>NUST</strong>
                                                    <br />
                                                    Project Status: {project.copi_ids[0]?.project_status !== undefined && project.copi_ids[0]?.project_status !== "" ? (
                                                        <strong class={"strong-color"}>{`${project.copi_ids[0].project_status}`}</strong>
                                                    ) : (
                                                        project.copi_ids[0]?.project_status === "Approved / In-Progress" ? (
                                                            <strong class={"strong-color"}>Approved / In-Progress</strong>
                                                        ) : (
                                                            <strong class={"strong-color"}>0</strong>
                                                        )
                                                    )}  &nbsp; &nbsp; Rs: {project.cost_in_pkr !== undefined && project.cost_in_pkr / 1000000 !== "" ? (
                                                        <strong class={"strong-color"}>{`${project.cost_in_pkr / 1000000}M`}</strong>
                                                    ) : (
                                                        <strong class={"strong-color"}>0</strong>
                                                    )}  &nbsp; &nbsp; Submission Date: {project.submission_date !== undefined && project.submission_date !== "" ? (
                                                        <strong class={"strong-color"}>{`${project.submission_date}`}</strong>
                                                    ) : (
                                                        <strong class={"strong-color"}>0</strong>
                                                    )}
                                                </Card.Subtitle>
                                            </Card.Body>
                                        </Card>
                                    ))}
                            </div>
                        )}




                        {modalData === DisplayIPs && (
                            <div>
                                <h1 style={{ fontWeight: 'bold', textAlign: 'center' }}>Intellectual Property</h1>
                                {DisplayIPs.map((displayIP, index) => (
                                    <Card key={displayIP.id} text="dark" style={{ width: '100%' }}>
                                        <Card.Header>{(index + 1) + ". " + displayIP.title}</Card.Header>
                                        <Card.Body>
                                            <Card.Subtitle class="mb-2 text-muted">
                                                Author: {displayIP.inventors === "" ? <strong class={"strong-color"}>0</strong> : <strong class={"strong-color"}>{`${displayIP.inventors} `}</strong>}
                                                <br />
                                                <strong class={"strong-color"}>NUST</strong>
                                                <br />
                                                Filing year: {displayIP.filing_year === "" ? <strong class={"strong-color"}>0</strong> : <strong class={"strong-color"}>{`${displayIP.filing_year} `}</strong>}  &nbsp; &nbsp; IP Type: {displayIP.ip_type === "" ? <strong class={"strong-color"}>0</strong> : <strong class={"strong-color"}>{`${displayIP.ip_type}`}</strong>}
                                            </Card.Subtitle>
                                        </Card.Body>
                                    </Card>
                                ))}
                            </div>
                        )}

                        {modalData === islabsData && (
                            <div>
                                <h1 style={{ fontWeight: 'bold', textAlign: 'center' }}>Labs</h1>
                                {modalData.map((lab) => (
                                    <Card key={lab.id} text="dark" style={{ width: '100%' }}>
                                        <Card.Header style={{fontWeight:"bold"}}>{lab.title}</Card.Header>
                                        <Card.Body>
                                            <Card.Subtitle className="mb-2 text-muted">
                                                {lab.description && <p >{lab.description}</p>}
                                            </Card.Subtitle>

                                            {lab.model && <p style={{fontWeight:"bold"}}>Model: {lab.model}</p>}
                                            {lab.company && <p style={{fontWeight:"bold"}}>Company: {lab.company}</p>}
                                            {lab.country && <p style={{fontWeight:"bold"}}>Country: {lab.country}</p>}
                                            {lab.capacity && <p style={{fontWeight:"bold"}}>Capacity: {lab.capacity}</p>}
                                            {lab.range && <p style={{fontWeight:"bold"}}>Range: {lab.range}</p>}
                                            {lab.venue && <p style={{fontWeight:"bold"}}>Venue: {lab.venue}</p>}

                                            {/* {lab.model && (
                                                <p>
                                                    Model: {lab.model}, Company: {lab.company}
                                                    {lab.country && `, Country: ${lab.country}`}
                                                    <br />
                                                    {lab.range && (
                                                        <span>
                                                            Range: {lab.range}
                                                            <br />
                                                        </span>
                                                    )}
                                                    Venue: {lab.venue}
                                                </p>
                                            )} */}

                                        </Card.Body>
                                    </Card>
                                ))}
                            </div>
                        )}

                        {modalData === isindustryData && (
                            <div>
                                <h1 style={{ fontWeight: 'bold', textAlign: 'center' }}>Industry</h1>
                                {modalData.map((industry) => (
                                    <Card key={industry.id} text="dark" style={{ width: '100%' }}>
                                        <Card.Header style={{fontWeight:"bold"}}>{industry.title}</Card.Header>
                                        <Card.Body>
                                            <Card.Subtitle className="mb-2 text-muted">
                                                {industry.country && <p>Country: {industry.country}</p>}
                                            </Card.Subtitle>
                                        </Card.Body>
                                    </Card>
                                ))}
                            </div>
                        )}


                    </div>
                )}
            </Modal>
        </div>
    );
};

export default CustomModal;