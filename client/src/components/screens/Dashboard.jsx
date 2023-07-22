import Header from "../Header";
import Sidebar from "../Sidebar";

function Dashboard() {
  return (
    <div className="min-h-screen p-6 flex flex-col gap-5 xs:flex-row xs:gap-0">
      <Sidebar />
      <div className="w-full">
        <Header />
        <div className="ml-4 font-dmsans">
          Imagine a beautiful dashboard
          <img
            src="https://media.giphy.com/media/QIiqoufLNmWo8/giphy.gif"
            alt="spongbob imagination GIF"
            className="mt-4"
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
