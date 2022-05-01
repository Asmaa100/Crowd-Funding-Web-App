import Navbar from "./components/Navbar"
import Footer from './components/Footer';
import Movies from "./pages/Projects"
import {
  BrowserRouter as Router,
  Routes,
  Route,

} from "react-router-dom";
import UserProfile from './pages/UserProfile';
import MovieItem from "./components/project";

function App() {
  return (
      <Router>
        <Navbar />
        <Routes>
          <Route path='/profile/*' element={<UserProfile />}/>
          <Route path="/projects" element= {<MovieItem/>}/>
        </Routes>
        <Footer />
      </Router>
      
  );
}

export default App;
