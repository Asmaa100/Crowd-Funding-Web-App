import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function Login() {
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email('Email is invalid').required('Email is required'),
        password: Yup.string()
          .min(6, 'Password must be at least 6 characters')
          .required('Password is required'),
      })}
      onSubmit={fields => {
        alert('SUCCESS!! :-)\n\n' + JSON.stringify(fields, null, 4));
      }}
      render={({ errors, touched }) => (
        <section className='text-center text-lg-start'>
          <div className='container py-3'>
            <div className='row g-0 align-items-center'>
              <div className='col-lg-6 mb-4 mb-lg-0'>
                <div className='card cascading-right shadow-lg rounded'>
                  <div className='card-body p-5 text-center'>
                    <h2 className='fw-bold mb-3'>Login</h2>
                    <Form>
                      <div className='form-outline mb-3'>
                        <label className='form-label' htmlFor='form3Example3'>
                          Email address
                        </label>
                        <Field
                          name='email'
                          type='text'
                          className={
                            'form-control w-75 mx-auto' +
                            (errors.email && touched.email ? ' is-invalid' : '')
                          }
                        />
                        <ErrorMessage name='email' component='div' className='invalid-feedback' />
                      </div>

                      <div className='form-outline mb-3'>
                        <label className='form-label' htmlFor='form3Example4'>
                          Password
                        </label>
                        <Field
                          name='password'
                          type='password'
                          className={
                            'form-control w-75 mx-auto' +
                            (errors.password && touched.password ? ' is-invalid' : '')
                          }
                        />
                        <ErrorMessage
                          name='password'
                          component='div'
                          className='invalid-feedback'
                        />
                      </div>

                      <button type='submit' className='btn btn-dark btn-block mb-4'>
                        Login
                      </button>

                      <div className='text-center'>
                        <p>or sign up with:</p>
                        <button type='button' className='btn btn-link btn-floating mx-1'>
                          <i className='fab fa-facebook-f'></i>
                        </button>

                        <button type='button' className='btn btn-link btn-floating mx-1'>
                          <i className='fab fa-google'></i>
                        </button>

                        <button type='button' className='btn btn-link btn-floating mx-1'>
                          <i className='fab fa-twitter'></i>
                        </button>

                        <button type='button' className='btn btn-link btn-floating mx-1'>
                          <i className='fab fa-github'></i>
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

export default Login;
