import React from "react";
import {Audio} from 'react-loader-spinner'
import "./spinner.css";

function LoadingSpinner() {
  return (
    <div className="spinner-container">
    <Audio
    height="100"
  width="100"
  color="#4fa94d"
  ariaLabel="audio-loading"
  wrapperStyle={{}}
  wrapperClass="wrapper-class"
  visible={true}
/>

    </div>
  );
}

export default LoadingSpinner

