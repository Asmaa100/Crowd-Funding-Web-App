import React from 'react';
import './style.css';
import { useEffect, useState } from 'react';
import axiosInstance from '../network/axiosConfig';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ProjectsComponent({ userDonation }) {
  const [projectDonation, setProjectDonation] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get(`/projects/${userDonation.project}`, { withCredentials: true })
      .then(res => {
        setProjectDonation(res.data);
        setIsLoading(false);
        // console.log(res.data)
      })
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
  }, [userDonation.project]);

  let date = new Date(
    [
      userDonation.date.substring(5, 7),
      userDonation.date.substring(8, 10),
      userDonation.date.substring(0, 4),
    ].join('/')
  ).toLocaleDateString();
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
          <ToastContainer
            position='top-right'
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <div className='card shadow donations text-light'>
            <div className='card-body'>
              <h5 className='card-title m-1'>
                {' '}
                <strong>Project Name :</strong> {projectDonation.project.title}
              </h5>

              <h5 className='my-2'>
                <strong>Amount of Donation :</strong>
                {userDonation.donation}
              </h5>

              <h5 className='card-text my-2'>
                <strong>Date:</strong>
                {date}
              </h5>
            </div>
          </div>
        </>
      )}
    </>
  );
}
