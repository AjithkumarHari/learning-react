import { Outlet } from "react-router-dom";
import "./App.css";
import NavBar from "./components/navBar.jsx";
import Loader from "./components/Loader.jsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
      <div className="min-h-screen w-full">
        <ToastContainer
          position="bottom-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Loader />
        <NavBar />
        <Outlet />
      </div>
    </>
  );
}

export default App;
