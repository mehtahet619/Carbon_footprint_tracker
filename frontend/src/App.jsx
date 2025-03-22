import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { supabase } from "./components/supabaseClient"; // Ensure you import your Supabase client

import Home from "./pages/home";
import GovLogin from "./pages/Gov/login";
import OrgLogin from "./pages/Org/login";
import DataDisplay from "./components/DataDisplay";
import { CO2Provider } from "./context/CO2Context"; 

// Keep OrgIndex as the entry point for all Org pages
import OrgIndex from "./pages/Org/index";

function App() {
  return (
    <CO2Provider> {/* ✅ Wrap the entire Router */}
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/Gov" element={<GovLogin />} />
          <Route path="/Org" element={<OrgLogin />} />
          <Route path="/test" element={<DataDisplay />} />

          {/* Org Routes (Handled by OrgIndex with Sidebar) */}
          <Route path="/org/*" element={<OrgIndex />} />
        </Routes>
      </Router>
    </CO2Provider>
  );
}

export default App;
