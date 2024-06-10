import React from "react";
import UserAuthForm from "../components/UserAuthForm";

const SignupPage = () => {
  return (
    <>
      <UserAuthForm type={"signup"} loginType={null} />
    </>
  );
};

export default SignupPage;
