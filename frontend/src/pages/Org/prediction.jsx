import React from 'react'
import Org_Pred from "../../components/Org_Pred.jpg";

import Monthly_PaperPulp from "../../components/Monthly_Paper&Pulp.jpg";


const prediction = () => {
  return (
    <div>


      <div className="grid grid-cols-4 gap-2 ">




      <div className="col-span-2 h-fit  bg-white p-4 rounded-2xl shadow">
       <div className="text-lg font-bold mb-3"> Real Time Data Prediction</div>
      <img className='' src={Org_Pred} /></div>

      
      <div className="col-span-2 h-fit  bg-white p-4 rounded-2xl shadow">
       <div className="text-lg font-bold mb-3"> Monthly data Prediction</div>
      <img className='' src={Monthly_PaperPulp} /></div>

      


    </div>
    


    </div>
  )
}

export default prediction