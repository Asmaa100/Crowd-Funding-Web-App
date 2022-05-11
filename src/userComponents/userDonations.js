import React from "react";
import { useEffect, useState } from "react";
import DonationsComponent from "./donationsComponent"
import axiosInstance from "../network/axiosConfig";

export default function Donations() {
  const [userDonations, setUserDonations] = useState([]);
  useEffect(() => {
    axiosInstance
      .get("/users/userDonations", { withCredentials: true })
      .then((res) => {
        setUserDonations(res.data);
        // console.log(res.data)
    })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="col-md-12 offset-md-1 ">
      <div className="row mt-5 text-center ">
        {userDonations.map((userDonation) => {
          return (
            <div className="col-sm-4  mb-2 " key={userDonation.id}>
              <DonationsComponent userDonation={userDonation}  />
            </div>
            
          );
        })}
    </div>
    </div>
  );
}

