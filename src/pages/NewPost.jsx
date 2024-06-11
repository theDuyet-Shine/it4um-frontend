import React, { useEffect } from "react";
import { motion as m } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import TextEditor from "../components/TextEditor";

const NewPost = () => {
  const navigate = useNavigate();
  const userAuth = useSelector((state) => state.user);

  const checkAuthenticated = () => {
    if (!userAuth.isAuthenticated) {
      navigate("/login");
      toast("Bạn cần đăng nhập để có thể viết bài!", {
        icon: "⚠️",
        duration: 2000,
      });
    }
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.75, ease: "easeOut" }}
    >
      <TextEditor />
    </m.div>
  );
};

export default NewPost;
