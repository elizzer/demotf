import React, { FC, useState, useEffect } from "react";
import TabFilters from "./TabFilters";
import Heading2 from "components/Heading/Heading2";
import FlightCard, { FlightCardProps } from "components/FlightCard/FlightCard";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Button from "shared/Button/Button";
import { flightDataService } from "../../data/flightDataService";
import RoundtripForm  from "./../../components/HeroSearchForm/RoundtripForm"
import ClearDataButton from "components/HeroSearchForm/ClearDataButton";

export interface SectionGridFilterCardProps {
  className?: string;
  onClick?: (data: {modifySearchTab:boolean}) => void;
  flightResult?:any;
}

const SectionGridFilterCard: FC<SectionGridFilterCardProps> = ({
  className = "",
  onClick,
  flightResult
}) => {
  const [modifySearchTab, setmodifySearchTab] = useState<boolean>(false);
  const [flightList, setFlightList] = useState(flightResult);
  const [formData, setFormData] = useState(Object);
  const [minFare,setMinFare]=useState(0);
  //Pagennation
  // const [pagenation, setPagenation] = useState(flightResult);

  const [visible, setVisible] = useState(50)

    const showMoreItems = () => {
      setVisible(visible+10);
    }

    const setMin=(min:any)=>{
      // console.log('working');
      // console.log(min);
      setMinFare(min)
    }
    // console.log(visible);
  //  const pagenation=(data:any)=>{
  //      console.log('Pagination')
  //  }
  // useEffect(() => {
  //       setPagenation(flightList)
  // },[])

  //    console.log(flightList);
  // console.log('[+]', flightResult)
  // useEffect(() => {
  //   setflightList(flightDataService.getFlightListData());
  // },[flightDataService.getFlightListData()]);
  
  useEffect(() => {
    let formData = async() =>{
      let data = await flightDataService.getFormDataStore();
      data && setFormData(data);
    }
    formData();
  },[]);
        


  
  useEffect(() => {
    if (onClick) {
      onClick({ modifySearchTab });
    }
    // console.log(modifySearchTab)
  }, [modifySearchTab]);

  return (
    <div
      className={`nc-SectionGridFilterCard ${className}`}
      data-nc-id="SectionGridFilterCard"
    >
      { formData.pickupInputValue &&  
      <Heading2
        heading={formData.pickupInputValue.split(",")[2] + ' - ' + formData.dropOffInputValue.split(",")[2]}
        subHeading={
          <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
            {flightList && flightList.length} flights
            <span className="mx-2">·</span>
            {formData.dropOffLocationType}
            <span className="mx-2">·</span>{formData.guestValue.guestAdults} Guests
            <span className="mx-2">·</span>
            <Button onClick={() => {setmodifySearchTab(!modifySearchTab)}}>Modify Search</Button>
          </span>
        }
      />}
      <div className="mb-8 z-20 lg:mb-11">
        <TabFilters flightList={flightList} setFlightList={setFlightList} flightResult={flightResult} setMin={setMin}/>
      </div>
      <div className="grid grid-cols-1 z-20 gap-6 lg:p-10 lg:bg-neutral-50 lg:dark:bg-black/20 rounded-3xl">
        {flightList && flightList.slice(0,visible).map((item:any, index:number)=>(
          <FlightCard key={index} dataIndex={index} data={item} min={minFare}/>
        ))}
 
 
   

        {flightList && flightList.length === 0 && <h4 className="flex items-center justify-center mt-12">No Flights Available</h4>}
        {/* {DEMO_DATA.map((item, index) => (
          <FlightCard key={index} data={item} />
        ))} */}
        {flightList && flightList.length !== 0 && <div className="flex items-center justify-center mt-12">
          
          <ButtonPrimary><span onClick={showMoreItems}>{visible>=flightList.length?'No More Flight':'Show More'}</span></ButtonPrimary>
        </div>}
      </div>
    </div>
    
  );
};

export default SectionGridFilterCard;