import React, { useState } from "react";

import KJHLogo from "../../assets/navbar-logo.png";
import { Link } from "react-router-dom";
import Hamburger from "hamburger-react";
import "./Navbar.css";

import NavbarModal from "../NavbarModal/NavbarModal";

const NavBar = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div className="NavBar">
      <Link to="/my-classes">
        <img src={KJHLogo} alt="KJH Logo" className="Kjh-Logo" />
      </Link>
      <span className="Title">KJH Classes</span>
      <NavbarModal
        closeModal={() => setModalOpen(false)}
        isModalOpen={modalOpen}
      />
      <div className="Hamburger">
        <Hamburger toggled={modalOpen} toggle={setModalOpen} />
      </div>
    </div>
  );
};

export default NavBar;
