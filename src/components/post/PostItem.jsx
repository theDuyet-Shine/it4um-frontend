import React from "react";
import { Chip } from "@mui/material";
import { IoMdEye } from "react-icons/io";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComments } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const PostItem = ({ post, handleTagClick }) => {
  const navigate = useNavigate();

  return (
    <div className="mb-2 p-2 border rounded cursor-pointer">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-4">
          <img
            src={post.author.profile_image}
            alt={post.author.fullname}
            className="w-10 h-10 rounded-full mr-3"
          />
          <p className="font-semibold">{post.author.fullname}</p>
        </div>
        <div className="flex gap-4 items-center text-lg">
          <p className="text-sm text-gray-500">
            {new Date(post.post_date).toLocaleString("vi-VN")}
          </p>
        </div>
      </div>
      <h3
        className="text-lg font-bold mb-2"
        onClick={() => {
          navigate(`/post/${post._id}`);
        }}
      >
        {post.title}
      </h3>
      <div className="flex items-center text-gray-500 text-sm mb-2">
        <IoMdEye className="mr-1" /> {post.total_views}
        <FaRegComments className="ml-4 mr-1" /> {post.total_comments}
        <AiOutlineLike className="ml-4 mr-1" /> {post.total_likes}
      </div>
      <div className="flex flex-wrap gap-2 items-center mb-2">
        {post.tags.map((tag, index) => (
          <Chip
            key={index}
            label={tag}
            sx={{
              backgroundColor: "white",
              borderWidth: "1px",
              borderColor: "gray",
              borderStyle: "solid",
              color: "black",
              "&:hover": {
                backgroundColor: "gray",
                color: "white",
              },
            }}
            onClick={() => {
              handleTagClick(tag);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default PostItem;
