import { Routes, Route } from "react-router-dom";
import Sidebar from "../../components/SidebarAdmin"; // Import Sidebar
import Dashboard from "./dashboard";
import Nav from "../../components/GovMenu"
import SetThreashold from "./SetThreshold"
import Settings from "./setting"



const Org = () => {
  return (
<>


    <Nav />

    <div className="grid grid-cols-10 gap-3 w-full p-4 mx-auto mt-2 container ">

      
      

    <div className="px-2 col-span-2">
      <Sidebar />
    </div>
      

      
      <div className="col-span-8 pr-6 ">
        <Routes>

          <Route path="/Dashboard" element={<Dashboard />} />

          <Route path="/SetThreshold" element={<SetThreashold />} />

          <Route path="/Settings" element={<Settings />} />


          

        </Routes>
      </div>
    </div>

    </>
  );
};

export default Org;
