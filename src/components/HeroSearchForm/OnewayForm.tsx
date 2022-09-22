import React, { useEffect, useState } from "react";
import LocationInput from "./LocationInput";
import { FocusedInputShape } from "react-dates";
import OnewayDates from "./OnewayDates";
import ButtonSubmit from "./ButtonSubmit";
import PassengerCriteria from "./passengerCriteria";
import { FC } from "react";
import moment from "moment";
import { flightDataService } from "data/flightDataService";
import { useHistory } from "react-router-dom";
import { loadingFlightProps } from "components/SectionHeroArchivePage/ModifyTab";


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
}
// const defaultGuestValue: GuestsInputProps["defaultValue"] = {
//   guestAdults: setGuestValue,
//   guestChildren: 2,
//   guestInfants: 1,
// };


const OnewayForm: FC<FlightSearchFormProps> = ({ haveDefaultValue, defaultDateValue, modifyData }) => {
  // DEFAULT DATA FOR ARCHIVE PAGE
  const defaultPickUpInputValue = "Tokyo, Jappan";
  const defaultDropOffInputValue = "Paris, France";

  const [guestValue, setGuestValue] = useState<any>({
    NoOfAdults: 1,
    NoOfChildren: 0,
    NoOfInfants: 0
  });


  // USE STATE
  
  const [timeRangeValue, setTimeRangeValue] = useState<TimeRage>({
    startTime: "10:00 AM",
    endTime: "10:00 AM",
  });
  const [pickUpInputValue, setPickUpInputValue] = useState(modifyData?.pickUpInputValue);
  const [dropOffInputValue, setDropOffInputValue] = useState(modifyData?.dropOffInputValue);
  const [dateRangeValue, setDateRangeValue] = useState<Date>({
    date: pickUpInputValue==""?null: modifyData?.dateRangeValue.startDate ,
  });
  const [defaultPassengerCriteria, setdefaultPassengerCriteria]=useState({
    guestValue:modifyData?.guestCount, flightClass:modifyData?.flightClass=="B"?"Business":"Economy"
  })
  // console.log(defaultPassengerCriteria, dateRangeValue,pickUpInputValue,dropOffInputValue)
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
  
  const history = useHistory();
  const goListing = () =>{  
      history.push("/listing-flights");
  }
 
  let disableSubmit = true;
  const formSearchData = () =>{
    if(pickUpInputValue===""){
      setpickupError("The Pickup location cannot be empty")
    }
    if(dropOffInputValue===""){
      setdropOffError("The Dropoff location cannot be empty")
    }
  // console.log(pickUpInputValue,dateRangeValue,dropOffInputValue,dropOffLocationType)
    if(pickUpInputValue && dropOffInputValue && dropOffLocationType && flightClassState && dateRangeValue){
      disableSubmit = false;
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
        searchForm.NoOfAdult.Count = guestValue.NoOfAdults;
        searchForm.NoOfChildren.Count = guestValue.NoOfChildren;
        searchForm.NoOfInfant.Count = guestValue.NoOfInfants;
        const formStore = {
          pickUpInputValue: pickUpInputValue,
          dropOffInputValue: dropOffInputValue,
          dropOffLocationType: dropOffLocationType,
          flightClassState: flightClassState,
          dateRangeValue: dateRangeValue,
          guestValue: guestValue,
        }
        flightDataService.setFormDataStore(formStore);
      }
      // console.log(searchForm);
      flightDataService.setSearchForm(searchForm);
      goListing();
      return true;
    }
    else{
      return false;
    }    
  }

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

  const renderForm = () => {
    return (
      <React.Fragment>
          
          <div className=" flex flex-col sm:py-0 py-4  gap-y-4 text-black justify-around sm:flex-row w-full rounded-3xl bg-white drop-shadow-2xl dark:bg-neutral-800 sm:rounded-full z-50">
            
            <div className="w-full sm:w-1/4 flex flex-col gap-0">
              <LocationInput
                defaultValue={pickUpInputValue}
                onChange={(e) =>{ setPickUpInputValue(e);}}
                onInputDone={() => setFieldFocused("dropOffInput")}
                placeHolder="Flying from"
                desc="Where you want to fly from?"
              />
             
            </div>
            <div className="w-full sm:w-1/4 flex flex-col gap-0">
             <LocationInput
                defaultValue={dropOffInputValue}
                onChange={(e) =>{ setDropOffInputValue(e); }}
                onInputDone={() => setFieldFocused("startDate")}
                placeHolder="Flying to"
                desc="Where you want to fly to?"
                autoFocus={fieldFocused === "dropOffInput"}
              />
              
            </div>
          
            <div className="w-full z-40 sm:w-1/4 flex flex-col gap-0">
              <OnewayDates
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
            <div className="w-full sm:w-1/4 flex flex-col gap-0">
            <PassengerCriteria 
            
              onChange={(data) => {
                setFlightClassState(data.flightClassState);
                setGuestValue(data.guestValue);
              } } 
              defaultValue={defaultPassengerCriteria} />
            </div>
            
            {/* BUTTON SUBMIT OF FORM */}
            <div className="px-4 py-3 flex items-center justify-center">
              <ButtonSubmit onClick={formSearchData} />
            </div>
          </div>
      </React.Fragment>
    );
  };

  return renderForm();
};

export default OnewayForm;