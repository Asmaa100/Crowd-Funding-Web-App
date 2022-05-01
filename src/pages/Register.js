import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function Register() {
  const phoneRegExp = /^01[0125]\d{8}$/;
  const passwordRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/;
  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        attachment: '',
      }}
      validationSchema={Yup.object().shape({
        firstName: Yup.string().required('First Name is required'),

        lastName: Yup.string().required('Last Name is required'),

        email: Yup.string().email('Email is invalid').required('Email is required'),

        password: Yup.string()
          .min(8, 'Password must be at least 8 characters')
          .matches(
            passwordRegExp,
            'Password must be combination of Uppercase, Lowercase, Special Characters and Digits.'
          )
          .required('Password is required'),

        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Passwords must match')
          .required('Confirm Password is required'),

        phoneNumber: Yup.string().matches(
          phoneRegExp,
          'Please enter a valid Egyptian phone number'
        ),

        attachment: Yup.mixed().required('Please enter a profile picture'),
      })}
      onSubmit={fields => {
        alert('SUCCESS!! :-)\n\n' + JSON.stringify(fields, null, 4));
      }}
      render={(
        { errors, touched } //TODO : change render to avoid deprication warning
      ) => (
        <section className='text-center text-lg-start'>
          <div className='container py-3'>
            <div className='row g-0 align-items-center'>
              <div className='col-lg-6 mb-4 mb-lg-0'>
                <div className='card cascading-right shadow-lg rounded'>
                  <div className='card-body p-5 text-center'>
                    <h2 className='fw-bold mb-2'>Sign Up</h2>
                    <Form>
                      {/* first and last name */}
                      <div className='row'>
                        <div className='form-group mx-auto my-1 d-inline-block col'>
                          <label htmlFor='firstName'>First Name</label>
                          <Field
                            name='firstName'
                            type='text'
                            className={
                              'form-control' +
                              (errors.firstName && touched.firstName ? ' is-invalid' : '')
                            }
                          />
                          <ErrorMessage
                            name='firstName'
                            component='div'
                            className='invalid-feedback'
                          />
                        </div>
                        <div className='form-group mx-auto my-1 d-inline-block col'>
                          <label htmlFor='lastName'>Last Name</label>
                          <Field
                            name='lastName'
                            type='text'
                            className={
                              'form-control' +
                              (errors.lastName && touched.lastName ? ' is-invalid' : '')
                            }
                          />
                          <ErrorMessage
                            name='lastName'
                            component='div'
                            className='invalid-feedback'
                          />
                        </div>
                      </div>
                      {/* email */}
                      <div className='row my-1'>
                        <div className='form-outline mx-auto w-100'>
                          <label className='form-label' htmlFor='form3Example3'>
                            Email address
                          </label>
                          <Field
                            name='email'
                            type='text'
                            className={
                              'form-control' + (errors.email && touched.email ? ' is-invalid' : '')
                            }
                          />
                          <ErrorMessage name='email' component='div' className='invalid-feedback' />
                        </div>
                      </div>
                      {/* password and confirm password */}
                      <div className='row mb-1'>
                        <div className='form-group mx-auto my-1 d-inline-block col'>
                          <label className='form-label' htmlFor='form3Example4'>
                            Password
                          </label>
                          <Field
                            name='password'
                            type='password'
                            className={
                              'form-control' +
                              (errors.password && touched.password ? ' is-invalid' : '')
                            }
                          />
                          <ErrorMessage
                            name='password'
                            component='div'
                            className='invalid-feedback'
                          />
                        </div>

                        <div className='form-group mx-auto my-1 d-inline-block col'>
                          <label className='form-label' htmlFor='confirmPassword'>
                            Confirm Password
                          </label>
                          <Field
                            name='confirmPassword'
                            type='password'
                            className={
                              'form-control' +
                              (errors.confirmPassword && touched.confirmPassword
                                ? ' is-invalid'
                                : '')
                            }
                          />
                          <ErrorMessage
                            name='confirmPassword'
                            component='div'
                            className='invalid-feedback'
                          />
                        </div>
                      </div>
                      {/* phone number and image upload */}
                      <div className='row mb-1'>
                        <div className='form-group mx-auto my-1 d-inline-block col'>
                          <label className='form-label' htmlFor='phoneNumber'>
                            Phone Number
                          </label>
                          <Field
                            name='phoneNumber'
                            type='text'
                            className={
                              'form-control' +
                              (errors.phoneNumber && touched.phoneNumber ? ' is-invalid' : '')
                            }
                          />
                          <ErrorMessage
                            name='phoneNumber'
                            component='div'
                            className='invalid-feedback'
                          />
                        </div>
                        <div className='form-group mx-auto my-1 d-inline-block col'>
                          <label className='form-label'>Profile Picture</label>
                          <input type='file' className='form-control' id='inputGroupFile02' />
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
                    </Form>
                  </div>
                </div>
              </div>

              <div className='col-lg-6 mb-5 mb-lg-0'>
                <img src='bg.jpg' className='w-100 rounded-4 shadow-4' alt='' />
              </div>
            </div>
          </div>
        </section>
      )}
    />
  );
}

export default Register;
