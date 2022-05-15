import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../network/axiosConfig";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsYoutube } from "react-icons/bs";
function EditProfile({ setEdited }) {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axiosInstance
      .get(`/users/user`, { withCredentials: true })
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  let csrftoken = Cookies.get("csrftoken");
  const phoneRegExp = /^01[0125]\d{8}$/;
  const passwordRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/;
  const usernameRegExp =
    /^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){0,18}[a-zA-Z0-9]$/;
  const fbRegExp = /^(?:(?:http|https):\/\/)?(?:www.)?facebook.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[?\w\-]*\/)?(?:profile.php\?id=(?=\d.*))?([\w\-]*)?/
  const countryRegExp = /^[a-zA-Z]{2,}/

  const history = useNavigate();
  const initialFormData = {
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile_phone: "",
    profile_picture: "",
    fb_profile: "",
    birthday: "",
    country: "",
  };
  const [data, setData] = useState(initialFormData);
  const current = new Date().toISOString().split("T")[0];
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    let newData = { ...data };
    newData["profile_picture"] = e.target.files[0];
    console.log(typeof e.target.files[0]);
    setData(newData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let formData = new FormData();
    
    if (data.username.length > 2 && data.username.length <= 20) {
      formData.append("username", data.username);
    }
  
      formData.append("first_name", data.first_name);
    
      formData.append("last_name", data.last_name);
    
    formData.append("email", data.email);
    if (data.password !== undefined) {
      formData.append("password", data.password);
    }

    formData.append("mobile_phone", data.mobile_phone);

    if (typeof data.profile_picture === "object") {
      formData.append("profile_picture", data.profile_picture);
    }
    formData.append("fb_profile", data.fb_profile);
    formData.append("birthday", data.birthday);
    formData.append("country", data.country);
    axiosInstance
      .put("users/update", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrftoken,
        },
      })
      .then((res) => {
        setEdited(true);
        history("/profile");
      })
      .catch((err) => {
        toast.error(Object.values(err.response.data)[0] + "", {
          position: "top-right",
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
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {isLoading ? (
        <div className="d-flex justify-content-center mt-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <Formik className="w-100"
          initialValues={{
            username: "",
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            confirmPassword: "",
            mobile_phone: "",
            profile_picture: "",
            fb_profile: "",
            birthday: "",
            country: "",
          }}
          validationSchema={Yup.object().shape({
            username: Yup.string()
              .min(3, "userName is invalid")
              .matches(usernameRegExp, "userName is invalid"),

            first_name: Yup.string().min(
              3,
              "Name must be at least 3 characters"
            ),

            last_name: Yup.string().min(
              3,
              "Name must be at least 3 characters"
            ),

            password: Yup.string()
              .min(8, "Password must be at least 8 characters")
              .matches(
                passwordRegExp,
                "Password must be combination of Uppercase, Lowercase, Special Characters and Digits."
              ),
            confirmPassword: Yup.string().oneOf(
              [Yup.ref("password"), null],
              "Passwords must match"
            ),
            mobile_phone: Yup.string().matches(
              phoneRegExp,
              "Please enter a valid Egyptian phone number"
            ),
            country: Yup.string().min(
              2, 
              "Not a valid Country"
            ),
            fb_profile: Yup.string().matches(
              fbRegExp, "Not valid URL"
            ),
            country: Yup.string().matches(
              countryRegExp, "This not a country"
            )
          })}
          render={(
            { errors, touched } //TODO : change render to avoid deprication warning
          ) => (
            <section className="text-center text-lg-start w-75">
              
                    <div className="card cascading-right shadow-lg rounded">
                      <div className="card-body p-5 text-center">
                        <h2 className="fw-bold mb-3" style={{color:"#354f6f",textShadow:"3px 3px 3px #e9ece"}}>Edit Profile</h2>
                        <Form onSubmit={handleSubmit}>
                          {/* first and last name */}
                          <div className="row mt-4">
                            <div className="form-group mx-auto my-1 d-inline-block col">
                              <label htmlFor="username">User Name</label>
                              <Field
                                placeholder={data.username}
                                name="username"
                                type="text"
                                className={
                                  "form-control" +
                                  (errors.username && touched.username
                                    ? " is-invalid"
                                    : "")
                                }
                                onKeyUp={handleChange}
                              />
                              <ErrorMessage
                                name="username"
                                component="div"
                                className="invalid-feedback"
                              />
                            </div>
                            <div className="form-group mx-auto my-1 d-inline-block col">
                              <label htmlFor="first_name">First Name</label>
                              <Field
                                name="first_name"
                                placeholder={data.first_name}
                                type="text"
                                className={
                                  "form-control" +
                                  (errors.first_name && touched.first_name
                                    ? " is-invalid"
                                    : "")
                                }
                                onKeyUp={handleChange}
                              />
                              <ErrorMessage
                                name="first_name"
                                component="div"
                                className="invalid-feedback"
                              />
                            </div>
                            <div className="form-group mx-auto my-1 d-inline-block col">
                              <label htmlFor="last_name">Last Name</label>
                              <Field
                                name="last_name"
                                placeholder={data.last_name}
                                type="text"
                                className={
                                  "form-control" +
                                  (errors.last_name && touched.last_name
                                    ? " is-invalid"
                                    : "")
                                }
                                onKeyUp={handleChange}
                              />
                              <ErrorMessage
                                name="last_name"
                                component="div"
                                className="invalid-feedback"
                              />
                            </div>
                          </div>
                          {/* email */}
                          <div className="row my-1">
                            <div className="form-outline mx-auto w-100">
                              <label
                                className="form-label"
                                htmlFor="form3Example3"
                              >
                                Email address
                              </label>
                              <Field
                                name="email"
                                value={data.email}
                                readOnly
                                type="text"
                                className={"form-control"}
                                onKeyUp={handleChange}
                              />
                              <ErrorMessage
                                name="email"
                                component="div"
                                className="invalid-feedback"
                              />
                            </div>
                          </div>
                          {/* password and confirm password */}
                          <div className="row mb-1">
                            <div className="form-group mx-auto my-1 d-inline-block col">
                              <label
                                className="form-label"
                                htmlFor="form3Example4"
                              >
                                Password
                              </label>
                              <Field
                                name="password"
                                placeholder={data.password}
                                type="password"
                                className={
                                  "form-control" +
                                  (errors.password && touched.password
                                    ? " is-invalid"
                                    : "")
                                }
                                onKeyUp={handleChange}
                              />
                              <ErrorMessage
                                name="password"
                                component="div"
                                className="invalid-feedback"
                              />
                            </div>

                            <div className="form-group mx-auto my-1 d-inline-block col">
                              <label
                                className="form-label"
                                htmlFor="confirmPassword"
                              >
                                Confirm Password
                              </label>
                              <Field
                                name="confirmPassword"
                                placeholder={data.confirmPassword}
                                type="password"
                                className={
                                  "form-control" +
                                  (errors.confirmPassword &&
                                  touched.confirmPassword
                                    ? " is-invalid"
                                    : "")
                                }
                                onKeyUp={handleChange}
                              />
                              <ErrorMessage
                                name="confirmPassword"
                                component="div"
                                className="invalid-feedback"
                              />
                            </div>
                          </div>
                          {/* phone number and image upload */}
                          <div className="row mb-1">
                            <div className="form-group mx-auto my-1 d-inline-block col">
                              <label
                                className="form-label"
                                htmlFor="mobile_phone"
                              >
                                Phone Number
                              </label>
                              <Field
                                name="mobile_phone"
                                type="text"
                                placeholder={data.mobile_phone}
                                className={
                                  "form-control" +
                                  (errors.mobile_phone && touched.mobile_phone
                                    ? " is-invalid"
                                    : "")
                                }
                                onKeyUp={handleChange}
                              />
                              <ErrorMessage
                                name="mobile_phone"
                                component="div"
                                className="invalid-feedback"
                              />
                            </div>
                            <div className="form-group mx-auto my-1 d-inline-block col">
                              <label className="form-label">
                                Profile Picture
                              </label>
                              <input
                                accept="image/*"
                                type="file"
                                className="form-control"
                                id="inputGroupFile02"
                                onChange={handleImageChange}
                              />
                            </div>
                          </div>
                          {/* Extra data starts from here!!! */}
                          <div className="row mb-1">
                            <div className="form-group mx-auto my-1 d-inline-block col">
                              <label className="form-label" htmlFor="birthday">
                                Birthday
                              </label>
                              <input
                                type="date"
                                value={data.birthday}
                                className={"form-control"}
                                onChange={handleChange}
                                name="birthday"
                                max={current}
                              />

                              <ErrorMessage
                                name="birthday"
                                component="div"
                                className="invalid-feedback"
                              />
                            </div>
                            {/*End Birth date and Facebook */}
                            <div className="form-outline mx-auto w-100">
                              <label
                                className="form-label"
                                htmlFor="fb_profile"
                              >
                                Facebook Profile
                              </label>
                              <Field
                                name="fb_profile"
                                type="text"
                                className={
                                  "form-control" +
                                  (errors.fb_profile && touched.fb_profile
                                    ? " is-invalid"
                                    : "")
                                }
                                onKeyUp={handleChange}
                              />
                              <ErrorMessage
                                name="fb_profile"
                                component="div"
                                className="invalid-feedback"
                              />
                            </div>
                            {/*End Facebook Profile and country */}
                          </div>
                          <div className="row mb-1">
                            {/* {CountrySelector()} */}
                            <div className="form-group mx-auto my-1 d-inline-block col">
                              <label className="form-label" htmlFor="country">
                                country
                              </label>
                              <Field
                                name="country"
                                type="text"
                                className={
                                  "form-control" +
                                  (errors.country && touched.country
                                    ? " is-invalid"
                                    : "")
                                }
                                onKeyUp={handleChange}
                              />
                              <ErrorMessage
                                name="country"
                                component="div"
                                className="invalid-feedback"
                              />
                            </div>
                          </div>
                          {/* register and reset */}
                          <div className="form-group mt-4">
                            <button
                              type="button"
                              className="btn btn-primary col-4 mx-3"
                              onClick={(e) => handleSubmit(e)}
                            >
                              Edit
                            </button>

                            <button
                              onClick={() => setData(initialFormData)}
                              type="reset"
                              className="btn btn-danger col-4 mx-2"
                            >
                              Reset
                            </button>
                          </div>
                        </Form>
                      </div>
                    </div>
                  
              
            </section>
          )}
        />
      )}
    </>
  );
}

export default EditProfile;
