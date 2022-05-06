import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../network/axiosConfig';
import dodo from './3.jpg';
import InfoComponent from '../userComponents/InfoComponent';
import ProjectsComponent from '../userComponents/projectsComponent';
import DonationsComponent from '../userComponents/donationsComponent';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default function UserProfile() {
  const [userData, setUserData] = useState([]);
  const [infoDisplay, setInfoDisplay] = useState(true);
  const [projectDisplay, setProjectDisplay] = useState(false);
  const [donationDisplay, setDonationDisplay] = useState(false);
  const [editDisplay, setEditDisplay] = useState(false);
  const [userImg,setUserImage] = useState("")

  let imageUrl = "http://localhost:8000/static/images/"
  useEffect(() => {
    axiosInstance
      .get(`/users/user`, { withCredentials: true })
      .then(res => {
        console.log(res);
        setUserData(res.data);
        let imgName = res.data.profile_picture.split('/').at(-1)
        setUserImage(imageUrl+imgName)
        //let test = userData.profile_picture.split('/',1).at(-1)
      }).then((res)=>{
        // console.log(res.data.profile_picture )
        // let imgName = res.data.profile_picture.split('/').at(-1)
        // console.log(imgName)
      })
      .catch(err => {
        console.error(err);
      });
  }, []);
  // console.log(userData[0]["profile_picture"])
  // let imageName = userData[0]["profile_picture"].split("/").at(-1)
  // console.log(imageName)
  // let imagePath = "../../../../Django/Crowd-Funding-Web-App/users/static/images/"
  // console.log(imagePath+imageName)
  return (
    <>
      <div className='container g-0 row'>
        <div
          className='col-4 d-flex flex-column p-3 text-white profile'
          style={{ height: '100vh', width: '22%' }}>
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
          <hr />
          <div className='dropdown'>
            <a
              href='#'
              className='d-flex align-items-center text-white text-decoration-none dropdown-toggle'
              id='dropdownUser1'
              data-bs-toggle='dropdown'
              aria-expanded='false'>
              <img
                src='https://github.com/mdo.png'
                alt=''
                width='32'
                height='32'
                className='rounded-circle me-2'
              />
              <strong>mdo</strong>
            </a>
            <ul
              className='dropdown-menu dropdown-menu-dark text-small shadow'
              aria-labelledby='dropdownUser1'>
              <li>
                <a className='dropdown-item' href='#'>
                  New project...
                </a>
              </li>
              <li>
                <a className='dropdown-item' href='#'>
                  Settings
                </a>
              </li>
              <li>
                <a className='dropdown-item' href='#'>
                  Profile
                </a>
              </li>
              <li>
                <hr className='dropdown-divider' />
              </li>
              <li>
                <a className='dropdown-item' href='#'>
                  Sign out
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className='col-8' style={{ width: '78%' }}>
          <Routes>
            <Route path='' element={<InfoComponent userData = {userData} userImg={userImg}/>} />
            <Route path='projects' element={<ProjectsComponent />} />
            <Route path='donations' element={<DonationsComponent />} />
          </Routes>
        </div>
      </div>
    </>
  );
}
