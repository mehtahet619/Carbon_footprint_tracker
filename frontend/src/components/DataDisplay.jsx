import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

export default function DataDisplay() {
  const [data, setData] = useState([]);
  const [liveValue, setLiveValue] = useState(null); // Stores latest CO₂ PPM
  const [errorMessage, setErrorMessage] = useState(null);
  const [initialLoad, setInitialLoad] = useState(true); // Only for first-time loading

  useEffect(() => {
    let interval;

    async function fetchData() {
      try {
        setErrorMessage(null);

        // Fetch last 60 records ordered by timestamp (latest first)
        let { data: ppm_data, error } = await supabase
          .from("ppm_data")
          .select("*")
          .order("timestamp", { ascending: false })
          .limit(60);

        if (error) throw error;

        // Ensure data updates smoothly
        setData(ppm_data);

        // Store latest CO₂ PPM value
        if (ppm_data.length > 0) {
          setLiveValue(ppm_data[0].co2_ppm);
        }

        setInitialLoad(false);
      } catch (error) {
        setErrorMessage(error.message);
        console.error("Fetching Error:", error);
      }
    }

    // Fetch data immediately and every 2 seconds
    fetchData();
    interval = setInterval(fetchData, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className=" bg-white  ">
      {/* Live CO₂ Value Display */}
      
      

      {/* Bar Chart */}
      <ResponsiveContainer width="100%" height={200} className="bg-white border-0 ">
        <BarChart data={data} barSize={30}>
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

      <p className="text-3xl text-center font-semibold text-red-600">
        {liveValue !== null ? `${liveValue} PPM` : "Loading..."}
      </p>

    </div>
  );
}
