import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import axiosInstance from '../network/axiosConfig';
import { toast } from 'react-toastify';

let projectId = 0;
export default function ProjectsComponent({ userProject }) {
  // const [projectId,setProjectId] = useState(0);
  let imageUrl = 'http://localhost:8000/static/projects/images/';
  let image = imageUrl + userProject.thumbnail.split('/').at(-1);
  let date = new Date(
    [
      userProject.end_time.substring(5, 7),
      userProject.end_time.substring(8, 10),
      userProject.end_time.substring(0, 4),
    ].join('/')
  ).toLocaleDateString();
  function handelCancelClick(e) {
    projectId = e.target.value;
  }
  function handleCancelProject(e) {
    axiosInstance
      .get(`/projects/${projectId}/cancel`, { withCredentials: true })
      .then(res => console.log(res, projectId))
      .catch(err => {
        toast.error(Object.values(err.response.data)[0] + '', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  }

  return (
    <>
      <div className='card shadow project'>
        <img
          alt=''
          src={image}
          className='rounded-circle img-fluid px-3 m-auto my-2  '
          style={{
            width: '280px',
            height: '220px',
          }}
        />
        <div className='card-body'>
          <h5 className='card-title'>{userProject.title}</h5>
          <p className='card-text'>
            <strong>Project end time: </strong>
            {date}
          </p>
          <p className='card-text'>
            <strong>Total Target:</strong> {Number(userProject.total_target).toFixed(2)}$
          </p>
          <Link to={`/projects/${userProject.id}`} className='btn btn-outline-primary mb-3'>
            See More Details
          </Link>
          {!userProject.is_canceled && (
            <button
              className='btn btn-warning text-white px-2 d-block mx-auto'
              data-bs-toggle='modal'
              value={userProject.id}
              data-bs-target='#cancelExample'
              onClick={e => {
                handelCancelClick(e);
              }}>
              Cancel Project
            </button>
          )}
        </div>
      </div>
      {/* modal cancel */}
      <div
        className='modal fade'
        id='cancelExample'
        tabIndex='-1'
        aria-labelledby='cancelExample'
        aria-hidden='true'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title text-center' id='exampleModalLabel3'>
                Cancel Project
              </h5>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'></button>
            </div>
            <div className='modal-body'>Do you Want To Cancel This Project ?</div>
            <div className='modal-footer'>
              <button type='button' className='btn btn-secondary' data-bs-dismiss='modal'>
                Close
              </button>
              <button
                type='button'
                className='btn btn-danger text-center mx-auto'
                onClick={e => {
                  handleCancelProject(e);
                }}
                data-bs-dismiss='modal'>
                Cancel Project
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* end cancel modal */}
    </>
  );
}
