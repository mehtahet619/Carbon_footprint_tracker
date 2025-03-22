import React, { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";

const Peakemit = () => {
  const [peakValue, setPeakValue] = useState(null);
  const [LowValue,setLowValue] = useState(null);

  useEffect(() => {
    let interval;

    async function fetchPeakValue() {
      try {
        // Fetch the last 60 records ordered by timestamp (latest first)
        let { data: ppm_data, error } = await supabase
          .from("ppm_data")
          .select("co2_ppm")
          .order("timestamp", { ascending: false })
          .limit(60);

        if (error) throw error;

        if (ppm_data.length > 0) {
          // Extract maximum CO₂ PPM value from the latest 60 records
          const maxValue = Math.max(...ppm_data.map((record) => Number(record.co2_ppm)));
          setPeakValue(maxValue);

          const ppmValues = ppm_data.map((record) => Number(record.co2_ppm));
          setLowValue(Math.min(...ppmValues));
        }
      } catch (error) {
        console.error("Fetching Error:", error.message);
      }
    }

    // Fetch peak value immediately and every 5 seconds
    fetchPeakValue();
    interval = setInterval(fetchPeakValue, 5000);

    return () => clearInterval(interval);
  }, []);

  return (<>
    <div className="p-2 bg-gray-100 rounded-md  mb-4">
    <span className="text-gray-500 text-lg flex justify-between">Peak Emission 
   
    </span>
    
      <p className="text-2xl font-medium text-red-600">
        {peakValue !== null ? `${peakValue} PPM` : "Loading..."}
      </p>
    </div>

    <div className="p-2 bg-gray-100 rounded-md ">
    <span className="text-gray-500 text-lg flex justify-between">Lowest Emission 
   
    </span>
    <p className="text-2xl font-medium text-red-600">
    {peakValue !== null ? `${LowValue} PPM` : "Loading..."}
    </p>
    </div>
    </>
  );
};

export default Peakemit;
