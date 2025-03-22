import React from 'react'
import { Link } from 'react-router-dom'

const sidebar = () => {
  return (
    <div>
            <div class="bg-white p-6 rounded-lg shadow-md w-full">
                <div class="flex items-center mb-6 border-b pb-4 border-gray-200">
                    <div class="w-12 h-12 bg-gray-100 border text-white flex items-center justify-center text-lg rounded-full">
                        <i class="fas fa-user"></i>
                    </div>
                    <div class="ml-4">
                        <h3 class="text-lg font-semibold">Org Name</h3>
                        <p class="text-gray-500 text-sm">Admin Account</p>
                    </div>
                </div>
                <ul class="space-y-4">


                    <li><Link to='/org/Dashboard' class="flex items-center text-gray-700 hover:bg-green-500 hover:text-white p-3 rounded-lg"> Dashboard</Link></li>
                    <li><Link to='/org/settings' class="flex items-center text-gray-700 hover:bg-green-500 hover:text-white p-3 rounded-lg">Setting </Link></li>

                    <li><Link to='/org/Alerts' class="flex items-center text-gray-700 hover:bg-green-500 hover:text-white p-3 rounded-lg">Alerts </Link></li>

                    <li><Link to='/org/Threshold' class="flex items-center text-gray-700 hover:bg-green-500 hover:text-white p-3 rounded-lg"> Threshold</Link></li>




                </ul>
            </div>
    </div>
  )
}

export default sidebar