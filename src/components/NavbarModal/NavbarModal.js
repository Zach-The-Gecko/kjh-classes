import React, { useContext } from "react";
import "./NavbarModal.css";

import { UserContext } from "../../contexts/user.context";
import NavbarModalOption from "../NavbarModalOption/NavbarModalOption";
import { signInWithGoogle } from "../../utils/firebase";
import { signOutUser } from "../../utils/firebase";

const NavbarModal = ({ isModalOpen, closeModal }) => {
  const { currentUser } = useContext(UserContext);
  const handleSignIn = async () => {
    await signInWithGoogle();
  };
  const handleSignOut = async () => {
    await signOutUser();
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
      {!currentUser ? (
        <NavbarModalOption
          clicked={handleSignIn}
          closeModal={closeModal}
          link="/my-classes"
        >
          Log In
        </NavbarModalOption>
      ) : (
        <NavbarModalOption
          clicked={handleSignOut}
          closeModal={closeModal}
          link="/my-classes"
        >
          Sign Out
        </NavbarModalOption>
      )}
    </div>
  );
};

export default NavbarModal;
