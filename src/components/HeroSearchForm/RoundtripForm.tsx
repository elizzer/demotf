import React, { useEffect, useState } from "react";
import LocationInput from "./LocationInput";
import { FocusedInputShape } from "react-dates";
import RoundtripDates from "./RoundtripDates";
import PassengerCriteria from "./passengerCriteria";
import ButtonSubmit from "./ButtonSubmit";
import { FC } from "react";
import moment from "moment";
import { flightDataService } from "../../data/flightDataService";
import { useHistory } from "react-router-dom";
import { loadingFlightProps } from "components/SectionHeroArchivePage/ModifyTab";

export interface DateRage {
  startDate: moment.Moment | null;
  endDate: moment.Moment | null;
}
export interface GuestsInputs {
  guestAdults: number;
  guestChildren: number;
  guestInfants: number;
};

export interface TimeRage {
  startTime: string;
  endTime: string;
}

export interface FlightSearchFormProps {
  haveDefaultValue?: boolean;
  defaultDateValue?: DateRage;
  stateDate?: DateRage;
  className?:string;
  modifyData:loadingFlightProps;
}

const flightClass = [
  {
    name: "Economy",
    href: "##",
  },
  {
    name: "Business",
    href: "##",
  },
  {
    name: "Multiple",
    href: "##",
  },
];

const RoundtripForm: FC<FlightSearchFormProps> = ({ haveDefaultValue , defaultDateValue, modifyData}) => {
  // DEFAULT DATA FOR ARCHIVE PAGE
  const defaultPickUpInputValue = "";
  const defaultDropOffInputValue = "";
  const defaultFlightClass = "Economy";
  const [guestValue, setGuestValue] = useState<any>({
    NoOfAdults: 1,
    NoOfChildren: 0,
    NoOfInfants: 0
  });
  const history = useHistory();
  const goListing = () =>{  
    history.push("/listing-flights");
  }
  
  const [pickupError,setpickupError]=useState("");
  const [dropOffError,setdropOffError]=useState("");
  const [startDateError, setStartDateError]=useState("")
  const [endDateError, setendDateError]=useState("")
  const [stateDate, setStateDate] = useState(defaultDateValue);

  //
  useEffect(() => {
    setStateDate(defaultDateValue);
    // console.log(defaultDateValue)
  }, [defaultDateValue]);


  // USE STATE
 
  const [timeRangeValue, setTimeRangeValue] = useState<TimeRage>({
    startTime: "10:00 AM",
    endTime: "10:00 AM",
  });
  const [pickUpInputValue, setPickUpInputValue] = useState(modifyData?.pickUpInputValue);
  const [dropOffInputValue, setDropOffInputValue] = useState(modifyData?.dropOffInputValue);
  const [dateRangeValue, setDateRangeValue] = useState<DateRage>({
    startDate: pickUpInputValue==""?null:modifyData?.dateRangeValue.startDate,
    endDate: dropOffInputValue==""?null:modifyData?.dateRangeValue.endDate,
  });
  const [defaultPassengerCriteria, setdefaultPassengerCriteria]=useState({
    guestValue:modifyData?.guestCount, flightClass:modifyData?.flightClass=="B"?"Business":"Economy"
  })
  const [fieldFocused, setFieldFocused] = useState<
    FocusedInputShape | "dropOffInput" | null
  >(null);
  const [dropOffLocationType, setDropOffLocationType] = useState<
    "roundTrip" | "oneWay" | "multiCity"
  >("roundTrip");
  // const [guests, setGuests] = useState(1);
  const [flightClassState, setFlightClassState] = useState("");
  // USER EFFECT
  // useEffect(() => {
  //   if (haveDefaultValue) {
  //     setDateRangeValue({
  //       startDate: moment().add(2,"days"),
  //       endDate: moment().add(4, "days"),
  //     });
  //     // setGuestValue(defaultGuestValue);
  //     setPickUpInputValue(defaultPickUpInputValue);
  //     setDropOffInputValue(defaultDropOffInputValue);
  //     setFlightClassState(defaultFlightClass);
  //     // console.log(defaultGuestValue);
  //   }
  // }, []);
 

  
  let disableSubmit = true;
  const formSearchData = () =>{
    if(pickUpInputValue===""){
      setpickupError("The Pickup location cannot be empty")
    }
    if(dropOffInputValue===""){
      setdropOffError("The Dropoff location cannot be empty")
    }
    if(dateRangeValue.startDate===null){
      setStartDateError("The departure date cannot be empty")
    }
    if(dateRangeValue.endDate===null){
      setendDateError("The return date cannot be empty")
    }
    if(dateRangeValue.endDate===dateRangeValue.startDate){
      if(dateRangeValue.endDate!==null){
        setendDateError("The return date cannot be equal to the departure date")
      }     
    }
    if(pickUpInputValue && dropOffInputValue && dropOffLocationType && flightClassState && dateRangeValue){
      disableSubmit = false;
      let searchForm = flightDataService.getSearchFormStructure();
      if(dropOffLocationType === "roundTrip"){
        searchForm.JourneyType = "R";
        let onFileds = {
          "Origin" : pickUpInputValue.substring(0, 3),
          "Destination" : dropOffInputValue.substring(0, 3),
          "DepartureDate" : moment(dateRangeValue.startDate).format('MM/DD/YYYY')
        }
        let returnFieldds = {
          "Origin" : dropOffInputValue.substring(0, 3),
          "Destination" : pickUpInputValue.substring(0, 3),
          "DepartureDate" : moment(dateRangeValue.endDate).format('MM/DD/YYYY')
        }
        searchForm.OriginDestination.push(onFileds);   
        searchForm.OriginDestination.push(returnFieldds);   
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
          guestValue: guestValue
        }
        flightDataService.setFormDataStore(formStore);
      }
      flightDataService.setSearchForm(searchForm);
      goListing();
      return true;
    }
    else{
      return false;
    }    
  }

  // SCROLL

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

