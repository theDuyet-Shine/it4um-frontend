import React from "react";

import "react-quill/dist/quill.snow.css";

const CommentItem = ({ comment }) => {
  return (
    <div className="border-2 py-4 my-4 bg-white">
      <div className="flex items-center mb-2">
        <img
          src={comment.commenter_id.profile_image || ""}
          alt={comment.commenter_id.fullname || ""}
          className="w-8 h-8 rounded-full mx-2"
        />
        <span className="font-semibold">{comment.commenter_id.fullname}</span>
        <span className="text-gray-500 text-sm ml-2">
          {" "}
          {new Date(comment.comment_at).toLocaleString("vi-VN")}
        </span>
      </div>
      <div className="ql-snow">
        <div className="ql-editor">
          <div dangerouslySetInnerHTML={{ __html: comment.content }} />
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
