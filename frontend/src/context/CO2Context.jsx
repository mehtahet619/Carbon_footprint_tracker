import React, { createContext, useEffect, useState } from "react";
import { supabase } from "../components/supabaseClient"; 

// Create Context
export const CO2Context = createContext();

export const CO2Provider = ({ children }) => {
  const [ppmData, setPpmData] = useState([]); // Last 60 records
  const [govLimits, setGovLimits] = useState([]); // Latest limit per industry
  const [predictedData, setPredictedData] = useState([]); // Stores predicted values

  useEffect(() => {







    const fetchPPM = async () => {
      try {
        let { data, error } = await supabase
          .from("ppm_data")
          .select("co2_ppm, timestamp")
          .order("timestamp", { ascending: false })
          .limit(60);

        if (error) throw error;
        if (data?.length > 0) setPpmData(data);
      } catch (error) {
        console.error("PPM Data Fetch Error:", error);
      }
    };

    const fetchGovLimits = async () => {
      try {
        let { data, error } = await supabase
          .from("gov_set_limit")
          .select("ppm_limit, kg_limit, industry, timestamp")
          .order("timestamp", { ascending: false });

        if (error) throw error;

        // Get the latest record per industry
        const latestLimits = {};
        data.forEach((record) => {
          if (!latestLimits[record.industry]) {
            latestLimits[record.industry] = record;
          }
        });

        setGovLimits(Object.values(latestLimits)); 
      } catch (error) {
        console.error("Gov Limits Fetch Error:", error);
      }
    };

    const fetchPredictedData = async () => {
      try {
        let { data, error } = await supabase
          .from("predicted_data")
          .select("co2_ppm, timestamp")
          .order("timestamp", { ascending: false });

        if (error) throw error;
        if (data?.length > 0) setPredictedData(data);
      } catch (error) {
        console.error("Predicted Data Fetch Error:", error);
      }
    };

    // Initial Fetch
    fetchPPM();
    fetchGovLimits();
    fetchPredictedData();

    // Auto-refresh every 10 seconds
    const interval = setInterval(() => {
      fetchPPM();
      fetchGovLimits();
      fetchPredictedData();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <CO2Context.Provider value={{ ppmData, govLimits, predictedData }}>
      {children}
    </CO2Context.Provider>
  );
};
