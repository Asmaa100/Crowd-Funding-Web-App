import TopFiveProjects from "../homeComponents/TopFiveProjects";
import FiveSelectedProjects from "../homeComponents/LatestFiveProjects";
import FiveFeaturedProjects from "../homeComponents/FiveFeaturedProjects";
import ProjectsCategories from "../homeComponents/ProjectsCategories";
import SearchComponent from "../homeComponents/SearchComponent";
function Home() {
  return (
    <>
      <div>
        <SearchComponent />
      </div>
      <div className="mx-auto my-5">
        <TopFiveProjects />
      </div>

      <div className="w-75 mx-auto my-5">
        <FiveSelectedProjects />
      </div>

      <div className="w-75 mx-auto my-5">
        <FiveFeaturedProjects />
      </div>

      <div className="w-75 mx-auto my-5 text-center">
        <ProjectsCategories />
      </div>
    </>
  );
}

export default Home;
