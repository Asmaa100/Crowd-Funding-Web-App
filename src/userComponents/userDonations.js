import React from 'react';
import { useEffect, useState } from 'react';
import DonationsComponent from './donationsComponent';
import axiosInstance from '../network/axiosConfig';
import { toast } from 'react-toastify';

export default function Donations() {
  const [userDonations, setUserDonations] = useState([]);
  useEffect(() => {
    axiosInstance
      .get('/users/userDonations', { withCredentials: true })
      .then(res => {
        setUserDonations(res.data);
      })
      .catch(err => {
        toast.error(Object.values(err.response.data)[0] + '', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  }, []);

  return (
    <>
      <div className='col-md-12 offset-md-1 '>
        <div className='row mt-5 text-center '>
          {userDonations.map(userDonation => {
            return (
              <div className='col-sm-4  mb-2 ' key={userDonation.id}>
                <DonationsComponent userDonation={userDonation} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
