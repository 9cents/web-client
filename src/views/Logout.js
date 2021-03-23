import React from "react";
import authProvider from "../utils/authProvider";
import { useHistory } from "react-router-dom";

export default function Logout(props) {
  const history = useHistory();

  // this component just calls the logout function and redirects back to the log-in screen
  React.useEffect(() => {
    authProvider.logout();
    history.push("/");
    // eslint-disable-next-line
  }, []);
  return <div></div>;
}
