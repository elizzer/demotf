import { Tab } from "@headlessui/react";
import StayCard from "components/StayCard/StayCard";
import React, { FC, Fragment, useState } from "react";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import {
  DEMO_STAY_LISTINGS,
} from "data/listings";
import ATMCard from "../../images/atm card.png"
import { Helmet } from "react-helmet";
import SectionGridFilterCard from "containers/ListingFlightsPage/SectionGridFilterCard";
import Avatar1 from "shared/Avatar/Avatar1";
import FrequentTraveller from "./FrequentTraveller";

export interface DashboardPageProps {
  className?: string;
}

const DashboardPage: FC<DashboardPageProps> = ({ className = "" }) => {
  let [categories] = useState(["Recent Bookings", "Liked places", "Frequent Travelers","Saved Cards"]);
  

  const renderSidebar = () => {
    return (
      <div className=" w-1/2 flex flex-row gap-x-4 justify-self-center justify-content-center items-center text-center 
      sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700  px-0 sm:p-6 xl:p-8">
       {/* <a  href="/account"> */}
       <Avatar1
          hasChecked
          hasCheckedClass="w-6 h-6 -top-0.5 right-2"
          sizeClass="w-24 h-24"
        />
        {/* </a> */}

        {/* ---- */}
        <div className="mt-0 text-left flex flex-col gap-y-4 items-left">
          <a href="/account">
           <h2 className="mt-0 text-2xl font-semibold">Username</h2>
          </a>
          <h3 className="text-xs">username@gmail.com</h3>
          {/* <StartRating className="!text-base" /> */}
        </div>

        {/* ---- */}
        {/* <a className="bg-primary-900 text-sm rounded-full focus:outline-none py-2 px-2" href="/account">Go to profile
          </a> */}
         
        {/* ---- */}
        {/* <div className="border-b border-neutral-200 dark:border-neutral-700 w-14"></div> */}

        
      </div>
    );
  };

  const renderSection1 = () => {
    return (
      <div className="listingSection__wrap">
        <div>
          <h2 className="text-2xl font-semibold">Kevin Francis's Dashboard</h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
              Hi Kevin! your dashboard is here.
          </span>
        </div>
        <div className="w-56 border-b border-neutral-200 dark:border-neutral-700"></div>

        <div>
          <Tab.Group>
            <Tab.List className="flex flex-col sm:flex-row text-left space-x-1 overflow-x-auto">
              {categories.map((item) => (
                <Tab key={item} as={Fragment}>
                  {({ selected }) => (
                    <button
                      className={`flex-shrink-0 block !leading-none flex-col font-medium px-5 py-2.5 
                      text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full focus:outline-none ${
                        selected
                          ? "bg-secondary-900 text-secondary-50 "
                          : "text-neutral-500 dark:text-neutral-400 dark:hover:text-neutral-100 hover:text-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                      } `}
                    >
                      {item}
                    </button>
                  )}
                </Tab>
              ))}
            </Tab.List>
            <div className="w-full mt-8 border-b border-neutral-200 dark:border-neutral-700"></div>
            <Tab.Panels>
              <Tab.Panel className="">
                <div className="mt-8 grid grid-cols-1 gap-6 md:gap-7 ">
                 
                    <SectionGridFilterCard />
                
                </div>
                <div className="flex mt-11 justify-center items-center">
                  <ButtonSecondary>Show me more</ButtonSecondary>
                </div>
              </Tab.Panel>
              <Tab.Panel className="">
                <div className="mt-8 grid grid-cols-1 gap-6 md:gap-7 sm:grid-cols-2">
                {DEMO_STAY_LISTINGS.filter((_, i) => i < 4).map((stay) => (
                    <StayCard key={stay.id} data={stay} />
                  ))}
                </div>
                <div className="flex mt-11 justify-center items-center">
                  <ButtonSecondary>Show me more</ButtonSecondary>
                </div>
              </Tab.Panel>
              <Tab.Panel className="">
               <div>
                <FrequentTraveller/>
               </div>
                <div className="flex mt-11 justify-center items-center">
                  <ButtonSecondary href="/add-frequent-traveller">Add more</ButtonSecondary>
                </div>
              </Tab.Panel>
              <Tab.Panel className="">
              <div className="mt-8 grid grid-cols-1 gap-6 md:gap-7 sm:grid-cols-2">
                 <img src={ATMCard} alt="Card"/>
                 <img src={ATMCard} alt="Card"/>
                </div>
                <div className="flex mt-11 justify-center items-center">
                  <ButtonSecondary href="/addcard">Add more</ButtonSecondary>
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    );
  };


  return (
    <div className={`nc-DashboardPage ${className}`} data-nc-id="DashboardPage">
      <Helmet>
        <title>Dashboard || See you what you spent</title>
      </Helmet>
      <main className="container mt-12 mb-24 lg:mb-32 flex gap-y-10 flex-col">
        <div className="block flex-grow mb-24 lg:mb-0 lg:ml-10">
          <div className=" lg:sticky lg:top-24">{renderSidebar()}</div>
        </div>
        <div className="w-full space-y-8 lg:space-y-10 lg:pl-10 flex-shrink-0 p-0">
          {renderSection1()}
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
