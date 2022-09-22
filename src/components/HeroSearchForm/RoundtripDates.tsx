import React, { Fragment, useEffect, useState } from "react";
import {
  AnchorDirectionShape,
  DateRangePicker,
  FocusedInputShape,
} from "react-dates";
import { DateRage } from "./StaySearchForm";
import { FC } from "react";
// import { Listbox } from "@headlessui/react";
// import { CheckIcon } from "@heroicons/react/solid";
import { TimeRage } from "./RentalCarSearchForm";
import useWindowSize from "hooks/useWindowResize";

type Fields = "Depart" | "Return";

export interface RoundtripDatesProps {
  defaultDateValue: DateRage;
  defaultTimeValue: TimeRage;
  defaultFocus?: FocusedInputShape | null;
  onChange?: (data: { stateDate: DateRage; stateTimeRage: TimeRage }) => void;
  onFocusChange?: (focus: FocusedInputShape | null) => void;
  fieldClassName?: string;
  wrapFieldClassName?: string;
  className?: string;
  numberOfMonths?: number;
  anchorDirection?: AnchorDirectionShape;
}

const RoundtripDates: FC<RoundtripDatesProps> = ({
  defaultDateValue,
  defaultTimeValue,
  onChange,
  defaultFocus = null,
  onFocusChange,
  className = "",
  fieldClassName = "[ nc-hero-field-padding ]",
  wrapFieldClassName = "flex flex-col gap-y-4 xl:flex-row xl:items-center w-full",
  numberOfMonths,
  anchorDirection,
}) => {
  const [focusedInput, setFocusedInput] = useState(defaultFocus);
  const [stateDate, setStateDate] = useState(defaultDateValue);
  const [stateTimeRage, setStateTimeRage] = useState(defaultTimeValue);
  const [startDateError, setStartDateError]=useState("")


  //
  useEffect(() => {
    setStateDate(defaultDateValue);
    // console.log(defaultDateValue)
  }, [defaultDateValue]);

  useEffect(() => {
    setFocusedInput(defaultFocus);
  }, [defaultFocus]);

  useEffect(() => {
    if (onChange) {
      onChange({ stateDate, stateTimeRage });
    }
  }, [stateDate, stateTimeRage]);

  const windowSize = useWindowSize();

  const handleDateFocusChange = (focus: FocusedInputShape | null) => {
    setFocusedInput(focus);
    onFocusChange && onFocusChange(focus);
    // console.log(defaultDateValue)
  };


  const renderInputpickUpDate = () => {
    const focused = focusedInput === "startDate";
    return (
      <div
        className={`flex flex-1 relative  ${fieldClassName} flex-shrink-0 items-center space-x-3 cursor-pointer bg-transparent `}
      >
        <div className="text-neutral-300 dark:text-neutral-400">
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
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <div className="flex-grow flex-shrink-0">
          <div className="absolute inset-0" />

          <div className="inline-flex items-center text-base font-semibold text-black dark:text-white xl:text-lg">
            <span className="flex-shrink-0">
              {stateDate.startDate
                ? stateDate.startDate.format("DD MMM YYYY")
                : "Depart"}
            </span>
            {/* {stateDate.startDate && renderEditTime("pickUp")} */}
          </div>

          <span className="block mt-1 text-sm font-light leading-none text-neutral-400">
            {stateDate.startDate ? "Depart" : `Add date`}
          </span>
        </div>
      </div>
    );
  };

  const renderInputdropOffDate = () => {
    const focused = focusedInput === "endDate";
    return (
      <div
        className={`flex relative flex-1  ${fieldClassName} flex-shrink-0 items-center space-x-3 cursor-pointer `}
      >
        <div className="text-neutral-300 dark:text-neutral-400">
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
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <div className="flex-grow flex-shrink-0">
          <div className="absolute inset-0" />

          <div className="inline-flex items-center text-base font-semibold text-black xl:text-lg dark:text-white">
            <span className="flex-shrink-0">
              {stateDate.endDate
                ? stateDate.endDate.format("DD MMM YYYY")
                : "Return"}
            </span>
            {/* {stateDate.endDate && renderEditTime("dropOff")} */}
          </div>
          <span className="block mt-1 text-sm font-light leading-none bg-transparent text-neutral-400">
            {stateDate.endDate ? "Return" : `Add date`}
          </span>
        </div>
      </div>
    );
  };
  const orientation = window.matchMedia("(max-width: 700px)").matches ? 'vertical' : 'horizontal'
  return (
    <div
      className={`RoundtripDates relative flex-shrink-0 flex nc-flex-2-auto z-50 ${className}  ${
        !!focusedInput ? "nc-date-focusedInput" : "nc-date-not-focusedInput"
      }`}
    >
      <div className="absolute z-50 flex inset-y-1 cs-cm-30 ">
        <DateRangePicker
          startDate={stateDate.startDate}
          endDate={stateDate.endDate}
          focusedInput={focusedInput}
          onDatesChange={(date) => setStateDate(date)}
          onFocusChange={handleDateFocusChange}
          startDateId={"nc-hero-stay-startDateId"}
          endDateId={"nc-hero-stay-endDateId"}
          daySize={windowSize.width >1000 ? 42 : undefined}
          orientation={orientation} 
          noBorder
          hideKeyboardShortcutsPanel
          numberOfMonths={
            numberOfMonths || (windowSize.width <= 1000 ? 1 : 2)
          }
          anchorDirection={anchorDirection}
          reopenPickerOnClearDates
        />
      </div>

      <div className={wrapFieldClassName}>
        {renderInputpickUpDate()}
        {renderInputdropOffDate()}
      </div>
    </div>
  );
};

export default RoundtripDates;