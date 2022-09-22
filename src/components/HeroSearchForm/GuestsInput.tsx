import React, { Fragment, useEffect, useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import NcInputNumber from "components/NcInputNumber/NcInputNumber";
import { FC } from "react";
import ClearDataButton from "./ClearDataButton";
import { ChevronDownIcon } from "@heroicons/react/outline";

export interface GuestsInputProps {
  defaultValue: {
    NoOfAdults: number;
    NoOfChildren: number;
    NoOfInfants: number;

  };
  onChange?: (data: GuestsInputProps["defaultValue"]) => void;
  fieldClassName?: string;
  totalGuests?: number;
  setTotalGuests?:number
}

const GuestsInput: FC<GuestsInputProps> = ({
  defaultValue,
  onChange,
  totalGuests,
  setTotalGuests,
  fieldClassName = "[ px-4 py-1.5 ]",
}) => {
  const [guestAdultsInputValue, setGuestAdultsInputValue] = useState(
    defaultValue.NoOfAdults || 1
  );
  const [guestChildrenInputValue, setGuestChildrenInputValue] = useState(
    defaultValue.NoOfChildren || 0
  );
  const [guestInfantsInputValue, setGuestInfantsInputValue] = useState(
    defaultValue.NoOfInfants || 0
  );
  // console.log(defaultValue)

  useEffect(() => {
    setGuestAdultsInputValue(defaultValue.NoOfAdults || 1);
    setGuestChildrenInputValue(defaultValue.NoOfChildren || 0);
    setGuestInfantsInputValue(defaultValue.NoOfInfants || 0);
  }, [defaultValue]);

  useEffect(() => {
    if (onChange) {
      onChange({
        NoOfAdults: guestAdultsInputValue,
        NoOfChildren: guestChildrenInputValue,
        NoOfInfants: guestInfantsInputValue,
      });
    }
  }, [guestAdultsInputValue, guestChildrenInputValue, guestInfantsInputValue]);

     
   totalGuests = guestChildrenInputValue + guestAdultsInputValue + guestInfantsInputValue
   
    
   const passengerInfo = () => {
       
   }
  // module.exports = totalGuests;
    // console.log("totalguests=",totalGuests, " Adults=",guestAdultsInputValue," Children=",guestChildrenInputValue," Infants=",guestInfantsInputValue)

  return (
    <Popover className="flex relative [ nc-flex-1 ]">
      {({ open }) => (
        <>
          <Popover.Button
            className={`flex text-left w-full flex-shrink-0 items-center ${fieldClassName}  focus:outline-none cursor-pointer ${
              open ? "nc-hero-field-focused" : ""
            }`}
          >
            
            {/* <div className="text-neutral-300 dark:text-neutral-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="nc-icon-field"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
            </div> */}
            <div className="flex-grow">
              <span className="block text-xs font-medium">
                { totalGuests || ""} Passengers
              </span>
              
              {/* <span className="block mt-1 text-xs font-light leading-none text-neutral-400">
                {totalGuests ? "Passengers" : "Add passengers"}
              </span> */}
              {!!totalGuests && open && (
                <ClearDataButton
                  onClick={() => {
                    setGuestAdultsInputValue(1);
                    setGuestChildrenInputValue(0);
                    setGuestInfantsInputValue(0);
                  }}
                />
              )}
              
            </div>
            <div>
            <ChevronDownIcon
                  className={`${
                    open ? "" : "text-opacity-70"
                  } ml-2 h-4 w-4 group-hover:text-opacity-80 transition ease-in-out duration-150`}
                  aria-hidden="true"
                />
            </div>
            
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
            <Popover.Panel className="absolute left-0 right-0 z-50 w-max min-w-[300px] max-w-sm 
            bg-white dark:bg-neutral-800 top-full mt-3 py-5 sm:py-6 px-4 sm:px-8 rounded-3xl shadow-xl">
              <NcInputNumber
                className="w-full"
                defaultValue={guestAdultsInputValue}
                onChange={(value) => setGuestAdultsInputValue(value)}
                max={10}
                min={1}
                label="Adults"
                desc="Ages 13 or above"
              />
              <NcInputNumber
                className="w-full mt-6"
                defaultValue={guestChildrenInputValue}
                onChange={(value) => setGuestChildrenInputValue(value)}
                max={4}
                label="Children"
                desc="Ages 2–12"
              />

              <NcInputNumber
                className="w-full mt-6"
                defaultValue={guestInfantsInputValue}
                onChange={(value) => setGuestInfantsInputValue(value)}
                max={4}
                label="Infants"
                desc="Ages 0–2"
              />
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default GuestsInput;
