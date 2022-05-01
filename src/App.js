import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Movies from './pages/Projects';
import Login from './pages/Login';
import UserProfile from './pages/UserProfile';
import MovieItem from './components/project';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/profile/*' element={<UserProfile />} />
        <Route path='/projects' element={<MovieItem />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
