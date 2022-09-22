import Label from "components/Label/Label";
import React, { FC, useState, useMemo, SelectHTMLAttributes } from "react";
import Input from "shared/Input/Input";
import countryList from 'react-select-country-list'
import Select from 'react-select'
// import Option from "react-select/dist/declarations/src/components/Option";

export interface TravellerInfoCardProps {
  className?: string;
  props:number;
  a:number;
  country:string;

}
export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  className?: string;
  sizeClass?: string;
  options:string;
}
export interface SelectGenderProps extends SelectHTMLAttributes<HTMLSelectElement> {
  className?: string;
  sizeClass?: string;
}

const TravellerInfoCard: FC<TravellerInfoCardProps>=(props)=>{
  const [Error, setError]=useState("")
  // const
  const Validate=()=>{
    // if(Input===""){

    // }
  }
  const [value, setValue] = useState('')
  const options = useMemo(() => countryList().getData(), [])
  
  const changeHandler = (value:any) => {
    setValue(value)
  }
  const CountrySelect: FC<SelectProps> = ({
    className = "",
    sizeClass = "h-11",
    children,
    options="",
    ...args
  }) => {
    return (
      <select
        className={`nc-Select ${sizeClass} ${className} block w-full text-sm rounded-2xl border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900`}
        {...args}
      >
        {children}
      </select>
    );
  };

  const Gender: FC<SelectGenderProps> = ({
    className = "",
    sizeClass = "h-11",
    children,
    ...args
  }) => {
    return (
      <select
        className={`nc-Select ${sizeClass} ${className} block w-full text-sm rounded-2xl border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900`}
        {...args}
      >
        {children}
      </select>
    );
  };
  return(
    <div className="sm:space-y-8 sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 p-0 sm:p-10">
          {/* HEADING */}
          <h2 className="text-3xl font-semibold text-center sm:text-left">Traveller information-{props.a}</h2>
         
          <div className="border-b border-neutral-200 dark:border-neutral-700 mt-8 sm:mt-0"></div>
            <div className="flex flex-wrap items-center justify-around gap-10 mt-10">
             <div className="w-full sm:w-1/4">
                <Label>First Name</Label>
                <Input className="mt-1.5"  type="text" placeholder="first name"  required />
              </div>
              <div className="w-full sm:w-1/4">
                <Label className="flex flex-wrap">Middle Name<p>(Optional)</p></Label>
                <Input className="mt-1.5"  type="text" placeholder="middle name" />
              </div>
              <div className="w-full sm:w-1/4">
                <Label>Last Name</Label>
                <Input className="mt-1.5"  type="text" placeholder="last name" required />
              </div>
              {/* ---- */}
              <div className="w-full flex flex-col sm:w-1/4">
                <Label>Gender</Label>
                <Gender defaultValue="Choose the Gender" required >
                  {/* <option value="">Gender</option> */}
                  <option className="dark:text-white dark:bg-transparent" value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Gender>
              </div>
              {/* ---- */}
              <div className="w-full sm:w-1/4">
                <Label>Date of Birth</Label>
                <Input className="mt-1.5" type="date" required id="input"/>
              </div>
              {/* ---- */}
              <div className="w-full sm:w-1/4">
                <Label>Nationality</Label>
                <Input className="mt-1.5"  type="text" placeholder="Your nationality" required id="input"/>
              </div>
              {/* ---- */}
              <div className="w-full sm:w-1/4"> 
                <Label>Passport Issue Country</Label>
                <Select options={options} value={value} onChange={changeHandler} />
              </div>
              {/* ---- */}
              <div className="w-full sm:w-1/4">
                <Label>Passport expiry date</Label>
                <Input type="date"className="mt-1.5" placeholder="date of expiry" required id="input"/>
              </div>
              {/* ---- */}
              <div className="w-full sm:w-1/4">
                <Label>Passport Number</Label>
                <Input className="mt-1.5" type="number" placeholder="Passport Number" required id="input"/>
              </div>
            </div>
          
        </div>

  )
  

}

export default TravellerInfoCard;