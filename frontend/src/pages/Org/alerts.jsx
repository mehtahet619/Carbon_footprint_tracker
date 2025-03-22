import React from 'react'

const alerts = () => {
  return (
    <div>
      



      <div class="relative  flex h-full flex-col overflow-hidden rounded-2xl bg-white text-gray-600 shadow-lg ring-1 ring-gray-200">
  <div class="border-b p-6">
    <h6 class="mb-2 text-base font-semibold">System Alerts Received</h6>
    <p class="mb-4 text-sm font-light">
      <i class="inline-block font-black not-italic text-green-600" aria-hidden="true"></i>
      <span class="font-semibold">24</span> Today
    </p>
  </div>
  <div class="flex-auto p-6">
    <div class="relative flex flex-col justify-center">
      <div class="absolute left-4 h-full border-r-2"></div>



      <div class="relative mb-4">
        <span class="absolute inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 p-4 text-center text-base font-semibold text-white shadow"></span>
        <div class="ml-12 w-auto pt-1">
          <h6 class="text-md font-semibold text-blue-900">600 CO2 PPM</h6>
          <p class="mt-1 text-xs text-gray-500">7:20 PM</p>
        </div>
      </div>






      
    </div>
  </div>
</div>




    </div>
  )
}

export default alerts