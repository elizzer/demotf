import React from "react";
import { FC } from "react";
import { NavLink } from "react-router-dom";

export interface TravelerProgressProps {
  children?: React.ReactNode;
  className?: string;
  onSubmit?:any;
  data: {
    id: string;
    travelerCard: {
      type: string;
      number: number;
    };
  };
}

const TravelerProgress: FC<TravelerProgressProps> = ({ children, data, onSubmit }) => {
  return (
    <div className="nc-TravelerProgressProps bg-neutral-50 dark:bg-neutral-900">
      <div className="border-b border-neutral-200 dark:border-neutral-700 pt-12 bg-white dark:bg-neutral-800">
        <div className="container">
          <div className="flex flex-col justify-center sm:flex-row sm:space-x-8 md:space-x-14 overflow-x-auto hiddenScrollbar">
            <NavLink
              activeClassName="!text-secondary-500 sm:!border-secondary-500"
              to={data.id}
              className="block py-5 md:py-8 border-b-2 border-transparent flex-shrink-0"
            >
               {data.travelerCard.type}-{data.travelerCard.number}
            </NavLink>
          </div>
        </div>
      </div>
      <div className="container pt-14 sm:pt-20 pb-24 lg:pb-32">{children}</div>
    </div>
  );
};

export default TravelerProgress;
