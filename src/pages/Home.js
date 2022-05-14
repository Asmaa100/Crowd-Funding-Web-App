import TopFiveProjects from "../homeComponents/TopFiveProjects";
import FiveSelectedProjects from "../homeComponents/LatestFiveProjects";
import FiveFeaturedProjects from "../homeComponents/FiveFeaturedProjects";
import ProjectsCategories from "../homeComponents/ProjectsCategories";
import SearchComponent from "../homeComponents/SearchComponent";
import WelcomComponent from "../homeComponents/WelcomeComponent";
function Home() {
  return (
    <>
      <div>
        <WelcomComponent />
      </div>

      <div className='w-75 mx-auto'>
      <div className="mb-5">
        <SearchComponent />
      </div>
      <div className="mb-5">
        <TopFiveProjects />
      </div>
      <div>
        <FiveSelectedProjects />
      </div>
      <div className="mb-5">
        <FiveFeaturedProjects />
      </div>
      <div className="mb-5">
        <ProjectsCategories />
      </div>
      </div>
      
    </>
  );
}

export default Home;
