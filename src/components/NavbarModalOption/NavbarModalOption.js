import React from "react";
import "./NavbarModalOption.css";
import { Link } from "react-router-dom";

const NavbarModalOption = ({ children, link, closeModal, clicked }) => {
  return (
    <div className="NavbarModalOption">
      <Link
        to={link}
        className="Text"
        onClick={() => {
          closeModal();
          clicked();
        }}
      >
        {children}
      </Link>
    </div>
  );
};

export default NavbarModalOption;
