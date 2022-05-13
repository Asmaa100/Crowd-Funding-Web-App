import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import axiosInstance from '../network/axiosConfig';
import InfoComponent from '../userComponents/InfoComponent';
import Projects from '../pages/UserProjects';
import Donations from '../userComponents/userDonations';
import EditProfile from '../userComponents/editComponent';

export default function UserProfile() {
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userImg, setUserImage] = useState('');

  let imageUrl = 'http://localhost:8000/static/users/images/';
  useEffect(() => {
    axiosInstance
      .get(`/users/user`, { withCredentials: true })
      .then(res => {
        setUserData(res.data);
        setIsLoading(false);
        let imgName = res.data.profile_picture.split('/').at(-1);
        setUserImage(imageUrl + imgName);
        setIsLoading(false);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <div className='d-flex justify-content-center mt-5'>
          <div className='spinner-border' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </div>
        </div>
      ) : (
        <div className='container g-0 row h-100' >
          <div
            className='col-4 d-flex flex-column p-3 text-white profile'
            style={{ minHeight:"100vh",height: 'auto', width: '22%' }}
            >
            <img
              src={userImg}
              className='rounded-circle img-fluid px-3 mb-2'
              style={{ height: '200px', width: '500px' }}
              alt={userImg}
            />
            <p className='text-center fs-3'>{`${userData.first_name} ${userData.last_name}`}</p>
            <hr />
            <ul className='nav nav-pills flex-column mb-auto'>
              <li className='nav-item w-100 mb-2'>
                <Link to='/profile' className='nav-link active' aria-current='page'>
                  Profile
                </Link>
              </li>
              <li className='nav-item w-100 mb-2'>
                <Link to='/profile/projects' className='nav-link text-white'>
                  Projects
                </Link>
              </li>
              <li className='nav-item w-100 mb-2'>
                <Link to='/profile/donations' className='nav-link text-white'>
                  Donations
                </Link>
              </li>
              <li className='nav-item w-100 mb-2'>
                <Link to='/profile/edit' className='nav-link text-white'>
                  Edit Profile
                </Link>
              </li>
            </ul>
          </div>
          <div className='col-8' style={{ width: '78%' }}>
            <Routes>
              <Route path='' element={<InfoComponent userData={userData} userImg={userImg} />} />
              <Route path='projects' element={<Projects />} />
              <Route path='donations' element={<Donations />} />
              <Route path='edit' element={<EditProfile />} />
            </Routes>
          </div>
        </div>
      )}
    </>
  );
}
