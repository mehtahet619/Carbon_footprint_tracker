import React, { useEffect, useState } from "react";
import LiveData from "../../components/DataDisplay";
import Peakemit from "../../components/Peakemit";
import { supabase } from "../../components/supabaseClient"; 

const Dashboard = () => {
  const [ppm, setPPM] = useState(null);
  const [previousPPM, setPreviousPPM] = useState(null);
  const [ppmRate, setPPMRate] = useState(0);
  const [dailyCO2, setDailyCO2] = useState(0);

  const CO2_THRESHOLD_PPM = 5000;  // Live threshold for PPM
  const CO2_THRESHOLD_KG = 100;    // Daily CO₂ emission limit (kg)
  const AIRFLOW_RATE = 0.1;        // Chimney airflow rate (cubic meters per second)

  // Convert PPM to CO₂ mass in kg per second
  const co2Mass = ppm ? ((ppm * 44) / 1_000_000) * AIRFLOW_RATE : 0;

  useEffect(() => {
    let interval;

    async function fetchPPM() {
      let { data, error } = await supabase
        .from("ppm_data")
        .select("co2_ppm")
        .order("timestamp", { ascending: false })
        .limit(1);

      if (error) {
        console.error(error);
        return;
      }

      if (data.length > 0) {
        const latestPPM = Number(data[0].co2_ppm);

        if (previousPPM !== null) {
          const rate = (latestPPM - previousPPM) / 5;
          setPPMRate(rate);
        }

        setPreviousPPM(latestPPM);
        setPPM(latestPPM);
      }
    }

    fetchPPM();
    interval = setInterval(fetchPPM, 6000);

    return () => clearInterval(interval);
  }, [previousPPM]);

  // Fetch total daily CO₂ emissions from the chimney
  useEffect(() => {
    async function fetchDailyCO2() {
      try {
        const today = new Date().toISOString().split("T")[0];

        let { data: ppm_data, error } = await supabase
          .from("ppm_data")
          .select("co2_ppm, timestamp")
          .gte("timestamp", `${today}T00:00:00.000Z`)
          .lte("timestamp", `${today}T23:59:59.999Z`);

        if (error) throw error;

        if (ppm_data.length > 0) {
          const totalCO2 = ppm_data.reduce((sum, record) => {
            const ppm = Number(record.co2_ppm);
            const co2_kg = (ppm * 44 / 1_000_000) * AIRFLOW_RATE;
            return sum + co2_kg;
          }, 0);

          setDailyCO2(totalCO2);
        }
      } catch (error) {
        console.error("Fetching Error:", error.message);
      }
    }

    fetchDailyCO2();
    const interval = setInterval(fetchDailyCO2, 60000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    
        {/* Live CO₂ Emission Data */}
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col col-span-3">
          <div className="text-left mb-2 text-gray-500 text-lg">CO₂ Live Emission Data</div>
          <LiveData />
        </div>

        {/* Peak Emission */}
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-500 text-lg">Peak Emission Today</span>
          </div>
          <p className="text-2xl font-bold">
            <Peakemit />
          </p>
        </div>

        {/* Live PPM Threshold Alert */}
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-500 text-lg">Live PPM Threshold</span>
          </div>
          <p className={`text-2xl font-bold ${ppm > CO2_THRESHOLD_PPM ? "text-red-600" : "text-green-600"}`}>
            {ppm > CO2_THRESHOLD_PPM ? `Alert: ${ppm} PPM (Exceeded!)` : `${ppm} PPM (Safe)`}
          </p>
        </div>

        {/* Daily CO₂ Emission Tracker */}
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-500 text-lg">Daily CO₂ Emission</span>
          </div>
          <p className={`text-2xl font-bold ${dailyCO2 > CO2_THRESHOLD_KG ? "text-red-600" : "text-green-600"}`}>
            {dailyCO2.toFixed(2)} kg {dailyCO2 > CO2_THRESHOLD_KG ? "(Threshold Exceeded!)" : "(Safe)"}
          </p>
        </div>

        {/* CO₂ Monitoring Stats */}
        <div className="bg-white p-6 col-span-2 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex flex-row justify-between">CO₂ Monitoring</h2>
          
          <p className="text-lg">Current PPM: {ppm ?? "Loading..."}</p>
          <p className="text-lg">PPM Change Rate: {ppmRate.toFixed(2)} PPM/sec</p>
          <p className="text-lg">CO₂ Mass (per sec): {co2Mass.toFixed(4)} kg</p>
          <p className="text-lg">Total Daily CO₂: {dailyCO2.toFixed(2)} kg</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
