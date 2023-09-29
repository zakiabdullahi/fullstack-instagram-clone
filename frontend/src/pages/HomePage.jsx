import MainContent from "../components/layout/MainContent";
import RightSidebar from "../components/layout/RightSidebar";
import Sidebar from "../components/layout/Sidebar";

const HomePage = () => {
  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      <div className="flex flex-grow">
        <div className="flex flex-col bg-gray-50 p-4 hidden md:block">
          {/* sidebar */}
          <Sidebar />
        </div>

        <div className="flex flex-col flex-grow-3 max-w-3xl bg-white  mx-auto">
          {/* mainContent */}
          <MainContent />
        </div>

        <div className="flex flex-col bg-gray-50 p-4">
          {/* rightSide */}
          <RightSidebar />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
