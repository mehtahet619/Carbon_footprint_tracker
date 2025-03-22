import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../components/supabaseClient';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from '../Org/home'

import GoogleOAUTH from '../../components/GoogleOAUTH'

const OrgLogin = () => {
  const navigate = useNavigate();


  return (
  <>


  <GoogleOAUTH />


      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          
        </Routes>
      </Router>



    </>
  );
};

export default OrgLogin;