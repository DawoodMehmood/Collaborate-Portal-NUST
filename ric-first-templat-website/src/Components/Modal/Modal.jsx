import React from 'react';
import { Card } from 'react-bootstrap';
import Modal from 'react-modal';

const CustomModal = ({ isModalOpen, closeModal, modalData, DisplayPublications, DisplayProjects, DisplayIPs }) => {
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
                                            <Card.Subtitle className="mb-2 text-muted">
                                                Authors: {publication.all_author_compute === "" ? <strong className={"strong-color"}>0</strong> : <strong className={"strong-color"}>{`${publication.all_author_compute} `}</strong>}
                                                <br />
                                                <i>{`${publication.journal_info}, `}</i>
                                                <br />
                                                Impact Factor: {publication.impact_factor === "" ? <strong className={"strong-color"}>0</strong> : <strong className={"strong-color"}>{`${publication.impact_factor} `}</strong>}  &nbsp; &nbsp; Citations: <strong className={"strong-color"}>0</strong>  &nbsp; &nbsp;  Quartiles: <strong className={"strong-color"}>1</strong>
                                            </Card.Subtitle>
                                        </Card.Body>
                                    </Card>
                                ))}
                            </div>
                        )}

                        {modalData === DisplayProjects && (
                            <div>
                                <h1 style={{ fontWeight: 'bold', textAlign: 'center' }}>Projects</h1>
                                {DisplayProjects.map((project, index) => (
                                    <Card key={project.id} text="dark" style={{ width: '100%' }}>
                                        <Card.Header>{(index + 1) + ". " + project.title}</Card.Header>
                                        <Card.Body>
                                            <Card.Subtitle className="mb-2 text-muted">
                                                Author: {project.copi_ids[0].name === "" ? <strong className={"strong-color"}>0</strong> : <strong className={"strong-color"}>{`${project.copi_ids[0].name} `}</strong>}
                                                <br />
                                                <strong className={"strong-color"}>NUST</strong>
                                                <br />
                                                Project Status: {project.copi_ids[0].project_status === "" ? <strong className={"strong-color"}>0</strong> : <strong className={"strong-color"}>{`${project.copi_ids[0].project_status} `}</strong>}  &nbsp; &nbsp; Rs: {project.cost_in_pkr / 1000000 === "" ? <strong className={"strong-color"}>0</strong> : <strong className={"strong-color"}>{`${project.cost_in_pkr / 1000000}M`}</strong>}  &nbsp; &nbsp; Submission Date: {project.submission_date === "" ? <strong className={"strong-color"}>0</strong> : <strong className={"strong-color"}>{`${project.submission_date}`}</strong>}
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
                                            <Card.Subtitle className="mb-2 text-muted">
                                                Author: {displayIP.inventors === "" ? <strong className={"strong-color"}>0</strong> : <strong className={"strong-color"}>{`${displayIP.inventors} `}</strong>}
                                                <br />
                                                <strong className={"strong-color"}>NUST</strong>
                                                <br />
                                                Filing year: {displayIP.filing_year === "" ? <strong className={"strong-color"}>0</strong> : <strong className={"strong-color"}>{`${displayIP.filing_year} `}</strong>}  &nbsp; &nbsp; IP Type: {displayIP.ip_type === "" ? <strong className={"strong-color"}>0</strong> : <strong className={"strong-color"}>{`${displayIP.ip_type}`}</strong>}
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
