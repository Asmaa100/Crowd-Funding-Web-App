import React, { useEffect, useState } from 'react';
import axiosInstance from '../network/axiosConfig';
import Cookies from 'js-cookie';

function ProjectComments({ projectData }) {
  const [report, setReport] = useState('');
  const [commentId, setCommentId] = useState(0);
  const [comments, setComments] = useState([]);
  let csrftoken = Cookies.get('csrftoken');

  const handleCommentReportChange = e => {
    setReport(e.target.value);
  };

  const handleSubmitCommentReport = e => {
    axiosInstance
      .post(
        `projects/report_comment/${commentId}`,
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
        setCommentId(0);
      })
      .catch(err => {
        console.error(err);
      });
  };

  useEffect(() => {
    axiosInstance
      .get(`/projects/comment/${projectData.id}`, { withCredentials: true })
      .then(res => {
        setComments(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, [report, projectData]);

  return (
    <>
      <div
        className='modal fade'
        id='exampleModal4'
        tabIndex='-1'
        aria-labelledby='exampleModalLabel4'
        aria-hidden='true'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='exampleModalLabel4'>
                Report Comment
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
                onChange={handleCommentReportChange}
              />
            </div>
            <div className='modal-footer'>
              <button type='button' className='btn btn-secondary' data-bs-dismiss='modal'>
                Close
              </button>
              <button
                type='button'
                className='btn btn-primary'
                onClick={handleSubmitCommentReport}
                data-bs-dismiss='modal'>
                Report
              </button>
            </div>
          </div>
        </div>
      </div>

      {comments.length < 1 ? (
        <p className='fs-4 text-center mx-auto fw-bold'>No comments have been added yet</p>
      ) : (
        comments.map(comment => {
          return (
            <div className='mb-4 p-3' key={comment.id}>
              <div className='card bg-light text-dark'>
                <div className='card-header bg-secondary'>
                  <h4 className='card-title text-light'>Comment: {comment.comment}</h4>
                </div>
                <div className='card-body'>
                  <p className='card-text'>Created At: {comment.created.substring(0, 10)}</p>
                  <p className='card-text'>Updated At: {comment.updated.substring(0, 10)}</p>
                  <p className='card-text'>Reports: {comment.comment_reports}</p>
                </div>
                <div className='card-footer d-flex justify-content-center'>
                  <button
                    className='btn btn-danger'
                    data-bs-toggle='modal'
                    data-bs-target='#exampleModal4'
                    onClick={() => {
                      setCommentId(comment.id);
                    }}>
                    Report Comment
                  </button>
                </div>
              </div>
            </div>
          );
        })
      )}
    </>
  );
}

export default ProjectComments;
