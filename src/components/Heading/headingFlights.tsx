import moment from "moment";
import React from "react";
import { ReactNode } from "react";

export interface HeadingFlightProps {
  pickup?: string;
  dropoff?: string;
  flightClass?:string;
  subHeading?: ReactNode;
  className?: string;
  journeyType?:string;
  guestCount?:{
    NoOfAdults:number;
    NoOfChildren:number;
    NoOfInfants:number;
  };
  totalGuest?:number
}



const HeadingFlights: React.FC<HeadingFlightProps> = ({
  className = "",
  pickup= "",
  dropoff= "",
  subHeading="",
  flightClass="",
  journeyType="",
  guestCount={
    NoOfAdults: 0,
    NoOfChildren:0,
    NoOfInfants:0
  },
  
}) => {
  if(guestCount.NoOfChildren===undefined){
    guestCount.NoOfChildren=0
  }
  if(guestCount.NoOfInfants===undefined){
    guestCount.NoOfInfants=0
  }
  const totalGuest=(guestCount.NoOfAdults)+(guestCount.NoOfChildren)+(guestCount.NoOfInfants)


  return (
    <div className={`mt-12 lg:mb-12 ${className}`}>
      <h2 className="text-4xl font-semibold">{pickup}-{dropoff}</h2>
     
      {subHeading ? (
        subHeading
      ) : (
        <span className="block text-neutral-500 dark:text-neutral-400 mt-3">
          {journeyType}
          <span className="mx-2">·</span>
          {flightClass}
          <span className="mx-2">·</span>
          {totalGuest}-{totalGuest == 1 ? "Passenger":"Passengers"}
        </span>
      )}
    </div>
  );
};

export default HeadingFlights;
