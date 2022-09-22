import React, { FC, useState } from "react";
import moment from "moment";
import ReactTooltip from "react-tooltip";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import getSymbolFromCurrency from 'currency-symbol-map';
import { flightDataService } from "../../data/flightDataService";
import { useHistory } from "react-router-dom";



export interface FlightCardProps {
  className?: string;
  // data: {
  //   id: string;
  //   airlines: {
  //     logo: string;
  //     name: string;
  //   };
  //   price: string;
  // };
  dataIndex: any;
  data : any;
  min:any;
}

const FlightCard: FC<FlightCardProps> = ({ className = "", dataIndex,data,min }) => {
  const history = useHistory();

  // let searchForm = flightDataService.getSearchForm()
  // console.log(searchForm);
  // console.log(data.Itinerary[0].OriginDestination[0].AirBaggageAllowance)
  // console.log(min);
  //  console.log(data.Itinerary[0].OriginDestination[0].DepartureTime.substring(11,13))
  // console.log(data)   
  // const [isOpen, setIsOpen] = useState(false);
  const roundTripClasses = "relative border-b border-neutral-100 dark:border-neutral-700"
  //TO HELP DISPLAY THE CHEAPEST FLIGHT
  let once:number=0;

  const timeConvert=(n:number)=>
   {
    var num = n;
    var hours = (num / 60);
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    //  console.log(rhours + "h " + rminutes + "m");
    return rhours+"H "+rminutes+"M";
  }
 
  const  tConv24=(time24:any)=>
     {
      var ts = time24;
      var H = +ts.substr(0, 2);
      var h:any = (H % 12) || 12;
      h = (h < 10)?("0"+h):h;  // leading 0 at the left for 1 digit hours
      var ampm = H < 12 ? "a" : "p";
      ts = h + ts.substr(2, 3) + ampm;
      // console.log(ts);
      return ts;
    };
    let count=0;
   if(data.FareBreakdown[0].GrossFare==min)
      count++;
   if(parseInt(data.Itinerary[0].OriginDestination[0].DepartureTime.substring(11,13))<8)
      count++;  

  
   const sendToNextPage=()=>
   {
    //  console.log('clicked');
     history.push(`/trip-summary/${data.Itinerary[1]?1:0}/${data.IteneraryRefID}`)
   }

    return (
                       <div className="flex flightcard border border-[#d2d2ad] rounded-md cursor-pointer shadow-xl hover:shadow-2xl dark:border-none dark:bg-[#111827] dark:shadow-2xl" onClick={sendToNextPage}>
                                <div className="flex-[5]">
                                       <div className="flex flex-col">
                                           <div className="flex-[10] flex flex-col m-1">
                                                    <div className="flex-[1] flex flex-row">
                                                          {data.FareBreakdown[0].GrossFare==min?
                                                          <span className="flex cheapest cursor-pointer border border-indigo-500 bg-gradient-to-r from-indigo-500 to-blue-500 hover:bg-gradient-to-l from-indigo-500 rounded-md mx-1 px-1 ">
                                                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="16px" width="16px" aria-hidden="true" fill="indigo" focusable="false" role="img" className="my-2 Svg-sc-12lgb6u-0 hzcylw Discount__SvgDiscount-sc-6qjs14-0 jGIFxZ"><path d="M23 12l-2.4 2.7.3 3.5-3.6.8-1.9 3-3.4-1.4L8.6 22l-1.9-3-3.6-.8.3-3.5L1 12l2.4-2.7-.3-3.5L6.7 5l1.9-3L12 3.4 15.4 2l1.9 3 3.6.8-.3 3.5L23 12zm-10.8-.6c-1.3-.3-1.8-.7-1.8-1.3 0-.6.6-1.1 1.6-1.1s1.4.5 1.5 1.2h1.3c0-1-.7-1.9-1.9-2.2V6.7h-1.8V8c-1.1.2-2 1-2 2.1 0 1.3 1.1 2 2.8 2.4 1.5.4 1.8.9 1.8 1.4 0 .4-.3 1-1.6 1-1.2 0-1.7-.5-1.8-1.2H9c.1 1.3 1 2 2.2 2.2v1.3H13V16c1.1-.2 2.1-.9 2.1-2.1-.1-1.6-1.5-2.2-2.9-2.5z"></path></svg>
                                                              <span className="my-2 text-xs font-semibold text-white mx-1">CHEAPEST</span>
                                                          </span>
                                                          :''}
                                                          {parseInt(data.Itinerary[0].OriginDestination[0].DepartureTime.substring(11,13))<8?
                                                          <span className="flex cheapest cursor-pointer  border border-[#ff9900] bg-gradient-to-l from-red-500 to-[#ff9900]  hover:bg-gradient-to-r from-[#ff9900] rounded-md mx-1 px-1">
                                                              <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" height="16px" width="16px" aria-hidden="true" fill="#e5ed02" focusable="false" role="img" className="my-2 Svg-sc-12lgb6u-0 hzcylw EarlyBird__SvgEarlyBird-sc-j9y47b-0 jCasIx"><path d="M19.1 14.9L22 12l-2.9-2.9V4.9H15L12 2 9.1 4.9H4.9V9L2 12l2.9 2.9V19H9l3 3 2.9-2.9H19v-4.2zM12 17.3c-2.9 0-5.3-2.4-5.3-5.3S9.1 6.7 12 6.7s5.3 2.4 5.3 5.3-2.4 5.3-5.3 5.3z"></path></svg>
                                                              <span className="my-2 text-xs font-semibold text-white mx-1">EARLY BIRD FLIGHT</span>
                                                           </span> 
                                                          : ''}
                                                         
                                                    </div>
                                                    {data.Itinerary.map((single:any)=>
                                                     <div className="flex-[5]">
                                                         <div className="flex-[1] flex flex-row m-1">
                                                              <span className="NoOfStops text-xs font-semibold ml-1 my-1 w-16">
                                                                      <span>{single.JourneyInfo.NoOfStop>1?single.JourneyInfo.NoOfStop+' Stops':single.JourneyInfo.NoOfStop==1?single.JourneyInfo.NoOfStop+' Stop':'Non Stop'}</span>
                                                              </span>
                                                              <span className="FlightTime text-xs font-bold mx-1 flex">
                                                                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="24" width="14px" aria-hidden="true" fill="currentcolor" color="text.light" focusable="false" role="img" className="Svg-sc-12lgb6u-0 fGLllI Overnight__SvgOvernight-sc-1pi929c-0 hCOuzz"><path d="M17.6 8.2l.6 2L16.5 9l-1.7 1.2.6-2-1.7-1.3h2.1l.7-2 .7 2h2.1l-1.7 1.3zM19.4 19C15.4 23 9 23 5 19S1 8.6 5 4.6C6.3 3.3 7.9 2.4 9.5 2c-.9 3.4 0 7.2 2.6 9.8 2.7 2.7 6.4 3.5 9.8 2.6-.3 1.7-1.2 3.3-2.5 4.6z"></path></svg>
                                                                      <span className="my-1">
                                                                        {single.JourneyInfo.TotalTravelDurationInMinutes.substring(0,2)=="0D"?single.JourneyInfo.TotalTravelDurationInMinutes.substring(3):single.JourneyInfo.TotalTravelDurationInMinutes}
                                                                      </span>
                                                              </span>
                                                        </div>
                                                        <div className="flex-[4] mx-1 p-2">
                                                              <div className="Design flex text-center">
                                                                  <div className="Logo flex-[1] ">
                                                                          <span className="text-center flex  justify-center items-center cursor-pointer">
                                                                               <img src={`http://travelfika-resources.s3-website-us-east-1.amazonaws.com/airline-logo/${single.OriginDestination[0].MarketingAirline}.gif.gif`} className="w-10" alt="" />
                                                                          </span>
                                                                          <span className="text-[7px] sm:text-sm">
                                                                                <span>
                                                                                  {single.OriginDestination[0].MarketingAirlineName}
                                                                                </span>
                                                                          </span>
                                                                  </div>
                                                                  <div className="Detail flex-[5] flex mx-1 sm:mx-0">
                                                                         <div className="Orgin flex-[1] text-right">
                                                                                <div className="OriginTime  text-[10px] sm:text-sm font-bold" data-for="originDate" data-tip={single.OriginDestination[0].DepartureTime.substring(0,10)+','+single.OriginDestination[0].OriginAirportName+' Intl Airport'}>
                                                                                                {tConv24(single.OriginDestination[0].DepartureTime.substring(11,16))}
                                                                                </div>
                                                                                <ReactTooltip id="originDate" effect="solid" />
                                                                                <div className="OriginCode text-[10px] sm:text-sm font-normal">
                                                                                                {single.OriginDestination[0].OriginCode}
                                                                                </div>
                                                                         </div>
                                                                         <div className="Stops flex-[7] flex">
                                                                                {
                                                                                 single.JourneyInfo.NoOfStop>0?
                                                                                      single.OriginDestination.map((flightStops:any,index:number)=>
                                                                                            index<single.JourneyInfo.NoOfStop
                                                                                            ?
                                                                                                  <div className={`flightStop-`+index+1+' flex-[1]'} style={{position:'relative'}}> 
                                                                                                  <div className="text-center" style={{position:'absolute',top:'44%',left:'50%',border:'2px solid black',borderRadius:'50%',zIndex:9999}}>
                                                                                                    {/* <span>D</span> */}
                                                                                                  </div>
                                                                                                  <span className="text-[9px] sm:text-xs font-semibold" data-for="flightStop" data-tip={flightStops.LayoverTimeInMinutes?flightStops.LayoverTimeInMinutes+' Layover,'+flightStops.DestinationAirportName+' Intl Airport':'No Layover,'+flightStops.DestinationAirportName+' Intl Airport'}>{flightStops.DestinationCode}</span>
                                                                                                  <hr className="border border-t-black dark:border-t-white" style={{height:0,border:''}} />
                                                                                                  <span className="text-[7px] sm:text-[11px] md:text-xs">{timeConvert(flightStops.TravelDurationInMinutes)}</span>
                                                                                                  <ReactTooltip id="flightStop" effect="solid" />
                                                                                                  </div>
                                                                                                  :''
                                                                                                            
                                                                                              )
                                                                                  :
                                                                                  <div className={`flightStop my-5`} style={{width:'100%'}}>
                                                                                     <hr className="border border-t-black dark:border-t-white" style={{height:0,border:''}} />
                                                                                  </div>
                                                                                }
                                                                         </div>
                                                                         <div className="Destination flex-[1] text-left">
                                                                                <div className="DestinationTime text-[10px] sm:text-sm font-bold" data-for="dest" data-tip={single.OriginDestination[0].ArrivalTime.substring(0,10)+','+single.OriginDestination[single.JourneyInfo.NoOfStop].DestinationAirportName+' Intl Airport'}>
                                                                                                {tConv24(single.OriginDestination[single.JourneyInfo.NoOfStop].ArrivalTime.substring(11,16))}
                                                                                </div>
                                                                                <ReactTooltip id="dest" effect="solid" />
                                                                                <div className="DestinationCode text-[10px] sm:text-sm font-normal" data-for="dest">
                                                                                                {single.OriginDestination[single.JourneyInfo.NoOfStop].DestinationCode}
                                                                                </div>
                                                                         </div>
                                                                  </div>
                                                              </div>
                                                        </div>
                                                     </div>
                                                    )}
                                           </div>
                                           {/* NEED DATA FOR FREE CANCELATION */}
                                            <div className="flex-[1] flex   p-1" style={{borderTop:'1px solid #d2d2ad '}}>
                                                       {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="16" width="16" aria-hidden="true" fill="green" color="success.base"  focusable="false" role="img" className="my-1 Svg-sc-12lgb6u-0 gYPmao Check__SvgCheck-sc-178aua9-0 dlqMuw"><path d="M8.6 15.6l-4.2-4.2L3 12.8l5.6 5.6 12-12L19.2 5 8.6 15.6z"></path></svg> */}
                                                       
                                                       {count!=0?
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="16" width="16" aria-hidden="true" fill="green" color="success.base"  focusable="false" role="img" className="my-1 Svg-sc-12lgb6u-0 gYPmao Check__SvgCheck-sc-178aua9-0 dlqMuw"><path d="M8.6 15.6l-4.2-4.2L3 12.8l5.6 5.6 12-12L19.2 5 8.6 15.6z"></path></svg>
                                                        :!data.Itinerary[1]?
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="16" width="16" aria-hidden="true" fill="green" color="success.base"  focusable="false" role="img" className="my-3 Svg-sc-12lgb6u-0 gYPmao Check__SvgCheck-sc-178aua9-0 dlqMuw"><path d="M8.6 15.6l-4.2-4.2L3 12.8l5.6 5.6 12-12L19.2 5 8.6 15.6z"></path></svg>
                                                        :<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="16" width="16" aria-hidden="true" fill="green" color="success.base"  focusable="false" role="img" className="my-1 Svg-sc-12lgb6u-0 gYPmao Check__SvgCheck-sc-178aua9-0 dlqMuw"><path d="M8.6 15.6l-4.2-4.2L3 12.8l5.6 5.6 12-12L19.2 5 8.6 15.6z"></path></svg>

                                                        }
                                                        {/* </div>  */}
                                                       {count!=0?
                                                        <span className="text-[10px] sm:text-[14px]">Free cancellation within 24 hours</span>
                                                        :!data.Itinerary[1]?
                                                        <span className="text-[10px] sm:text-[14px] my-2">Free cancellation within 24 hours</span>
                                                        :<span className="text-[10px] sm:text-[14px]">Free cancellation within 24 hours</span>
                                                        }
                                            </div> 
                                                      
                                       </div>
                                </div>
                                <div className="flex-[1] flex justify-center items-center p-1" style={{borderLeft:'1px solid #d2d2ad '}}>
                                       <div className="RightSide flex flex-col justify-center items-center">
                                           <div className="CabinClass text-sm font-semibold my-1">
                                                {data.Itinerary[0].OriginDestination[0].CabinClass=='E'?'ECONOMY':data.Itinerary[0].OriginDestination[0].CabinClass=='B'?'BUSINESS':'FIRST CLASS'}
                                           </div>  
                                           <div className="Price text-lg font-extrabold text-[#00b300]">
                                                   {getSymbolFromCurrency(data.FareBreakdown[0].CurrencyCode)}{data.GrossFare.toFixed(2)}
                                           </div>
                                           <div className="Trip text-xs">
                                                {data.Itinerary[1]?'round-trip':'one-way'}
                                           </div>
                                           <div className="BagInformation flex flex-row">
                                                <div className="CarryBag" data-for="carryBag" data-tip="Carry Bag Included">
                                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="18" width="18"  aria-hidden="true" fill="currentcolor" name="bag" color="text" data-testid="Carry-on bag"  focusable="false" role="img" className="Svg-sc-12lgb6u-0 dfLtns Bag__SvgBag-sc-1u1j3d7-0 jtPYtp"><path d="M20 6.5h-3v-2c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-11c0-1.1-.9-2-2-2zm-11-2h6v2H9v-2zm11 15H4v-2h16v2zm0-5H4v-6h3v2h2v-2h6v2h2v-2h3v6z"></path></svg>
                                                </div>
                                                <ReactTooltip id="carryBag" effect="solid" />
                                                {data.Itinerary[0].OriginDestination[0].BagsRecheckRequired==false?
                                                        <div className="CheckedBag" data-for="checkBag" data-tip="Checked Bag Included">
                                                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="18" width="18"  aria-hidden="true" fill="currentcolor" name="luggage" color="text" data-testid="Checked Bags" focusable="false" role="img" className="Svg-sc-12lgb6u-0 dfLtns Luggage__SvgLuggage-sc-ypi30e-0 fUvmkQ"><path d="M20 6.5h-4v-2c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-11c0-1.1-.9-2-2-2zm-6 0h-4v-2h4v2z"></path></svg>
                                                        </div>
                                                :''}
                                                <ReactTooltip id="checkBag" effect="solid"/>
                                                {/* FOR ADVANCE SEAT SELECTION  */}
                                                {/* <div className="AdvanceSelection" data-for="advancedSeat" data-tip="Advanced Seat Selection">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="18" width="18" aria-hidden="true" fill="currentcolor" name="seatEconomy" color="text" data-testid="Advance seat selection" focusable="false" role="img" className="Svg-sc-12lgb6u-0 dfLtns Seat__SvgSeat-sc-1ukvv0p-0 ilsKwd"><path d="M4 18v3h3v-3h10v3h3v-6H4v3zm15-8h3v3h-3v-3zM2 10h3v3H2v-3zm15 3H7V5c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2v8z"></path></svg>
                                                </div>
                                                <ReactTooltip id="advancedSeat" effect="solid" /> */}
                                           </div>
                                           <div className="Seats text-xs text-[#cc0000]">
                                               {data.noOfSeats<4?'only '+data.noOfSeats+' seats left!':''}
                                           </div>
                                           <div className="LowAs hidden xl:block  sm:text-[6px] lg:text-[10px] text-[#0000e6] my-5">
                                                As low as  {getSymbolFromCurrency(data.FareBreakdown[0].CurrencyCode)}{(data.GrossFare/11).toFixed(2)} per month
                                           </div>
                                       </div>
                                          
                                </div>
                       </div>
                
  );
};

export default FlightCard;