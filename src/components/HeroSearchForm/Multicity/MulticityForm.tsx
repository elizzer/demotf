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
import RepeatingDetails from "./RepeatingDetails";
import { PlusIcon } from "@heroicons/react/solid";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonThird from "shared/Button/ButtonThird";
import ButtonSecondary from "shared/Button/ButtonSecondary";


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
  max?: number;
  min?:number;
  className?:string;
  modifyData:loadingFlightProps;
  children?: JSX.Element|JSX.Element[];
}
// const defaultGuestValue: GuestsInputProps["defaultValue"] = {
//   guestAdults: setGuestValue,
//   guestChildren: 2,
//   guestInfants: 1,
// };


const MultiCityForm: FC<FlightSearchFormProps> = ({ haveDefaultValue, defaultDateValue, modifyData,children, max, min=0 }) => {
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
  const [value, setValue] = useState(1);
  const [minus, setMinus]=useState(false)

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
    let RepeatDetails = flightDataService.getSearchForm();
    console.log(RepeatDetails)
    if( RepeatDetails.OriginDestination[0].Origin && RepeatDetails.OriginDestination[0].Destination && dropOffLocationType && flightClassState && dateRangeValue){
      disableSubmit = false;
      let searchForm = flightDataService.getSearchFormStructure();
      if(dropOffLocationType === "oneWay"){
        searchForm.JourneyType = "O";      
        searchForm.ClassType = flightClassState; 
        searchForm.NoOfAdult.Count = guestValue.NoOfAdults;
        searchForm.NoOfChildren.Count = guestValue.NoOfChildren;
        searchForm.NoOfInfant.Count = guestValue.NoOfInfants;
        const formStore = {
          dropOffLocationType: dropOffLocationType,
          flightClassState: flightClassState,
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
   const handleClickIncrement = () => {
    if (max && max <= value) return;
    setValue((state: number) => state + 1);
    setMinus(true)
  };
  const handleClickDecrement = () => {
    if (min >= value) return;
    setValue((state) => state - 1);
    console.log(value)
    if(value===2)
     setMinus(false)
  };
 const count=value
 let Details=[]
 for(let i=0;i<count;i++){
  if(i==0){
    Details.push(
      <div className="w-full flex gap-2 items-center">
       <RepeatingDetails modifyData={modifyData}/> 
      </div>
    )
  }
  else{
    Details.push(
      <div className="w-full flex gap-2 items-center">
       <RepeatingDetails modifyData={modifyData}/> 
       <div>
       { minus &&
           <ButtonSecondary onClick={handleClickDecrement}>X</ButtonSecondary>
       }
       </div> 
      </div>
     )
  }
 
}
console.log(Details)
  return (
    <>
    <div className="flex flex-col gap-4 items-center z-50"> 
    {/* <RepeatingDetails modifyData={modifyData}/> */}
    <div className="flex flex-col items-center  p-4  gap-y-4 text-black justify-around w-full rounded-3xl z-40 bg-white drop-shadow-2xl dark:bg-neutral-800">
     <div className="flex flex-col gap-2 w-full items-center">
      
        {Details}
     </div>
     <ButtonPrimary href="" onClick={handleClickIncrement} className="flex items-center gap-1"><span className="text-2xl">+</span>Add another flight</ButtonPrimary>
    </div>
     <div className="flex items-center sm:py-0 py-4 text-black justify-around w-full sm:w-1/2 rounded-3xl bg-white drop-shadow-2xl dark:bg-neutral-800 z-20" >
        <div className="w-full sm:w-1/2 flex flex-col gap-0">
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
      
    </div>
    </>
    
   

    );
};

export default MultiCityForm;