//  SCROLL

  const renderForm = () => {
    return (
      <React.Fragment>
           {/* <div className="text-red-600 p-4 w-56 ml-24 rounded-xl ">{Error}</div> */}
           <div className=" flex flex-col gap-y-4 sm:gap-y-0 py-4 sm:py-0 text-black  sm:flex-row w-3xl rounded-3xl bg-white drop-shadow-2xl dark:bg-neutral-800 sm:rounded-full z-50">
            <div  className="w-full sm:w-1/4 flex flex-col gap-0">
              <LocationInput
                defaultValue={pickUpInputValue}
                onChange={(e) =>{ setPickUpInputValue(e);}}
                onInputDone={() => setFieldFocused("dropOffInput")}
                placeHolder="Flying from"
                desc="Where you want to fly from?"
              />
              
            </div>
            <div  className="w-full sm:w-1/4 flex flex-col gap-0">
             <LocationInput
                defaultValue={dropOffInputValue}
                onChange={(e) =>{ setDropOffInputValue(e); }}
                onInputDone={() => setFieldFocused("startDate")}
                placeHolder="Flying to"
                desc="Where you want to fly to?"
                autoFocus={fieldFocused === "dropOffInput"}
              />
             
            </div>
              
            <div  className="w-full z-40 sm:w-1/3 flex flex-row sm:flex-col gap-0">
              <RoundtripDates
                defaultDateValue={dateRangeValue}
                defaultTimeValue={timeRangeValue}
                defaultFocus={
                  fieldFocused === "dropOffInput" ? null : fieldFocused
                }
                onFocusChange={(focus) => setFieldFocused(focus)}
                onChange={(data) => {
                  setDateRangeValue(data.stateDate);
                }}
              />
             
               
            </div>
            <div  className="w-full z-30 sm:w-1/6 mt-4 sm:mt-0 flex flex-row justify-around sm:flex-col gap-0">
              <PassengerCriteria onChange={(data) => {
              setFlightClassState(data.flightClassState);
              setGuestValue(data.guestValue);
            } } defaultValue={defaultPassengerCriteria} />
            </div>
            {/* BUTTON SUBMIT OF FORM */}
            <div className="px-4 py-3 flex items-center justify-center">
                <ButtonSubmit onClick={formSearchData}  /> 
            </div>
          </div>
      </React.Fragment>
    );
  };

  return renderForm();
};

export default RoundtripForm;