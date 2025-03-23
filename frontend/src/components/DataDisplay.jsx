import { useContext } from "react";
import { CO2Context } from "../context/CO2Context"; // Import CO₂ Context
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

export default function DataDisplay() {
  const { ppmData } = useContext(CO2Context); // Get ppmData from Context



  return (
    <div className="bg-white">
      {/* Bar Chart */}
      {/* Live CO₂ Value Display */}



      <ResponsiveContainer width="100%" height={200} className="bg-white border-0">
        <BarChart data={ppmData} barSize={30}>
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
