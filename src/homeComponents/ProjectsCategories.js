import { useEffect, useState } from 'react';
import axiosInstance from '../network/axiosConfig';
import 'react-multi-carousel/lib/styles.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './TopFiveProjects.css';
import { Link } from 'react-router-dom';

function ProjectsCategories() {
  const [isLoading, setIsLoading] = useState(true);

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axiosInstance
      .get('projects/categories', { crossdomain: true })
      .then(response => {
        setCategories(response.data);
        setIsLoading(false);
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
      {isLoading ? (
        <div className='d-flex justify-content-center mt-5'>
          <div className='spinner-border' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <ToastContainer
            position='top-right'
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <div className='mx-auto'>
            <h1 className='font-macondo'>Categories</h1>
            <table className='table'>
              {categories.map(category => {
                return (
                  <tbody>
                    <tr>
                      <td>
                        <Link
                          to={'projects/categories/' + category.id}
                          className='text-decoration-none text-dark fs-4'>
                          {category.name}
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
          </div>
        </>
      )}
    </>
  );
}

export default ProjectsCategories;
