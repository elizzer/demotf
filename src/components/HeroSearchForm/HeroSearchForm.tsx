import React, { FC, useState } from "react";
import "react-dates/initialize";
// import ExperiencesSearchForm from "./ExperiencesSearchForm";
// import StaySearchForm from "./StaySearchForm";
// import RentalCarSearchForm from "./RentalCarSearchForm";
// import FlightSearchForm from "./FlightSearchForm";
import MulticityForm from "./Multicity/MulticityForm";
import OnewayForm from "./OnewayForm";
import RoundtripForm from "./RoundtripForm";
import LoadingFlightResult from "./LoadingFlightResult";
import { DateRage,Date } from "./StaySearchForm";
import { TimeRage } from "./RentalCarSearchForm";
import moment from "moment";
export type SearchTab = "Round trip" |"One way" | "Multicity" | "Loading";

export interface HeroSearchFormProps {
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
  dateValue:Date;
  guestCount:{
    NoOfAdults:number;
    NoOfChildren:number;
    NoOfInfants:number
  };
  flightClass:string;
}

const HeroSearchForm: FC<HeroSearchFormProps> = ({
  className = "",
  currentTab = "Round trip",
  currentPage,
  loadingFlight
}) => {
  const tabs: SearchTab[] = [ "Round trip", "One way", "Multicity" ];
  const [tabActive, setTabActive] = useState<SearchTab>(currentTab);

  const renderTab = () => {
    return (      
          <div className=" py-0 [ nc-hero-field-padding ] flex flex-row flex-wrap justify-content: space-evenly ">
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
      loadingFlight = {
        dateRangeValue: {
          startDate: moment(),
          endDate: moment()
        },
        guestCount:{
          NoOfAdults:1,
          NoOfChildren:0,
          NoOfInfants:0

        },
        flightClass:"",
        dateValue:{
          date:moment()
      },
        timeRangeValue: {
          startTime: "10:00 AM",
          endTime: "10:00 AM",
        },
        pickUpInputValue: "",
        dropOffInputValue: ""
      }
    }
    switch (tabActive) {
      // case "Stays":
      //   return <StaySearchForm haveDefaultValue={isArchivePage} />;
      case "Round trip":
        return <RoundtripForm haveDefaultValue={isArchivePage} modifyData={loadingFlight} />;
      case "Multicity":
        return <MulticityForm haveDefaultValue={isArchivePage}  modifyData={loadingFlight}/>;
      case "One way":
        return <OnewayForm haveDefaultValue={isArchivePage} modifyData={loadingFlight}/>;
      case "Loading":
        return <LoadingFlightResult loadingFlight={loadingFlight} />

      default:
        return null;
    }
  };

  return (
    <div
      className={`nc-HeroSearchForm z-30 w-full py-5 lg:py-0 ${className}`}
      data-nc-id="HeroSearchForm"
    >
      <div className="w-full z-30">
        <form className="w-full relative rounded-3xl">
          {!loadingFlight && renderTab()}
          {renderForm()}
        </form>
      </div>
    </div>
  );
};

export default HeroSearchForm;