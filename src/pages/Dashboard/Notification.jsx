import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../../config/axios";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

const Notification = () => {
  const userAuth = useSelector((state) => state.user);
  const [notifications, setNotifications] = useState([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const perPage = 5; // Number of notifications per page
  const navigate = useNavigate();

  const fetchNoti = async (page) => {
    try {
      const res = await api.get(`/notification/${userAuth.user._id}`, {
        params: { page, perPage },
      });
      if (res.status === 200) {
        const { notifications, totalNotifications } = res.data;
        setNotifications(notifications || []);
        setTotalCount(totalNotifications || 0);
      }
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  };

  useEffect(() => {
    if (userAuth.user && userAuth.user._id) {
      fetchNoti(page);
    }
  }, [page, userAuth.user]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleNotificationClick = (postId) => {
    navigate(`/post/${postId}`);
  };

  const formatTimeDifference = (commentAt) => {
    const currentTime = new Date();
    const commentTime = new Date(commentAt);
    const diffMs = currentTime - commentTime;
    const diffSeconds = Math.floor(diffMs / 1000);
    if (diffSeconds < 60) {
      return `${diffSeconds} giây trước`;
    }
    const diffMinutes = Math.floor(diffSeconds / 60);
    if (diffMinutes < 60) {
      return `${diffMinutes} phút trước`;
    }
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) {
      return `${diffHours} giờ trước`;
    }
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} ngày trước`;
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: "400px",
      }}
    >
      <div>
        <h2 className="text-center mb-16 text-2xl font-bold text-blue-700">
          Thông báo
        </h2>
        <Box>
          {notifications.map((notification) => (
            <Box
              key={notification._id}
              sx={{
                border: "1px solid #ccc",
                borderRadius: "4px",
                padding: "10px",
                marginBottom: "10px",
                display: "flex",
                alignItems: "center",
                cursor: "pointer", // Thêm style để hiển thị con trỏ chuột khi hover
              }}
              onClick={() => handleNotificationClick(notification.post_id)}
            >
              <Avatar
                alt="Profile Image"
                src={notification.commenter_id.profile_image}
                sx={{ width: 40, height: 40, marginRight: 2 }}
              />
              <div>
                <Typography variant="body1">{notification.message}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {formatTimeDifference(notification.comment_at)}
                </Typography>
              </div>
            </Box>
          ))}
          {notifications.length === 0 && (
            <Typography variant="body1">No notifications available</Typography>
          )}
        </Box>
        <Stack spacing={2} style={{ marginTop: "20px", marginLeft: "120px" }}>
          <Pagination
            count={Math.ceil(totalCount / perPage)}
            page={page}
            onChange={handlePageChange}
          />
        </Stack>
      </div>
    </div>
  );
};

export default Notification;
