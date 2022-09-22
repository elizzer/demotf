import React, { Fragment, useEffect, useState } from "react";
import {
  AnchorDirectionShape,
  DateRangePicker,
  FocusedInputShape,
  
  SingleDatePicker,
} from "react-dates";
import { Date } from "./StaySearchForm";
import { FC } from "react";
import useWindowSize from "hooks/useWindowResize";



export interface OnewayDatesProps {
  defaultDateValue: Date;
  defaultFocus?:FocusedInputShape | null;
  onChange?: (data: { stateDate: Date }) => void;
  onFocusChange?: (focus: FocusedInputShape | null) => void;
  fieldClassName?: string;
  focusedInput?:Date
  wrapFieldClassName?: string;
  className?: string;
  numberOfMonths?: number;
  anchorDirection?: AnchorDirectionShape;
}

const OnewayDates: FC<OnewayDatesProps> = ({
  defaultDateValue,
  onChange,
  defaultFocus,
  // onFocusChange,
  className = "",
  fieldClassName = "[ nc-hero-field-padding ]",
  wrapFieldClassName = "flex flex-col xl:flex-row xl:items-center w-full flex-shrink-0 relative [ nc-divide-field ]",
  numberOfMonths,
  anchorDirection,
}) => {
  const [focused, setFocused] = useState(false);
  const [stateDate, setStateDate] = useState(defaultDateValue);
  const [dateError, setdateError] = useState("");

  //
  useEffect(() => {
    setStateDate(defaultDateValue);
    // console.log(defaultDateValue)
  }, [defaultDateValue]);
  useEffect(() => {
    if (onChange) {
      onChange({ stateDate});
    }
  }, [stateDate]);


  // useEffect(() => {
  //   setFocused(defaultFocus);
  // }, [defaultFocus]);



  const windowSize = useWindowSize();

  const handleDateFocusChange = () => {
    setFocused(!focused);
    // onFocusChange && onFocusChange(focused);
    // console.log(defaultDateValue)
  };

  const Validatedate = () => {
    if (stateDate.date === null) {
      setdateError("The Pickup location cannot be empty");
    }
  };

  const renderInputpickUpDate = () => {
    // const focused  = "Date";
    return (
      <div
        className={`flex flex-1 relative  ${fieldClassName} flex-shrink-0 items-center space-x-3 cursor-pointer`}
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

          <div className="inline-flex items-center text-base text-black dark:text-white xl:text-lg font-semibold">
            <span className="flex-shrink-0">
              {stateDate.date
                ? stateDate.date.format("DD MMM YYYY")
                : "Depart"}
            </span>
            {/* {stateDate.date && renderEditTime("pickUp")} */}
          </div>

          <span className="block mt-1 text-sm text-neutral-400 font-light leading-none">
            {stateDate.date ? "Depart" : `Add date`}
          </span>
        </div>
      </div>
    );
  };

  const orientation = window.matchMedia("(max-width: 700px)").matches
    ? "vertical"
    : "horizontal";
  return (
    <div
      className={`RoundtripDates relative flex-shrink-0 flex nc-flex-2-auto z-10 ${className} `}
    >
      <div className="absolute z-50 inset-y-1 flex cs-cm-30">
      <SingleDatePicker
          date={stateDate.date} 
          onDateChange={date => setStateDate({ date })} 
          focused={focused} 
          onFocusChange={handleDateFocusChange}
          id={"nc-hero-stay-startDateId"}
          noBorder
          daySize={windowSize.width >1000 ? 42 : undefined}
          orientation={orientation}
          anchorDirection={anchorDirection}
          hideKeyboardShortcutsPanel
          numberOfMonths={
            numberOfMonths || (windowSize.width <= 1000 ? 1 : 2)
          }
          reopenPickerOnClearDate
      />
      </div>

      <div className={wrapFieldClassName}>
        {renderInputpickUpDate()}
      </div>
    </div>
  );
};

export default OnewayDates;
