import React, { useEffect, useState } from "react";
import LocationInput from "./LocationInput";
import RoundtripDates from "./RoundtripDates";
import PassengerCriteria from "./passengerCriteria";
import { DateRage } from "./StaySearchForm";
import { TimeRage } from "./RentalCarSearchForm";
import ButtonSubmit from "./ButtonSubmit";
import { FC } from "react";
export interface LoadingFlightResultProps {
    dateRangeValue: DateRage;
    timeRangeValue: TimeRage;
    pickUpInputValue: string;
    dropOffInputValue: string;
}
export interface loading {
    loadingFlight: LoadingFlightResultProps
}

const LoadingFlightResult: FC<loading> = ({ loadingFlight }) => {
    const renderForm = () => {
    return (
      <React.Fragment>
           {/* <div className="text-red-600 p-4 w-56 ml-24 rounded-xl ">{Error}</div> */}
          <div className=" flex flex-col text-black md:flex-row w-full rounded-2xl bg-white drop-shadow-2xl dark:bg-neutral-800 sm:rounded-3xl">
            <div  className="w-full sm:w-1/4 flex flex-col gap-0">
              <LocationInput
                defaultValue={loadingFlight.pickUpInputValue}
                placeHolder="Flying from"
                desc="Where do you want to fly from?"
              />
            </div>
            <div  className="w-full sm:w-1/4 flex flex-col gap-0">
             <LocationInput
                defaultValue={loadingFlight.dropOffInputValue}
                placeHolder="Flying to"
                desc="Where you want to fly to?"
              />
            </div>
              
            <div  className="w-full z-40 sm:w-1/3 flex flex-row sm:flex-col gap-0">
              <RoundtripDates
                defaultDateValue={loadingFlight.dateRangeValue}
                defaultTimeValue={loadingFlight.timeRangeValue}
              />
               
            </div>
            <div  className="w-1/6 flex flex-col gap-0">
              <PassengerCriteria defaultValue={{
              guestValue: {
                NoOfAdults: 1,
                NoOfChildren: 0,
                NoOfInfants: 0
              },
              flightClass: "Economy"
            }} />
            </div>
          </div>
      </React.Fragment>
    );
  };

  return renderForm();
};

export default LoadingFlightResult;