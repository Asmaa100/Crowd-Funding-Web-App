import './App.css';
import Navbar from "./components/Navbar"
import Footer from './components/Footer';
import {
  BrowserRouter as Router,
  Routes,
  Route,

} from "react-router-dom";
import UserProfile from './pages/UserProfile';

function App() {
  return (
      <Router>
        <Navbar />
        
        <Routes>

          <Route path='/' element={<UserProfile />}></Route>
        </Routes>
        <Footer />
      </Router>
      
  );
}

export default App;
