import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import InputBox from "../../components/InputBox";
import api from "../../config/axios";
import { useSelector } from "react-redux";

const ChangePassword = () => {
  const [email, setEmail] = useState("");
  const [isVerificationRequested, setIsVerificationRequested] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [countdown, setCountdown] = useState(0);
  const userAuth = useSelector((state) => state.user);

  const handleRequestVerification = async () => {
    if (userAuth.user.email !== email) {
      toast.error("Email bạn nhập không phải là email tài khoản của bạn!");
    } else {
      const response = await api.post("auth/send-otp", {
        email,
      });
      if (response.status === 200) {
        setIsVerificationRequested(true);
        setCountdown(60);
        toast.success("Hãy kiểm tra hòm thư của bạn");
      } else {
        toast.error("Có lỗi khi gửi mã OTP");
      }
    }
  };

  useEffect(() => {
    let timer = null;
    if (countdown > 0) {
      timer = setTimeout(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    } else {
      setIsVerificationRequested(false);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted:", { email, newPassword, confirmPassword });
    setEmail("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="flex p-6 bg-white rounded-md place-items-center">
      <div className="shadow-lg border px-16 py-16 mt-16 ml-72">
        <h2 className="text-2xl mb-4 font-bold">Change Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="relative mb-4 min-w-[400px]">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Email address"
              disabled={isVerificationRequested}
              required
              style={{ textOverflow: "clip" }}
            />
            <button
              type="button"
              onClick={handleRequestVerification}
              className={`absolute inset-y-0 right-0 px-1 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 ${
                isVerificationRequested ? "hidden" : ""
              }`}
              disabled={isVerificationRequested}
            >
              Lấy mã xác nhận
            </button>
            {isVerificationRequested && (
              <span className="absolute inset-y-0 right-0 px-4 py-2 bg-gray-200 text-gray-600 rounded-md">
                {countdown > 0 ? `Lấy lại sau ${countdown}s` : "Lấy lại mã"}
              </span>
            )}
          </div>
          {isVerificationRequested && (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Mật khẩu mới:
                  <InputBox
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Mật khẩu mới"
                    disabled={false}
                  />
                </label>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Nhắc lại mật khẩu:
                  <InputBox
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Nhắc lại mật khẩu"
                    disabled={false}
                  />
                </label>
              </div>
            </>
          )}
          <div className="mb-4">
            {isVerificationRequested && (
              <button type="submit" className="button">
                Đổi mật khẩu
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
