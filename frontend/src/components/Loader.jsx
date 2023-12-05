import "../assets/css/loader.css";
import React from "react";

const Loader = ({ isVisible }) => {
  return isVisible ? (
    <div className="container-loader">
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  ) : null;
};

export default Loader;
