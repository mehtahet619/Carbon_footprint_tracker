import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

export default function DataDisplay() {
  const [data, setData] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [initialLoad, setInitialLoad] = useState(true); // Only used for first-time loading

  useEffect(() => {
    let interval;

    async function fetchData() {
      try {
        setErrorMessage(null);

        // Fetch last 10 records ordered by timestamp DESCENDING
        let { data: ppm_data, error } = await supabase
          .from("ppm_data")
          .select("*")
          .order("timestamp", { ascending: false })
          .limit(60);

        if (error) throw error;

        // Ensure the chart updates smoothly without resetting state
        setData(ppm_data);
        setInitialLoad(false); // Set to false after first fetch
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
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">PPM Data</h1>

      {initialLoad ? (
        <p className="text-gray-500">Loading...</p>
      ) : errorMessage ? (
        <p className="text-red-500">{errorMessage}</p>
      ) : (
        <>
          <ul className="bg-white text-black shadow rounded p-4">
            {data.slice(0, 5).map((rec) => (
              <li key={rec.id} className="p-2 border-b">
                CO₂ PPM: {rec.co2_ppm} (Timestamp: { Date(rec.timestamp)})
              </li>
            ))}
          </ul>

          <div className="mt-6 border p-2 rounded-lg">
            <h2 className="text-xl font-bold mb-4">PPM Data Chart (Live Updates)</h2>


<div className="flex flex-row gap-2">
            <ResponsiveContainer width="100%" height={220}  className=" bg-white border-2 border-gray-300   p-1 rounded ">
              <BarChart data={data} barSize={30} className="">
                <XAxis
                  dataKey="timestamp"
                  tickFormatter={(tick) => new Date(tick).toLocaleTimeString()}
                  tick={{ fontSize: 12 }}
                />
                <YAxis />
                <Tooltip />
                <CartesianGrid strokeDasharray="3 3" />
                <Bar dataKey="co2_ppm" fill="#8884d8" animationDuration={0} />
              </BarChart>
            </ResponsiveContainer>

            <ResponsiveContainer width="100%" height={220} className=" bg-white border-2 border-gray-300 p-1 rounded ">
              <LineChart data={data}>
                <XAxis
                  dataKey="timestamp"
                  tickFormatter={(tick) => new Date(tick).toLocaleTimeString()}
                  tick={{ fontSize: 12 }}
                />
                <YAxis />
                <Tooltip />
                <CartesianGrid strokeDasharray="3 3" />
                <Line
                  type="monotone"
                  dataKey="co2_ppm"
                  stroke="#82ca9d"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                  animationDuration={0}
                />
              </LineChart>
            </ResponsiveContainer>

            </div>


          </div>
        </>
      )}
    </div>
  );
}
