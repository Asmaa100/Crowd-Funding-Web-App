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
    <div>
        {userDonations.map((userDonation) => {
          return (
            <div key={userDonation.id}>
              <DonationsComponent userDonation={userDonation}  />
            </div>
            
          );
        })}
    </div>
  );
}

