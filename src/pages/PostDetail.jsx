import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../config/axios";
import { motion as m } from "framer-motion";
import "react-quill/dist/quill.snow.css";
import { BsPencilSquare } from "react-icons/bs";
import { IoMdEye } from "react-icons/io";
import { FaRegComments } from "react-icons/fa";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const PostDetail = () => {
  const { id } = useParams();
  const [postData, setPostData] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [totalLikes, setTotalLikes] = useState(0);
  const userAuth = useSelector((state) => state.user);

  const fetchPost = async () => {
    try {
      const response = await api.get(`/post/${id}`);
      if (response.status === 200) {
        setPostData(response.data);
        setTotalLikes(response.data.total_likes); // Cập nhật số lượt like hiện tại
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = () => {
    if (userAuth.isAuthenticated) {
      setIsLiked(!isLiked);
      setTotalLikes(isLiked ? totalLikes - 1 : totalLikes + 1);
    } else
      toast("Bạn cần đăng nhập mới có thể tương tác với bài viết", {
        icon: "⚠️",
        duration: 1000,
      });
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.75, ease: "easeOut" }}
      className="flex items-center justify-center"
    >
      <div className="w-[60%]">
        {postData.author && (
          <div className="flex gap-2 items-center justify-between">
            <div className="flex gap-2 items-center">
              <img
                src={postData.author.profile_image}
                alt={postData.author.fullname}
                className="w-10 h-10 rounded-full mt-4"
              />
              <div className="flex flex-col mt-2" title="Số bài viết">
                <h1 className="mt-1 font-bold">{postData.author.fullname}</h1>
                <div className="flex items-center gap-1">
                  <BsPencilSquare />
                  <p>{postData.author.total_post}</p>
                </div>
              </div>
            </div>
            <div className="text-base">
              <p className="text-gray-500 mt-4   mr-3">
                Đã đăng vào{" "}
                {new Date(postData.post_date).toLocaleString("vi-VN")}
              </p>
              <div className="flex items-center text-gray-500 text-sm mb-2">
                <IoMdEye className="mr-1" title="Số lượt xem" />{" "}
                {postData.total_views}
                <FaRegComments
                  className="ml-4 mr-1"
                  title="Số lượt bình luận"
                />{" "}
                {postData.total_comments}
                {isLiked ? (
                  <AiFillLike
                    color="blue"
                    className="ml-4 mr-1"
                    onClick={handleLike}
                    title="Số lượt thích"
                  />
                ) : (
                  <AiOutlineLike
                    className="ml-4 mr-1"
                    onClick={handleLike}
                    title="Số lượt thích"
                  />
                )}
                {totalLikes}
              </div>
            </div>
          </div>
        )}
        <h1 className="font-bold text-2xl mt-8">{postData.title}</h1>
        <div className="ql-snow w-full">
          <div className="ql-editor">
            <div dangerouslySetInnerHTML={{ __html: postData.content }} />
          </div>
        </div>
      </div>
    </m.div>
  );
};

export default PostDetail;
