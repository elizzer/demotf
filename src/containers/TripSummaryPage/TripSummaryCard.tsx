import React, { FC, useEffect, useState } from "react";
import moment from "moment";
import { AnyMxRecord } from "dns";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import getSymbolFromCurrency from 'currency-symbol-map';
// export interface originProps{
//   Carrier: string;
//   FlightName: string;
//   DepartureTime: string;
//   OriginAirportName: string;
//   OriginCode: string;
//   DestinationAirportName: string;
//   DestinationCode: string;
//   Equipment: string;
//   CabinClass: string;
//   OperatingFlightNumber: string;
//   LayoverTimeInMinutes: string;
//   ArrivalTime: string;
//   TravelDurationInMinutes: string;
// }
export interface TripSummaryCardProps {
  className?: string;
  data:any
  reprice:any
}

const TripSummaryCard: FC<TripSummaryCardProps> = ({ className = "", data ,reprice}) => {
  const [isOpenOne, setIsOpenOne] = useState(false);
  const [isOpenTwo, setIsOpenTwo] = useState(false);
  const [totalFare,setTotalFare]=useState(0);

  //Adult,Child,Infant Bag Information
  const [adult,setAdult]=useState([])
  const [child,setChild]=useState([])
  const [infant,setInfant]=useState([]);
  // console.log(reprice);
  useEffect(()=>{
     if(reprice!=null)
     {
       let total=0;
       let Adultarr:any=[];
       let Childarr:any=[];
       let Infantarr:any=[];
      reprice.Fares.map((single:any,index:number)=>
      { 
            total+=single.BaseFare+single.Taxes;
            //FOR ADULT 
            if(single.PaxType=="ADT")
            {
                   Object.entries(single.baggageAllowance).map((s:any)=>Adultarr.push(s))
                  //  emptArr.push(Object.entries(single.baggageAllowance)[0])
                  // setAdult(Object.entries(single.baggageAllowance));
            }
            if(single.PaxType=="CHD")
            {
                   Object.entries(single.baggageAllowance).map((s:any)=>Childarr.push(s))
            }
            if(single.PaxType=="INF")
            {
                   Object.entries(single.baggageAllowance).map((s:any)=>Infantarr.push(s))
            }             
      })
      if(Adultarr!=[])
      {
        setAdult(Adultarr)

      }
      if(Childarr!=[])
      {
        setChild(Childarr);
      }
      if(Infantarr!=[])
      {
        setInfant(Infantarr);
      }
      // console.log(total);
      setTotalFare(total);
     }
  },[])
  // console.log(adult);
  // console.log(child);
  // console.log(infant);


  const getDay=(year:number,month:number,date:number)=>
  {
    var today = new Date(year,month-1,date);
    var options:object = {
      weekday: "short", //to display the full name of the day, you can use short to indicate an abbreviation of the day
        day: "numeric",
        month: "short", //to display the full name of the month
        
    }
    // tConv24('18:30');
    var sDay = today.toLocaleDateString("en-US", options);
    // console.log(sDay)
    return sDay; 
  }
  const  tConv24=(time24:any)=>
     {
      var ts = time24;
      var H = +ts.substr(0, 2);
      var h:any = (H % 12) || 12;
      h = (h < 10)?("0"+h):h;  // leading 0 at the left for 1 digit hours
      var ampm = H < 12 ? " AM" : " PM";
      ts = h + ts.substr(2, 3) + ampm;
      // console.log(ts);
      return ts;
    };
  const timeConvert =(n:number) => {
    let num = n;
    let hours = (num / 60);
    let rhours = Math.floor(hours);
    let minutes = (hours - rhours) * 60;
    let rminutes = Math.round(minutes);
    return rhours + "H " + rminutes + "M";
  }
  const getCurrencyFormat = (currency: any) =>{
    switch(currency){
      case (currency === 'INR') : 
        return <i className="text-xl la la-inr"></i>;
      case (currency === 'USD') : 
        return <i className="text-xl la la-usd"></i>;
      case (currency === 'EUR') : 
        return <i className="text-xl la la-eur"></i>;
      default :
        return <i className="text-xl la la-usd"></i>;
    }
  }
  const renderDetailOne = () => {
    if (!isOpenOne) return null;
    return (
      <div className="p-2 border md:p-2 border-neutral-200">
            {
                data.Itinerary[0].OriginDestination.map((single:any,index:number)=>
                        <div className="single">
                             <div className="routeAndTime bg-[#DEE4F4] my-1 p-1">
                                 <span>{single.OriginCode}</span>
                                 <span className="mx-1">{'->'}</span>
                                 <span>{single.DestinationCode}</span>
                                 <span style={{float:'right'}}>{getDay(single.DepartureTime.substring(0,4),single.DepartureTime.substring(5,7),single.DepartureTime.substring(8,10))}</span>
                             </div>
                            <div className="flightAndModel px-1 py-2 text-xs flex flex-row" style={{borderBottom:'1px solid grey'}}>
                                 <div className="flex-[6] flex">
                                      <span className="my-1">
                                          <img src={`http://travelfika-resources.s3-website-us-east-1.amazonaws.com/airline-logo/${single.OperatingAirline}.gif.gif`} className="w-5" alt="" />
                                      </span>
                                      <span className="flex flex-col mx-1">
                                        <span>{single.FlightName}</span>
                                         <span>Opearted by {single.OperatingAirline}</span>
                                        <span>{single.CabinClass=="E"?'Economy Class':single.CabinClass=="B"?'Business Class':single.CabinClass=="F"?'First Class':''}</span>
                                      </span>
                                 </div>
                                 <div className="flex-[2] sm:flex-[1]  flex flex-col">
                                    <span>{single.Carrier} {single.FlightNumber}</span>
                                    <span>{single.Equipment}</span>
                                 </div>
                            </div>  
                            {/* <hr /> */}
                            <div className="flex flex-col sm:flex-row">
                              <div className="takeoff flex-[2] flex py-1" style={{border:''}}>
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="18" width="18" aria-hidden="true" fill="currentcolor" color="text.light"  focusable="false" role="img" className="Svg-sc-12lgb6u-0 eUnAJx Departure__SvgDeparture-sc-43jp4h-0 kAbGGv">
                                    <path d="M2.5 19h19v2h-19v-2zm19.6-9.9c-.2-.8-1-1.3-1.8-1.1l-5.4 1.5L8 3.1l-1.9.5 4.1 7.2-5 1.3-1.9-1.6-1.5.4 1.8 3.2.8 1.3L6 15l5.3-1.4 4.3-1.2L21 11c.8-.2 1.3-1.1 1.1-1.9z"></path>
                                  </svg>
                                  <div className="flex  flex-col flex-[1]  sm:flex-[0.4] mx-1">
                                    <span className="text-sm" style={{fontWeight:'bold'}}>{tConv24(single.DepartureTime.substring(11,16))}</span>
                                    <span className="text-xs">{single.OriginCode}</span>
                                  </div>
                                  <div className="text-xs mx-1 flex flex-col text-right sm:text-left flex-[1]" style={{border:''}}>
                                    <span>{single.OriginAirportName}</span>
                                    <span>{single.OriginAirportName} Intl Airport</span>
                                  </div>
                              </div>
                              <div className="landing flex-[2] flex py-1"style={{border:''}}>
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="18" width="18" aria-hidden="true" fill="currentcolor" color="text.light"  focusable="false" role="img" className="Svg-sc-12lgb6u-0 eUnAJx Arrival__SvgArrival-sc-10hmcyz-0 cuVeAO">
                                    <path d="M2.5 19.5h19v2h-19v-2zm7.2-5.7L14 15l5.3 1.4c.8.2 1.6-.3 1.8-1.1.2-.8-.3-1.6-1.1-1.8l-5.3-1.4-2.8-9-1.8-.6v8.3l-5-1.3-.9-2.4-1.4-.4v5.2l1.6.4 5.3 1.5z"></path>
                                  </svg>
                                  <div className="flex flex-col flex-[1] sm:flex-[0.4] mx-1">
                                    <span className="text-sm" style={{fontWeight:'bold'}}>{tConv24(single.ArrivalTime.substring(11,16))}</span>
                                    <span className="text-xs">{single.DestinationCode}</span>
                                  </div>
                                  <div className="text-xs mx-1 flex flex-col flex-[1] text-right sm:text-left">
                                    <span>{single.DestinationAirportName}</span>
                                    <span>{single.DestinationAirportName} Intl Airport</span>
                                  </div>
                              </div>
                              <div className="detail flex-[1] flex  sm:flex-col  text-xs" style={{border:''}}>
                                   <span className="flex-[1] text-left sm:flex-none sm:text-right">
                                         Flight Time :
                                         {timeConvert(single.TravelDurationInMinutes)}
                                   </span>
                                   <span className="flex-[1] sm:flex-none text-right">
                                         {index!=data.Itinerary[0].OriginDestination.length-1 && data.Itinerary[0].OriginDestination[index+1].LayoverTimeInMinutes?<span className="bg-[#ffcccc] px-1" style={{fontWeight:'bold'}}>Layover:{data.Itinerary[0].OriginDestination[index+1].LayoverTimeInMinutes}</span>:''}
                                   </span>
                              </div>
                            </div>
                        </div>
                  )

            }
      </div>
    );
  };
  const renderDetailTwo = () => {
    if (!isOpenTwo) return null;
    return (
    
      <div className="p-2 border md:p-2 border-neutral-200">
      {
          data.Itinerary[1].OriginDestination.map((single:any,index:number)=>
                  <div className="single">
                       <div className="routeAndTime bg-[#DEE4F4] my-1 p-1">
                           <span>{single.OriginCode}</span>
                           <span className="mx-1">{'->'}</span>
                           <span>{single.DestinationCode}</span>
                           <span style={{float:'right'}}>{getDay(single.DepartureTime.substring(0,4),single.DepartureTime.substring(5,7),single.DepartureTime.substring(8,10))}</span>
                       </div>
                      <div className="flightAndModel px-1 py-2 text-xs flex flex-row" style={{borderBottom:'1px solid grey'}}>
                           <div className="flex-[6] flex">
                                <span className="my-1">
                                    <img src={`http://travelfika-resources.s3-website-us-east-1.amazonaws.com/airline-logo/${single.OperatingAirline}.gif.gif`} className="w-5" alt="" />
                                </span>
                                <span className="flex flex-col mx-1">
                                  <span>{single.FlightName}</span>
                                  <span>Opearted by {single.OperatingAirline}</span>
                                  <span>{single.CabinClass=="E"?'Economy Class':single.CabinClass=="B"?'Business Class':single.CabinClass=="F"?'First Class':''}</span>
                                </span>
                           </div>
                           <div className="flex-[2] sm:flex-[1]  flex flex-col">
                              <span>{single.Carrier} {single.FlightNumber}</span>
                              <span>{single.Equipment}</span>
                           </div>
                      </div>  
                      {/* <hr /> */}
                      <div className="flex flex-col sm:flex-row">
                              <div className="takeoff flex-[2] flex py-1" style={{border:''}}>
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="18" width="18" aria-hidden="true" fill="currentcolor" color="text.light"  focusable="false" role="img" className="Svg-sc-12lgb6u-0 eUnAJx Departure__SvgDeparture-sc-43jp4h-0 kAbGGv">
                                    <path d="M2.5 19h19v2h-19v-2zm19.6-9.9c-.2-.8-1-1.3-1.8-1.1l-5.4 1.5L8 3.1l-1.9.5 4.1 7.2-5 1.3-1.9-1.6-1.5.4 1.8 3.2.8 1.3L6 15l5.3-1.4 4.3-1.2L21 11c.8-.2 1.3-1.1 1.1-1.9z"></path>
                                  </svg>
                                  <div className="flex  flex-col flex-[1]  sm:flex-[0.4] mx-1">
                                    <span className="text-sm" style={{fontWeight:'bold'}}>{tConv24(single.DepartureTime.substring(11,16))}</span>
                                    <span className="text-xs">{single.OriginCode}</span>
                                  </div>
                                  <div className="text-xs mx-1 flex flex-col text-right sm:text-left flex-[1]" style={{border:''}}>
                                    <span>{single.OriginAirportName}</span>
                                    <span>{single.OriginAirportName} Intl Airport</span>
                                  </div>
                              </div>
                              <div className="landing flex-[2] flex py-1"style={{border:''}}>
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="18" width="18" aria-hidden="true" fill="currentcolor" color="text.light"  focusable="false" role="img" className="Svg-sc-12lgb6u-0 eUnAJx Arrival__SvgArrival-sc-10hmcyz-0 cuVeAO">
                                    <path d="M2.5 19.5h19v2h-19v-2zm7.2-5.7L14 15l5.3 1.4c.8.2 1.6-.3 1.8-1.1.2-.8-.3-1.6-1.1-1.8l-5.3-1.4-2.8-9-1.8-.6v8.3l-5-1.3-.9-2.4-1.4-.4v5.2l1.6.4 5.3 1.5z"></path>
                                  </svg>
                                  <div className="flex flex-col flex-[1] sm:flex-[0.4] mx-1">
                                    <span className="text-sm" style={{fontWeight:'bold'}}>{tConv24(single.ArrivalTime.substring(11,16))}</span>
                                    <span className="text-xs">{single.DestinationCode}</span>
                                  </div>
                                  <div className="text-xs mx-1 flex flex-col flex-[1] text-right sm:text-left">
                                    <span>{single.DestinationAirportName}</span>
                                    <span>{single.DestinationAirportName} Intl Airport</span>
                                  </div>
                              </div>                       
                              <div className="detail flex-[1] flex  sm:flex-col  text-xs" style={{border:''}}>
                                   <span className="flex-[1] text-left sm:flex-none sm:text-right">
                                         Flight Time :
                                         {timeConvert(single.TravelDurationInMinutes)}
                                   </span>
                                   <span className="flex-[1] sm:flex-none text-right">
                                         {index!=data.Itinerary[1].OriginDestination.length-1 && data.Itinerary[1].OriginDestination[index+1].LayoverTimeInMinutes?<span className="bg-[#ffcccc] px-1" style={{fontWeight:'bold'}}>Layover:{data.Itinerary[1].OriginDestination[index+1].LayoverTimeInMinutes}</span>:''}
                                   </span>
                              </div>
                      </div>
                  </div>
            )

      }
</div>
    );
  };

  return (
    <div
      className={`nc-TripSummaryCardgroup p-4 sm:p-6 relative bg-white dark:bg-neutral-900 border border-neutral-100
     dark:border-neutral-800 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow space-y-6 ${className}`}
      data-nc-id="TripSummaryCard"
    >
       
          <div
            className={` relative  ${className}`}
            data-nc-id="TripSummaryCard"
          >
            <div>Flight Selection</div>
            <br />
            <span className="mx-2 my-1 p-2 text-white text-xs bg-indigo-500 hover:bg-white hover:text-indigo-500" style={{border:'1px solid blue',borderRadius:9,cursor:'pointer'}}>
               <span  className="" >
               {data.Itinerary[1]?
              'Round Trip'
              :
              'One Way'
              }
              </span>
            </span>
            <span className="mx-2 my-1 p-2 text-xs sm:text-md  text-white bg-indigo-500 hover:bg-white hover:text-indigo-500" style={{border:'1px solid blue',borderRadius:9,cursor:'pointer'}}>
               <span>{data.Itinerary[0].OriginDestination[0].OriginAirportName}</span>
               <span className="mx-1">{data.Itinerary[1]?'<->':'->'}</span>
               <span>{data.Itinerary[0].OriginDestination[data.Itinerary[0].JourneyInfo.NoOfStop].DestinationAirportName}</span>
            </span>
          </div>
      <div
        className={` relative pb-4  ${className}`}
        data-nc-id="TripSummaryCard"
      >
        <div className="space-y-6 sm:flex-row sm:items-center sm:space-y-0" style={{border:''}}>
         
          <div>
             <span>Departure Information</span>
          </div>
           <div className="flex flex-col my-1 p-1" style={{border:'1px solid grey',borderRadius:4,borderLeft:'4px solid blue'}}>
                 <div className="time text-xs sm:text-sm">
                           <span> 
                             {
                             getDay(data.Itinerary[0].OriginDestination[0].DepartureTime.substring(0,4),data.Itinerary[0].OriginDestination[0].DepartureTime.substring(5,7),data.Itinerary[0].OriginDestination[0].DepartureTime.substring(8,10))
                             }
                           </span>
                           <span className="mx-1">
                             {tConv24(data.Itinerary[0].OriginDestination[0].DepartureTime.substring(11,16))}
                           </span>
                           <span>
                             arrives
                           </span>
                           <span className="mx-1">
                           {
                             getDay(data.Itinerary[0].OriginDestination[data.Itinerary[0].JourneyInfo.NoOfStop].DepartureTime.substring(0,4),data.Itinerary[0].OriginDestination[data.Itinerary[0].JourneyInfo.NoOfStop].DepartureTime.substring(5,7),data.Itinerary[0].OriginDestination[data.Itinerary[0].JourneyInfo.NoOfStop].DepartureTime.substring(8,10))
                             }
                           </span>
                           <span className="mx-1">
                             {tConv24(data.Itinerary[0].OriginDestination[data.Itinerary[0].JourneyInfo.NoOfStop].ArrivalTime.substring(11,16))}
                           </span>
                 </div>
                 <div className="originDestination my-1" style={{fontSize:14}}>
                          <span>
                            {data.Itinerary[0].OriginDestination[0].OriginAirportName}
                            <span style={{fontSize:15}}>
                               &#x2192;
                            </span>
                            {data.Itinerary[0].OriginDestination[data.Itinerary[0].JourneyInfo.NoOfStop].DestinationAirportName}
                          </span>
                 </div>
                 <div className="flightDetails mx-1 flex my-1" style={{fontSize:14}}>
                              <span className="flex-shrink-0 w-24 lg:w-20 " style={{flex:0.5,border:''}}>
                                    <img src={`http://travelfika-resources.s3-website-us-east-1.amazonaws.com/airline-logo/${data.Itinerary[0].OriginDestination[0].Carrier}.gif.gif`} className="w-10" alt="" />
                              </span>
                              <span className="flex text-xs sm:text-sm" style={{border:'',flex:4,marginLeft:10}}>
                                    <span className="mx-1">
                                      {`${data.Itinerary[0].OriginDestination[0].MarketingAirlineName}`}
                                    </span>
                                    <span className="mx-1">
                                      {data.Itinerary[0].JourneyInfo.NoOfStop>1?data.Itinerary[0].JourneyInfo.NoOfStop+' Stops':data.Itinerary[0].JourneyInfo.NoOfStop+ ' Stop'}
                                    </span>
                              </span>
                              <span className="my-0 sm:my-1 " style={{border:''}}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clock" viewBox="0 0 16 16">
                                    <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                                  </svg>
                              </span>
                              <span className="mx-1 my-0 sm:my-1 text-xs sm:text-sm" style={{float:'right'}}>
                                     {data.Itinerary[0].JourneyInfo.TotalTravelDurationInMinutes}
                              </span>
                              <span
                               className="mx-2 px-1  pt-1 bg-[#e0e0d2]"
                               
                               style={{cursor:'pointer',color:'blue',borderRadius:'50%'}}
                               onClick={()=>setIsOpenOne(!isOpenOne)} 
                                >
                                <i className="text-xl las la-angle-down"></i>
                              </span>
                              {/* <span
                              className={`absolute right-0 bottom-0 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 w-10 h-10 bg-neutral-50 dark:bg-neutral-800 rounded-full flex items-center justify-center cursor-pointer ${
                                isOpen ? "transform -rotate-180" : ""
                              }`}
                              onClick={() => setIsOpen(!isOpen)}
                            >
                              <i className="text-xl las la-angle-down"></i>
                            </span> */}

                 </div>

                 {/* DETAILS */}
                 {renderDetailOne()}
           </div>

        </div>
      </div>

      {/* IF RETURN INFORMATION EXITS(FOR ROUND TRIP) */}
    {data.Itinerary[1]?
     <div
     className={`relative pb-5  ${className}`}
     data-nc-id="TripSummaryCard"
   >
  

     <div className="space-y-6 sm:flex-row sm:items-center sm:space-y-0" style={{border:''}}>
       <div>
          <span>Return Information</span>
       </div>
        <div className="flex flex-col my-1 p-1" style={{border:'1px solid grey',borderRadius:4,borderLeft:'4px solid blue'}}>
              <div className="time text-xs sm:text-sm">
                        <span> 
                          {
                          getDay(data.Itinerary[1].OriginDestination[0].DepartureTime.substring(0,4),data.Itinerary[1].OriginDestination[0].DepartureTime.substring(5,7),data.Itinerary[1].OriginDestination[0].DepartureTime.substring(8,10))
                          }
                        </span>
                        <span className="mx-1">
                          {tConv24(data.Itinerary[1].OriginDestination[0].DepartureTime.substring(11,16))}
                        </span>
                        <span>
                          arrives
                        </span>
                        <span className="mx-1">
                        {
                          getDay(data.Itinerary[1].OriginDestination[data.Itinerary[1].JourneyInfo.NoOfStop].ArrivalTime.substring(0,4),data.Itinerary[1].OriginDestination[data.Itinerary[1].JourneyInfo.NoOfStop].ArrivalTime.substring(5,7),data.Itinerary[1].OriginDestination[data.Itinerary[1].JourneyInfo.NoOfStop].ArrivalTime.substring(8,10))
                          }
                        </span>
                        <span className="mx-1">
                          {tConv24(data.Itinerary[1].OriginDestination[data.Itinerary[1].JourneyInfo.NoOfStop].ArrivalTime.substring(11,16))}
                        </span>
              </div>
              <div className="originDestination my-1" style={{fontSize:14}}>
                       <span>
                         {data.Itinerary[1].OriginDestination[0].OriginAirportName}
                         <span style={{fontSize:15}}>
                            &#x2192;
                         </span>
                         {data.Itinerary[1].OriginDestination[data.Itinerary[1].JourneyInfo.NoOfStop].DestinationAirportName}
                       </span>
              </div>
              <div className="flightDetails mx-1 flex my-1" style={{fontSize:14}}>
                           <span className="flex-shrink-0 w-24 lg:w-20 " style={{flex:0.5,border:''}}>
                                 <img src={`http://travelfika-resources.s3-website-us-east-1.amazonaws.com/airline-logo/${data.Itinerary[1].OriginDestination[0].Carrier}.gif.gif`} className="w-10" alt="" />
                           </span>
                           <span className="flex text-xs sm:text-sm" style={{border:'',flex:4,marginLeft:10}}>
                                 <span className="mx-1">
                                   {`${data.Itinerary[1].OriginDestination[0].MarketingAirlineName}`}
                                 </span>
                                 <span className="mx-1">
                                   {data.Itinerary[1].JourneyInfo.NoOfStop>1?data.Itinerary[1].JourneyInfo.NoOfStop+' Stops':data.Itinerary[1].JourneyInfo.NoOfStop+ ' Stop'}
                                 </span>
                           </span>
                           <span className="my-0 sm:my-1 " style={{border:''}}>
                               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clock" viewBox="0 0 16 16">
                                 <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                                 <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                               </svg>
                           </span>
                           <span className="mx-1 my-0 sm:my-1 text-xs sm:text-sm" style={{float:'right'}}>
                                  {data.Itinerary[1].JourneyInfo.TotalTravelDurationInMinutes}
                           </span>
                           <span
                            className="mx-2 px-1 pt-1 bg-[#e0e0d2]"
                            style={{cursor:'pointer',color:'blue',borderRadius:'50%'}}
                            onClick={()=>setIsOpenTwo(!isOpenTwo)} 
                             >
                             <i className="text-xl las la-angle-down"></i>
                           </span>
                           {/* <span
                           className={`absolute right-0 bottom-0 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 w-10 h-10 bg-neutral-50 dark:bg-neutral-800 rounded-full flex items-center justify-center cursor-pointer ${
                             isOpen ? "transform -rotate-180" : ""
                           }`}
                           onClick={() => setIsOpen(!isOpen)}
                         >
                           <i className="text-xl las la-angle-down"></i>
                         </span> */}

              </div>

              {/* DETAILS */}
              {renderDetailTwo()}
        </div>

     </div>
    </div>

      
    :''}

    {/* BAGGAGE INFORMATION */}
      <div className="space-y-6 sm:flex-row sm:items-center sm:space-y-0" style={{border:''}}>
           <div>
             <span>Baggage Information</span>
           </div>
           <div className="information" style={{border:'1px solid grey',borderRadius:6,borderLeft:'4px solid blue'}}>
                    <div className="airline flex  p-2">
                           <div className="logo">
                              <img src={`http://travelfika-resources.s3-website-us-east-1.amazonaws.com/airline-logo/${data.Itinerary[0].OriginDestination[0].Carrier}.gif.gif`} className="w-10" alt="" />
                           </div>
                           <div className="logoName">
                             <span>{data.Itinerary[0].OriginDestination[0].MarketingAirlineName}</span>
                           </div>
                    </div>
                    <div className="bag flex flex-row" style={{borderTop:'1px solid grey'}}>
                         <div className="a flex-[9] sm:flex-[5] text-xs sm:text-sm py-2 px-1 flex flex-col" style={{border:''}}>
                                      <span className="flex">
                                          <span className="flex-[2] sm:flex-[1]">Personal Item</span>
                                          <span className="flex-[1] sm:flex-[1] flex" style={{justifyContent:'right',alignItems:'right'}}>
                                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="green" className="bi bi-check" viewBox="0 0 16 16">
                                                <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                              </svg>
                                          </span>
                                      </span>
                                      {/* <span className="flex">
                                          <span className="flex-[2] sm:flex-[1]">Carry On Bag</span>
                                          <span className="flex-[1] sm:flex-[1] flex" style={{justifyContent:'right',alignItems:'right'}}>
                                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="green" className="bi bi-check" viewBox="0 0 16 16">
                                                <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                              </svg>
                                          </span>
                                      </span> */}
                                      <span className="flex">
                                          <span className="flex-[2] sm:flex-[1]">Bag Recheck</span>
                                          <span className="flex-[1] sm:flex-[1] flex" style={{justifyContent:'right',alignItems:'right'}}>
                                            {data.Itinerary[0].OriginDestination[0].BagsRecheckRequired==false?
                                          <svg xmlns="http://www.w3.org/2000/svg" width="23" height="24" fill="red" className="bi bi-x" viewBox="0 0 16 16">
                                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                          </svg>
                                            :  
                                           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="green" className="bi bi-check" viewBox="0 0 16 16">
                                             <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                           </svg>
                                            }
                                          </span>
                                      </span>
                                      <span className="">
                                          <div>Baggage Information</div>
                                          <table className="border-collapse border border-slate-500 text-center" style={{width:'100%'}}>
                                          <thead>
                                            <tr className="text-thin">
                                              <th className="border border-slate-600"></th>
                                              <th className="border border-slate-600  text-[9px] sm:text-[10px]">No. Of Pieces</th>
                                              <th className="border border-slate-600  text-[9px]  sm:text-[10px]">Allowance</th>
                                              <th className="border border-slate-600  text-[9px] sm:text-[10px]">Type</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            {/* ADULT  */}
                                                          <tr>
                                                            <td className="border border-slate-500 text-[7px] sm:text-[10px] font-semibold">ADULT</td>
                                                            <td className="border border-slate-500">
                                                                {adult.length==0?
                                                                  <div className="flex justify-center items-center">
                                                                      <svg xmlns="http://www.w3.org/2000/svg" width="23" height="24" fill="red" className="bi bi-x" viewBox="0 0 16 16">
                                                                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                                                      </svg>
                                                                  </div>
                                                                  :adult.length==2?
                                                                  <div className="flex">
                                                                      {adult.map((single:any)=>
                                                                      <div className="flex-[1] border">
                                                                            <div className="route border text-[6px] sm:text-[9px]">{single[0]}</div>
                                                                            <div className="pieces font-normal text-[6px] sm:text-[9px]">{single[1].map((s:any)=>s.noOfPieces)}</div>
                                                                      </div>
                                                                    )}   
                                                                  </div> 
                                                                  :
                                                                  <div className="flex">
                                                                  {adult.map((single:any)=>
                                                                  <div className="flex-[1] border">
                                                                        {/* <div className="route border">{single[0]}</div> */}
                                                                        <div className="pieces font-normal text-[6px] sm:text-[9px]">{single[1].map((s:any)=>s.noOfPieces)}</div>
                                                                  </div>
                                                                      )}   
                                                                    </div> 
                                                                  }
                                                                                                                
                                                            </td>
                                                            <td className="border border-slate-500">
                                                                  {
                                                                    adult.length==0?
                                                                    <div className="flex justify-center items-center">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="24" fill="red" className="bi bi-x" viewBox="0 0 16 16">
                                                                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                                                    </svg>
                                                                    </div>
                                                                    :adult.length==2?
                                                                    <div className="flex">
                                                                        {adult.map((single:any,index:number)=>
                                                                        <div className="flex-[1] border">
                                                                              <div className="route border text-[6px] sm:text-[9px]">{single[0]}</div>
                                                                              <div className="pieces font-normal text-[6px] sm:text-[8px]">{single[1].map((s:any)=>
                                                                              <span className="flex flex-col">
                                                                                  <span> {s.description1!=""?s.description1:'-'}</span>
                                                                                  <span> {s.description2!=""?s.description2:'-'}</span>
                                                                              </span>
                                                                              )}</div>
                                                                        </div>
                                                                      )}   
                                                                    </div> 
                                                                      :
                                                                      <div className="flex">
                                                                      {adult.map((single:any)=>
                                                                      <div className="flex-[1] border">
                                                                            {/* <div className="route border">{single[0]}</div> */}
                                                                            <div className="pieces font-normal text-[6px] sm:text-[9px]">{single[1].map((s:any)=>
                                                                            <span>
                                                                                  {s.description1!=""?s.description1:'-'}
                                                                            </span>
                                                                            )}</div>
                                                                      </div>
                                                                        )}   
                                                                      </div> 
                                                                    
                                                                  }
                                                            </td>
                                                            <td className="border border-slate-500">
                                                                  <div className="flex justify-center items-center">
                                                                  {adult.length==0?
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="24" fill="red" className="bi bi-x" viewBox="0 0 16 16">
                                                                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                                                    </svg>
                                                                  :adult.length==2?
                                                                    <div className="flex" style={{width:'100%'}}>
                                                                        {adult.map((single:any,index:number)=>
                                                                        <div className="flex-[1] border">
                                                                              <div className="route border text-[6px] sm:text-[9px]">{single[0]}</div>
                                                                              <div className="pieces font-normal text-[6px] sm:text-[8px]">{single[1].map((s:any)=>
                                                                              s.type!=""?s.type:'-'
                                                                              )}</div>
                                                                        </div>
                                                                      )}   
                                                                    </div> 
                                                                    :
                                                                    <div className="flex">
                                                                    {adult.map((single:any)=>
                                                                    <div className="flex-[1] border">
                                                                          {/* <div className="route border">{single[0]}</div> */}
                                                                          <div className="pieces font-normal text-[6px] sm:text-[9px]">{single[1].map((s:any)=>
                                                                              s.type!=""?s.type:'-'
                                                                          )}</div>
                                                                    </div>
                                                                        )}   
                                                                      </div>
                                                                    
                                                                    }
                                                                  </div>
                                                            </td>
                                                          </tr>
                                          {/* CHILD  */}
                                                          {child.length!=0?
                                                                         <tr>
                                                                         <td className="border border-slate-500 text-[7px] sm:text-[10px] font-semibold">CHILD</td>
                                                                         <td className="border border-slate-500">
                                                                             {child.length==0?
                                                                               <div className="flex justify-center items-center">
                                                                                   <svg xmlns="http://www.w3.org/2000/svg" width="23" height="24" fill="red" className="bi bi-x" viewBox="0 0 16 16">
                                                                                   <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                                                                   </svg>
                                                                               </div>
                                                                               :child.length==2?
                                                                               <div className="flex">
                                                                                   {child.map((single:any)=>
                                                                                   <div className="flex-[1] border">
                                                                                         <div className="route border text-[6px] sm:text-[9px]">{single[0]}</div>
                                                                                         <div className="pieces font-normal text-[6px] sm:text-[9px]">{single[1].map((s:any)=>s.noOfPieces)}</div>
                                                                                   </div>
                                                                                 )}   
                                                                               </div> 
                                                                               :
                                                                               <div className="flex">
                                                                               {child.map((single:any)=>
                                                                               <div className="flex-[1] border">
                                                                                     {/* <div className="route border">{single[0]}</div> */}
                                                                                     <div className="pieces font-normal text-[6px] sm:text-[9px]">{single[1].map((s:any)=>s.noOfPieces)}</div>
                                                                               </div>
                                                                                   )}   
                                                                                 </div> 
                                                                               }
                                                                                                                             
                                                                         </td>
                                                                         <td className="border border-slate-500">
                                                                               {
                                                                                 child.length==0?
                                                                                 <div className="flex justify-center items-center">
                                                                                 <svg xmlns="http://www.w3.org/2000/svg" width="23" height="24" fill="red" className="bi bi-x" viewBox="0 0 16 16">
                                                                                   <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                                                                 </svg>
                                                                                 </div>
                                                                                 :child.length==2?
                                                                                 <div className="flex">
                                                                                     {child.map((single:any,index:number)=>
                                                                                     <div className="flex-[1] border">
                                                                                           <div className="route border text-[6px] sm:text-[9px]">{single[0]}</div>
                                                                                           <div className="pieces font-normal text-[6px] sm:text-[8px]">{single[1].map((s:any)=>
                                                                                           <span className="flex flex-col">
                                                                                               <span> {s.description1!=""?s.description1:'-'}</span>
                                                                                               <span> {s.description2!=""?s.description2:'-'}</span>
                                                                                           </span>
                                                                                           )}</div>
                                                                                     </div>
                                                                                   )}   
                                                                                 </div> 
                                                                                   :
                                                                                   <div className="flex">
                                                                                   {child.map((single:any)=>
                                                                                   <div className="flex-[1] border">
                                                                                         {/* <div className="route border">{single[0]}</div> */}
                                                                                         <div className="pieces font-normal text-[6px] sm:text-[9px]">{single[1].map((s:any)=>
                                                                                         <span>
                                                                                               {s.description1!=""?s.description1:'-'}
                                                                                         </span>
                                                                                         )}</div>
                                                                                   </div>
                                                                                     )}   
                                                                                   </div> 
                                                                                 
                                                                               }
                                                                         </td>
                                                                         <td className="border border-slate-500">
                                                                               <div className="flex justify-center items-center">
                                                                               {child.length==0?
                                                                                 <svg xmlns="http://www.w3.org/2000/svg" width="23" height="24" fill="red" className="bi bi-x" viewBox="0 0 16 16">
                                                                                   <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                                                                 </svg>
                                                                               :child.length==2?
                                                                                 <div className="flex" style={{width:'100%'}}>
                                                                                     {child.map((single:any,index:number)=>
                                                                                     <div className="flex-[1] border">
                                                                                           <div className="route border text-[6px] sm:text-[9px]">{single[0]}</div>
                                                                                           <div className="pieces font-normal text-[6px] sm:text-[8px]">{single[1].map((s:any)=>
                                                                                           s.type!=""?s.type:'-'
                                                                                           )}</div>
                                                                                     </div>
                                                                                   )}   
                                                                                 </div> 
                                                                                 :
                                                                                 <div className="flex">
                                                                                 {child.map((single:any)=>
                                                                                 <div className="flex-[1] border">
                                                                                       {/* <div className="route border">{single[0]}</div> */}
                                                                                       <div className="pieces font-normal text-[6px] sm:text-[9px]">{single[1].map((s:any)=>
                                                                                           s.type!=""?s.type:'-'
                                                                                       )}</div>
                                                                                 </div>
                                                                                     )}   
                                                                                   </div>
                                                                                 
                                                                                 }
                                                                               </div>
                                                                         </td>
                                                                       </tr>
                                                          :''}
                                        {/* INFANT  */}
                                        {
                                          infant.length!=0?
                                          <tr>
                                          <td className="border border-slate-500 text-[7px] sm:text-[10px] font-semibold">INFANT</td>
                                          <td className="border border-slate-500">
                                              {infant.length==0?
                                                <div className="flex justify-center items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="24" fill="red" className="bi bi-x" viewBox="0 0 16 16">
                                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                                    </svg>
                                                </div>
                                                :infant.length==2?
                                                <div className="flex">
                                                    {infant.map((single:any)=>
                                                    <div className="flex-[1] border">
                                                          <div className="route border text-[6px] sm:text-[9px]">{single[0]}</div>
                                                          <div className="pieces font-normal text-[6px] sm:text-[9px]">{single[1].map((s:any)=>s.noOfPieces)}</div>
                                                    </div>
                                                  )}   
                                                </div> 
                                                :
                                                <div className="flex">
                                                {infant.map((single:any)=>
                                                <div className="flex-[1] border">
                                                      {/* <div className="route border">{single[0]}</div> */}
                                                      <div className="pieces font-normal text-[6px] sm:text-[9px]">{single[1].map((s:any)=>s.noOfPieces)}</div>
                                                </div>
                                                    )}   
                                                  </div> 
                                                }
                                                                                              
                                          </td>
                                          <td className="border border-slate-500">
                                                {
                                                  infant.length==0?
                                                  <div className="flex justify-center items-center">
                                                  <svg xmlns="http://www.w3.org/2000/svg" width="23" height="24" fill="red" className="bi bi-x" viewBox="0 0 16 16">
                                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                                  </svg>
                                                  </div>
                                                  :infant.length==2?
                                                  <div className="flex">
                                                      {infant.map((single:any,index:number)=>
                                                      <div className="flex-[1] border">
                                                            <div className="route border text-[6px] sm:text-[9px]">{single[0]}</div>
                                                            <div className="pieces font-normal text-[6px] sm:text-[8px]">{single[1].map((s:any)=>
                                                            <span className="flex flex-col">
                                                                <span> {s.description1!=""?s.description1:'-'}</span>
                                                                <span> {s.description2!=""?s.description2:'-'}</span>
                                                            </span>
                                                            )}</div>
                                                      </div>
                                                    )}   
                                                  </div> 
                                                    :
                                                    <div className="flex">
                                                    {infant.map((single:any)=>
                                                    <div className="flex-[1] border">
                                                          {/* <div className="route border">{single[0]}</div> */}
                                                          <div className="pieces font-normal text-[6px] sm:text-[9px]">{single[1].map((s:any)=>
                                                          <span>
                                                                {s.description1!=""?s.description1:'-'}
                                                          </span>
                                                          )}</div>
                                                    </div>
                                                      )}   
                                                    </div> 
                                                  
                                                }
                                          </td>
                                          <td className="border border-slate-500">
                                                <div className="flex justify-center items-center">
                                                {infant.length==0?
                                                  <svg xmlns="http://www.w3.org/2000/svg" width="23" height="24" fill="red" className="bi bi-x" viewBox="0 0 16 16">
                                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                                  </svg>
                                                :infant.length==2?
                                                  <div className="flex" style={{width:'100%'}}>
                                                      {child.map((single:any,index:number)=>
                                                      <div className="flex-[1] border">
                                                            <div className="route border text-[6px] sm:text-[9px]">{single[0]}</div>
                                                            <div className="pieces font-normal text-[6px] sm:text-[8px]">{single[1].map((s:any)=>
                                                            s.type!=""?s.type:'-'
                                                            )}</div>
                                                      </div>
                                                    )}   
                                                  </div> 
                                                  :
                                                  <div className="flex">
                                                  {infant.map((single:any)=>
                                                  <div className="flex-[1] border">
                                                        {/* <div className="route border">{single[0]}</div> */}
                                                        <div className="pieces font-normal text-[6px] sm:text-[9px]">{single[1].map((s:any)=>
                                                            s.type!=""?s.type:'-'
                                                        )}</div>
                                                  </div>
                                                      )}   
                                                    </div>
                                                  
                                                  }
                                                </div>
                                          </td>
                                        </tr>
                                        :''

                                        }
                                          </tbody>
                                          </table>
                                      </span>
                         </div>
                         <div className="b  hidden sm:block sm:flex sm:flex-[1] flex justify-center items-center p-1" style={{justifyContent:'center',alignItems:'center'}}>
                                          <svg xmlns="http://www.w3.org/2000/svg" height="70" width="70" fill="blue" viewBox="0 0 384 512">
                                            <path d="M144 56c0-4.4 3.6-8 8-8h80c4.4 0 8 3.6 8 8v72H144V56zm176 72H288V56c0-30.9-25.1-56-56-56H152C121.1 0 96 25.1 96 56v72H64c-35.3 0-64 28.7-64 64V416c0 35.3 28.7 64 64 64c0 17.7 14.3 32 32 32s32-14.3 32-32H256c0 17.7 14.3 32 32 32s32-14.3 32-32c35.3 0 64-28.7 64-64V192c0-35.3-28.7-64-64-64zM112 224H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 128H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16z"/>
                                          </svg> 
                         </div>
                    </div>
           </div>
    </div>  
      <div className="bg-[#00004d] p-2 sm:p-4" style={{border:'',borderRadius:8}}>
            <div className="flex flex-col sm:flex-row">
                 <div className="a mx-3 my-1 flex flex-col flex-[1] text-center sm:text-left text-white">
                             <span style={{fontWeight:'bold'}}>
                             {getSymbolFromCurrency(data.FareBreakdown[0].CurrencyCode)}{data.GrossFare.toFixed(2)}
                             </span>
                             <span className="text-xs">
                               per person
                             </span>
                             <span className="text-xs">
                                as low as {getSymbolFromCurrency(data.FareBreakdown[0].CurrencyCode)}{(data.GrossFare/11).toFixed(0)}/month
                             </span>
                 </div>
                 <div className="b flex-[1]  text-center sm:text-right text-white">
                              <span>
                                  <ButtonPrimary className="text-sm bg-[#00b300] hover:bg-white hover:text-[#00b300]" href={`/travellerinfo`}>Continue to Check out</ButtonPrimary>
                              </span>
     

                 </div>
            </div>
      </div>
</div>
 );
};

export default TripSummaryCard;