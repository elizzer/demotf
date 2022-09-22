import React, { FC, Fragment, useEffect, useState } from "react";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonThird from "shared/Button/ButtonThird";
import ButtonClose from "shared/ButtonClose/ButtonClose";
import Checkbox from "shared/Checkbox/Checkbox";
import convertNumbThousand from "utils/convertNumbThousand";
import Slider, { Range } from "rc-slider";
import { flightDataService } from "data/flightDataService"
import { config } from '../../config';
import { max } from "moment";


// flightDataService.getFlightListData()
// console.log(flightDataService.getFlightListData())


const typeOfAirlines = [
  {
    name: "Star Alliance",
  },
  {
    name: "Air China",
  },
  {
    name: "Air India",
  },
  {
    name: "Air New Zealand",
  },
  {
    name: "Asiana",
  },
  {
    name: "Bangkok Airways",
  },
];
const stopPoints = [
  {
    id:1,
    name: "STOPS 1"
  },
  {
    id:2,
    name: "STOPS 2",
  },
  {
    id:1,
    name: "STOPS 3",
  },
  {
    id:3,
    name: "Any nber of stops",
  },
];

export interface TabFiltersProps{
  className?:string;
  // stops:any
  // setStops:any;
  flightList: any;
  setFlightList:any;
  flightResult:any;
  setMin:any
}

