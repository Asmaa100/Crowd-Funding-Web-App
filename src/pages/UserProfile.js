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
  const [projectIsActive, setProjectIsActive] = useState(false);
  const [donationIsActive, setDonationIsActive] = useState(false);
  const [editIsActive, setEditIsActive] = useState(false);
  const [profileIsActive, setProfileIsActive] = useState(true);

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

  const changeActivity = component => {
    switch (component) {
      case 'Profile':
        setProfileIsActive(true);
        setProjectIsActive(false);
        setDonationIsActive(false);
        setEditIsActive(false);
        break;
      case 'Donation':
        setProfileIsActive(false);
        setProjectIsActive(false);
        setDonationIsActive(true);
        setEditIsActive(false);
        break;
      case 'Edit':
        setProfileIsActive(false);
        setProjectIsActive(false);
        setDonationIsActive(false);
        setEditIsActive(true);
        break;
      case 'Project':
        setProfileIsActive(false);
        setProjectIsActive(true);
        setDonationIsActive(false);
        setEditIsActive(false);
        break;

      default:
        break;
    }
  };

  return (
    <>
      {isLoading ? (
        <div className='d-flex justify-content-center mt-5'>
          <div className='spinner-border' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </div>
        </div>
      ) : (
        <div className='container g-0 row h-100'>
          <div
            className='col-4 d-flex flex-column p-3 text-white profile'
            style={{ minHeight: '100vh', height: 'auto', width: '22%' }}>
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
                <Link
                  to='/profile'
                  className={'nav-link text-white' + (profileIsActive ? ' active ' : ' ')}
                  aria-current='page'
                  onClick={() => {
                    changeActivity('Profile');
                  }}>
                  Profile
                </Link>
              </li>
              <li className='nav-item w-100 mb-2'>
                <Link
                  to='/profile/projects'
                  className={'nav-link text-white' + (projectIsActive ? ' active ' : '')}
                  onClick={() => {
                    changeActivity('Project');
                  }}>
                  Projects
                </Link>
              </li>
              <li className='nav-item w-100 mb-2'>
                <Link
                  to='/profile/donations'
                  className={'nav-link text-white' + (donationIsActive ? ' active ' : '')}
                  onClick={() => {
                    changeActivity('Donation');
                  }}>
                  Donations
                </Link>
              </li>
              <li className='nav-item w-100 mb-2'>
                <Link
                  to='/profile/edit'
                  className={'nav-link text-white' + (editIsActive ? ' active ' : '')}
                  onClick={() => {
                    changeActivity('Edit');
                  }}>
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
