import React from "react";
import UserAuthForm from "../components/UserAuthForm";

const LoginPage = () => {
  return (
    <>
      <UserAuthForm type={"login"} loginType={"user"} />
    </>
  );
};

export default LoginPage;
