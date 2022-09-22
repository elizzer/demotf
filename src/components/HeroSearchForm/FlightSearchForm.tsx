import React, { useEffect, useState } from "react";
import LocationInput from "./LocationInput";
import { FocusedInputShape } from "react-dates";
import RentalCarDatesRangeInput from "./RentalCarDatesRangeInput";
import ButtonSubmit from "./ButtonSubmit";
import { FC } from "react";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { Fragment } from "react";
import moment from "moment";
import NcInputNumber from "components/NcInputNumber/NcInputNumber";
import GuestsInput, { GuestsInputProps } from "./GuestsInput";
import { Link } from "react-router-dom";

export interface DateRage {
  startDate: moment.Moment | null;
  endDate: moment.Moment | null;
  locationInput?:string;
}

export interface TimeRage {
  startTime: string;
  endTime: string;
  locationInput?:string;
}

export interface FlightSearchFormProps {
  haveDefaultValue?: boolean;
  locationInput:string;
  trim:boolean;
  errorElement?:string;
  innerText:string;
}

export interface locationProps {
  locationInput?:string
  value?:boolean
  innerText?:string
}
const defaultGuestValue: GuestsInputProps["defaultValue"] = {
  NoOfAdults: 1,
    NoOfChildren: 0,
    NoOfInfants: 0,
};

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

const linkToPath = "/listing-flights";

