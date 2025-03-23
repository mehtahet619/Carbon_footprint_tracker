import React from 'react'

const OrgMenu = () => {
  return (
    <header class="bg-white shadow-md sticky top-0 z-50 p-4">
    <div class="container mx-auto flex justify-between items-center">
        <div class="flex items-center text-gray-700 text-2xl font-bold">
            <i class="fas fa-leaf mr-2 text-3xl"></i>
            <span>Government Portal</span>
        </div>
        <nav>
            <ul class="flex space-x-6">
                <li><a href="#" class="text-gray-700 hover:bg-red-500 hover:text-white px-3 py-2 rounded-md font-medium">Dashboard</a></li>
                <li><a href="#" class="text-gray-700 hover:bg-red-500 hover:text-white px-3 py-2 rounded-md font-medium">Reports</a></li>
                <li><a href="#" class="text-gray-700 hover:bg-red-500 hover:text-white px-3 py-2 rounded-md font-medium">Analytics</a></li>
                <li><a href="#" class="text-gray-700 hover:bg-red-500 hover:text-white px-3 py-2 rounded-md font-medium">Settings</a></li>
            </ul>
        </nav>
    </div>
</header>
  )
}

export default OrgMenu