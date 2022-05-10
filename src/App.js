import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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
import ComponentsList from './homeComponents/ComponentsList';

function App() {
  const [userData, setUserData] = useState({});
  const [projectData, setProjectData] = useState({});
  return (
    <DataContext.Provider value={{ userData, setUserData, projectData, setProjectData }}>
      <Router>
        <Navbar />
        <Routes>
          <Route index element={<Home />} />
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/profile/*' element={<UserProfile />} />
          <Route path='/projects' element={<Projects />} />
          <Route path='/projects/:id' element={<ProjectProfile />} />
          <Route path='/projects/categories/:id' element={<ComponentsList />} />

          <Route path='*' element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </DataContext.Provider>
  );
}

export default App;
