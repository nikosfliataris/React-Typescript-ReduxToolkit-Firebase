import React from "react";
import "./Spinner.scss";
type Props = {};

function Spinner({}: Props) {
  return (
    <div className="spinner-overlay">
      <div className="spinner-container" />
    </div>
  );
}

export default Spinner;
