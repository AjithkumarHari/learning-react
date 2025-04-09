import { Outlet } from "react-router-dom";
import "./App.css";
import NavBar from "./components/navBar.jsx";

function App() {

  return (
    <>
      <div className="min-h-screen w-full">
        <NavBar />
        <Outlet />
      </div>
    </>
  );
}

export default App;
