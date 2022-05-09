import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login';
import UserProfile from './pages/UserProfile';
import Register from './pages/Register';
import Projects from './pages/Projects';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/profile/*' element={<UserProfile />} />
        <Route path='/projects' element={<Projects />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
