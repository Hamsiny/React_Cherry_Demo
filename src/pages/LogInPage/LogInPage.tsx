import React from "react";
import LogIn from "../../components/LogIn/LogIn";

const LogInPage = (props) => {
  const { notify, setNotify, userTokenKey } = props;
  return (
    <div>
      <LogIn
        notify={notify}
        setNotify={setNotify}
        userTokenKey={userTokenKey}
      />
    </div>
  );
};

export default LogInPage;
