import React, { useEffect, useState, FC } from "react";
import GuestsInput, { GuestsInputProps } from "./GuestsInput";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { Fragment } from "react";
import { flightDataService } from "data/flightDataService";
export interface PassengerCriteriaProps {
  onChange?: (data: { flightClassState: string; guestValue: Object}) => void;
  defaultValue:{
    guestValue:{
      NoOfAdults:number;
      NoOfChildren:number;
      NoOfInfants:number
    },
  flightClass:string 
  }
}

const PassengerCriteria: FC<PassengerCriteriaProps> = ({onChange, defaultValue}) => {
  const defaultGuestValue: PassengerCriteriaProps["defaultValue"] = {
    guestValue:{
    NoOfAdults: 1,
    NoOfChildren: 0,
    NoOfInfants: 0,
    },
    flightClass:"Economy"
  };
  // let SearchResult=flightDataService.getSearchForm()
  // let FlightClass=SearchResult.ClassType=="E"?"Economy":"Business"
  const [guestValue, setGuestValue] = useState(defaultGuestValue.guestValue);
  const [flightClassState, setFlightClassState] = useState( "Economy");
  // const defaultGuestValue: GuestsInputProps["defaultValue"] = {
  //   guestAdults: setGuestValue,
  //   guestChildren: 2,
  //   guestInfants: 1,
  // }
  const flightClass = [
    {
      name: "Economy",
     
    },
    {
      name: "Business",
    },
    {
      name: "Multiple",
    },
  ];
  useEffect(() => {
      setFlightClassState(defaultValue.flightClass);
      setGuestValue(defaultValue.guestValue)
  }, []);
  // console.log(guestValue)
  useEffect(() => {
    if (onChange) {
      onChange({ flightClassState, guestValue });
    }
  }, [flightClassState, guestValue]);
  const renderSelectClass = () => {
    return (
      <div className="">
        <Popover className="relative">
          {({ open, close }) => (
            <>
              <Popover.Button
                className={`
           ${open ? "" : ""}
            px-4 py-1.5 rounded-md inline-flex items-center font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 
            focus-visible:ring-white focus-visible:ring-opacity-75 text-xs`}
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
                <Popover.Panel className="absolute z-50 w-screen max-w-[200px] sm:max-w-[220px] px-4 mt-3 transform -translate-x-1/2 left-1/2 sm:px-0 ">
                  <div className="overflow-hidden rounded-2xl shadow-full ring-1 ring-black/5 dark:ring-white/10 ">
                    <div className="relative grid gap-8 bg-white dark:bg-neutral-800 p-7 ">
                      {flightClass.map((item) => (
                        <a
                          key={item.name}
                          onClick={(e) => {
                            e.preventDefault();
                            setFlightClassState(item.name);
                            // console.log(flightClassState);
                            close();
                          }}
                          className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-full hover:bg-gray-50 cursor-pointer dark:hover:bg-gray-700 
                          focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
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
  return (
    <div className="relative flex-shrink-0 flex nc-flex-1.5-auto z-10 ml-4">
      <div className="h-fit w-fit px-2 [ nc-hero-field-padding ] flex flex-col justify-content: space-evenly ">
        <div className="w-fit my-1 dark:bg-transparent dark:text-white border border-neutral-300 dark:border-neutral-700 rounded-full">
          {renderSelectClass()}
        </div>
        <div className="w-full sm:fit z-0 my-1 dark:bg-transparent dark:text-white border border-neutral-300 dark:border-neutral-700 rounded-full">
          {/* {renderGuest()} */}
          <GuestsInput
          defaultValue={guestValue}
          onChange={(data) => setGuestValue(data)}
        />
        </div>      
      </div>
    </div>
  );
};

export default PassengerCriteria;