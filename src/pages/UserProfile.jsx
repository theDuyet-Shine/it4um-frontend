import React from "react";
import { useParams } from "react-router-dom";

const UserProfile = () => {
  const { id } = useParams;
  console.log(id);
  return <div>UserProfile</div>;
};

export default UserProfile;
