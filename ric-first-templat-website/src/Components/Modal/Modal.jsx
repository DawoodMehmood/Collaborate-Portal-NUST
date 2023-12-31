import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import Modal from 'react-modal';
import '../../CSS/Modal.css';
import { useEffect } from 'react';

// Add this line before rendering any modals
Modal.setAppElement('#root');

const CustomModal = ({ isModalOpen, closeModal, modalData, DisplayPublications, DisplayProjects, DisplayIPs, islabsData, isindustryData, dataToSend }) => {

  const closeModalwithicon = () => {
    // setModalOpen(false);
    closeModal();
  }
  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Modal"
        style={{ overflow: 'hidden' }}
      >

        <i className="fa-solid fa-circle-xmark crossbuttonicon" onClick={closeModalwithicon}></i>

        {modalData && (
          <div className='modalData'>
            {modalData === DisplayPublications && (
              <div>
                <h1 style={{ fontWeight: "bold", textAlign: "center" }}>
                  Publications
                </h1>
                {DisplayPublications.map((publication, index) => (
                  <Card
                    key={publication.id}
                    text="dark"
                    style={{ width: "100%" }}
                  >
                    <Card.Header>
                      {index + 1 + ". " + publication.title}
                    </Card.Header>
                    <Card.Body>
                      <Card.Subtitle class="mb-2 text-muted">
                        Authors:{" "}
                        {publication?.author_ids?.map((author, index) => {
                          if (author.co_author_faculty_staff_id === "") {
                            return (
                              <strong
                                key={index}
                                className={"strong-color"}
                              >{`${author.name}, `}</strong>
                            );
                          } else {
                            const pattern = /\b(\d{11})\b/;
                            const matches =
                              author?.co_author_faculty_staff_id.match(pattern);
                            if (matches) {
                              return (
                                <a
                                  key={index}
                                  href={
                                    "/profile/" + author.name + "/" + matches[0]
                                  }
                                  target="_blank"
                                >
                                  <strong
                                    style={{ color: "#6a0dad" }}
                                  >{`${author.name}, `}</strong>
                                </a>
                              );
                            } else {
                              return (
                                <strong
                                  key={index}
                                  className={"strong-color"}
                                >{`${author.name}, `}</strong>
                              );
                            }
                          }
                        })}
                        <br />
                        <i>{`${publication.journal_info}, `}</i>
                        <br />
                        Impact Factor:{" "}
                        {publication.impact_factor === "" ? (
                          <strong class={"strong-color"}>0</strong>
                        ) : (
                          <strong
                            class={"strong-color"}
                          >{`${publication.impact_factor} `}</strong>
                        )}{" "}
                        &nbsp; &nbsp; Citations:{" "}
                        <strong class={"strong-color"}>0</strong> &nbsp; &nbsp;
                        Quartiles: <strong class={"strong-color"}>1</strong>
                      </Card.Subtitle>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            )}

            {modalData === DisplayProjects && (
              <div>
                <h1 style={{ fontWeight: "bold", textAlign: "center" }}>
                  Projects
                </h1>
                {DisplayProjects.filter(
                  (project) =>
                    project.copi_ids[0]?.project_status !== "submitted"
                ) // Filter projects by project status
                  .map((project, index) => (
                    <Card
                      key={project.id}
                      text="dark"
                      style={{ width: "100%" }}
                    >
                      {/* {console.log(project)} */}
                      <Card.Header>
                        {index + 1 + ". " + project.title}
                      </Card.Header>
                      <Card.Body>
                        <Card.Subtitle class="mb-2 text-muted">
                          Author:{" "}
                          {project.copi_ids?.length > 0
                            ? project?.copi_ids?.map((author, index) => {
                              if (author.co_author_faculty_staff_id === "") {
                                return (
                                  <strong
                                    key={index}
                                    className={"strong-color"}
                                  >{`${author.name}, `}</strong>
                                );
                              } else {
                                const pattern = /\b(\d{11})\b/;
                                const matches =
                                  author?.co_author_faculty_staff_id.match(
                                    pattern
                                  );
                                const namePattern = /^([^-\d]+)/;
                                const nameMatches =
                                  author?.co_author_faculty_staff_id.match(
                                    namePattern
                                  );
                                if (matches[0] && nameMatches[0]) {
                                  return (
                                    <a
                                      key={index}
                                      href={
                                        "/profile/" +
                                        nameMatches[0] +
                                        "/" +
                                        matches[0]
                                      }
                                      target="_blank"
                                    >
                                      <strong
                                        style={{ color: "#6a0dad" }}
                                      >{`${nameMatches[0]}, `}</strong>
                                    </a>
                                  );
                                } else {
                                  return (
                                    <strong
                                      key={index}
                                      className={"strong-color"}
                                    >{`${author.name}, `}</strong>
                                  );
                                }
                              }
                            })
                            : "No Author Found"}
                          <br />
                          <strong class={"strong-color"}>NUST</strong>
                          <br />
                          Project Status:{" "}
                          {project.copi_ids[0]?.project_status !== undefined &&
                            project.copi_ids[0]?.project_status !== "" ? (
                            <strong class={"strong-color"}>{`${project.copi_ids[0].project_status ===
                              "apprinprocess"
                              ? "Approved / In-Progress"
                              : project.copi_ids[0].project_status ===
                                "completd"
                                ? "Completed"
                                : project.copi_ids[0].project_status
                              }`}</strong>
                          ) : project.copi_ids[0]?.project_status ===
                            "Approved / In-Progress" ? (
                            <strong class={"strong-color"}>
                              Approved / In-Progress
                            </strong>
                          ) : (
                            <strong class={"strong-color"}>0</strong>
                          )}{" "}
                          &nbsp; &nbsp; Rs:{" "}
                          {project.cost_in_pkr !== undefined &&
                            project.cost_in_pkr / 1000000 !== "" ? (
                            <strong class={"strong-color"}>{`${project.cost_in_pkr / 1000000
                              }M`}</strong>
                          ) : (
                            <strong class={"strong-color"}>0</strong>
                          )}{" "}
                          &nbsp; &nbsp; Submission Date:{" "}
                          {project.submission_date !== undefined &&
                            project.submission_date !== "" ? (
                            <strong
                              class={"strong-color"}
                            >{`${project.submission_date}`}</strong>
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
                <h1 style={{ fontWeight: "bold", textAlign: "center" }}>
                  Intellectual Property
                </h1>
                {DisplayIPs.map((displayIP, index) => (
                  <Card
                    key={displayIP.id}
                    text="dark"
                    style={{ width: "100%" }}
                  >
                    <Card.Header>
                      {index + 1 + ". " + displayIP.title}
                    </Card.Header>
                    <Card.Body>
                      <Card.Subtitle class="mb-2 text-muted">
                        Author:{" "}
                        {displayIP.inventor_ids?.length > 0 ? (
                          displayIP?.inventor_ids?.map((author, index) => {
                            if (author.co_author_faculty_staff_id === "") {
                              return (
                                <strong
                                  key={index}
                                  className={"strong-color"}
                                >{`${author.name}, `}</strong>
                              );
                            } else {
                              const pattern = /\b(\d{11})\b/;
                              const matches =
                                author?.co_author_faculty_staff_id.match(
                                  pattern
                                );
                              const namePattern = /^([^-\d]+)/;
                              const nameMatches =
                                author?.co_author_faculty_staff_id.match(
                                  namePattern
                                );
                              if (matches[0] && nameMatches[0]) {
                                return (
                                  <a
                                    key={index}
                                    href={
                                      "/profile/" +
                                      nameMatches[0] +
                                      "/" +
                                      matches[0]
                                    }
                                    target="_blank"
                                  >
                                    <strong
                                      style={{ color: "#6a0dad" }}
                                    >{`${nameMatches[0]}, `}</strong>
                                  </a>
                                );
                              } else {
                                return (
                                  <strong
                                    key={index}
                                    className={"strong-color"}
                                  >{`${author.name}, `}</strong>
                                );
                              }
                            }
                          })
                        ) : displayIP.inventors === "" ? (
                          "No Author Found"
                        ) : (
                          <strong className="strong-color">
                            {(() => {
                              const remainingNames = displayIP.inventors
                                .split(",")
                                .map((name) => name.trim())
                                .filter(
                                  (name) =>
                                    name.toLowerCase() !==
                                    displayIP.initiator_name.toLowerCase()
                                );

                              if (remainingNames.length > 0) {
                                const remainingNamesString =
                                  remainingNames.join(", ");

                                return (
                                  <>
                                    <strong className="strong-color">{`${remainingNamesString}, `}</strong>
                                    <a
                                      href={`/profile/${displayIP.initiator_name}/${displayIP.initiator_cms_id}`}
                                      target="_blank"
                                    >
                                      <strong style={{ color: "#6a0dad" }}>{`${displayIP.initiator_name}, `}</strong>
                                    </a>
                                  </>
                                );
                              } else {
                                return (
                                  <a
                                    href={`/profile/${displayIP.initiator_name}/${displayIP.initiator_cms_id}`}
                                    target="_blank"
                                  >
                                    <strong
                                      style={{ color: "#6a0dad" }}
                                    >{`-----------${displayIP.initiator_name}-----, `}</strong>
                                  </a>
                                );
                              }
                            })()}
                          </strong>
                        )}
                        <br />
                        <strong class={"strong-color"}>NUST</strong>
                        <br />
                        Filing year:{" "}
                        {displayIP.filing_year === "" ? (
                          <strong class={"strong-color"}>0</strong>
                        ) : (
                          <strong
                            class={"strong-color"}
                          >{`${displayIP.filing_year} `}</strong>
                        )}{" "}
                        &nbsp; &nbsp; IP Type:{" "}
                        {displayIP.ip_type === "" ? (
                          <strong class={"strong-color"}>0</strong>
                        ) : (
                          <strong
                            class={"strong-color"}
                          >{`${displayIP.ip_type}`}</strong>
                        )}
                      </Card.Subtitle>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            )}

            {modalData === "IP" && (
              <div>
                <h1 style={{ fontWeight: 'bold', textAlign: 'center' }}>Intellectual Property</h1>
                {dataToSend.map((displayIP, index) => (
                  <Card key={index} text="dark" style={{ width: '100%' }}>
                    <Card.Header>{(index + 1) + ". " + displayIP.title}</Card.Header>
                    <Card.Body>
                      <Card.Subtitle class="mb-2 text-muted">
                        Author:  {displayIP.inventor_ids?.length > 0 ? (
                          displayIP?.inventor_ids?.map((author, index) => {
                            if (author.co_author_faculty_staff_id === "") {
                              return (
                                <strong
                                  key={index}
                                  className={"strong-color"}
                                >{`${author.name}, `}</strong>
                              );
                            } else {
                              const pattern = /\b(\d{11})\b/;
                              const matches =
                                author?.co_author_faculty_staff_id.match(
                                  pattern
                                );
                              const namePattern = /^([^-\d]+)/;
                              const nameMatches =
                                author?.co_author_faculty_staff_id.match(
                                  namePattern
                                );
                              if (matches[0] && nameMatches[0]) {
                                return (
                                  <a
                                    key={index}
                                    href={
                                      "/profile/" +
                                      nameMatches[0] +
                                      "/" +
                                      matches[0]
                                    }
                                    target="_blank"
                                  >
                                    <strong
                                      style={{ color: "#6a0dad" }}
                                    >{`${nameMatches[0]}, `}</strong>
                                  </a>
                                );
                              } else {
                                return (
                                  <strong
                                    key={index}
                                    className={"strong-color"}
                                  >{`${author.name}, `}</strong>
                                );
                              }
                            }
                          })
                        ) : displayIP.inventors === "" ? (
                          "No Author Found"
                        ) : (
                          <strong className="strong-color">
                            {(() => {
                              const remainingNames = displayIP.inventors
                                .split(",")
                                .map((name) => name.trim())
                                .filter(
                                  (name) =>
                                    name.toLowerCase() !==
                                    displayIP.initiator_name.toLowerCase()
                                );

                              if (remainingNames.length > 0) {
                                const remainingNamesString =
                                  remainingNames.join(", ");

                                return (
                                  <>
                                    <strong className="strong-color">{`${remainingNamesString}, `}</strong>
                                    <a
                                      href={`/profile/${displayIP.initiator_name}/${displayIP.initiator_cms_id}`}
                                      target="_blank"
                                    >
                                      <strong style={{ color: "#6a0dad" }}>{`${displayIP.initiator_name}, `}</strong>
                                    </a>
                                  </>
                                );
                              } else {
                                return (
                                  <a
                                    href={`/profile/${displayIP.initiator_name}/${displayIP.initiator_cms_id}`}
                                    target="_blank"
                                  >
                                    <strong
                                      style={{ color: "#6a0dad" }}
                                    >{`-----------${displayIP.initiator_name}-----, `}</strong>
                                  </a>
                                );
                              }
                            })()}
                          </strong>
                        )}
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

            {modalData === "projects" && (
              <div>
                <h1 style={{ fontWeight: 'bold', textAlign: 'center' }}>Projects</h1>
                {dataToSend
                  .filter(project => project.copi_ids[0]?.project_status !== "submitted") // Filter projects by project status
                  .map((project, index) => (
                    <Card key={project.id} text="dark" style={{ width: '100%' }}>
                      <Card.Header>{(index + 1) + ". " + project.title}</Card.Header>
                      <Card.Body>
                        <Card.Subtitle class="mb-2 text-muted">
                          Author: {project.copi_ids?.length > 0
                            ? project?.copi_ids?.map((author, index) => {
                              if (author.co_author_faculty_staff_id === "") {
                                return (
                                  <strong
                                    key={index}
                                    className={"strong-color"}
                                  >{`${author.name}, `}</strong>
                                );
                              } else {
                                const pattern = /\b(\d{11})\b/;
                                const matches =
                                  author?.co_author_faculty_staff_id.match(
                                    pattern
                                  );
                                const namePattern = /^([^-\d]+)/;
                                const nameMatches =
                                  author?.co_author_faculty_staff_id.match(
                                    namePattern
                                  );
                                if (matches[0] && nameMatches[0]) {
                                  return (
                                    <a
                                      key={index}
                                      href={
                                        "/profile/" +
                                        nameMatches[0] +
                                        "/" +
                                        matches[0]
                                      }
                                      target="_blank"
                                    >
                                      <strong
                                        style={{ color: "#6a0dad" }}
                                      >{`${nameMatches[0]}, `}</strong>
                                    </a>
                                  );
                                } else {
                                  return (
                                    <strong
                                      key={index}
                                      className={"strong-color"}
                                    >{`${author.name}, `}</strong>
                                  );
                                }
                              }
                            })
                            : "No Author Found"}
                          <br />
                          <strong class={"strong-color"}>NUST</strong>
                          <br />
                          Project Status: {project.copi_ids[0]?.project_status !== undefined && project.copi_ids[0]?.project_status !== "" ? (
                            <strong class={"strong-color"}>{`${project.copi_ids[0].project_status === "apprinprocess" ? "Approved / In-Progress" :
                              project.copi_ids[0].project_status === "completd" ? "Completed" : project.copi_ids[0].project_status}`}</strong>
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

            {modalData === "publications" && (
              <div>
                <h1 style={{ fontWeight: 'bold', textAlign: 'center' }}>Publications</h1>
                {dataToSend.map((publication, index) => (
                  <Card key={publication.id} text="dark" style={{ width: '100%' }}>
                    <Card.Header>{(index + 1) + ". " + publication.title}</Card.Header>
                    <Card.Body>
                      <Card.Subtitle class="mb-2 text-muted">
                        All Authors:  Authors:{" "}
                        {publication?.author_ids?.map((author, index) => {
                          if (author.co_author_faculty_staff_id === "") {
                            return (
                              <strong
                                key={index}
                                className={"strong-color"}
                              >{`${author.name}, `}</strong>
                            );
                          } else {
                            const pattern = /\b(\d{11})\b/;
                            const matches =
                              author?.co_author_faculty_staff_id.match(pattern);
                            if (matches) {
                              return (
                                <a
                                  key={index}
                                  href={
                                    "/profile/" + author.name + "/" + matches[0]
                                  }
                                  target="_blank"
                                >
                                  <strong
                                    style={{ color: "#6a0dad" }}
                                  >{`${author.name}, `}</strong>
                                </a>
                              );
                            } else {
                              return (
                                <strong
                                  key={index}
                                  className={"strong-color"}
                                >{`${author.name}, `}</strong>
                              );
                            }
                          }
                        })}
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


            {modalData === "lab" && (
              <div>
                <h1 style={{ fontWeight: 'bold', textAlign: 'center' }}>Lab Equipment</h1>
                {dataToSend.map((lab) => (
                  <Card key={lab.id} text="dark" style={{ width: '100%' }}>
                    <Card.Header style={{ fontWeight: "bold" }}>{lab.name}</Card.Header>
                    <Card.Body>
                      <Card.Subtitle className="mb-2 text-muted">
                        <p><b style={{ color: "black", fontSize: "20px" }}>Introduction: </b>{lab.introduction}</p>
                      </Card.Subtitle>
                      <p><b style={{ color: "black", fontSize: "17px" }}>Working principle: </b> {lab.description}</p>
                      <div className="row">
                        <div className="col-md-6">
                          <p><b style={{ color: "black", fontSize: "17px" }}>Name of Lab: </b>{lab.lab_name}</p>
                          <p><b style={{ color: "black", fontSize: "17px" }}>Name of School/College: </b> {lab.school}</p>
                          <p><b style={{ color: "black", fontSize: "17px" }}>Name of Custodian: </b>{lab.lab_incharge}</p>
                          <p><b style={{ color: "black", fontSize: "17px" }}>Equipment Specification: </b>{lab.specification}</p>
                        </div>
                        <div className="col-md-6">
                          <img style={{ maxHeight: "250px" }} src={require(`../../APIs/pictures/${lab.sr_no}.jpg`)} alt="Lab Picture" />
                        </div>
                      </div>

                    </Card.Body>
                  </Card>
                ))}
              </div>
            )}

            {modalData === 'industry' && (
              <div>
                <h1 style={{ fontWeight: 'bold', textAlign: 'center' }}>Industry</h1>
                {dataToSend.map((industry) => (
                  <Card key={industry.id} text="dark" style={{ width: '100%' }}>
                    <Card.Header style={{ fontWeight: "bold", fontSize: "18px" }}>{industry.name}</Card.Header>
                    <Card.Body>
                      {/* {<img src={process.env.PUBLIC_URL + "/Images/industry-images/" + industry.title + ".png"}></img>} */}
                      {/* {console.log(process.env.PUBLIC_URL + "/Images/industry-images/" + industry.title + ".png")} */}
                      <Card.Subtitle className="mb-2 text-muted">
                        {industry.description && <p style={{ fontSize: "18px" }}><b>Description:</b> {industry.description}</p>}
                      </Card.Subtitle>

                      {industry.Sector && <p style={{ fontSize: "18px" }}>Sector: <b>{industry.Sector}</b></p>}
                      {industry.Type && <p style={{ fontSize: "18px" }}>Type: <b>{industry.Type}</b></p>}
                    </Card.Body>
                  </Card>
                ))}
              </div>
            )}


            {modalData === 'mou' && (
              <div>
                <h1 style={{ fontWeight: 'bold', textAlign: 'center' }}>MOA-MOU</h1>
                {dataToSend.map((mou) => (
                  <Card key={mou.id} text="dark" style={{ width: '100%' }}>
                    <Card.Header style={{ fontWeight: "bold", fontSize: "18px" }}>{mou.org_dte}</Card.Header>
                    <Card.Body>
                      <Card.Subtitle className="mb-2 text-muted">
                        {mou.Title && <p style={{ fontSize: "18px" }}><b>Title:</b> {mou.Title}</p>}
                      </Card.Subtitle>

                      {mou.Signing_Date && <p style={{ fontSize: "18px" }}>Signing Date: <b>{mou.Signing_Date}</b></p>}
                      {mou.Signing_Authority && <p style={{ fontSize: "18px" }}>Signing Authority: <b>{mou.Signing_Authority}</b></p>}
                      {mou.Validity && <p style={{ fontSize: "18px" }}>Validity: <b>{mou.Validity}</b></p>}

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