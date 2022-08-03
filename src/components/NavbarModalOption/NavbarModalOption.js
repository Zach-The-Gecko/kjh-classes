import React from "react";
import "./NavbarModalOption.css";
import { Link } from "react-router-dom";

const NavbarModalOption = ({ children, link, clicked }) => {
  return (
    <div className="NavbarModalOption">
      <Link to={link} className="ModalOptionText" onClick={clicked}>
        {children}
      </Link>
    </div>
  );
};

export default NavbarModalOption;
