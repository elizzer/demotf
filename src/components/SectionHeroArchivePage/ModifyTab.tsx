import React, { FC, useState,useEffect } from "react";
import "react-dates/initialize";
// import ExperiencesSearchForm from "./ExperiencesSearchForm";
// import StaySearchForm from "./StaySearchForm";
// import RentalCarSearchForm from "./RentalCarSearchForm";
// import FlightSearchForm from "./FlightSearchForm";
import MulticityForm from "components/HeroSearchForm/Multicity/MulticityForm";
import OnewayForm from "components/HeroSearchForm/OnewayForm";
import RoundtripForm from "components/HeroSearchForm/RoundtripForm";
import LoadingFlightResult from "components/HeroSearchForm/LoadingFlightResult";
import { DateRage,Date } from "components/HeroSearchForm/StaySearchForm";
import { TimeRage } from "components/HeroSearchForm/RentalCarSearchForm";
import moment from "moment";
import { flightDataService } from "data/flightDataService";
export type SearchTab = "Round trip" |"One way" | "Multicity" | "Loading";

export interface ModifyTabProps {
  className?: string;
  currentTab?: SearchTab;
  currentPage?: "Round trip" | "One way" | "Multicity" | "Loading" ;
  loadingFlight?: loadingFlightProps;
}
export interface loadingFlightProps {
    dateRangeValue: DateRage;
    timeRangeValue: TimeRage;
    pickUpInputValue: string;
    dropOffInputValue: string;
    guestCount:{
      NoOfAdults:number;
      NoOfChildren:number;
      NoOfInfants:number;
    };
    flightClass:string;
}

const ModifyTab: FC<ModifyTabProps> = ({
  className = "",
  currentTab = "Round trip",
  currentPage,
  loadingFlight
}) => {
  const tabs: SearchTab[] = [ "Round trip", "One way", "Multicity" ];
  const [tabActive, setTabActive] = useState<SearchTab>(currentTab);
  


  const loadingDataModel = {
    pickUpInputValue: "",
    dropOffInputValue: "",
    flightClass:"",
    guestCount:{
      NoOfAdults:0,
      NoOfChildren:0,
      NoOfInfants:0
    },
    dateRangeValue: {
      startDate: moment(),
      endDate: moment()
    },
    timeRangeValue: {
      startTime: "",
      endTime: ""
    }
  }
  const [loadingData, setLoadingData] = useState<loadingFlightProps>(loadingDataModel);

  useEffect(() => {    
    const flightData = async() =>{
      let searchForm = flightDataService.getSearchForm();
      if(!searchForm || searchForm.JourneyType === "" || searchForm.ClassType === "" || searchForm.NoOfAdult.Count === 0){
        // goHome();
      }
      else{
        
        loadingDataModel.pickUpInputValue = searchForm.OriginDestination[0].Origin;
        loadingDataModel.dropOffInputValue = searchForm.OriginDestination[0].Destination
        loadingDataModel.flightClass=searchForm.ClassType[0]
        loadingDataModel.guestCount.NoOfAdults=searchForm.NoOfAdult.Count 
        loadingDataModel.guestCount.NoOfChildren= searchForm.NoOfChildren.Count
        loadingDataModel.guestCount.NoOfInfants=searchForm.NoOfInfant.Count
        loadingDataModel.dateRangeValue = {
          startDate: moment(searchForm.OriginDestination[0].DepartureDate),
          endDate: moment(searchForm.OriginDestination[searchForm.OriginDestination.length - 1].DepartureDate),
        }
        loadingDataModel.timeRangeValue = {
          startTime: "10:00 AM",
          endTime: "10:00 AM",
        }
        setLoadingData(loadingDataModel);
      }
    }
    flightData();
  },[]);



  const renderTab = () => {
    return (      
          <div className=" py-0 [ nc-hero-field-padding ] z-50 flex flex-row flex-wrap justify-content: space-evenly ">
            {/* <ul className="ml-2 sm:ml-6 md:ml-12 flex space-x-5 sm:space-x-8 lg:space-x-11 overflow-x-auto hiddenScrollbar"> */}
            {tabs.map((tab) => {
              const active = tab === tabActive;
              return (
                <div
                  className={`py-1.5 px-4 flex items-center font-medium text-xs cs-height-xs cursor-pointer mr-2 my-1 sm:mr-4 ${
                    active
                      ? "bg-secondary-700 rounded-xl drop-shadow-2xl text-white"
                      : "bg-white dark:bg-neutral-800 drop-shadow-2xl dark:border-neutral-700 dark:text-white rounded-xl"
                  }`}
                  onClick={() => setTabActive(tab)}
                >
                  {tab}
                </div>
              );
            
            })}
          {/* </ul> */}
          </div>
    );
  };

  const renderForm = () => {
    const isArchivePage = !!currentPage && !!currentTab;
    if(!loadingFlight){
      loadingFlight = loadingData
    }
    // console.log(isArchivePage)
    // console.log(loadingFlight)
    
    switch (tabActive) {
      // case "Stays":
      //   return <StaySearchForm haveDefaultValue={isArchivePage} />;
      case "Round trip":
        return <RoundtripForm  haveDefaultValue={isArchivePage} modifyData={loadingFlight} />;
      case "Multicity":
        return <MulticityForm haveDefaultValue={isArchivePage} modifyData={loadingFlight}/>;
      case "One way":
        return <OnewayForm haveDefaultValue={isArchivePage} modifyData={loadingFlight} />;

      default:
        return null;
    }
  };

  return (
    <div
      className={`nc-ModifyTab z-50 w-full py-5 lg:py-0 ${className}`}
      data-nc-id="ModifyTab"
    >
      <div className="w-full z-50">
        <form className="w-full relative rounded-3xl z-50">
          {loadingFlight && renderTab()}
          {renderForm()}
        </form>
      </div>
    </div>
  );
};

export default ModifyTab;