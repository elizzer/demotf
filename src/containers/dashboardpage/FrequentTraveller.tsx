import Avatar from "shared/Avatar/Avatar";
import  { FC } from "react";



export interface FrequentTravellerProps {
  className?: string;
}

const FrequentTraveller=() => {
 const renderSidebar = () => {
  return (
    <div className=" w-full flex flex-col sm:flex-row gap-8  text-center">
      <div className="w-1/2 flex flex-row gap-x-4  justify-self-center justify-content-center items-center text-center sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700  px-0 sm:p-6 xl:p-8">
        <Avatar
        hasChecked
        hasCheckedClass="w-6 h-6 -top-0.5 right-2"
        sizeClass="w-24 h-24"
        />
       <div className="mt-0 text-left flex flex-col gap-y-4 items-left">
        <a href="/account">
         <h2 className="mt-0 text-2xl font-semibold">Username</h2>
        </a>
        <h3 className="text-xs">username@gmail.com</h3>
        </div>
      </div>
      <div className="w-1/2 flex flex-row gap-x-4 justify-self-center justify-content-center items-center text-center sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700  px-0 sm:p-6 xl:p-8">
       <Avatar
        hasChecked
        hasCheckedClass="w-6 h-6 -top-0.5 right-2"
        sizeClass="w-24 h-24"
      />
      <div className="mt-0 text-left flex flex-col gap-y-4 items-left">
        <a href="/account">
         <h2 className="mt-0 text-2xl font-semibold">Username</h2>
        </a>
        <h3 className="text-xs">username@gmail.com</h3>
      </div>
      </div>
     

      
    </div>
  );
  }
  return (
    <div  data-nc-id="DashboardPage">
    
      <main className="container mt-12 mb-24 lg:mb-32 flex gap-y-10 flex-col">
        <div className="block flex-grow mb-24 lg:mb-0 lg:ml-10">
          <div className=" lg:sticky lg:top-24">{renderSidebar()}</div>
        </div>
      </main>
    </div>
  );
};

export default FrequentTraveller;