const FlightSearchForm: FC<FlightSearchFormProps> = ({ haveDefaultValue }) => {
  // DEFAULT DATA FOR ARCHIVE PAGE
  const defaultPickUpInputValue = "Tokyo, Jappan";
  const defaultDropOffInputValue = "Paris, France";

  const [guestValue, setGuestValue] = useState(defaultGuestValue);


  

  // USE STATE
  const [dateRangeValue, setDateRangeValue] = useState<DateRage>({
    startDate: null,
    endDate: null,
  });
  const [timeRangeValue, setTimeRangeValue] = useState<TimeRage>({
    startTime: "10:00 AM",
    endTime: "10:00 AM",
  });
  const [pickUpInputValue, setPickUpInputValue] = useState("");
  const [dropOffInputValue, setDropOffInputValue] = useState("");
  const [fieldFocused, setFieldFocused] = useState<
    FocusedInputShape | "dropOffInput" | null
  >(null);
  const [dropOffLocationType, setDropOffLocationType] = useState<
    "roundTrip" | "oneWay" | "multiCity"
  >("roundTrip");
  // const [guests, setGuests] = useState(1);
  const [flightClassState, setFlightClassState] = useState("Economy");
  const [Error,setError]=useState(" ")

  // USER EFFECT
  useEffect(() => {
    if (haveDefaultValue) {
      setDateRangeValue({
        startDate: moment().add(2,"days"),
        endDate: moment().add(4, "days"),
      });
      // setGuestValue(defaultGuestValue);
      setPickUpInputValue(defaultPickUpInputValue);
      setDropOffInputValue(defaultDropOffInputValue);
      // console.log(defaultGuestValue);
      console.log(pickUpInputValue);
      console.log(dropOffInputValue);
      console.log(dropOffLocationType);
      console.log(flightClassState);
    }
  }, []);

  const renderSelectClass = () => {
    return (
      <div className="">
        <Popover className="relative">
          {({ open, close }) => (
            <>
              <Popover.Button
                className={`
           ${open ? "" : ""}
            px-4 py-1.5 rounded-md inline-flex items-center font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 text-xs`}
              >
                <span>{`${flightClassState}`}</span>
                <ChevronDownIcon
                  className={`${
                    open ? "" : "text-opacity-70"
                  } ml-2 h-4 w-4 group-hover:text-opacity-80 transition ease-in-out duration-150`}
                  aria-hidden="true"
                />
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
                <Popover.Panel className="absolute z-10 w-screen max-w-[200px] sm:max-w-[220px] px-4 mt-3 transform -translate-x-1/2 left-1/2 sm:px-0 ">
                  <div className="overflow-hidden rounded-2xl shadow-full ring-1 ring-black/5 dark:ring-white/10 ">
                    <div className="relative grid gap-8 bg-white dark:bg-neutral-800 p-7 ">
                      {flightClass.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          onClick={(e) => {
                            e.preventDefault();
                            setFlightClassState(item.name);
                            close();
                          }}
                          className="flex items-center p-2 -m-3 transition duration-150 ease-in-out hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                        >
                          <p className="text-sm font-medium ">{item.name}</p>
                        </a>
                      ))}
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    );
  };

  const renderRadioBtn = () => {
    return (
      <div className=" py-0 [ nc-hero-field-padding ] flex flex-row flex-wrap justify-content: space-evenly ">
        <div
          className={`py-1.5 px-4 flex items-center font-medium text-xs cs-height-xs cursor-pointer mr-2 my-1 sm:mr-4 ${
            dropOffLocationType === "roundTrip"
              ? "bg-black shadow-black/10 shadow-full text-white"
              : "bg-white border border-neutral-300 dark:border-neutral-700"
          }`}
          onClick={(e) => setDropOffLocationType("roundTrip") }
        >
          Round-trip
        </div>
        <div
          className={`py-1.5 px-4 flex items-center font-medium text-xs cs-height-xs cursor-pointer mr-2 my-1 sm:mr-4 ${
            dropOffLocationType === "multiCity"
              ? "bg-black  shadow-black/10 shadow-full"
              : "bg-white border border-neutral-300 dark:border-neutral-700"
          }`}
          onClick={(e) => setDropOffLocationType("multiCity")}
          
        >
          Multi-city
        </div>
        <div
          className={`py-1.5 px-4 flex items-center font-medium text-xs cs-height-xs cursor-pointer mr-2 my-1 sm:mr-4 ${
            dropOffLocationType === "oneWay"
              ? "bg-black text-white shadow-black/10 shadow-full"
              : "bg-white border border-neutral-300 dark:border-neutral-700"
          }`}
          onClick={(e) => setDropOffLocationType("oneWay")}
        >
          One-way
        </div>
        <div className=" mr-2 my-1 flex items-center bg-white  cs-height-xs justify-content:center sm:mr-4 border border-neutral-300 dark:border-neutral-700">
          {renderSelectClass()}
        </div>
        <div className="mr-2 my-1 bg-white border border-neutral-300 cs-height-xs dark:border-neutral-700">
          {/* {renderGuest()} */}
          <GuestsInput
          defaultValue={guestValue}
          onChange={(data) => setGuestValue(data)}
        />
        </div>
        
      </div>
    );
  };

  const formSearchData = () =>{
    return false;
  }
  
  
 
  const renderForm=()=> {

    const pickup=setPickUpInputValue
    const dropoff=setDropOffInputValue
    

    return (
      <div className="w-full z-30">
        <div id="error">{Error}</div>
        <form id="form" className="w-full relative mt-8 rounded-3xl dark:bg-neutral-800">
          {renderRadioBtn()}
          <div className=" flex flex-col md:flex-row w-full rounded-full bg-white [ nc-divide-field ] ">
            <div className="relative flex flex-col md:flex-row flex-grow [ nc-divide-field ] ">
              <LocationInput id="locationInput"
                defaultValue={pickUpInputValue}
                onChange={(e) => setPickUpInputValue(e)}
                onInputDone={() => setFieldFocused("dropOffInput")}
                placeHolder="Flying from"
                desc="Where do you want to fly from?"
            
              />
              <LocationInput 
                defaultValue={dropOffInputValue}
                onChange={(e) => setDropOffInputValue(e)}
                onInputDone={() => setFieldFocused("startDate")}
                placeHolder="Flying to"
                desc="Where you want to fly to?"
                autoFocus={fieldFocused === "dropOffInput"}
              />
            </div>
            <RentalCarDatesRangeInput
              defaultDateValue={dateRangeValue}
              defaultTimeValue={timeRangeValue}
              defaultFocus={
                fieldFocused === "dropOffInput" ? null : fieldFocused
              }
              onFocusChange={(focus) => setFieldFocused(focus)}
              onChange={(data) => {
                setDateRangeValue(data.stateDate);
                // console.log(data.stateDate)
                // setTimeRangeValue(data.stateTimeRage);
              }}
            />
            {/* BUTTON SUBMIT OF FORM */}
            <div className="px-4 py-3 flex items-center justify-center">
              <Link
                onClick={(e) => {
                  e.preventDefault();
                  formSearchData();
                  if(!pickup.length){
                    setError("The Pickup location cannot be empty")
                  }
                  
                  if(!dropoff.length){
                    setError("The Pickup location cannot be empty")
                  }
                }}
                to={linkToPath}
                type="button"
                className="h-10 md:h-12 w-full md:w-16 rounded-full bg-primary-6000 hover:bg-primary-700 flex items-center justify-center text-neutral-50 focus:outline-none disabled:bg-opacity-70"
              >
                <span className="mr-3 md:hidden">Search</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </form>
      </div>
    );
  };

  return renderForm();
};

export default FlightSearchForm;
