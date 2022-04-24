import React from "react";

export default function Footer() {
  return (
      
<div className="container-fluid bg-dark text-white mt-5 p-1 fixed">
                    <div className="d-flex justify-content-between align-items-center mx-4 my-1">
                        <div>
                            <p>GET IN TOUCH</p>
                            <p><i className="fa-solid fa-envelope px-2"></i>ali@gmail.com</p>
                            <p><i className="fa-solid fa-address-card px-2"></i>454-8787-887</p>
                        </div>
                        <button className="btn text-white border border-white px-4 ms-4 h-25">CONTACT ME</button>
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