import React, { createContext, useEffect, useState } from "react";
import { supabase } from "../components/supabaseClient"; 

// Create Context
export const CO2Context = createContext();

export const CO2Provider = ({ children }) => {
  const [ppmData, setPpmData] = useState([]); // Stores last 60 records
  const [govLimits, setGovLimits] = useState([]); // Stores latest limit per industry

  useEffect(() => {
    async function fetchPPM() {
      try {
        // Fetch last 60 records from ppm_data
        let { data: ppmRecords, error: ppmError } = await supabase
          .from("ppm_data")
          .select("co2_ppm, timestamp")
          .order("timestamp", { ascending: false })
          .limit(60);

        if (ppmError) throw ppmError;
        if (ppmRecords.length > 0) setPpmData(ppmRecords);
      } catch (error) {
        console.error("PPM Data Fetch Error:", error);
      }
    }

    async function fetchGovLimits() {
      try {
        // Fetch latest ppm_limit, kg_limit for each unique industry
        let { data: limitRecords, error: limitError } = await supabase
          .from("gov_set_limit")
          .select("ppm_limit, kg_limit, industry, timestamp")
          .order("timestamp", { ascending: false });

        if (limitError) throw limitError;

        // Extract only the latest record per unique industry
        const latestLimits = {};
        limitRecords.forEach((record) => {
          if (!latestLimits[record.industry]) {
            latestLimits[record.industry] = record;
          }
        });

        setGovLimits(Object.values(latestLimits)); // Convert object back to an array
      } catch (error) {
        console.error("Gov Limits Fetch Error:", error);
      }
    }

    fetchPPM();
    fetchGovLimits();

    const interval = setInterval(() => {
      fetchPPM();
      fetchGovLimits();
    }, 2000); // Fetch every 2 sec

    return () => clearInterval(interval);
  }, []);

  return (
    <CO2Context.Provider value={{ ppmData, govLimits }}>
      {children}
    </CO2Context.Provider>
  );
};
