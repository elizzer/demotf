import React, { FC } from "react";
import "./DotLoader.css";
const DotLoader: FC = ({  }) => {
  return (
   <div className="loader">
      <span className="loader__element"></span>
      <span className="loader__element"></span>
      <span className="loader__element"></span>
    </div>
    
  );
};

export default DotLoader;
