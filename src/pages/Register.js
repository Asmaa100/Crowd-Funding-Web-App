import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axiosInstance from '../network/axiosConfig';

function Register() {
  const phoneRegExp = /^01[0125]\d{8}$/;
  const passwordRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/;
  const emailRegExp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/i;
  const usernameRegExp = /^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){1,18}[a-zA-Z0-9]$/;

  const history = useNavigate();
  const initialFormData = {
    username: null,
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    confirmPassword: null,
    phoneNumber: null,
    attachment: null,
  };

  const intialFormErrors = {
    usernameError: null,
    firstNameError: null,
    lastNameError: null,
    emailError: null,
    passwordError: null,
    confirmPasswordError: null,
    phoneNumberError: null,
    attachmentError: 'required',
  };

  const [data, setData] = useState(initialFormData);
  const [errors, setErrors] = useState(intialFormErrors);
  const [isValid, setIsValid] = useState(true);

  const handleChange = e => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleBlur = e => {
    switch (e.target.name) {
      case 'username': //TODO: unique values
        setErrors({
          ...errors,
          usernameError:
            e.target.value.length === 0
              ? 'Required'
              : !e.target.value.match(usernameRegExp)
              ? 'Username is invalid'
              : null,
        });
        break;

      case 'firstName':
        setErrors({
          ...errors,
          firstNameError:
            e.target.value.length === 0
              ? 'Required'
              : e.target.value.length < 5 || e.target.value > 20
              ? 'Firstname is invalid'
              : null,
        });
        break;

      case 'lastName':
        setErrors({
          ...errors,
          lastNameError:
            e.target.value.length === 0
              ? 'Required'
              : e.target.value.length < 5 || e.target.value > 20
              ? 'Lastname is invalid'
              : null,
        });
        break;

      case 'email':
        setErrors({
          ...errors,
          emailError:
            e.target.value.length === 0
              ? 'Required'
              : !e.target.value.match(emailRegExp)
              ? 'Invalid'
              : null,
        });
        break;

      case 'password':
        setErrors({
          ...errors,
          passwordError:
            e.target.value.length === 0
              ? 'Required'
              : !e.target.value.match(passwordRegExp)
              ? 'Please enter a strong password'
              : null,
        });
        break;

      case 'confirmPassword':
        setErrors({
          ...errors,
          confirmPasswordError:
            e.target.value.length === 0
              ? 'Required'
              : e.target.value !== data.password
              ? 'Passwords do not match'
              : null,
        });
        break;

      case 'phoneNumber':
        setErrors({
          ...errors,
          phoneNumberError:
            e.target.value.length === 0
              ? 'Required'
              : !e.target.value.match(phoneRegExp)
              ? 'Please enter a valid Egyptian mobile number'
              : null,
        });
        break;

      default:
        break;
    }
  };

  const handleImageChange = e => {
    let newData = { ...data };
    if (e.target.files[0]) {
      newData['attachment'] = e.target.files[0];
      setData(newData);
      setErrors({
        ...errors,
        attachmentError: null,
      });
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(isValid);

    if (isValid) {
      let formData = new FormData();
      formData.append('username', data.username);
      formData.append('first_name', data.firstName);
      formData.append('last_name', data.lastName);
      formData.append('email', data.email);
      formData.append('password', data.password);
      formData.append('mobile_phone', data.phoneNumber);
      formData.append('profile_picture', data.attachment);

      axiosInstance
        .post('users/register', formData)
        .then(res => {
          history('/login');
        })
        .catch(err => {
          alert(Object.values(err.response.data)[0] + '');
        });
    } else {
      console.log(errors);
      alert('Please check your data');
    }
  };

  useEffect(() => {
    let errArray = [];
    Object.values(errors).forEach(err => {
      if (err !== null) {
        errArray.push(err);
      }
    });

    errArray ? setIsValid(true) : setIsValid(false);

    Object.values(data).forEach(datum => {
      if (datum === null) {
        setIsValid(false);
        return;
      }
    });
  }, [errors, data]);

  return (
    <section className='text-center text-lg-start'>
      <div className='container py-3'>
        <div className='row g-0 align-items-center'>
          <div className='col-lg-6 mb-4 mb-lg-0'>
            <div className='card cascading-right shadow-lg rounded'>
              <div className='card-body p-5 text-center'>
                <h2 className='fw-bold mb-2'>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                  {/* user, first and last name */}
                  <div className='row'>
                    <div className='form-group mx-auto my-1 d-inline-block col'>
                      <label htmlFor='firstName'>User Name</label>
                      <input
                        name='username'
                        type='text'
                        className={`form-control ${errors.usernameError ? 'border-danger' : ''}`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.usernameError && (
                        <span className='text-danger form-text'>{errors.usernameError}</span>
                      )}
                    </div>
                    <div className='form-group mx-auto my-1 d-inline-block col'>
                      <label htmlFor='firstName'>First Name</label>
                      <input
                        name='firstName'
                        type='text'
                        className={`form-control ${errors.firstNameError ? 'border-danger' : ''}`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.firstNameError && (
                        <span className=' text-danger form-text'>{errors.firstNameError}</span>
                      )}
                    </div>
                    <div className='form-group mx-auto my-1 d-inline-block col'>
                      <label htmlFor='lastName'>Last Name</label>
                      <input
                        name='lastName'
                        type='text'
                        className={`form-control ${errors.lastNameError ? 'border-danger' : ''}`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.lastNameError && (
                        <span className=' text-danger form-text'>{errors.lastNameError}</span>
                      )}
                    </div>
                  </div>
                  {/* email */}
                  <div className='row my-1'>
                    <div className='form-outline mx-auto w-100'>
                      <label className='form-label' htmlFor='form3Example3'>
                        Email address
                      </label>
                      <input
                        name='email'
                        type='text'
                        className={`form-control ${errors.emailError ? 'border-danger' : ''}`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.emailError && (
                        <span className=' text-danger form-text'>{errors.emailError}</span>
                      )}
                    </div>
                  </div>
                  {/* password and confirm password */}
                  <div className='row mb-1'>
                    <div className='form-group mx-auto my-1 d-inline-block col'>
                      <label className='form-label' htmlFor='form3Example4'>
                        Password
                      </label>
                      <input
                        name='password'
                        type='password'
                        className={`form-control ${errors.passwordError ? 'border-danger' : ''}`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.passwordError && (
                        <span className=' text-danger form-text'>{errors.passwordError}</span>
                      )}
                    </div>

                    <div className='form-group mx-auto my-1 d-inline-block col'>
                      <label className='form-label' htmlFor='confirmPassword'>
                        Confirm Password
                      </label>
                      <input
                        name='confirmPassword'
                        type='password'
                        className={`form-control ${
                          errors.confirmPasswordError ? 'border-danger' : ''
                        }`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.confirmPasswordError && (
                        <span className=' text-danger form-text'>
                          {errors.confirmPasswordError}
                        </span>
                      )}
                    </div>
                  </div>
                  {/* phone number and image upload */}
                  <div className='row mb-1'>
                    <div className='form-group mx-auto my-1 d-inline-block col'>
                      <label className='form-label' htmlFor='phoneNumber'>
                        Phone Number
                      </label>
                      <input
                        name='phoneNumber'
                        type='text'
                        className={`form-control ${errors.phoneNumberError ? 'border-danger' : ''}`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.phoneNumberError && (
                        <span className='text-danger form-text'>{errors.phoneNumberError}</span>
                      )}
                    </div>
                    <div className='form-group mx-auto my-1 d-inline-block col'>
                      <label className='form-label'>Profile Picture</label>
                      <input
                        accept='image/*'
                        type='file'
                        className='form-control'
                        id='inputGroupFile02'
                        onChange={handleImageChange}
                        onBlur={handleBlur}
                      />
                      {errors.attachmentError && (
                        <span className=' text-danger form-text'>{errors.attachmentError}</span>
                      )}
                    </div>
                  </div>
                  {/* register and reset */}
                  <div className='form-group'>
                    <button type='submit' className='btn btn-primary mx-2'>
                      Register
                    </button>
                    <button type='reset' className='btn btn-secondary mx-2'>
                      Reset
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className='col-lg-6 mb-5 mb-lg-0'>
            <img src='bg.jpg' className='w-100 rounded-4 shadow-4' alt='' />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
