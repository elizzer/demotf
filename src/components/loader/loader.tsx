import React, { FC } from "react";
import { Interface } from "readline";
import "./loader.css";
export interface LoaderProps{
          content:any;
}
const Loader: FC<LoaderProps>= ({ content}) => {
  return (
    <div className="flex flex-col justify-center items-center">
    <div className="lds-ripple">
        <div className="border-2 border-black dark:border-white"></div>
        <div className="border-2 border-black dark:border-white"></div>
    </div>
    <h2 className="block text-neutral-500 dark:text-neutral-400 mt-3">{content}</h2>
    </div>
    
  );
};

export default Loader;
