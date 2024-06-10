import React from "react";
import UserAuthForm from "../components/UserAuthForm";

const LoginPageAdmin = () => {
  return (
    <div>
      <UserAuthForm type={"login"} loginType={"admin"} />
    </div>
  );
};

export default LoginPageAdmin;
