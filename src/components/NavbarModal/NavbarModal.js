import React from "react";
import "./NavbarModal.css";

import NavbarModalOption from "../NavbarModalOption/NavbarModalOption";
import { signInWithGoogle } from "../../utils/firebase";

const NavbarModal = ({ isModalOpen, closeModal }) => {
  const handleSignIn = async () => {
    const response = await signInWithGoogle();
    console.log(response);
  };
  return (
    <div className={`NavbarModal Right-${isModalOpen}`}>
      <NavbarModalOption closeModal={closeModal} link="/my-classes">
        My Classes
      </NavbarModalOption>
      <NavbarModalOption closeModal={closeModal} link="/change-classes">
        Change Classes
      </NavbarModalOption>
      <NavbarModalOption closeModal={closeModal} link="/all-classes">
        All Classes
      </NavbarModalOption>
      <NavbarModalOption
        clicked={handleSignIn}
        closeModal={closeModal}
        link="/my-classes"
      >
        Login In / Log out
      </NavbarModalOption>
    </div>
  );
};

export default NavbarModal;
