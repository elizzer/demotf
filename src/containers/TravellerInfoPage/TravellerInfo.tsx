import ButtonPrimary from "shared/Button/ButtonPrimary";
import Input from "shared/Input/Input";
import Label from "components/Label/Label";
import React, { useEffect, useState, FC } from "react";
import Select from "shared/Select/Select";
import ProgressBar from "./ProgressBar";
import { Helmet } from "react-helmet";
import TravellerInfoCard from "./Travelerinfocard";

// import {totalGuests} from "components/HeroSearchForm/GuestsInput";

export interface TravellerInfoProps {
  className?: string;
  passenger?: string;
  setPassenger?: any;
}




const TravellerInfo: FC<TravellerInfoProps> = ({ className = "", passenger , setPassenger}) => {
  const renderSidebar=()=>{
    return(
      <div className="flex flex-col justify-center w-full px-0 space-y-8 sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 sm:p-6 xl:p-8">
          <div>
            <Label>Email</Label>
            <Input className="mt-1.5" placeholder="example@email.com" />
          </div>
          <div>
            <Label>Address</Label>
            <Input className="mt-1.5" placeholder="Your address" />
          </div>
          <div className="flex w-full gap-x-0">
              <div>
                <Label>Country Code</Label>
                <Input className="w-1/2 mt-1.5" placeholder="eg: +1" />
              </div>
              <div>
                <Label>Phone number</Label>
                <Input className="w-full mt-1.5" placeholder="003 888 232" />
              </div>
              </div>
          {/* ---- */}
          <div className="flex items-center justify-center">
          <div className="pt-2">
            <ButtonPrimary href="/paymentdetails">Proceed to Payment mode</ButtonPrimary>
          </div>
          </div>
          
      </div>
    )
  }

  const [totalGuests, setTotalGuests] = useState(7)
   


  
  let x=totalGuests+1;
  let Card=[]
  for(let i=1;i<x;i++){
    Card.push(<TravellerInfoCard props={0} country={""} a={i}/>)
  }
   // setTotalGuests (x)
  return (
    <div className={`nc-TravellerInfo ${className}`} data-nc-id="TravellerInfo">
      <Helmet>
        <title>Passenger Details || TravelFika</title>
      </Helmet>
      <ProgressBar>
        <div className="flex flex-col items-center">
          <div className="w-full mb-16 space-y-10 lg:pr-10">
            {Card}
          </div>
          <div className="w-full mb-16 lg:w-1/2 xl:w-2/3 lg:pr-10">
           {renderSidebar()}
          </div>
        </div>
      
      
      </ProgressBar>
    </div>
  );
};

export default TravellerInfo;