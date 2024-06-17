import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const BlogDetail = () => {
  const { id } = useParams(); // Sử dụng useParams để lấy id từ URL
  useEffect(() => {
    console.log(id);
  }, [id]); // Đặt id vào dependency array của useEffect để theo dõi thay đổi của id

  return <div>BlogDetail</div>;
};

export default BlogDetail;
