import React, { useEffect, useState,useContext,createContext } from 'react'
import { ethers } from "ethers";
import contr from '../../contract/artifacts/contracts/Greeter.sol/Storage.json'
export const AppConfig = createContext()
export const AppProvider = ({children}) =>{
    const [loggedinstatus,setloggedinstatus] = useState(false)
    const [bikerented,setbikerented] = useState(false)
    const [bikesdata,setbikesdata] = useState([]);
    const [userdata,setuserdata] = useState();
    const [duerate,setduerate] = useState(0)
    const [duehours,setduehours] = useState(0)
    const [userregistered,setuserregistered] = useState(false)
const [dataloading,setdataloading] = useState(true)
    const number = 3;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
   
    const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
    const ABI = contr.abi
      const contract = new ethers.Contract(contractAddress, ABI, signer);  

      // const getBikes = async() =>{
      //   const tmpdatas = [];
      //   for (var i=1;i<number+1;i++){
      //     // console.log(i)
      //     const tmp = await contract.returnVehiclesData(i);
      //     // console.log("data in list is",JSON.stringify(tmp));
      //     tmpdatas.push(tmp);
         
      //   }
      //   setbikesdata(tmpdatas)
      //   // console.log("done fetching")
      // }

      const getUser = async() =>{
        const status = await contract.returnUserReGStatus();
        if (status){
          const dat = await contract.returnUserData();
          setuserdata(dat)
          const due = await contract.returnDue();
          setduerate(due);
        }
      else{
          await contract.addUser();
          const dat = await contract.returnUserData();
         
          setuserdata(dat);
          setbikerented(dat.rented_status)
          if (dat.rented_status){
           let hrs = await contract.returnUserRentedHr();
           setduehours(hrs);
           const due = await contract.returnDue();
           setduerate(due);
          }

          

        }

      }

      const getBikes = async() =>{
        // await contract.addBike(3000000000000000,1,'https://m.media-amazon.com/images/I/715wCxNPK4L._SX425_.jpg');
        // await contract.addBike(2000000000000000,2,'https://m.media-amazon.com/images/I/61IlCkBgMpL._SX425_.jpg');
        // await contract.addBike(3000000000000000,3,'https://www.herocycles.com/admin/public/uploads/bestseller/60223dea3576c5m0f8TdEWI.png');
        const tmpdatas = [];
        for (var i=1;i<number+1;i++){
          // console.log(i)
          const tmp = await contract.returnVehiclesData(i);
          // console.log("data in list is",JSON.stringify(tmp));
          tmpdatas.push(tmp);
         
        }
      
        setbikesdata(tmpdatas)
        // console.log("done fetching")
        
       
      }

  
useEffect(()=>{
    const requestAccounts = async () => {
        await provider.send("eth_requestAccounts", []);
        setloggedinstatus(true)
      }
      
      const getUser = async() =>{
        const status = await contract.returnUserReGStatus();
        if (status){
          const dat = await contract.returnUserData();
          setuserdata(dat)
          setbikerented(dat.rented_status)
          const due = await contract.returnDue();
          setduerate(parseInt(due._hex));
        }
      else{
          await contract.addUser();
          const dat = await contract.returnUserData();
         
          setuserdata(dat);
          setbikerented(dat.rented_status)
          if (dat.rented_status){
           let hrs = await contract.returnUserRentedHr();
           setduehours(parseInt(hrs._hex));
           const due = await contract.returnDue();
           setduerate(parseInt(due._hex));
          }

          

        }

      }
    
      requestAccounts()
      .catch(console.error)
       getBikes()
       .catch(console.error)
       getUser()
       .catch(console.error)
       setdataloading(false)
      
    
},[]);

const checkingIn=  async(id) =>{

      await contract.onCheckIn(id);
      await getBikes();
      await getUser();
      setbikerented(true);
  }

  const onPayingDue = async() =>{
    await contract.onPayingDue();
    
  }

  const onCheckOut = async() =>{
   

    await contract.onCheckout();
    setbikerented(false)
  }

const connectwallet = async() =>{

  if (!loggedinstatus){
    const requestAccounts = async () => {
      await provider.send("eth_requestAccounts", []);
      setloggedinstatus(true)
    }
 
    requestAccounts()
    .catch(console.error)
    
  }
  else{
    return ""
  }
  
}
    return(
        <AppConfig.Provider value={{loggedinstatus,duehours,userdata,duerate,bikerented,userregistered,onCheckOut,onPayingDue,connectwallet,checkingIn,bikesdata,dataloading}}> {children} </AppConfig.Provider>
     )
}