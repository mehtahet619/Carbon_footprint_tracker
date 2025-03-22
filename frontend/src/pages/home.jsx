import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

const home = () => {
  return (
    <>

    <div className="text-xl font-bold text-center my-20">Portal</div>
    
    <div className="bg-white p-4 gap-3 border shadow rounded w-full md:w-1/3 mx-auto   flex flex-col ">


      <Link to='Org' className="bg-white p-2 rounded border hover:ring-[3px] ring-0 hover:ring-blue-100 hover:ring-offset-0">Org</Link> 
      <Link to='Gov' className="bg-white p-2 rounded border hover:ring-[3px] ring-0 hover:ring-blue-100 hover:ring-offset-0">Gov</Link> 

   


    </div>
    
    </>
  )
}

export default home