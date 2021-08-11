import React from "react";
import LogIn from "../../components/LogIn/LogIn";

const LogInPage = (props) => {
  const {
    notify,
    setNotify,
    userTokenKey,
    isLoggedIn,
    setIsLoggedIn,
    userLoggedIn,
    setUserLoggedIn,
  } = props;
  return (
    <div>
      <LogIn
        notify={notify}
        setNotify={setNotify}
        userTokenKey={userTokenKey}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        userLoggedIn={userLoggedIn}
        setUserLoggedIn={setUserLoggedIn}
      />
    </div>
  );
};

export default LogInPage;
