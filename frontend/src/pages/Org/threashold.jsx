import React from "react";
import { RadialBarChart, RadialBar, Legend } from "recharts";

const Threshold = () => {
  const GOV_CO2_THRESHOLD_PPM = 5000; // Gov limit
  const GOV_CO2_THRESHOLD_KG = 100;   // Gov limit

  const myCO2PPM = 5500; // Example user value
  const myCO2KG = 120;   // Example user value

  // Data for the speedometer-style chart
  const data = [
    { name: "CO₂ PPM", value: myCO2PPM, fill: myCO2PPM > GOV_CO2_THRESHOLD_PPM ? "red" : "green" },
    { name: "CO₂ Emission (kg)", value: myCO2KG, fill: myCO2KG > GOV_CO2_THRESHOLD_KG ? "red" : "green" },
  ];

  return (
    <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Emission Thresholds</h2>

      {/* Speedometer-style chart */}
      <RadialBarChart
        width={300}
        height={300}
        cx={150}
        cy={150}
        innerRadius="60%"
        outerRadius="100%"
        barSize={15}
        data={data}
        startAngle={180}
        endAngle={0}
      >
        <RadialBar minAngle={15} label={{ fill: "#666", position: "insideStart" }} background dataKey="value" />
        <Legend iconSize={10} layout="horizontal" verticalAlign="bottom" align="center" />
      </RadialBarChart>

      {/* Status Message */}
      <div className={`mt-4 p-3 font-semibold rounded-lg ${myCO2PPM > GOV_CO2_THRESHOLD_PPM || myCO2KG > GOV_CO2_THRESHOLD_KG ? "bg-red-500 text-white" : "bg-green-500 text-white"}`}>
        {myCO2PPM > GOV_CO2_THRESHOLD_PPM || myCO2KG > GOV_CO2_THRESHOLD_KG ? "Alert: Emission Limit Exceeded!" : "Status: Within Safe Limits"}
      </div>
    </div>
  );
};

export default Threshold;
