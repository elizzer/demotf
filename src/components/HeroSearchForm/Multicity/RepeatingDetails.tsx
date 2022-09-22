import React, { useEffect, useState } from "react";
import LocationInput from "../LocationInput";
import { FocusedInputShape } from "react-dates";
import OnewayDates from "../OnewayDates";
import ButtonSubmit from "../ButtonSubmit";
import PassengerCriteria from "../passengerCriteria";
import { FC } from "react";
import moment from "moment";
import { flightDataService } from "data/flightDataService";
import { useHistory } from "react-router-dom";
import { loadingFlightProps } from "components/SectionHeroArchivePage/ModifyTab";
import MultiCityDates from "./MulticityDates";


export interface Date {
  date: moment.Moment | null;
}

export interface TimeRage {
  startTime: string;
  endTime: string;
}

export interface FlightSearchFormProps {
  defaultDateValue?: Date;
  haveDefaultValue?: boolean;
  stateDate?: Date;
  className?:string;
  modifyData:loadingFlightProps;
  children?: JSX.Element|JSX.Element[];
}
// const defaultGuestValue: GuestsInputProps["defaultValue"] = {
//   guestAdults: setGuestValue,
//   guestChildren: 2,
//   guestInfants: 1,
// };


const RepeatingDetails: FC<FlightSearchFormProps> = ({ haveDefaultValue, defaultDateValue, modifyData,children }) => {

  // USE STATE
  

  const [pickUpInputValue, setPickUpInputValue] = useState(modifyData?.pickUpInputValue);
  const [dropOffInputValue, setDropOffInputValue] = useState(modifyData?.dropOffInputValue);
  const [dateRangeValue, setDateRangeValue] = useState<Date>({
    date: pickUpInputValue==""?null: modifyData?.dateRangeValue.startDate ,
  });
 
  const [fieldFocused, setFieldFocused] = useState<
    FocusedInputShape | "dropOffInput" | null
  >(null);
  const [dropOffLocationType, setDropOffLocationType] = useState<
    "roundTrip" | "oneWay" | "multiCity"
  >("oneWay");
  // const [guests, setGuests] = useState(1);
  const [flightClassState, setFlightClassState] = useState("Business");

  //validation
  const [pickupError,setpickupError]=useState("")
  const [dropOffError,setdropOffError]=useState("")
  const [stateDate, setStateDate] = useState(defaultDateValue);
  const [startDateError, setStartDateError]=useState("")

  // USER EFFECT
  useEffect(() => {
    setStateDate(defaultDateValue);
    // console.log(defaultDateValue)
  }, [defaultDateValue]);
  

  let searchForm = flightDataService.getSearchFormStructure();
  if(dropOffLocationType === "oneWay"){
    searchForm.JourneyType = "O";
    let onFileds = {
      "Origin" : pickUpInputValue.substring(0, 3),
      "Destination" : dropOffInputValue.substring(0, 3),
      "DepartureDate" : moment(dateRangeValue.date).format('MM/DD/YYYY')
    }
   
    searchForm.OriginDestination.push(onFileds);      
    searchForm.ClassType = flightClassState; 
    const formStore = {
      pickUpInputValue: pickUpInputValue,
      dropOffInputValue: dropOffInputValue,
      dateRangeValue: dateRangeValue,
    }
    flightDataService.setFormDataStore(formStore);
  }
  // console.log(searchForm);
  flightDataService.setSearchForm(searchForm)
  
   
  

  if(fieldFocused==="startDate" || fieldFocused==="dropOffInput" && window.scrollY===0  && window.scrollY>=0){
    window.scrollTo({
            top: 200,
              left: 0,
              behavior: 'smooth'
            });
   }
  
   if(fieldFocused===null  && window.scrollY===70){
     window.scrollBy(0,-200)
   }


  return (
       <React.Fragment>
          
          <div className=" flex flex-col border-2 dark:border-gray-600 rounded-3xl  justify-around sm:flex-row w-full">
            
               <div className="w-full bg-transparent sm:w-1/3 flex flex-col gap-0">
                 <LocationInput
                   defaultValue={pickUpInputValue}
                   onChange={(e) =>{ setPickUpInputValue(e);}}
                   onInputDone={() => setFieldFocused("dropOffInput")}
                   placeHolder="Flying from"
                   desc="Where you want to fly from?"
                 />
               </div>
               <div className="w-full sm:w-1/3 flex flex-col gap-0">
                <LocationInput
                   defaultValue={dropOffInputValue}
                   onChange={(e) =>{ setDropOffInputValue(e); }}
                   onInputDone={() => setFieldFocused("startDate")}
                   placeHolder="Flying to"
                   desc="Where you want to fly to?"
                   autoFocus={fieldFocused === "dropOffInput"}
                 />
               </div>
               <div className="w-full z-40 sm:w-1/5 flex flex-col gap-0">
                <MultiCityDates
                   defaultDateValue={dateRangeValue}
                   onChange={(data) => {
                     setDateRangeValue(data.stateDate);
                   }}
                   defaultFocus={
                    fieldFocused === "dropOffInput" ? null : fieldFocused
                  }
                   onFocusChange={(focus)=>setFieldFocused(focus)}
                 />
               </div>
            <div>

            </div>
           </div>
      </React.Fragment>
   
    );
};

export default RepeatingDetails;