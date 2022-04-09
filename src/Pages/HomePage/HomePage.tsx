import React from "react";
import Directory from "../../Components/Directory/Directory";
import "./HomePage.scss";
type Props = {};

function HomePage({}: Props) {
  return (
    <div className="homepage">
      <Directory State={[]} />
    </div>
  );
}

export default HomePage;
