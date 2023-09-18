import React from "react";
import {Audio} from 'react-loader-spinner'
import "./spinner.css";

function LoadingSpinner() {
  return (
    <div className="spinner-container">
    <Audio
    height="50"
  width="50"
  color="#117DF9"
  ariaLabel="audio-loading"
  wrapperStyle={{}}
  wrapperClass="wrapper-class"
  visible={true}
/>

    </div>
  );
}

export default LoadingSpinner

