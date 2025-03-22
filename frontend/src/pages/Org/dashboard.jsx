import React from 'react'
import LiveData from '../../components/DataDisplay'
import Peakemit from '../../components/Peakemit'

const dashboard = () => {
  return (
    <div>


                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div class="bg-white p-6 rounded-lg shadow-md flex flex-col col-span-2" >
                      
                   
                            <LiveData/>
                    
                        
                    </div>
                    
                    <div class="bg-white p-6 rounded-lg shadow-md flex flex-col" >
                        <div class="flex justify-between items-center mb-4">
                            <span class="text-gray-500 text-lg">peak emmision today</span>
                            <div class="w-10 h-10 bg-red-500 text-white flex items-center justify-center rounded-full">
                                <i class="fas fa-car"></i>
                            </div>
                        </div>
                        <p class="text-2xl font-bold"><Peakemit/></p>
                       
                    </div>

                    <div class="bg-white p-6 rounded-lg shadow-md flex flex-col" >
                        <div class="flex justify-between items-center mb-4">
                            <span class="text-gray-500 text-lg">Threashold reached</span>
                            <div class="w-10 h-10 bg-red-500 text-white flex items-center justify-center rounded-full">
                                <i class="fas fa-car"></i>
                            </div>
                        </div>
                        <p class="text-2xl font-bold">42.8 tCO₂e</p>
                        <p class="text-sm text-green-500 flex items-center mt-1"><i class="fas fa-arrow-up mr-1"></i> data</p>
                    </div>



                </div>






    </div>
  )
}

export default dashboard