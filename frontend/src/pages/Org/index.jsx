import { Routes, Route } from "react-router-dom";
import Sidebar from "../../components/Sidebar"; // Import Sidebar
import Dashboard from "./dashboard";
import Alerts from "./alerts";
import Settings from "./settings";
import Nav from '../../components/OrgMenu'
import Threshold from '../Org/threashold'
import Prediction from "./prediction";
import AiRecomendation from './AiRecomendation'

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
          <Route path="/Alerts" element={<Alerts />} />
          <Route path="/Settings" element={<Settings />} />
          <Route path="/threshold" element={<Threshold />} />
          <Route path="/Prediction" element={<Prediction />} />
          <Route path="/AiRecomendation" element={<AiRecomendation />} />

          

        </Routes>
      </div>
    </div>

    </>
  );
};

export default Org;
