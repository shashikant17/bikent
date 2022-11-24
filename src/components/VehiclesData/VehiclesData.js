import React, { useContext,useState, useEffect } from 'react'
import { AppConfig } from '../context/AppConfig'
import { ethers } from "ethers";
export const VehiclesData = () => {

    const {bikesdata,dataloading,checkingIn} = useContext(AppConfig);
    // console.log("data in lost is",bikesdata)
  
  return (
    <div>
             
 <div className='flex flex-row flex-wrap justify-evenly'>
    {!dataloading &&  bikesdata.length>0 &&  
 
    bikesdata.map((item,k)=>{
      // {console.log("",bikesdata,item)}
 return(     
      <div key = {k}>
 
      

      <div   className='flex flex-col justify-center bg-[#F64668] p-3 rounded-3xl hover:bg-[#984063]'>
      <img className='w-64 ' src = {item[4]} alt = "image of bike"/>
      <div className='text-center'>  {ethers.utils.formatEther(parseInt(item[0]._hex))}ETH /hour</div>
      <div>  </div>
     {item[5] && <button className='bg-[#fe9677] p-2 rounded-full mt-5' onClick=  {()=>checkingIn(parseInt(item[1]._hex))}>Check in</button>}
     {!item[5] && <button className='text-red-800 font-bold   p-2 rounded-full mt-5 cursor-not-allowed'> BIKE RENTED </button>}
      </div>
            
 
        </div>)
    })
   }
   </div>
{dataloading &&  <div>Loading..</div> }
    </div>
  )
}
