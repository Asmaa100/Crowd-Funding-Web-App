import { useNavigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';

import { AiFillFlag } from 'react-icons/ai';
import { BsFillCalendarDateFill } from 'react-icons/bs';
import { AiTwotoneMail } from 'react-icons/ai';
import { toast, ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../network/axiosConfig';

export default function InfoComponent({ userData, userImg }) {
  const navigate = useNavigate();

  const userDelete = e => {
    e.preventDefault();
    axiosInstance
      .delete('users/delete', { withCredentials: true })
      .then(res => {
        Cookies.remove('jwt');
        navigate('/');
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
  };

  return (
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
      <div className='col-md-12 offset-md-1 mt-5 shadow'>
        <div className='card card-view'>
          <div className='card-header text-white ' style={{ backgroundColor: '#354f6f' }}>
            <h1 className='text-center py-4 fw-bold'>
              {' '}
              <i className='fa-solid fa-hand-holding-heart nav-icon'></i>
              <i className='fa-solid fa-gift nav-icon'>  </i>
              {/* <i class="fa-solid fa-user"></i> */}{' '}
              {`${userData.first_name} ${userData.last_name}`}{' '}
              <i className='fa-solid fa-dove nav-icon'></i>{' '}
              <i className='fa-solid fa-leaf nav-icon'></i>
            </h1>
          </div>
          <div className='row'>
            <div className='col-md-4'>
              <img
                src={userImg}
                className=' m-5'
                alt=''
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  border: '3px solid #354F6F',
                }}
              />
            </div>
            <div className='col-md-8 d-flex align-items-center'>
              <div className='card-body '>
                <div className='row'>
                  <div className='col-sm-4 border-right '>
                    <div className='description-block'>
                      <h5 className='description-header'>
                        <i className='fa-solid fa-mobile-screen'></i> Mobile:
                      </h5>
                      <p className='description-text mt-3'>{userData.mobile_phone}</p>
                    </div>
                  </div>

                  <div className='col-sm-4 '>
                    <div className='description-block'>
                      <h5 className='description-header'>
                        {' '}
                        <AiFillFlag className='mx-1' />
                        Country{' '}
                      </h5>
                      <p className='description-text mt-3'>{userData.country}</p>
                    </div>
                  </div>
                  <div className='col-sm-4 '>
                    <div className='description-block'>
                      <h5 className='description-header me-5'>
                        <BsFillCalendarDateFill className='me-2' />
                        Birth Date{' '}
                      </h5>
                      <p className='description-text mt-3'>{userData.birthday}</p>
                    </div>
                  </div>
                  <div className='col-sm-3 mt-3'>
                    <button
                      className='btn btn-danger'
                      data-bs-toggle='modal'
                      data-bs-target='#staticBackdrop'>
                      Delete Profile
                    </button>
                  </div>
                  <div className='col-sm-3 mt-3 '>
                    <Link to='/profile/edit'>
                      <button className='btn btn-success'>Edit Profile</button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className='card-footer text-muted row'>
              <div className='col-sm-5 offset-2'>
                <div className='description-block border-end'>
                  <p className='description-header me-5'>
                    <i className='fa-brands fa-facebook btn-lg'></i> Facebook Profile:
                  </p>
                </div>
              </div>
              <div className='col-sm-5 '>
                <div className='description-block'>
                  <p className='description-header me-5'>
                    <AiTwotoneMail className='mx-3' /> Email: {userData.email}{' '}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className='modal fade'
          id='staticBackdrop'
          data-bs-backdrop='static'
          data-bs-keyboard='false'
          tabIndex='-1'
          aria-labelledby='staticBackdropLabel'
          aria-hidden='true'>
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title' id='staticBackdropLabel'>
                  Delete Account
                </h5>
                <button
                  type='button'
                  className='btn-close'
                  data-bs-dismiss='modal'
                  aria-label='Close'></button>
              </div>
              <div className='modal-body'>Are you sure you want to delete?</div>
              <div className='modal-footer'>
                <button type='button' className='btn btn-outline-primary' data-bs-dismiss='modal'>
                  Cancel
                </button>
                <button
                  type='button'
                  className='btn btn-outline-danger'
                  onClick={e => userDelete(e)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
