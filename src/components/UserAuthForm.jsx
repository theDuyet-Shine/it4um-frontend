import React, { useContext, useState } from "react";
import InputBox from "./InputBox";
import { Link, useNavigate } from "react-router-dom";
import api from "../config/axios";
import toast from "react-hot-toast";
import { UserContext } from "../App";
const UserAuthForm = ({ type, loginType }) => {
  const { loginContext } = useContext(UserContext);

  const [showOtpForm, setShowOtpForm] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    fullname: "",
    email: "",
    otp: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData);
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (
      !formData.username ||
      !formData.password ||
      !formData.fullname ||
      !formData.email
    ) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }
    try {
      const response = await api.post("auth/send-otp", {
        email: formData.email,
      });
      if (response.status === 200) {
        toast.success(
          "Một mã OTP đã được gửi tới email mà bạn đăng ký, hãy kiểm tra!"
        );
        setShowOtpForm(true);
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra khi gửi mã OTP!");
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!formData.otp) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }
    try {
      const res = await api.post("auth/validate-otp", {
        email: formData.email,
        otp: formData.otp,
      });
      if (res.status === 200) {
        const response = await api.post("auth/signup", {
          username: formData.username,
          password: formData.password,
          fullname: formData.fullname,
          email: formData.email,
        });
        if (response.status === 201) {
          toast.success(
            "Đăng ký thành công! Bạn sẽ được chuyển hướng đến trang đăng nhập sau 3 giây",
            {
              duration: 2500,
            }
          );
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        }
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra khi đăng ký");
    }
  };

  const handleUserLogin = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }
    try {
      const response = await api.post("auth/login", {
        username: formData.username,
        password: formData.password,
      });
      if (response.status === 200) {
        console.log(response);
        loginContext(response.data);
        console.log(sessionStorage);
        toast.success("Đăng nhập thành công!");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      toast.error(
        "Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin đăng nhập."
      );
    }
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <section className="min-h-[calc(100vh-80px)] flex items-center justify-center">
      <form className="w-[80%] max-w-[500px] bg-white rounded-lg shadow-md p-4 mt-8">
        <h1 className="text-4xl text-center mb-12">
          {type === "login"
            ? "Chào mừng bạn đã quay trở lại!"
            : "Tham gia xây dựng cộng đồng IT4um ngay bây giờ!"}
        </h1>

        {!showOtpForm ? (
          <>
            {type !== "login" ? (
              <>
                <InputBox
                  name="username"
                  type="text"
                  placeholder="Tên tài khoản"
                  onChange={handleInputChange}
                />
                <InputBox
                  name="password"
                  type="password"
                  placeholder="Mật khẩu"
                  onChange={handleInputChange}
                />
                <InputBox
                  name="fullname"
                  type="text"
                  placeholder="Họ tên"
                  onChange={handleInputChange}
                />
                <InputBox
                  name="email"
                  type="email"
                  placeholder="Email"
                  onChange={handleInputChange}
                />
                <button
                  className="px-4 py-2 bg-black text-white rounded-full shadow-md mt-4 mb-4"
                  onClick={handleSendOtp}
                >
                  Tiếp tục
                </button>
                <div className="relative w-full flex items-center gap-2">
                  <hr className="w-full border-t border-black opacity-10" />
                  <p className="text-black opacity-50 font-bold uppercase mx-2">
                    Hoặc
                  </p>
                  <hr className="w-full border-t border-black opacity-10" />
                </div>
              </>
            ) : (
              <>
                <InputBox
                  name="username"
                  type="text"
                  placeholder="Tên tài khoản"
                  onChange={handleInputChange}
                />
                <InputBox
                  name="password"
                  type="password"
                  placeholder="Mật khẩu"
                  onChange={handleInputChange}
                />
                {loginType === "user" ? (
                  <button
                    className="px-4 py-2 bg-black text-white rounded-full shadow-md mt-4 mb-4"
                    onClick={handleUserLogin}
                  >
                    Đăng nhập
                  </button>
                ) : (
                  <button
                    className="px-4 py-2 bg-black text-white rounded-full shadow-md mt-4 mb-4"
                    onClick={handleAdminLogin}
                  >
                    Đăng nhập
                  </button>
                )}
                <div className="relative w-full flex items-center gap-2 mt-4">
                  <hr className="w-full border-t border-black opacity-10" />
                  <p className="text-black opacity-50 font-bold uppercase mx-2">
                    Hoặc
                  </p>
                  <hr className="w-full border-t border-black opacity-10" />
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <h2 className="text-2xl text-center mb-4">Nhập mã OTP</h2>
            <InputBox
              name="otp"
              type="text"
              value={formData.otp}
              placeholder="Mã OTP"
              onChange={handleInputChange}
            />
            <button
              className="w-full px-4 py-2 bg-black text-white rounded-full shadow-md mt-4 mb-4"
              onClick={handleSignUp}
            >
              Đăng ký
            </button>
          </>
        )}

        {loginType !== null ? (
          loginType === "user" ? (
            <>
              <Link
                to={"/login-admin"}
                className="mt-8 text-dark-grey text-md text-center underline"
              >
                Đăng nhập với quyền quản trị viên
              </Link>
            </>
          ) : (
            <>
              <Link
                to={"/login"}
                className="mt-8 text-dark-grey text-md text-center underline"
              >
                Đăng nhập với quyền người dùng
              </Link>
            </>
          )
        ) : (
          ""
        )}

        {type === "login" ? (
          <>
            <p className="mt-4 text-dark-grey text-md text-center">
              Chưa có tài khoản?
              <Link
                to={"/signup"}
                className="underline text-black text-md ml-2"
              >
                Đăng ký tại đây!
              </Link>
            </p>
          </>
        ) : (
          !showOtpForm && (
            <>
              <p className="mt-4 text-dark-grey text-md text-center">
                Đã có tài khoản?
                <Link
                  to={"/login"}
                  className="underline text-black text-md ml-2"
                >
                  Đăng nhập tại đây!
                </Link>
              </p>
            </>
          )
        )}
      </form>
    </section>
  );
};

export default UserAuthForm;
