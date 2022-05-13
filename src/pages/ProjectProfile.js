import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

import '../styles/projectProfile.css';
import DataContext from './../context/data';
import ProjectCard from '../components/ProjectCard';
import axiosInstance from '../network/axiosConfig';
import ProjectComments from '../projectComponents/ProjectComments';
import ProjectPictures from '../projectComponents/ProjectPictures';

export default function ProjectProfile() {
  const { projectData, setProjectData } = useContext(DataContext);
  const [projectImg, setProjectImg] = useState('');
  const [avgRate, setAvgRate] = useState(0);
  const [totalDonation, setTotalDonation] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [rate, setRate] = useState('None');
  const [donation, setDonation] = useState('');
  const [projectDate, setProjectDate] = useState(new Date());
  const [report, setReport] = useState('');
  const [comment, setComment] = useState('');
  const params = useParams();
  const projectId = params.id;
  let imageUrl = 'http://localhost:8000/static/projects/images/';
  let csrftoken = Cookies.get('csrftoken');

  const getTotalDonation = donateArr => {
    let sum = 0;
    for (let donate of donateArr) {
      sum += donate;
    }
    return sum;
  };

  const getAvgRate = rateArr => {
    let sum = 0;
    for (let rate of rateArr) {
      sum += rate;
    }
    return sum / rateArr.length;
  };

  const handleRateChange = e => {
    setRate(Number(e.target.value));
  };

  const handleSubmitRate = e => {
    axiosInstance
      .post(
        `projects/${projectId}/rate`,
        { rate: rate },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
          },
          withCredentials: true,
        }
      )
      .then(res => {
        setRate('None');
      })
      .catch(err => {
        console.error(err);
      });
  };

  const handleDonationChange = e => {
    setDonation(Number(e.target.value));
  };

  const handleSubmitDonation = e => {
    if (donation < 1) {
      alert('Making nullish or negative donation is prohibited');
    } else if (donation + totalDonation > projectData.project.total_target) {
      alert('sorry, project total target reached');
    } else if (projectDate < new Date()) {
      alert('sorry, you should not make a donation in a terminated project');
    } else {
      axiosInstance
        .post(
          `projects/donate/${projectId}`,
          { donation: donation },
          {
            headers: {
              'Content-Type': 'application/json',
              'X-CSRFToken': csrftoken,
            },
            withCredentials: true,
          }
        )
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.error(err);
        });
    }
    setDonation('');
  };

  const handleReportChange = e => {
    setReport(e.target.value);
  };

  const handleSubmitReport = e => {
    axiosInstance
      .post(
        `projects/report_project/${projectId}`,
        { report_description: report },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
          },
          withCredentials: true,
        }
      )
      .then(res => {
        console.log(res);
      })
      .then(() => {
        setReport('');
      })
      .catch(err => {
        console.error(err);
      });
  };

  const handleCommentChange = e => {
    setComment(e.target.value);
  };

  const handleSubmitComment = e => {
    if (!comment) {
      alert('Comment must not be empty');
    } else {
      axiosInstance
        .post(
          `projects/comment/${projectId}`,
          { comment: comment },
          {
            headers: {
              'Content-Type': 'application/json',
              'X-CSRFToken': csrftoken,
            },
            withCredentials: true,
          }
        )
        .then(res => {
          setComment('');
        })
        .catch(err => {
          console.error(err);
        });
    }
  };

  useEffect(() => {
    axiosInstance
      .get(`/projects/${projectId}`, { withCredentials: true })
      .then(res => {
        setProjectData(res.data);
        let imgName = res.data.project.thumbnail.split('/').at(-1);
        setProjectImg(imageUrl + imgName);
        if (res.data.rate.length > 0) {
          setAvgRate(getAvgRate(res.data.rate));
        }
        if (res.data.donation.length > 0) {
          setTotalDonation(getTotalDonation(res.data.donation));
        }
        let date = new Date(
          [
            res.data.project.end_time.substring(5, 7),
            res.data.project.end_time.substring(8, 10),
            res.data.project.end_time.substring(0, 4),
          ].join('/')
        );
        setProjectDate(date);
        setIsLoading(false);
      })
      .catch(err => {
        console.error(err);
      });
  }, [setProjectData, setProjectImg, projectId, rate, donation, report, comment]);

  return (
    <>
      {isLoading ? (
        <div className='d-flex justify-content-center mt-5'>
          <div className='spinner-border' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </div>
        </div>
      ) : (
        <>
          {/* Rate modal */}
          <div
            className='modal fade'
            id='exampleModal'
            tabIndex='-1'
            aria-labelledby='exampleModalLabel'
            aria-hidden='true'>
            <div className='modal-dialog'>
              <div className='modal-content'>
                <div className='modal-header'>
                  <h5 className='modal-title' id='exampleModalLabel'>
                    Rate Project
                  </h5>
                  <button
                    type='button'
                    className='btn-close'
                    data-bs-dismiss='modal'
                    aria-label='Close'></button>
                </div>
                <div className='modal-body'>
                  <select
                    className='form-select'
                    aria-label='Default select example'
                    onChange={handleRateChange}
                    value={rate}>
                    <option value={'None'} hidden>
                      Choose your rating
                    </option>
                    <option value='1'>POOR</option>
                    <option value='2'>FAIR</option>
                    <option value='3'>GOOD</option>
                    <option value='4'>VERYGOOD</option>
                    <option value='5'>EXCELLENT</option>
                  </select>
                </div>
                <div className='modal-footer'>
                  <button type='button' className='btn btn-secondary' data-bs-dismiss='modal'>
                    Close
                  </button>
                  <button
                    type='button'
                    className='btn btn-primary'
                    onClick={handleSubmitRate}
                    data-bs-dismiss='modal'>
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Donation modal */}
          <div
            className='modal fade'
            id='exampleModal2'
            tabIndex='-1'
            aria-labelledby='exampleModalLabel2'
            aria-hidden='true'>
            <div className='modal-dialog'>
              <div className='modal-content'>
                <div className='modal-header'>
                  <h5 className='modal-title' id='exampleModalLabel2'>
                    Make Donation
                  </h5>
                  <button
                    type='button'
                    className='btn-close'
                    data-bs-dismiss='modal'
                    aria-label='Close'></button>
                </div>
                <div className='modal-body'>
                  <input
                    type='number'
                    name='donation'
                    id='donation'
                    value={donation}
                    className='form-control'
                    placeholder='Enter your Donation'
                    onChange={handleDonationChange}
                  />
                </div>
                <div className='modal-footer'>
                  <button type='button' className='btn btn-secondary' data-bs-dismiss='modal'>
                    Close
                  </button>
                  <button
                    type='button'
                    className='btn btn-primary'
                    onClick={handleSubmitDonation}
                    data-bs-dismiss='modal'>
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Comment modal */}
          <div
            className='modal fade'
            id='exampleModal5'
            tabIndex='-1'
            aria-labelledby='exampleModalLabel5'
            aria-hidden='true'>
            <div className='modal-dialog'>
              <div className='modal-content'>
                <div className='modal-header'>
                  <h5 className='modal-title' id='exampleModalLabel5'>
                    Add Comment
                  </h5>
                  <button
                    type='button'
                    className='btn-close'
                    data-bs-dismiss='modal'
                    aria-label='Close'></button>
                </div>
                <div className='modal-body'>
                  <input
                    type='text'
                    name='comments'
                    id='comments'
                    value={comment}
                    className='form-control'
                    placeholder='Enter your comment'
                    onChange={handleCommentChange}
                  />
                </div>
                <div className='modal-footer'>
                  <button type='button' className='btn btn-secondary' data-bs-dismiss='modal'>
                    Close
                  </button>
                  <button
                    type='button'
                    className='btn btn-primary'
                    onClick={handleSubmitComment}
                    data-bs-dismiss='modal'>
                    Save Comment
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Report Modal */}
          <div
            className='modal fade'
            id='exampleModal3'
            tabIndex='-1'
            aria-labelledby='exampleModalLabel3'
            aria-hidden='true'>
            <div className='modal-dialog'>
              <div className='modal-content'>
                <div className='modal-header'>
                  <h5 className='modal-title' id='exampleModalLabel3'>
                    Report Project
                  </h5>
                  <button
                    type='button'
                    className='btn-close'
                    data-bs-dismiss='modal'
                    aria-label='Close'></button>
                </div>
                <div className='modal-body'>
                  <input
                    type='text'
                    name='report'
                    id='report'
                    value={report}
                    className='form-control'
                    placeholder='Enter your Report Description'
                    onChange={handleReportChange}
                  />
                </div>
                <div className='modal-footer'>
                  <button type='button' className='btn btn-secondary' data-bs-dismiss='modal'>
                    Close
                  </button>
                  <button
                    type='button'
                    className='btn btn-primary'
                    onClick={handleSubmitReport}
                    data-bs-dismiss='modal'>
                    Report
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* card */}
          <div className='projectCard' style={{ backgroundImage: `url(${projectImg})` }}>
            <div className='projectDetails'>
              <div className='projectHeader p-2'>
                <img id='projectImg' src={projectImg} alt={projectData.project.title} />
                <h1 id='project_title'>{projectData.project.title}</h1>
                <span className='project_info'>
                  <b>Start time:</b> {projectData.project.start_time.substring(0, 10)}
                </span>
                <span className='project_info'>
                  <b>End time:</b> {projectData.project.end_time.substring(0, 10)}
                </span>
                <span className='project_info text-white'>
                  <b className='text-dark'>Target :</b> $
                  {Number(projectData.project.total_target).toFixed(2)}
                </span>
                <span className='project_info'>
                  <b>Category :</b> {projectData.project.category}
                </span>
                <span className='project_info'>
                  <b>Average rating :</b> {avgRate.toFixed(1)} / 5.0{' '}
                  <i className='fa-solid fa-star' style={{ color: 'orange' }}></i>
                </span>
                <span className='project_info text-white'>
                  <b className='text-dark'>Total donation :</b> ${Number(totalDonation).toFixed(2)}
                </span>
                <span className='project_info text-white'>
                  <b className='text-dark'>Number of reports: </b>
                  {projectData.project.project_reports}
                </span>
                <span className='project_info text-white'>
                  <b className='text-dark'>Tags: </b>
                  {projectData.project.tags.map(tag => (
                    <span className='btn btn-info text-dark mx-1 fw-bold'>#{tag}</span>
                  ))}
                </span>
              </div>
              <div className='projectDesc fs-5'>
                <b>Project Details : </b>
                <br />
                <br />
                {projectData.project.details}
              </div>
              <div className='projectActions d-flex justify-content-evenly'>
                <button
                  className='btn btn-warning'
                  data-bs-toggle='modal'
                  data-bs-target='#exampleModal'>
                  Rate Project
                </button>
                <button
                  className='btn btn-success'
                  data-bs-toggle='modal'
                  data-bs-target='#exampleModal2'>
                  Make Donation
                </button>
                <button
                  className='btn btn-primary'
                  data-bs-toggle='modal'
                  data-bs-target='#exampleModal5'>
                  Add Comment
                </button>
                <button
                  className='btn btn-danger'
                  data-bs-toggle='modal'
                  data-bs-target='#exampleModal3'>
                  Report Project
                </button>
              </div>
            </div>
          </div>
          {/* project pictures */}
          <div className='relatedProjects'>
            <p className='text-center fs-1 fw-bold'>Project Pictures</p>
            <div className='row row-cols-1 row-cols-md-2 row-cols-lg-3 g-5 m-auto'>
              <ProjectPictures projectPictures={projectData.picture} />
            </div>
          </div>
          <div className='relatedProjects'>
            <p className='text-center fs-1 fw-bold'>Project Comments</p>
            <div className='row row-cols-1 row-cols-md-2 row-cols-lg-3 g-5 m-auto'>
              <ProjectComments projectData={projectData.project} />
            </div>
          </div>
          <div className='relatedProjects'>
            <p className='text-center fs-1 fw-bold'>Related Projects</p>
            <div className='row row-cols-1 row-cols-md-2 row-cols-lg-3 g-5 m-auto'>
              {projectData.related.slice(0, 5).map(project => {
                if (project.id !== projectData.project.id)
                  return (
                    <div className='mb-4' key={project.id}>
                      <ProjectCard project={project} />
                    </div>
                  );
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
}
