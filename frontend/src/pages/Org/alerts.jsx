import React, { useContext } from "react";
import { CO2Context } from "../../context/CO2Context"; // Import CO₂ Context

const Alerts = () => {
  const { ppmData } = useContext(CO2Context); // Get ppmData from Context

  // Define the threshold for alerts
  const THRESHOLD = 12;

  // Filter records that exceed the threshold
  const alertData = ppmData.filter((entry) => entry.co2_ppm > THRESHOLD);

  return (
    <div className=" rounded-2xl bg-white p-3 mt-[1px] shadow-md">
      <div className=" flex  flex-col  h-[270px]  overflow-auto rounded-xl bg-white text-gray-600  ring-1 ring-gray-200">
        <div className="border-b p-6">
          <h6 className="mb-2 text-xl font-bold">System Alerts Received</h6>
          <p className="mb-4 text-sm font-light">
            <span className="font-semibold">{alertData.length}</span> Today
          </p>
        </div>
        <div className="flex-auto p-6">
          <div className="relative flex flex-col justify-center">
            <div className="absolute left-4 h-full border-r-2"></div>

            {alertData.length > 0 ? (
              alertData.map((alert, index) => (
                <div key={index} className="relative mb-4">
                  <span className="absolute inline-flex h-6 w-6 items-center justify-center rounded-full bg-red-500 p-4 text-center text-base font-semibold text-white shadow"></span>
                  <div className="ml-12 w-auto pt-1">
                    <h6 className="text-md font-semibold text-red-900">
                      {alert.co2_ppm} CO₂ PPM
                    </h6>
                    <p className="mt-1 text-xs text-gray-500">
                      {new Date(alert.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 text-sm">No alerts detected.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alerts;
