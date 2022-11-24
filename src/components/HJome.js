import { Contract } from "ethers";
import React, { useContext, useEffect, useState } from "react";
import { AppConfig } from "./context/AppConfig";
import { VehiclesData } from "./VehiclesData/VehiclesData";

export const HJome = () => {
const {onPayingDue,onCheckOut,duehours,bikerented,dataloading,duerate} = useContext(AppConfig)

  // console.log(duerate);
  return (
    <>
    <br/><br/>
      <div >
     {!bikerented && 
       <div>
       {/* <div className="text-center">No Bike rented.</div> */}
       <VehiclesData/>
       
       </div>
       }
  {bikerented &&      <div className="flex flex-row justify-evenly ">

          <div className="flex flex-col  justify-evenly bg-[#F64668] p-3 text-xl rounded-lg">
            <div className="text-center">Matic due:</div>
            <div className="text-center"> {duerate}  Matic  </div>
          </div>

          <div className="flex flex-col  justify-evenly bg-[#F64668] p-3 text-xl rounded-lg">
            <div className="text-center">Hours Rented: </div>
            <div className="text-center"> {duehours} </div>
          </div>

          <div className="flex flex-col justify-evenly  p-3 text-xl rounded-lg">
          <button onClick={onPayingDue} type="button" class="text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 mr-2 mb-2">
  <svg class="w-4 h-4 mr-2 -ml-1 text-[#626890]" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="ethereum" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z"></path></svg>
  Pay with Matic
</button>
{duerate ===0?   <button  onClick={onCheckOut} className="rounded-full bg-green-600 m-2 text-black p-2">CHECK OUT</button> :  <button className="rounded-full bg-red-600 cursor-not-allowed m-2 text-black p-2">CHECK OUT</button> }
          </div>
          x
        </div>
}
      </div>
      
    </>
  );
};
