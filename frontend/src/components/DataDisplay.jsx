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
   

       
         


            <ResponsiveContainer width="100%" height={220}  className=" bg-white border-2 border-gray-300   rounded ">
              <BarChart data={data} barSize={30} className="">
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

         


  );
}
