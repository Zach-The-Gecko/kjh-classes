import React, { useContext } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import { UserContext } from "../../contexts/user.context";
import { signInWithGoogle } from "../../utils/firebase";
import "./NotSignedIn.css";

const NotSignedIn = () => {
  const { currentUser } = useContext(UserContext);
  const [searchParams] = useSearchParams();

  return (
    <div className="NotSignedIn Page">
      {currentUser && (
        <Navigate to={searchParams.get("redirect") || "/my-classes"} />
      )}
      <div className="NotSignedInTextContainer">
        <span>You are not signed in, please sign in to use the app</span>
        <span className="ButtonNotSignedIn" onClick={signInWithGoogle}>
          Sign In
        </span>
      </div>
    </div>
  );
};

export default NotSignedIn;
