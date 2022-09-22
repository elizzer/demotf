import React, { FC } from "react";
import ProgressBar from "./ProgressBar";
import departure from "../../images/departure.svg"
import arrival from "../../images/arrival.svg"
import {Helmet} from "react-helmet"

export interface ReviewPageProps {
  className?: string;
}

const ReviewPage: FC<ReviewPageProps> = ({ className = "" }) => {
 

  const renderTraveller = () => {
    return (
      <div className="w-full flex flex-col sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-8 px-0 sm:p-6 xl:p-8">
        
        <div className="min-w-1/2 border-full border-neutral-200 dark:border-neutral-700">
          <div className="flex gap-x-10">
           <h2 className="text-xl py-5 lg:text-xl font-semibold">
             Trip information
           </h2>
           <div className="flex flex-col gap-y-1">
             <div className="flex gap-x-8">
             <i className="text-lg las la-plane-departure"></i>
               <p className="text-xs">New York, USA</p>
              </div>
              <div className="h-4 w-0.5 bg-neutral-400 ml-2"></div>
              <div className="flex gap-x-8">
              <i className="text-lg las la-plane-arrival"></i>
               <p className="text-xs">New York, USA</p>
              </div>
            </div>
          </div>
         
         <div className="space-y-4 ml-6">
           <div className="w-full border-b border-neutral-200 dark:border-neutral-700 flex">
           </div>
             <div className="flex items-baseline">
               <h4 className="w-1/2 mr-2 text-base">Traveller name</h4>
               <p className="text-xs">User</p>
             </div>
             <div className="flex items-baseline">
               <h4 className="w-1/2 mr-2  text-base">Flight</h4>
               <p className="text-xs">Flight name</p>
             </div>
             <div className="flex items-baseline">
               <h4 className="w-1/2 mr-2 text-base"> Departure Date</h4>
               <p className="text-xs">dd/mm/yyyy</p>
             </div>
          </div>
        </div>
      </div>
    );
  };

  const renderPayment = () => {
    return (
      <div className="w-full flex flex-col sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-8 px-0 sm:p-6 xl:p-8">
        <div className="min-w-1/2 border-full border-neutral-200 dark:border-neutral-700">
        <h2 className="text-xl py-5 sm:text-xl font-semibold">
          Payment information
        </h2>
        <div className="space-y-4 ml-6">
        <div className="w-full border-b border-neutral-200 dark:border-neutral-700 flex"></div>
        <div className="flex items-baseline">
          <h4 className="w-1/2 mr-2 text-base">Total fare</h4>
          <p className="text-xs">$$$</p>
        </div>
        <div className="flex items-baseline">
          <h4 className="w-1/2 mr-2  text-base">Payee Name</h4>
          <p className="text-xs">name</p>
        </div>
        <div className="flex items-baseline">
          <h4 className="w-1/2 mr-2 text-base"> Departure Date</h4>
          <p className="text-xs">dd/mm/yyyy</p>
        </div>
        {/* <div className="flex items-baseline">
          <h4 className="w-1/2 mr-2  text-base"></h4>
          <p className="text-xs">User</p>
        </div> */}
        </div>
        
        </div>
         
        
      </div>
    );
  };

  return (
    <div className={`nc-ReviewPage ${className}`} data-nc-id="ReviewPage">
       <Helmet>
        <title>Review and Book || TravelFika</title>
      </Helmet>
        <ProgressBar >
          <h2 className="font-semibold text-2xl sm:text-4xl sm:font-bold w-full text-center mb-8 ">Review your booking</h2>
          <div className="border-b border-neutral-200 dark:border-neutral-700 mb-8"></div>
          <div className="lg:flex lg:flex-row sm:flex sm:flex-col gap-y-10">
            <div className="w-full lg:w-1/2 xl:w-2/3 lg:pr-10 mb-16">{renderTraveller()}</div>
            <div className="w-full lg:w-1/2 xl:w-2/3 lg:pr-10 mb-16">{renderPayment()}</div>
          </div>
       
        </ProgressBar>
        
    </div>
  );
};

export default ReviewPage;
