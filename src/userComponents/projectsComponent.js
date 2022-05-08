import React from "react";
import dodo from "../images/1.jpg"
import "./style.css"
export default function ProjectsComponent() {
  return (
    <>
  <div className="col-md-12 offset-md-1 ">
   <div class="row mt-5 text-center ">
  <div class="col-sm-4  mb-2 ">
    <div class="card shadow project">
    <img src={dodo} className="rounded-circle img-fluid px-3 m-auto mt-2 " style={{
                width: '280px',
                height: '220px',
              }}/>
      <div class="card-body">
        <h5 class="card-title">Special title treatment</h5>
        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <button type="button" class="btn btn-outline-primary mb-3">See More Details</button>
      </div>
    </div>
  </div>
  <div class="col-sm-4  mb-2" >
  <div class="card shadow project">
  <img src={dodo} className="rounded-circle img-fluid px-3 m-auto mt-2 " style={{
                width: '280px',
                height: '220px',
              }}/>
      <div class="card-body">
        <h5 class="card-title">Special title treatment</h5>
        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <button type="button" class="btn btn-outline-primary mb-3">See More Details</button>
      </div>
    </div>
  </div>
  <div class="col-sm-4 mb-2">
  <div class="card shadow project">
  <img src={dodo} className="rounded-circle img-fluid px-3 m-auto mt-2 " style={{
                width: '280px',
                height: '220px',
              }}/>
      <div class="card-body">
        <h5 class="card-title">Special title treatment</h5>
        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <button type="button" class="btn btn-outline-primary mb-3">See More Details</button>
      </div>
    </div>
  </div>
 
  
  
  
  

</div>
  </div>
      </>
      );
}


      {/* <div class="row mt-3">
<div class="col-sm-4 mb-2">
  <div class="card  bg-dark text-light">
  <img src={dodo} className="" />

    <div class="card-body">
      <h5 class="card-title">Special title treatment</h5>
      <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
      <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
  </div>
</div> */}