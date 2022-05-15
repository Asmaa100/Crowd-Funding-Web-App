import { Link } from 'react-router-dom';
import './TopFiveProjects.css';

function WelcomComponent() {
    
    return (
        <div className="m-5 row">
            <div className="col-7">
                <img className="my-img" src="crowdfunding.png" alt="..." />
            </div>
            <div className="col-5 m-auto text-center">
                <h1 className='font-arial'>CHARITY SEES THE NEED<span className="text-red"> NOT </span>THE CAUSE.</h1>
                <Link className="my-btn btn btn-light" to="/projects">
                    <span>Get Started!</span>
                </Link>
            </div>
        </div>
    );
}

export default WelcomComponent;
