import { motion as m } from "framer-motion";
import React from "react";

const Home = () => {
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.75, ease: "easeOut" }}
    >
      Home
    </m.div>
  );
};

export default Home;
