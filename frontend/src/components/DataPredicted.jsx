import { useContext } from "react";
import { CO2Context } from "../context/CO2Context"; // Import CO₂ Context
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

export default function DataDisplay() {
  const { predictedData } = useContext(CO2Context); // Get predictedData from Context

  // Reverse the data to show latest on the right
  const reversedData = [...predictedData].reverse();
  
  return (
    <div className="bg-white mt-4 mb-4 rounded-xl p-2 shadow-lg">
      {/* Bar Chart */}
      <ResponsiveContainer width="100%" height={200} className="bg-white border-0">
        <BarChart data={reversedData} barSize={30}>
          <XAxis
            dataKey="timestamp"
            tickFormatter={(tick) => new Date(tick).toLocaleTimeString()}
            tick={{ fontSize: 12 }}
          />
          <YAxis />
          <Tooltip />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="co2_ppm" fill="#ff364a" animationDuration={0} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
