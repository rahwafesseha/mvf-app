import React from "react";
import searchMan from "../src/Images/searchMan.jpeg";
import "./header.css";

const Header = () => {
  return (
    <div>
      <h1 className="header-image">
        <img src={searchMan} alt="" />
      </h1>
      <h1 className="header">Favorite Language</h1>
      <h4 className="description">
        Enter a GitHub username to find out user's favorite programming
        language.
      </h4>
    </div>
  );
};

export default Header;
