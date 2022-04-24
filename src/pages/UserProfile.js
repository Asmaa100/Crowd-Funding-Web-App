import React from "react";
import dodo from "./3.jpg"
export default function UserProfile() {
    return (
        <>
            <div className="container-fluid" style={{ height: "70vh" }}>
                <div className="row h-100 ">
                    <div className="col-3 bg-dark text-light my-3 p-4 ms-3 ">
                        <img src={dodo} className="rounded-circle img-fluid " />
                        <div className="text-center mt-2">
                            <h2 > Asma</h2>
                            <h4> Front End</h4>
                        </div>
                        <div>
                            <p>Profile</p>
                            <p>Projects</p>
                            <p>Donations</p>

                        </div>
                        <button className="btn btn-primary"> Edit Profile</button>
                    </div>
                    <div className="col-7 offset-1 bg-dark my-3">
                        <div class="card  mt-4">
                            <div class="card-header">
                                User Data
                            </div>
                            <div class="card-body ">
                                <div class="card-text">
                                    <p>First Name :</p>
                                    <p>Last Name :</p>
                                    <p>Email:</p>
                                    <p>Mobile:</p>
                                    <p>Country:</p>
                                    <p>Birth Date :</p>
                                    <p>Facebook Profile: </p>
                                </div>
                            </div>
                            <div class="card-footer text-muted">
                                2 days ago
                            </div>
                        </div>

                    </div>
                </div>

            </div>

        </>
    );
}