//
const TabFilters: FC<TabFiltersProps> = ({
  className = "",
  
  flightList,
  setFlightList, 
  flightResult,
  setMin   
}) => {
  const [isOpenMoreFilter, setisOpenMoreFilter] = useState(false);
  //

  let minimumGross:number=9999999999;
  let maximumGross:number=0;
  let maximumTripTime:number=10
  
  const [isOnSale, setIsOnSale] = useState(true);
  const [rangePrices, setRangePrices] = useState([100,99999]);
  const [tripTimes, setTripTimes] = useState(200);
  const [stopPontsStates, setStopPontsStates] = useState<string[]>([]);
  const [airlinesStates, setAirlinesStates] = useState<string[]>([]);
 
 //STATES FOR FINDING WHERE TO WHERE
 const [origin,setOrigin]=useState('');
 const [destination,setDestination]=useState(''); 
 const [returnOrigin,setReturnOrigin]=useState('');
 const [returnDestination,setReturnDestination]=useState('');
// console.log(flightResult);
  
  // console.log(rangePrices);
 const [flightResults, setFlightResults] = useState([flightDataService.getFlightListData()])
 let flightTypeArr:any = [];

  //console.log(flightTypeArr)
  //Filterfor airport
 const flightMap = flightResults[0]?.map((item:any, index:number) => {
      let flightType:any = item.Itinerary[0]?.OriginDestination[0]?.MarketingAirlineName     
      const value = flightTypeArr.includes(flightType)
      if(!value){
       flightTypeArr.push(flightType)
      }
 }) 
const tripTimeFlight = flightResults[0]?.map((item:any, index:number) => {
    let flightTrip:any = item.Itinerary[0]?.OriginDestination[0]?.TravelDurationInMinutes
    if(flightTrip>maximumTripTime)
    {
      maximumTripTime =flightTrip
    }
})

 //filter for price range
 const flightRange = flightResults[0]?.map((item:any, index:number) => {
  
     let flightPriceRange:any = item.FareBreakdown[0].GrossFare 
    if(flightPriceRange>maximumGross)
      {
        maximumGross = flightPriceRange
      }
    if(flightPriceRange<minimumGross)
    {
      minimumGross=flightPriceRange
    }  
      //  setFlightList(flightPriceRange)
 })
 if(minimumGross!=null)
   setMin(minimumGross); 
  
//  console.log('Minimum Gross:'+minimumGross);
//  console.log('Maximum Gross:'+maximumGross);


 //console.log(flightTypeArr)
 //filter for number of stops
 let flightStopsArr:any = []
 //console.log(flightStopsArr)
 const flightNoOfStops = flightResults[0]?.map((item:any, index:number) => {
      let stopsOfFlights:any = item.Itinerary[0]?.JourneyInfo?.NoOfStop
      const value = flightStopsArr.includes(stopsOfFlights)
      if(!value){
       flightStopsArr.push(stopsOfFlights)
      } 
 })
//console.log(flightStopsArr)


  
  //
  let [catTimes, setCatTimes] = useState({
    "DepartureFlight": {
      Departure: [0, 24],
      Arrival: [0, 24],
    },
    "ReturnFlight": {
      Departure: [0, 24],
      Arrival: [0, 24],
    },
  });
// console.log(catTimes);
  //
  const closeModalMoreFilter = () => setisOpenMoreFilter(false);
  const openModalMoreFilter = () => setisOpenMoreFilter(true);

  
//RANGE PRICES
useEffect(()=>{
  const ResetPrices=()=>{
    const tempRangeArr:any=[];
    flightResults[0].map((singleData:any)=>
    {
      //  console.log(singleData);
     if(singleData.FareBreakdown[0].GrossFare>=rangePrices[0] && singleData.FareBreakdown[0].GrossFare<=rangePrices[1]+1)
     {
      tempRangeArr.push(singleData);
     }})
     setFlightList(tempRangeArr);
 }
 if(flightResults[0]!=null)
    ResetPrices();
},[rangePrices])  

// FLIGHT TIME
useEffect(()=>{
  let startingPlace:string="";
  let endingPlace:string="";
  let flag:any=0;
  let secondFlag:any=0;
  let thirdFlag:any=0;
  const setFlightTime=()=>{
   
    flightResults[0].map((singleData:any)=>
    {
                  startingPlace=singleData.Itinerary[0].OriginDestination[0].OriginAirportName;
                  endingPlace=singleData.Itinerary[0].OriginDestination[singleData.Itinerary[0].JourneyInfo.NoOfStop].DestinationAirportName;
                  flag=1;
    })
    
  }
   
  const filterDepartureData=()=>{
    let i=0;
    let j=0;
    let k=0;
    let tempArray:any=[];
    // let flag=0;
    flightResults[0].map((singleData:any)=>
    {
      k++;
      
      let depatureTime:any=singleData.Itinerary[0].OriginDestination[0].DepartureTime;
      // console.log(depatureTime);
      depatureTime=parseInt(depatureTime.substring(11,13));
      
      let arrivalTime:any=singleData.Itinerary[0].OriginDestination[singleData.Itinerary[0].JourneyInfo.NoOfStop].ArrivalTime;
      arrivalTime=parseInt(arrivalTime.substring(11,13));
      
      // console.log(arrivalTime);
      
      let userDepartTime:any=catTimes.DepartureFlight;
      let userArrivalTime:any=catTimes.DepartureFlight;
      // console.log(userADepartTime.Departure)
      // console.log(userDepartTime.userDepartTime.Departure[1])
      // console.log(userArrivalTime);
      if(depatureTime>=userDepartTime.Departure[0]&&depatureTime<=userDepartTime.Departure[1])
      {    if(arrivalTime>=userArrivalTime.Arrival[0]&&arrivalTime<=userArrivalTime.Arrival[1])
              {
                j++;
                tempArray.push(singleData);
                secondFlag=1;
              }
              else{
                i++;
              }
      }
      else
      {
         i++;
         
      }
    })
    if(secondFlag==1 &&j!=0)
    {
         
      // console.log('works');
      // console.log(tempArray);
      setFlightList(tempArray);
    }
    if(j==0)
    {
      setFlightList([])
    }
    //console.log("Total:"+k)
     //console.log("No flights:"+i)
     //console.log("Available:"+j)
}
 
if(flightResults[0]!=null)
{
  setFlightTime();
  filterDepartureData();
}
if(flag==1)
{
  setOrigin(startingPlace);
  setDestination(endingPlace);
}
},[catTimes.DepartureFlight])
useEffect(()=>{
  let thirdFlag:any=0;
  const filterReturnData=()=>{
    let i=0;
    let j=0;
    let k=0;
    let tempArray:any=[];
    // let flag=0;
    flightResults[0].map((singleData:any)=>
    {
     if(singleData.Itinerary[1])
     {
      k++;
      
      let depatureTime:any=singleData.Itinerary[1].OriginDestination[0].DepartureTime;
      // console.log(depatureTime);
      depatureTime=parseInt(depatureTime.substring(11,13));
      
      let arrivalTime:any=singleData.Itinerary[1].OriginDestination[singleData.Itinerary[1].JourneyInfo.NoOfStop].ArrivalTime;
      arrivalTime=parseInt(arrivalTime.substring(11,13));

      // console.log(arrivalTime);
      
      let userDepartTime:any=catTimes.ReturnFlight;
      let userArrivalTime:any=catTimes.ReturnFlight;
      // console.log(userADepartTime.Departure)
      // console.log(userDepartTime.userDepartTime.Departure[1])
      // console.log(userArrivalTime);
      if(depatureTime>=userDepartTime.Departure[0]&&depatureTime<=userDepartTime.Departure[1])
      {    if(arrivalTime>=userArrivalTime.Arrival[0]&&arrivalTime<=userArrivalTime.Arrival[1])
              {
                j++;
                tempArray.push(singleData);
                thirdFlag=1;
              }
              else{
                i++;
              }
      }
      else
      {
         i++;
         
      }
    
     }

    })
    if(thirdFlag==1 &&j!=0)
    {
        setFlightList(tempArray);
    }
    if(j==0)
    {
      setFlightList([])
    }
    //  console.log("Total:"+k)
    //  console.log("No flights:"+i)
    //  console.log("Available:"+j)
  }
    if(flightResults[0]!=null)
    {
       filterReturnData();
    }
},[catTimes.ReturnFlight])


useEffect(() => {
  const RecentTripTime =() => {
    const tempTripArr:any=[];
    
  //  console.log(catTimes);
    flightResults[0].map((singleData:any) => { 
         var temp:string=singleData.Itinerary[0].JourneyInfo.TotalTravelDurationInMinutes;
         var formatTemp:string=temp.substring(3,9);
         var hrFormat:any=formatTemp.substring(0,2);
        //  console.log('hi')
           if(hrFormat.charAt(1)=='H')
           {
             hrFormat='0'+hrFormat.charAt(0);
           }
         var hrINmiutes:any=parseInt(hrFormat)*60;
         var minFormat=formatTemp.substring(3,5);
         if(minFormat.charAt(1)=='M')
         {
           minFormat='0'+minFormat.charAt(0);
         }
        //  console.log('check')
         var totalHrandMin:any=parseInt(hrINmiutes)+parseInt(minFormat);
        //  console.log(totalHrandMin);
         var total=parseInt(temp.substring(0,1))*24*60+parseInt(totalHrandMin);
        //  console.log(total+'min');

    
      if(total<=tripTimes*60)
      {
        tempTripArr.push(singleData)
      }
    })
    // console.log('altered')
    // console.log(tempTripArr);
    setFlightList(tempTripArr)
  }
 
  if(flightResults[0]!=null)
  RecentTripTime();
},[tripTimes])




  //
  const handleChangeStopPoint = (checked: boolean, name: string) => {
    // console.log(flightList)
    checked
      ? setStopPontsStates([...stopPontsStates, name])
      : setStopPontsStates(stopPontsStates.filter((i) => i !== name));
  };

   useEffect(() => {
    if(stopPontsStates.length>0){
      const tempStopArr = flightResult.filter((item:any) => stopPontsStates.includes(item.Itinerary[0]?.JourneyInfo.NoOfStop)) 
    console.log(stopPontsStates)
    setFlightList(tempStopArr)
    }
  }, [stopPontsStates])

  const handleChangeAirlines = (checked: boolean, name: string) => {
    //console.log(flightList)
    checked
       ? setAirlinesStates([...airlinesStates, name])
       : setAirlinesStates(airlinesStates.filter((i) => i !== name));
    //console.log(flightList)
    //console.log(airlinesStates)    
  };

  useEffect(() => {
    if(airlinesStates.length>0){
      const tempArr = flightResult.filter((item:any) => airlinesStates.includes(item.Itinerary[0]?.OriginDestination[0]?.MarketingAirlineName)) 
    console.log(airlinesStates)
    setFlightList(tempArr)
    }
  }, [airlinesStates])
 

  const renderXClear = () => {
    return (
      <span className="flex items-center justify-center w-4 h-4 ml-3 text-white rounded-full cursor-pointer bg-primary-500">
        <svg
          xmlns="www.w3.org/2000/svg"
          className="w-3 h-3"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    );
  };

  const renderTabsTimeFlightTab = () => {
    return (
      <div>
        <Tab.Group>
          <Tab.List className="flex p-1 z-10 space-x-1 bg-primary-900/10 rounded-xl">
            {Object.keys(catTimes).map((category) => (
              <Tab
                key={category}
                className={({ selected }) =>
                  `w-full py-2.5 text-sm leading-5 font-medium text-primary-700 rounded-lg focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60 ${
                    selected ? "bg-white shadow" : " hover:bg-white/[0.15]"
                  }`
                }
              >
                {category}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-2">
            {Object.values(catTimes).map((posts, idx) => {
              return (
                <Tab.Panel
                  key={idx}
                  className={
                    "bg-neutral-50 rounded-xl p-3 space-y-8 focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60"
                  }
                >
                  <span className="text-sm text-neutral-6000">
                    {idx ?`${origin} to ${destination}` :`${destination} to ${origin}`}
                  </span>
                  <div></div>
                  <div className="space-y-3">
                    <div className="flex space-x-2">
                      <i className="text-lg las la-plane-departure"></i>
                      <span className="text-xs">Departure time:</span>
                      <span className="text-xs text-primary-500">
                        {posts.Departure[0]}:00 - {posts.Departure[1]}
                        :00
                      </span>
                    </div>
                    <Range
                      min={0}
                      max={24}
                      defaultValue={posts.Departure}
                      onChange={(val) =>
                        setCatTimes((catTimes) =>
                          !idx
                            ? {
                                ...catTimes,
                                "DepartureFlight": {
                                  ...posts,
                                  Departure: val,
                                },
                              }
                            : {
                                ...catTimes,
                                "ReturnFlight": {
                                  ...posts,
                                  Departure: val,
                                },
                              }
                        )
                      }
                      allowCross={false}
                    />
                  </div>
                  <div className="space-y-3">
                    <div className="flex space-x-2">
                      <i className="text-lg las la-plane-arrival"></i>
                      <span className="text-xs">Arrival time:</span>
                      <span className="text-xs text-primary-500">
                        {posts.Arrival[0]}:00 - {posts.Arrival[1]}:00
                      </span>
                    </div>
                    <Range
                      min={0}
                      max={24}
                      defaultValue={posts.Arrival}
                      onChange={(val) =>
                        setCatTimes((catTimes) =>
                          !idx
                            ? {
                                ...catTimes,
                                "DepartureFlight": {
                                  ...posts,
                                  Arrival: val,
                                },
                              }
                            : {
                                ...catTimes,
                                "ReturnFlight": { 
                                  ...posts,
                                  Arrival: val,
                                },
                              }
                        )
                      }
                      allowCross={false}
                    />
                  </div>
                </Tab.Panel>
              );
            })}
          </Tab.Panels>
        </Tab.Group>
      </div>
    );
  };

  const renderTabsTypeOfAirlines  = () => {
    return (
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`flex items-center z-10 justify-center px-4 py-2 text-sm rounded-full border border-neutral-300 dark:border-neutral-700 focus:outline-none
               ${open ? "!border-primary-500 " : ""}
                ${
                  !!airlinesStates.length
                    ? "!border-primary-500 bg-primary-50"
                    : ""
                }
                `}
            >
              <span>Airlines</span>
              {!airlinesStates.length ? (
                <i className="ml-2 las la-angle-down"></i>
              ) : (
                <span onClick={() => setAirlinesStates([])}>
                  {renderXClear()}
                </span>
              )}
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute left-0 z-10 w-screen max-w-sm px-4 mt-3 sm:px-0 lg:max-w-md">
                <div className="overflow-hidden bg-white border shadow-xl rounded-2xl dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700">
                  <div className="relative flex flex-col px-5 py-6 space-y-5">
                    {/* <Checkbox
                      name="All Airlines"
                      label="All Airlines"
                      defaultChecked={airlinesStates.includes("All Airlines")}
                      onChange={(checked) =>
                        handleChangeAirlines(checked, "All Airlines")
                      }
                    /> */}
                    {/* <hr /> */}
                    {flightTypeArr.map((item:any) => (
                      <div key={item} className="">
                        <Checkbox
                          name={item}
                          label={ item}
                          defaultChecked={airlinesStates.includes(item)}
                          onChange={(checked) =>
                            handleChangeAirlines(checked, item)
                          }
                        />
                      </div>
                    ))}
                  </div>
                  {/* <div className="flex items-center justify-between p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800">
                    <ButtonThird
                      onClick={() => {
                        close();
                        setAirlinesStates([]);
                      }}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Clear
                    </ButtonThird>
                    <ButtonPrimary
                      onClick={close}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Apply
                    </ButtonPrimary>
                  </div> */}
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    );
  };

  const renderTabsStopPoints = () => {

    
    return (
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`flex items-center z-10 justify-center px-4 py-2 text-sm rounded-full border border-neutral-300 dark:border-neutral-700 focus:outline-none 
              ${open ? "!border-primary-500 " : ""}
                ${
                  !!stopPontsStates.length
                    ? "!border-primary-500 bg-primary-50"
                    : ""
                }
                `}
            >
              <span>Stop points</span>
              {!stopPontsStates.length ? (
                <i className="ml-2 las la-angle-down"></i>
              ) : (
                <span onClick={() => setStopPontsStates([])}>
                  {renderXClear()}
                </span>
              )}
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute left-0 z-10 w-screen max-w-sm px-4 mt-3 sm:px-0 lg:max-w-md">
                <div className="overflow-hidden bg-white border shadow-xl rounded-2xl dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700">
                  <div className="relative flex flex-col px-5 py-6 space-y-5">
                    {flightStopsArr.map((item:any) => (
                      <div key={item} className="">
                        <Checkbox
                          name={item}
                          label={`${item} STOPS`}
                          defaultChecked={stopPontsStates.includes(item)}
                          onChange={(checked) =>
                            handleChangeStopPoint(checked, item)
                          }
                        />
                      </div>
                    ))}

                    {/* {
                      stops.map((item:any,index:number) => (
                        <div key={index} className="">
                          <Checkbox 
                            name={item.name}
                            label={item.name}
                            onChange={(checked) =>stopsFilter(checked,index)}
                          />
                        </div>
                      ))
                    } */}
                  </div>
                  {/* <div className="flex items-center justify-between p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800">
                    <ButtonThird
                      onClick={() => {
                        close();
                        setStopPontsStates([]);
                      }}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Clear
                    </ButtonThird>
                    <ButtonPrimary
                      onClick={close}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Apply
                    </ButtonPrimary>
                  </div> */}
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    );
  };

  const renderTabsTimeFlight = () => {
    return (
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`flex items-center z-10 justify-center px-4 py-2 text-sm rounded-full border border-neutral-300 dark:border-neutral-700 focus:outline-none ${
                open ? "!border-primary-500 " : ""
              }`}
            >
              <span>Flight time</span>
              <i className="ml-2 las la-angle-down"></i>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute left-0 z-10 w-screen max-w-sm px-4 mt-3 sm:px-0 lg:max-w-md">
                <div className="overflow-hidden bg-white border shadow-xl rounded-2xl dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700">
                  <div className="relative flex flex-col px-5 py-6 space-y-5">
                    {renderTabsTimeFlightTab()}
                  </div>
                  <div className="flex items-center justify-between p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800">
                    <ButtonThird onClick={close} sizeClass="px-4 py-2 sm:px-5">
                      Clear
                    </ButtonThird>
                    <ButtonPrimary
                      onClick={close}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Apply
                    </ButtonPrimary>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    );
  };

  const renderTabsTripTime = () => {
    return (
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`flex items-center z-10 justify-center px-4 py-2 text-sm rounded-full border border-primary-500 bg-primary-50 text-primary-700 focus:outline-none `}
            >
              <span>less than {tripTimes} hours</span>
              {renderXClear()}
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute left-0 z-10 w-screen max-w-sm px-4 mt-3 sm:px-0 ">
                <div className="overflow-hidden bg-white border shadow-xl rounded-2xl dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700">
                  <div className="relative flex flex-col px-5 py-6 space-y-8">
                    <div className="space-y-5">
                      <div className="font-medium">
                        Trip time:
                        <span className="ml-1 text-sm font-normal text-primary-500">{` <${tripTimes} hours`}</span>
                      </div>

                      <Slider
                        min={1}
                        max={maximumTripTime}
                        defaultValue={tripTimes}
                        onChange={setTripTimes}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800">
                    <ButtonThird onClick={close} sizeClass="px-4 py-2 sm:px-5">
                      Clear
                    </ButtonThird>
                    <ButtonPrimary
                      onClick={close}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Apply
                    </ButtonPrimary>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    );
  };

  const renderTabsPriceRage = () => {
    return (
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`flex z-10 items-center justify-center px-4 py-2 text-sm rounded-full border border-primary-500 bg-primary-50 text-primary-700 focus:outline-none `}
            >
              <span>
                {`$${convertNumbThousand(
                  rangePrices[0]
                )} - $${convertNumbThousand(rangePrices[1])}`}{" "}
              </span>
              {renderXClear()}
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute left-0 z-10 w-screen max-w-sm px-4 mt-3 sm:px-0 ">
                <div className="overflow-hidden bg-white border shadow-xl rounded-2xl dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700">
                  <div className="relative flex flex-col px-5 py-6 space-y-8">
                    <div className="space-y-5">
                      <span className="font-medium">Price per person</span>
                      <Range
                        min={100}
                        max={maximumGross}
                        defaultValue={[rangePrices[0],rangePrices[1]]}
                        allowCross={false}
                        onChange={setRangePrices}
                      />
                    </div>

                    <div className="flex justify-between space-x-5">
                      <div>
                        <label
                          htmlFor="minPrice"
                          className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                        >
                          Min price
                        </label>
                        <div className="relative mt-1 rounded-md">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <span className="text-neutral-500 sm:text-sm">
                              $
                            </span>
                          </div>
                          <input
                            type="text"
                            name="minPrice"
                            disabled
                            id="minPrice"
                            className="block w-full pr-3 rounded-full focus:ring-indigo-500 focus:border-indigo-500 pl-7 sm:text-sm border-neutral-200 text-neutral-900"
                            value={rangePrices[0]}
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="maxPrice"
                          className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                        >
                          Max price
                        </label>
                        <div className="relative mt-1 rounded-md">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <span className="text-neutral-500 sm:text-sm">
                              $
                            </span>
                          </div>
                          <input
                            type="text"
                            disabled
                            name="maxPrice"
                            id="maxPrice"
                            className="block w-full pr-3 rounded-full focus:ring-indigo-500 focus:border-indigo-500 pl-7 sm:text-sm border-neutral-200 text-neutral-900"
                            value={rangePrices[1]}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800">
                    <ButtonThird onClick={close} sizeClass="px-4 py-2 sm:px-5">
                      Clear
                    </ButtonThird>
                    <ButtonPrimary
                      onClick={close}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Apply
                    </ButtonPrimary>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    );
  };

  const renderTabOnSale = () => {
    return (
      <div
        className={`flex items-center z-10 justify-center px-4 py-2 text-sm rounded-full border focus:outline-none cursor-pointer transition-all ${
          isOnSale
            ? "border-primary-500 bg-primary-50 text-primary-700"
            : "border-neutral-300 dark:border-neutral-700"
        }`}
        onClick={() => setIsOnSale(!isOnSale)}
      >
        <span>On sale</span>
        {isOnSale && renderXClear()}
      </div>
    );
  };

  const renderMoreFilterItem = (
    data: {
      name: string;
      description?: string;
      defaultChecked?: boolean;
    }[]
  ) => {
    const list1 = data.filter((_, i) => i < data.length / 2);
    const list2 = data.filter((_, i) => i >= data.length / 2);
    return (
      <div className="grid grid-cols-2 gap-8">
        <div className="flex flex-col space-y-5">
          {list1.map((item) => (
            <Checkbox
              key={item.name}
              name={item.name}
              subLabel={item.description}
              label={item.name}
              defaultChecked={!!item.defaultChecked}
            />
          ))}
        </div>
        <div className="flex flex-col space-y-5">
          {list2.map((item) => (
            <Checkbox
              key={item.name}
              name={item.name}
              subLabel={item.description}
              label={item.name}
              defaultChecked={!!item.defaultChecked}
            />
          ))}
        </div>
      </div>
    );
  };

  // FOR RESPONSIVE MOBILE
  const renderTabMobileFilter = () => {
    return (
      <div>
        <div
          className={`flex items-center z-10 justify-center px-4 py-2 text-sm rounded-full border border-primary-500 bg-primary-50 text-primary-700 focus:outline-none cursor-pointer`}
          onClick={openModalMoreFilter}
        >
          <span>
            <span className="hidden sm:inline">Flights</span> filters (3)
          </span>
          {renderXClear()}
        </div>

        <Transition appear show={isOpenMoreFilter} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-20 overflow-y-auto"
            onClose={closeModalMoreFilter}
          >
            <div className="min-h-screen text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40 dark:bg-opacity-60" />
              </Transition.Child>

              {/* This element is to trick the browser into centering the modal contents. */}
              <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <Transition.Child
                className="inline-block w-full h-screen py-8"
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="inline-flex flex-col w-full h-full max-w-4xl overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:text-neutral-100">
                  <div className="relative flex-shrink-0 px-6 py-4 text-center border-b border-neutral-200 dark:border-neutral-800">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Flight filters
                    </Dialog.Title>
                    <span className="absolute left-3 top-3">
                      <ButtonClose onClick={closeModalMoreFilter} />
                    </span>
                  </div>

                  <div className="flex-grow overflow-y-auto">
                    <div className="px-8 divide-y md:px-10 divide-neutral-200 dark:divide-neutral-800">
                      {/* --------- */}
                      {/* ---- */}
                      <div className="py-7">
                        <h3 className="text-xl font-medium">Airlines</h3>
                        <div className="relative mt-6 ">
                          {renderMoreFilterItem(typeOfAirlines)}
                        </div>
                      </div>
                      {/* --------- */}
                      {/* ---- */}
                      <div className="py-7">
                        <h3 className="text-xl font-medium">Stop points</h3>
                        <div className="relative mt-6 ">
                          {renderMoreFilterItem(stopPoints)}
                        </div>
                      </div>

                      {/* --------- */}
                      {/* ---- */}
                      <div className="py-7">
                        <h3 className="text-xl font-medium">Range Prices</h3>
                        <div className="relative mt-6 ">
                          <div className="relative flex flex-col space-y-8">
                            <div className="space-y-5">
                              <Range
                                className="text-red-400"
                                min={0}
                                max={2000}
                                defaultValue={[0, 1000]}
                                allowCross={false}
                                onChange={setRangePrices}
                              />
                            </div>

                            <div className="flex justify-between space-x-5">
                              <div>
                                <label
                                  htmlFor="minPrice"
                                  className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                                >
                                  Min price
                                </label>
                                <div className="relative mt-1 rounded-md">
                                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <span className="text-neutral-500 sm:text-sm">
                                      $
                                    </span>
                                  </div>
                                  <input
                                    type="text"
                                    name="minPrice"
                                    disabled
                                    id="minPrice"
                                    className="block w-full pr-3 rounded-full focus:ring-indigo-500 focus:border-indigo-500 pl-7 sm:text-sm border-neutral-200 text-neutral-900"
                                    value={rangePrices[0]}
                                  />
                                </div>
                              </div>
                              <div>
                                <label
                                  htmlFor="maxPrice"
                                  className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                                >
                                  Max price
                                </label>
                                <div className="relative mt-1 rounded-md">
                                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <span className="text-neutral-500 sm:text-sm">
                                      $
                                    </span>
                                  </div>
                                  <input
                                    type="text"
                                    disabled
                                    name="maxPrice"
                                    id="maxPrice"
                                    className="block w-full pr-3 rounded-full focus:ring-indigo-500 focus:border-indigo-500 pl-7 sm:text-sm border-neutral-200 text-neutral-900"
                                    value={rangePrices[1]}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* --------- */}
                      {/* ---- */}
                      <div className="py-7">
                        <h3 className="text-xl font-medium">
                          Strip times
                          <span className="ml-1 text-sm font-normal text-primary-500">{` <${tripTimes} hours`}</span>
                        </h3>
                        <div className="relative mt-6 ">
                          <Slider
                            min={1}
                            max={72}
                            defaultValue={tripTimes}
                            onChange={setTripTimes}
                          />
                        </div>
                      </div>

                      {/* --------- */}
                      {/* ---- */}
                      <div className="py-7">
                        <h3 className="text-xl font-medium">Flight times</h3>
                        <div className="relative flex flex-col py-5 space-y-5">
                          {renderTabsTimeFlightTab()}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between flex-shrink-0 p-6 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800">
                    <ButtonThird
                      onClick={closeModalMoreFilter}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Clear
                    </ButtonThird>
                    <ButtonPrimary
                      onClick={closeModalMoreFilter}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Apply
                    </ButtonPrimary>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      </div>
    );
  };

  return (
    <div className="flex z-10 lg:space-x-4">
      {/* FOR DESKTOP */}
      <div className="hidden space-x-4 lg:flex">
        {renderTabsTypeOfAirlines()}
        {renderTabsTripTime()}
        {renderTabsStopPoints()}
        {renderTabsPriceRage()}
        {renderTabsTimeFlight()}
        {renderTabOnSale()}
      </div>

      {/* FOR RESPONSIVE MOBILE */}
      <div className="flex space-x-4 lg:hidden">
        {renderTabMobileFilter()}
        {renderTabOnSale()}
      </div>
    </div>
  );
};

export default TabFilters;
