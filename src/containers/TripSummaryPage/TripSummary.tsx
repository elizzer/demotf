// import StartRating from "components/StartRating/StartRating";
import React, { FC, useState, useEffect } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import TripSummaryCard from "./TripSummaryCard";
import { flightDataService } from "../../data/flightDataService";

import {
  useParams
} from "react-router-dom";
import { Console } from "console";
import Loader from "components/loader/loader";
// import NcImage from "shared/NcImage/NcImage";

export interface TripSummaryProps {
  className?: string;
}
export interface dataProps{
  dataIndex?: any;
  refId?: number;
}


const TripSummary: FC<TripSummaryProps> = ({ className = "" }) => {
  const {dataIndex, refId} = useParams<any>();
 
  const [tripSummaryData, setTripSummaryData] = useState(Object);
  const [reprice,setReprice]=useState(Object);
  // console.log(dataIndex);
  const [flag, setFlag ]  = useState(0); 
  const [secondFlag, setSecondFlag] = useState(0);

 
  useEffect(()=>{
    let searchForm=flightDataService.getSearchForm();
    // console.log(searchForm);
    const reprice=async()=>{
     let repriceData:any=await flightDataService.getRepriceData(refId,
      {
        "AdultCount":searchForm.NoOfAdult.Count,
        "ChildCount":searchForm.NoOfChildren.Count,
        "InfantCount":searchForm.NoOfInfant.Count
      }
      );
     if(repriceData!=null)
     {
      //  console.log(repriceData);
       setReprice(repriceData);
       setSecondFlag (1)
     }
     else{
       console.log("Couldn't fetch Reprice data")
     }
    }
    reprice();
},[])

  useEffect(() => {   
    const flightData = async() =>{
      let tripData = await flightDataService.getFlightListData()     
    // setTripSummaryData(tripData);
     tripData.map((item:any) => {
      if(item.IteneraryRefID == refId) {
        setTripSummaryData(item)       
        setFlag  (1)
      }
      //console.log(item)
     })
    }
    flightData();
  }, []);  

  
//  console.log(tripSummaryData)
  return (
    <div className={`nc-TripSummary ${className}` } data-nc-id="TripSummary" >
      <main className="container mb-24 mt-11 lg:mb-32 ">
         {/* <h2 className="text-2xl font-semibold text-black dark:text-white">Trip Summary:</h2> */}
        <div className="max-w-4xl mx-auto ">
          <div className="flex flex-col w-full px-0 space-y-8 sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 sm:p-6 xl:p-8">
          <h2 className="self-center text-2xl font-semibold text-black dark:text-white">Trip Summary</h2>
          <div className="grid grid-cols-1 gap-6 lg:p-2 lg:bg-neutral-50 lg:dark:bg-black/20 rounded-3xl">
            {flag === 1 && secondFlag==1 ?  <TripSummaryCard data={tripSummaryData} reprice={reprice}
             />
            :<Loader content={"Loading...."}/>}
         
            {/* <div className="flex items-center justify-center mt-12">
              
              <div className="` text-center p-4 sm:p-6 relative  bg-white dark:bg-neutral-900 border border-neutral-100
       dark:border-neutral-800 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow mb-4 space-y-6 ${className}`justify-center align-center " style={{border:'1px solid grey'}}>
                <div className="">
                <div className="">
                    <span className="text-xl font-semibold text-secondary-6000">
                        {secondFlag === 1 ? `$${tripSummaryData.FareBreakdown[0]?.InvoiceFare}` : ""}  
                      </span>
                    <span className="text-9 font-9">   price per person</span>
                </div>
                <div className="">as low as $17 per month</div>
                </div>
                <ButtonPrimary href={`/travellerinfo`} className="justify-center align-middle">Checkout</ButtonPrimary>
              </div>
            </div> */}
          </div>
        </div>  
        </div>
      </main>
    </div>
  );
   
};

  
export default TripSummary;