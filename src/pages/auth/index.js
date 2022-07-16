import React from "react";
import Login from "../../components/auth/Login";

const index = ({ user, setUser }) => {
  return <Login user={user} setUser={setUser} />;
};

export default index;
