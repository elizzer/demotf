import { Tab } from "@headlessui/react";
import React, { FC, Fragment } from "react";
// import visaPng from "images/vis.png";
// import mastercardPng from "images/mastercard.svg";
import Input from "shared/Input/Input";
import Label from "components/Label/Label";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ProgressBar from "./ProgressBar";
import {Helmet} from "react-helmet"
export interface PaymentDetailsProps {
  className?: string;
}

const PaymentDetails: FC<PaymentDetailsProps> = ({ className = "" }) => {
 
  const renderAddress=()=>{
     return(
      <div className="w-full mt-4 sm:mt-0 flex flex-col sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-8 px-0 sm:p-6 xl:p-8">
        <h2 className="text-3xl lg:text-4xl font-semibold text-center sm:text-left">
          Billing Address
        </h2>
        <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
        <div className="flex-grow mt-10 md:mt-0 px-8 max-w-3xl space-y-6">
              <div>
                <Label>First Name</Label>
                <Input className="mt-1.5" placeholder="first-name" />
              </div>
              <div>
                <Label>Middle Name</Label>
                <Input className="mt-1.5" placeholder="middle-name" />
              </div>
              <div>
                <Label>Last Name</Label>
                <Input className="mt-1.5" placeholder="last-name" />
              </div>
              <div>
                <Label>Email</Label>
                <Input className="mt-1.5" placeholder="example@email.com" />
              </div>
              <div>
                <Label>Street Addess</Label>
                <Input className="mt-1.5" placeholder="Street address" />
              </div>
              <div>
                <Label>Country</Label>
                <Input className="mt-1.5" placeholder="Your Country" />
              </div>
              <div>
                <Label>Zip Code</Label>
                <Input className="mt-1.5" placeholder="Zip Code" />
              </div>
              <div>
                <Label>City</Label>
                <Input className="mt-1.5" placeholder="Your City" />
              </div>
              <div className="flex gap-x-0 w-full">
              <div>
                <Label>Country Code</Label>
                <Input className="w-1/2 mt-1.5" placeholder="eg: +1" />
              </div>
              <div>
                <Label>Phone number</Label>
                <Input className="w-full mt-1.5" placeholder="003 888 232" />
              </div>
              </div>
              <div className="pt-4">
                    <ButtonPrimary href="/review&book">Confirm</ButtonPrimary>
              </div>
            </div>
      </div>
     )
  }
  const renderMain = () => {
    return (
      <div className="w-full flex flex-col sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-8 px-0 sm:p-6 xl:p-8">
        <h2 className="font-semibold text-2xl sm:text-4xl sm:font-bold w-full text-center sm:text-left">
          Choose Payment Method
        </h2>
        <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
        
         
          {/* <div className="mt-6 border border-neutral-200 dark:border-neutral-700 rounded-3xl flex flex-col sm:flex-row divide-y sm:divide-x sm:divide-y-0 divide-neutral-200 dark:divide-neutral-700">
            <div className="flex-1 p-5 flex justify-between space-x-5">
              <div className="flex flex-col">
                <span className="text-sm text-neutral-400">Date</span>
                <span className="mt-1.5 text-lg font-semibold">
                  Aug 12 - 16, 2021
                </span>
              </div>
              <PencilAltIcon className="w-6 h-6 text-neutral-300 dark:text-neutral-6000" />
            </div>
            <div className="flex-1 p-5 flex justify-between space-x-5">
              <div className="flex flex-col">
                <span className="text-sm text-neutral-400">Guests</span>
                <span className="mt-1.5 text-lg font-semibold">3 Guests</span>
              </div>
              <PencilAltIcon className="w-6 h-6 text-neutral-300 dark:text-neutral-6000" />
            </div>
          </div> */}
        

        <div>
          <h3 className="text-2xl font-semibold">Pay with</h3>
          <div className="mt-6">
            <Tab.Group>
              <Tab.List className="flex">
                <Tab as={Fragment}>
                  {({ selected }) => (
                    <button
                      className={`px-4 py-1.5 sm:px-6 sm:py-2.5 rounded-full focus:outline-none ${
                        selected
                          ? "bg-secondary-800 text-white"
                          : "text-neutral-6000 dark:text-neutral-400"
                      }`}
                    >
                      Paypal
                    </button>
                  )}
                </Tab>
                <Tab as={Fragment}>
                  {({ selected }) => (
                    <button
                      className={`px-4 py-1.5 sm:px-6 sm:py-2.5  rounded-full flex items-center justify-center focus:outline-none  ${
                        selected
                          ? "bg-secondary-800 text-white"
                          : " text-neutral-6000 dark:text-neutral-400"
                      }`}
                    >
                      <span className="mr-2.5">Credit card</span>
                     
                    </button>
                  )}
                </Tab>
              </Tab.List>

              <div className="w-full border-b border-neutral-700 my-5"></div>
              <Tab.Panels>
               
                <Tab.Panel className="space-y-5 px-8">
                  <div className="space-y-1">
                    <Label>Email </Label>
                    <Input type="email" placeholder="example@gmail.com" />
                  </div>
                  <div className="space-y-1">
                    <Label>Password </Label>
                    <Input type="password" placeholder="***" />
                  </div>
                  {/* <div className="space-y-1">
                    <Label>Messager for author </Label>
                    <Textarea placeholder="..." />
                    <span className="text-sm text-neutral-500 block">
                      Write a few sentences about yourself.
                    </span>
                  </div> */}
                  
                </Tab.Panel>
                <Tab.Panel className="space-y-5 px-8">
                  <div className="space-y-1">
                    <Label>Card number </Label>
                    <Input placeholder="111 112 222 999" />
                  </div>
                  <div className="space-y-1">
                    <Label>Card holder </Label>
                    <Input placeholder="JOHN DOE" />
                  </div>
                  <div className="flex space-x-5  ">
                    <div className="flex-1 space-y-1">
                      <Label>Expiration date </Label>
                      <Input type="date" placeholder="MM/YY" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <Label>CVC</Label>
                      <Input/>
                    </div>
                  </div>
                  {/* <div className="space-y-1">
                    <Label>Messager for author </Label>
                    <Textarea placeholder="..." />
                    <span className="text-sm text-neutral-500 block">
                      Write a few sentences about yourself.
                    </span>
                  </div> */}
                  
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`nc-PaymentDetails ${className}`} data-nc-id="PaymentDetails">
       <Helmet>
        <title>Payment Details || TravelFika</title>
      </Helmet>
        <ProgressBar >
        <div className="flex flex-col gap-y-10">
        <div className="w-full lg:w-1/2 xl:w-2/3 lg:pr-10 mb-16 ">{renderMain()}</div>
        <div className="w-full lg:w-1/2 xl:w-2/3 lg:pr-10 mb-16">{renderAddress()}</div>
        </div>
        </ProgressBar>
        
    </div>
  );
};

export default PaymentDetails;
