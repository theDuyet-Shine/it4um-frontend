import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import api from "../../config/axios";

const Notification = () => {
  const userAuth = useSelector((state) => state.user);

  // useEffect to log userAuth whenever it changes
  const fetchNoti = async () => {
    const res = await api.get(`/notification/${userAuth.user._id}`);
    if (res.status === 200) {
      console.log(res.data);
    }
  };

  useEffect(() => {
    fetchNoti();
  }, []); // Run useEffect whenever userAuth changes

  return <div>Noti</div>;
};

export default Notification;
