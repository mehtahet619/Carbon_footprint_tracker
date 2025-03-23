import React, { useState, useContext, useEffect } from "react";


const Dashboard = () => {





  return (
    <div className="dashboard-container">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
        
        {/* Live CO₂ Emission Data */}
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col col-span-2">
          <div className="text-left mb-2 text-xl font-bold text-gray-800 flex flex-row justify-between">
            CO₂ Live Emission Data 
            <div className="text-red-500 text-2xl font-bold">latestPPM</div>
          </div>

   


          LiveData 
        </div>

        
        </div>
    </div>
  );
};

export default Dashboard;
