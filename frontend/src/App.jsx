import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { supabase } from './components/supabaseClient'; // Ensure you import your Supabase client
import Home from './pages/home';

import GovIndex from './pages/Gov/index';
import OrgIndex from './pages/Org/index';

import DataDisplay from './components/DataDisplay';

function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Gov/*" element={<GovIndex />} />
          <Route path="/Org/*" element={<OrgIndex />} />
          <Route path="/test" element={<DataDisplay />} />
        </Routes>
      </Router>

      {/* Button to trigger OAuth login */}
    
    </>
  );
}

export default App;
