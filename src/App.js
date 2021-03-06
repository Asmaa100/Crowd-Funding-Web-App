import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cookies from 'js-cookie';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login';
import UserProfile from './pages/UserProfile';
import Register from './pages/Register';
import Projects from './pages/Projects';
import ProjectProfile from './pages/ProjectProfile';
import DataContext from './context/data';
import { useState } from 'react';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import AddProjects from './projectComponents/AddProject';
 import ProjectsList from './homeComponents/ProjectsList';

function App() {
  let jwt = Cookies.get('jwt');
  const [userData, setUserData] = useState({});
  const [projectData, setProjectData] = useState({});
  const [isAuth, setIsAuth] = useState(jwt);
  return (
    <DataContext.Provider
      value={{ userData, setUserData, projectData, setProjectData, isAuth, setIsAuth }}>
      {isAuth ? (
        <Router>
          <Navbar />
          <Routes>
            <Route index element={<Home />} />
            <Route path='/register' element={<Register />}></Route>
            <Route path='/profile/*' element={<UserProfile />} />
            <Route path='/projects' element={<Projects />} />
            <Route path='/projects/create' element={<AddProjects />} />
            <Route path='/projects/:id' element={<ProjectProfile />} />
            <Route path='/projects/categories/:id' element={<ProjectsList />} />

            <Route path='*' element={<NotFound />} />
          </Routes>
          <Footer />
        </Router>
      ) : (
        <Router>
          <Navbar />
          <Routes>
            <Route index element={<Home />} />
            <Route path='/login' element={<Login />}></Route>
            <Route path='/register' element={<Register />}></Route>
            <Route path='*' element={<NotFound />} />
          </Routes>
          <Footer />
        </Router>
      )}
    </DataContext.Provider>
  );
}

export default App;
