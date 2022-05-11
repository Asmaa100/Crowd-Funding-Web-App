import React, { useEffect, useState } from 'react';

import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axiosInstance from '../network/axiosConfig';
import Cookies from 'js-cookie';

function AddProjects() {
  let csrftoken = Cookies.get('csrftoken');
  const initialFormData = {
    title: '',
    details: '',
    end_time: '',
    total_target: '',
    category_id: 0,
    tags: [],
    thumbnail: '',
    profile_pics: [],
  };

  const date = new Date();
  const [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];

  const [data, setData] = useState(initialFormData);
  const [category, setCategory] = useState([]);

  const handleSubmit = e => {
    e.preventDefault();

    let formData = new FormData();
    formData.append('title', data.title);
    formData.append('details', data.details);
    formData.append('end_time', data.end_time);
    formData.append('total_target', data.total_target);
    formData.append('category', data.category_id);
    formData.append('tags[]', data.tags);
    formData.append('thumbnail', data.thumbnail);
    for (let index = 0; index < data.profile_pics.length; index++) {
      formData.append('pictures', data.profile_pics[index]);
    }

    axiosInstance
      .post(`/projects/create`, formData, {
        headers: {
          'X-CSRFToken': csrftoken,
        },
        withCredentials: true,
      })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  };

  const handleCategoryChange = e => {
    let v = e.target.value;
    let newData = { ...data };
    newData['category_id'] = v;
    console.log(newData['category_id']);
    setData(newData);
    console.log(data);
  };

  const handleChange = e => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleThumbnailChange = e => {
    let newData = { ...data };
    newData['thumbnail'] = e.target.files[0];
    setData(newData);
  };

  const handleProjectPicturesChange = e => {
    let newData = { ...data };
    newData['profile_pics'] = e.target.files;
    setData(newData);
    console.log(newData['profile_pics'].length);
  };

  const handleTagChange = e => {
    let newData = { ...data };
    let target = e.target.value.split('#').slice(1);
    newData['tags'] = target;
    setData(newData);
    console.log(data);
  };

  useEffect(() => {
    axiosInstance
      .get(`/projects/categories`)
      .then(res => {
        setCategory(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  return (
    <Formik
      initialValues={{
        title: '',
        details: '',
        total_target: '',
        category: '',
        tags: '',
        thumbnail: '',
      }}
      validationSchema={Yup.object().shape({
        title: Yup.string().min(5, 'Title must be 5 chars at least').required('Title is required'),

        details: Yup.string()
          .min(20, 'Details must be 20 chars at least')
          .required('Project details are required'),

        total_target: Yup.number().moreThan(0).required('you must add a donation'),

        tags: Yup.string().min(3, 'At least 3 chars').required('You must add tags'),

        thumbnail: Yup.mixed().required('Please enter a profile picture'),
      })}
      render={(
        { errors, touched } //TODO : change render to avoid deprication warning
      ) => (
        <section className='text-center text-lg-start'>
          <div className='container py-3'>
            <div className='row g-0 align-items-center'>
              <div className=' mb-4 mb-lg-0'>
                <div className='card cascading-right shadow-lg rounded'>
                  <div className='card-body p-5 text-center'>
                    <h2 className='fw-bold mb-2'>Add Project</h2>
                    <Form onSubmit={handleSubmit}>
                      {/* title and details */}
                      <div className='row'>
                        <div className='form-group mx-auto my-1 d-inline-block col'>
                          <label htmlFor='title'>Project Title</label>
                          <Field
                            name='title'
                            type='text'
                            className={
                              'form-control' + (errors.title && touched.title ? ' is-invalid' : '')
                            }
                            onKeyUp={handleChange}
                          />
                          <ErrorMessage name='title' component='div' className='invalid-feedback' />
                        </div>
                        <div className='form-group mx-auto my-1 d-inline-block col'>
                          <label htmlFor='firstName'>Project Details</label>
                          <Field
                            name='details'
                            type='text'
                            className={
                              'form-control' +
                              (errors.details && touched.details ? ' is-invalid' : '')
                            }
                            onKeyUp={handleChange}
                          />
                          <ErrorMessage
                            name='details'
                            component='div'
                            className='invalid-feedback'
                          />
                        </div>
                      </div>
                      {/* end_date and target */}
                      <div className='row my-1'>
                        <div className='form-group mx-auto my-1 d-inline-block col'>
                          <label htmlFor='end_time'>Project End Time</label>
                          <input
                            name='end_time'
                            type='date'
                            min={`${year}-0${month + 1}-${day}`}
                            className='form-control'
                            onChange={handleChange}
                          />
                        </div>
                        <div className='form-outline mx-auto col'>
                          <label className='form-label' htmlFor='form3Example3'>
                            Project Total Target
                          </label>
                          <Field
                            name='total_target'
                            type='number'
                            className={
                              'form-control' +
                              (errors.total_target && touched.total_target ? ' is-invalid' : '')
                            }
                            onKeyUp={handleChange}
                          />
                          <ErrorMessage
                            name='total_target'
                            component='div'
                            className='invalid-feedback'
                          />
                        </div>
                      </div>
                      {/* category and tags */}
                      <div className='row mb-1'>
                        <div className='form-group mx-auto my-1 d-inline-block col'>
                          <label className='form-label' htmlFor='form3Example4'>
                            Project Category
                          </label>
                          <select
                            name='category'
                            aria-label='Default select example'
                            className='form-select'
                            onChange={handleCategoryChange}>
                            <option value={'None'} hidden>
                              Choose your category
                            </option>
                            {category.map(cat => (
                              <option value={cat.id} key={cat.id}>
                                {cat.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className='form-group mx-auto my-1 d-inline-block col'>
                          <label htmlFor='tags'>Project Tags</label>
                          <Field
                            name='tags'
                            type='text'
                            className={
                              'form-control' + (errors.tags && touched.tags ? ' is-invalid' : '')
                            }
                            onKeyUp={handleTagChange}
                            placeholder='please separate your tags with #'
                          />
                          <ErrorMessage name='tags' component='div' className='invalid-feedback' />
                        </div>
                        {/* thumbnail and profile pics */}
                        <div className='row'>
                          <div className='form-group mx-auto my-1 d-inline-block col'>
                            <label className='form-label'>Thumbnail</label>
                            <input
                              accept='image/*'
                              type='file'
                              className='form-control'
                              id='inputGroupFile02'
                              onChange={handleThumbnailChange}
                            />
                          </div>
                          <div className='form-group mx-auto my-1 d-inline-block col'>
                            <label className='form-label'>Project Pictures</label>
                            <input
                              accept='image/*'
                              multiple
                              type='file'
                              className='form-control'
                              id='inputGroupFile02'
                              onChange={handleProjectPicturesChange}
                            />
                          </div>
                        </div>
                      </div>
                      {/* add project */}
                      <div className='form-group'>
                        <button type='submit' className='btn btn-primary mx-2'>
                          Save Project
                        </button>
                      </div>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    />
  );
}

export default AddProjects;
