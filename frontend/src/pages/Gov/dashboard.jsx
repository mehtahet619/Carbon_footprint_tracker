import React, { useContext, useEffect, useState } from "react";
import { CO2Context } from "../../context/CO2Context";

const Dashboard = () => {
  const { emissionsData } = useContext(CO2Context); // Fetch CO2 data from context

  // State for CO2 metrics
  const [metrics, setMetrics] = useState({
    liveEmissionRate: 0,
    totalEmittedToday: 0,
    topIndustry: "",
    complianceRate: 0,
    exceedingOrgs: 0,
    renewableUsage: 0,
  });

  // Effect to update metrics when context data changes
  useEffect(() => {
    if (emissionsData) {
      setMetrics({
        liveEmissionRate: emissionsData.liveEmissionRate || 0,
        totalEmittedToday: emissionsData.totalEmittedToday || 0,
        topIndustry: emissionsData.topIndustry || "N/A",
        complianceRate: emissionsData.complianceRate || 0,
        exceedingOrgs: emissionsData.exceedingOrgs || 0,
        renewableUsage: emissionsData.renewableUsage || 0,
      });
    }
  }, [emissionsData]);

  return (
    <div className="dashboard-container ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Live CO₂ Emission Rate */}
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col">
          <div className="text-left mb-2 text-xl font-bold text-gray-800 flex justify-between">
            Live CO₂ Emission
            <div className="text-red-500 text-2xl font-bold">
              {metrics.liveEmissionRate} kg/hr
            </div>
          </div>
          <p className="text-gray-600">Real-time emission rate from organizations.</p>
        </div>

        {/* Total CO₂ Emitted Today */}
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col">
          <div className="text-left mb-2 text-xl font-bold text-gray-800 flex justify-between">
            CO₂ Emitted Today
            <div className="text-blue-500 text-2xl font-bold">
              {metrics.totalEmittedToday} tons
            </div>
          </div>
          <p className="text-gray-600">Total carbon emissions recorded today.</p>
        </div>

        {/* Top Polluting Industry */}
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col">
          <div className="text-left mb-2 text-xl font-bold text-gray-800 flex justify-between">
            Top Polluting Industry
            <div className="text-gray-700 text-2xl font-bold">{metrics.topIndustry}</div>
          </div>
          <p className="text-gray-600">Oil & Gass</p>
        </div>

        {/* Compliance Rate */}
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col">
          <div className="text-left mb-2 text-xl font-bold text-gray-800 flex justify-between">
            Compliance Rate
            <div className="text-green-500 text-2xl font-bold">
              {metrics.complianceRate}%
            </div>
          </div>
          <p className="text-gray-600">Percentage of organizations following emission norms.</p>
        </div>

        {/* Organizations Exceeding Limits */}
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col">
          <div className="text-left mb-2 text-xl font-bold text-gray-800 flex justify-between">
            Exceeding Organizations
            <div className="text-red-500 text-2xl font-bold">
              {metrics.exceedingOrgs}
            </div>
          </div>
          <p className="text-gray-600">Companies breaching CO₂ limits today.</p>
        </div>

        {/* Renewable Energy Usage */}
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col">
          <div className="text-left mb-2 text-xl font-bold text-gray-800 flex justify-between">
            Renewable Energy Usage
            <div className="text-green-600 text-2xl font-bold">
              {metrics.renewableUsage}%
            </div>
          </div>
          <p className="text-gray-600">Percentage of energy from renewable sources.</p>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
