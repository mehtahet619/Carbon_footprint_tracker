import React, { useState, useEffect } from "react";

const SetThreshold = () => {
  const [formData, setFormData] = useState({
    ppm_limit: "",
    kg_limit: "",
    industry: ""
  });
  const [thresholds, setThresholds] = useState([]);

  useEffect(() => {
    fetchThresholds();
  }, []);

  const fetchThresholds = async () => {
    try {
      const response = await fetch(
        "https://xrhopfxrspyfbbobrdzr.supabase.co/rest/v1/gov_set_limit?select=ppm_limit,kg_limit,industry&order=timestamp.desc",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhyaG9wZnhyc3B5ZmJib2JyZHpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0NTA4MDAsImV4cCI6MjA1ODAyNjgwMH0.PctRwNfEwzwOmZzkJhR-sfXlhxs_3PsgTjvFZR2G7Bg",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhyaG9wZnhyc3B5ZmJib2JyZHpyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MjQ1MDgwMCwiZXhwIjoyMDU4MDI2ODAwfQ.BBbA2do-Hx4sq_hsqLVyrttbjhKfuWiFNdH1M0wtKwI",
          },
        }
      );
      const data = await response.json();
      
      // Ensure response is an array
      if (Array.isArray(data)) {
        // Get only the latest record for each unique industry
        const uniqueThresholds = Object.values(
          data.reduce((acc, item) => {
            if (!acc[item.industry]) {
              acc[item.industry] = item;
            }
            return acc;
          }, {})
        );
  
        setThresholds(uniqueThresholds);
      } else {
        console.error("Unexpected response format:", data);
        setThresholds([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://xrhopfxrspyfbbobrdzr.supabase.co/rest/v1/gov_set_limit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhyaG9wZnhyc3B5ZmJib2JyZHpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0NTA4MDAsImV4cCI6MjA1ODAyNjgwMH0.PctRwNfEwzwOmZzkJhR-sfXlhxs_3PsgTjvFZR2G7Bg",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhyaG9wZnhyc3B5ZmJib2JyZHpyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MjQ1MDgwMCwiZXhwIjoyMDU4MDI2ODAwfQ.BBbA2do-Hx4sq_hsqLVyrttbjhKfuWiFNdH1M0wtKwI"
          },
          body: JSON.stringify(formData)
        }
      );
      if (response.ok) {
        fetchThresholds(); // Refresh the table
        setFormData({ ppm_limit: "", kg_limit: "", industry: "" }); // Reset form
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Set & View Threshold Limits
      </h2>

      {/* Grid Layout: Form Left | Table Right */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left: Form */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Set Threshold Limits</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input 
              type="text" 
              name="ppm_limit" 
              placeholder="PPM Limit" 
              value={formData.ppm_limit} 
              onChange={handleChange} 
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              required 
            />
            <input 
              type="text" 
              name="kg_limit" 
              placeholder="KG Limit" 
              value={formData.kg_limit} 
              onChange={handleChange} 
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              required 
            />
            <input 
              type="text" 
              name="industry" 
              placeholder="Industry" 
              value={formData.industry} 
              onChange={handleChange} 
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              required 
            />
            <button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded-lg transition duration-300">
              Submit
            </button>
          </form>
        </div>

        {/* Right: Table */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">
            Latest Thresholds by Industry
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="p-3">PPM Limit</th>
                  <th className="p-3">KG Limit</th>
                  <th className="p-3">Industry</th>
                </tr>
              </thead>
              <tbody>
                {thresholds.length > 0 ? (
                  thresholds.map((item, index) => (
                    <tr key={index} className="text-center border-b hover:bg-gray-100">
                      <td className="p-3">{item.ppm_limit}</td>
                      <td className="p-3">{item.kg_limit}</td>
                      <td className="p-3">{item.industry}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center p-4 text-gray-500">
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SetThreshold;
