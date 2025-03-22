import React, { useState, useContext, useEffect } from "react";
import LiveData from "../../components/DataDisplay";
import Peakemit from "../../components/Peakemit";
import aiLogo from "../../components/ai_logo.jpg";
import ReactSpeedometer from "react-d3-speedometer";
import { CO2Context } from "../../context/CO2Context";

const Dashboard = () => {





  const { ppmData } = useContext(CO2Context); // ✅ Get ppmData from context

  const [previousPPM, setPreviousPPM] = useState(null);
  const [ppmRate, setPPMRate] = useState(0);
  const [dailyCO2, setDailyCO2] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const CO2_THRESHOLD_PPM = 4000; // PPM alert threshold
  const CO2_THRESHOLD_KG = 100;   // Daily CO₂ emission limit (kg)
  const AIRFLOW_RATE = 0.1;       // Chimney airflow rate (cubic meters per second)

  // Extract the latest PPM from context data
  const latestPPM = ppmData.length > 0 ? ppmData[0].co2_ppm : null;

  // Calculate the PPM change rate
  useEffect(() => {
    if (latestPPM !== null) {
      if (previousPPM !== null) {
        const rate = (latestPPM - previousPPM) / 5;
        setPPMRate(rate);
      }
      setPreviousPPM(latestPPM);
    }
  }, [latestPPM]);

  // Convert PPM to CO₂ mass in kg per second
  const co2Mass = latestPPM ? ((latestPPM * 44) / 1_000_000) * AIRFLOW_RATE : 0;

  // Calculate total daily CO₂ emissions using context data
  useEffect(() => {
    if (ppmData.length > 0) {
      const totalCO2 = ppmData.reduce((sum, record) => {
        const ppm = Number(record.co2_ppm);
        const co2_kg = (ppm * 44) / 1_000_000 * AIRFLOW_RATE;
        return sum + co2_kg;
      }, 0);

      setDailyCO2(totalCO2);
    }
  }, [ppmData]);

  return (
    <div className="dashboard-container">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
        
        {/* Live CO₂ Emission Data */}
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col col-span-4">
          <div className="text-left mb-2 text-xl font-bold text-gray-800 flex flex-row justify-between">
            CO₂ Live Emission Data 
            <div className="text-red-500 text-2xl font-bold">{latestPPM}</div>
          </div>

   


          <LiveData />
        </div>

        {/* Peak Emission */}
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col col-span-2">
          <div className="text-xl font-bold text-gray-800">Peak Emission Today</div>
          <p className="text-2xl font-bold"><Peakemit /></p>
        </div>

        {/* Live PPM Threshold Alert */}
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col col-span-2">
          <div className="text-xl font-bold text-gray-800 mb-2">Live PPM Threshold</div>
          <p className={`text-xl bg-gray-100 p-3 mb-3 rounded-lg font-bold ${latestPPM > CO2_THRESHOLD_PPM ? "text-red-600" : "text-green-600"}`}>
            {latestPPM > CO2_THRESHOLD_PPM ? `Alert: ${latestPPM} PPM (Exceeded!)` : `${latestPPM} PPM (Safe)`}
          </p>
          <p className={`text-xl bg-gray-100 p-3 mb-3 rounded-lg font-bold ${dailyCO2 > CO2_THRESHOLD_KG ? "text-red-600" : "text-green-600"}`}>
            {dailyCO2.toFixed(2)} kg {dailyCO2 > CO2_THRESHOLD_KG ? "(Threshold Exceeded!)" : "(Safe)"}
          </p>
        </div>

        {/* CO₂ Monitoring Stats */}
        <div className="bg-white p-6 col-span-2 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-4">CO₂ Monitoring</h2>
          <p className="text-lg font-semibold mb-3 rounded-lg p-3 bg-gray-100">
            <div className="text-left mb-2 text-xl font-bold text-gray-500">PPM Change Rate:</div>
            <div className="text-red-600">{ppmRate.toFixed(2)} PPM/sec</div>
          </p>
          <p className="text-lg font-semibold mb-2 rounded-lg p-3 bg-gray-100">
            <div className="text-left mb-2 text-xl font-bold text-gray-500">CO₂ Mass (per sec):</div>
            <div className="text-red-600">{co2Mass.toFixed(4)} kg</div>
            
          </p>
        </div>

        {/* CO₂ Emission Speedometer */}
        <div className="bg-white p-4 rounded-lg shadow-md flex flex-col col-span-2 h-[290px] overflow-auto">
          <div className="text-xl font-bold text-gray-800 mb-4">CO₂ Emission Speedometer</div>
          <ReactSpeedometer
            maxValue={10000}
            value={latestPPM ?? 0}
            needleColor="red"
            startColor="green"
            endColor="red"
            segments={5}
            currentValueText={`${latestPPM ?? 0} PPM`}
          />
        </div>
      </div>

      {/* Chatbot Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-white text-white p-3 hover:shadow-2xl rounded-full shadow-lg border hover:translate-y-[-10px] transition"
      >
        <img className="w-10" src={aiLogo} alt="Chatbot Icon" />
      </button>

      {/* Chatbot Modal */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-1/3 bg-white shadow-xl rounded-lg border border-gray-300">
          <div className="flex justify-between items-center bg-blue-600 text-white px-4 py-2 rounded-t-lg">
            <span className="text-lg">Chatbot</span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-lg text-white bg-blue-500 rounded-lg hover:bg-blue-700 cursor-pointer hover:ring-blue-400 hover:ring-2 border-blue-600 border p-1"
            >
              ✖
            </button>
          </div>
          <iframe
            src="https://b849a2c5fb47b78a22.gradio.live/"
            width="100%"
            height="500px"
            className="border-none"
            style={{ borderRadius: "0 0 10px 10px" }}
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
