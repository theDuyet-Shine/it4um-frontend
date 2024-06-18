import React, { useEffect, useState } from "react";
import { motion as m } from "framer-motion";
import { CiSearch } from "react-icons/ci";
import { Chip, Pagination } from "@mui/material"; // Đảm bảo bạn đã cài đặt @mui/material
import api from "../config/axios";
import { IoMdEye } from "react-icons/io";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComments } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import PostItem from "../components/post/PostItem";
const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState("latest");
  const [tagFilterList, setTagFilterList] = useState([]);
  const [tags, setTags] = useState([]);
  const [posts, setPosts] = useState([]); // Thêm state cho các bài viết
  const [totalPages, setTotalPages] = useState(1); // Tổng số trang
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại

  const handleTagClick = (tag) => {
    if (tagFilterList.includes(tag)) {
      setTagFilterList(tagFilterList.filter((t) => t !== tag));
    } else {
      setTagFilterList([...tagFilterList, tag]);
    }
  };

  const navigate = useNavigate();

  const handleFilter = () => {
    fetchFilteredPosts();
  };

  const fetchTags = async () => {
    try {
      const response = await api.get("/tag");
      setTags(response.data);
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  };

  const fetchFilteredPosts = async () => {
    try {
      const response = await api.get("post", {
        params: {
          sort: sortType,
          tag: tagFilterList.join(","),
          search: searchTerm,
          page: currentPage,
        },
      });
      setPosts(response.data.posts);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error filtering posts:", error);
    }
  };

  const handleClearFilter = () => {
    setSearchTerm("");
    setSortType("latest");
    setTagFilterList([]);
    setCurrentPage(1);
  };

  useEffect(() => {
    fetchTags();
  }, []);

  useEffect(() => {
    fetchFilteredPosts();
  }, [currentPage]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.75, ease: "easeOut" }}
      className="flex m-auto"
    >
      {/* Phần bên trái chiếm 60% */}
      <div className="w-3/5 p-4">
        <h2 className="text-xl font-bold">PostPool</h2>
        {/* Hiển thị bài viết */}
        {posts.map((post) => (
          <PostItem
            key={post._id}
            className="mb-4 p-4 border rounded"
          >
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
            <h3 className="text-lg font-bold mb-2 cursor-pointer" onClick={() => {
              navigate(`/post/${post._id}`);
            }}>{post.title}</h3>
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
        ))}

        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          sx={{ marginTop: 4 }}
        />
      </div>

      <div
        className="w-2/5 p-4 mt-32"
        style={{
          overflowY: "auto",
          maxHeight: "calc(100vh - 32px)",
          position: "sticky",
          top: "60px",
        }}
      >
        <div className="flex flex-col items-center">
          <div className="relative mb-4" style={{ width: "60%" }}>
            <input
              type="text"
              placeholder="Tìm kiếm"
              className="w-full py-2 pl-10 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 hover:bg-slate-200 focus:bg-slate-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <CiSearch className="w-6 h-6" />
            </div>
          </div>

          <div className="mb-4" style={{ width: "60%" }}>
            <select
              className="w-full py-2 pl-3 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 hover:bg-slate-200 focus:bg-slate-200"
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
            >
              <option value="latest">Mới nhất</option>
              <option value="views">Nhiều lượt xem nhất</option>
              <option value="likes">Nhiều lượt like nhất</option>
            </select>
          </div>

          <div
            className="mb-4 flex flex-wrap justify-center gap-2"
            style={{ width: "60%" }}
          >
            {tags.map((tag) => (
              <Chip
                key={tag._id}
                label={tag.tag_name}
                onClick={() => handleTagClick(tag.tag_name)}
                sx={{
                  backgroundColor: tagFilterList.includes(tag.tag_name)
                    ? "black"
                    : "white",
                  borderWidth: "1px",
                  borderColor: "gray",
                  borderStyle: "solid",
                  color: tagFilterList.includes(tag.tag_name)
                    ? "white"
                    : "black",
                  "&:hover": {
                    backgroundColor: tagFilterList.includes(tag.tag_name)
                      ? "black"
                      : "gray",
                    color: tagFilterList.includes(tag.tag_name)
                      ? "white"
                      : "black",
                  },
                }}
                className="font-time"
              />
            ))}
          </div>

          <div className="flex gap-3">
            <button onClick={handleClearFilter} className="button">
              Làm sạch bộ lọc
            </button>
            <button onClick={handleFilter} className="button">
              Lọc
            </button>
          </div>
        </div>
      </div>
    </m.div>
  );
};

export default Home;
