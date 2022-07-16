import React from "react";
import Login from "../../components/auth/Login";

const Index = ({ user, setUser }) => {
  return <Login user={user} setUser={setUser} />;
};

export default Index;
