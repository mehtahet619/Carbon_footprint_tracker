import React, { createContext, useEffect, useState } from "react";
import { supabase } from "../components/supabaseClient"; 

// Create Context
export const CO2Context = createContext();

export const CO2Provider = ({ children }) => {
  const [ppmData, setPpmData] = useState([]); // Stores last 60 records

  useEffect(() => {
    async function fetchPPM() {
      let { data, error } = await supabase
        .from("ppm_data")
        .select("co2_ppm, timestamp")
        .order("timestamp", { ascending: false })
        .limit(60);

      if (error) {
        console.error("Supabase Fetch Error:", error);
        return;
      }

      if (data.length > 0) {
        setPpmData(data); // Reverse to maintain oldest-first order
      }
    }

    fetchPPM();
    const interval = setInterval(fetchPPM, 2000); // Fetch every 2 sec

    return () => clearInterval(interval);
  }, []);

  return (
    <CO2Context.Provider value={{ ppmData }}>
      {children}
    </CO2Context.Provider>
  );
};
