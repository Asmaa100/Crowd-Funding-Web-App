import React from "react";

export default function Footer() {
  return (
      
<div className="container-fluid footer text-secondary shadow">
                    <div className="d-flex flex-wrap justify-content-between align-items-center mx-4 ">
                        <div>
                            <p className="mt-2">GET IN TOUCH</p>
                            <p><i className="fa-solid fa-envelope px-2"></i>ali@gmail.com</p>
                        </div>
                        <button className="btn  border border-dark px-4 ms-4 h-25">CONTACT ME</button>
                        <div>
                            <div className="m-1">
                                <i className="fa-brands fa-linkedin px-2"></i>
                                <i className="fa-brands fa-facebook px-2"></i>
                                <i className="fa-brands fa-twitter px-2"></i>
                            </div>
                            <p>Copyright &copy; 2022 ALi tarek</p>
                        </div>
                    </div>
                </div>
  );
}