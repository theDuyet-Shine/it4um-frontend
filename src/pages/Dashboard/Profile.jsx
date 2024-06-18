import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../../config/axios";
import InputBox from "../../components/InputBox";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import storage from "../../config/firebase";
import toast from "react-hot-toast";
import { updateUserInfo } from "../../redux/actions/authActions";

const Profile = () => {
  const [profileData, setProfileData] = useState({
    fullname: "",
    email: "",
    phone_number: "",
    address: "",
    expertise: "",
    profile_image: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const dispatch = useDispatch();
  const userAuth = useSelector((state) => state.user);

  const getRandomString = (length) => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  };

  const fetchData = async () => {
    try {
      const response = await api.get(`/user/${userAuth.user._id}`);
      if (response.status === 200) {
        setProfileData(response.data);
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return; // Đảm bảo rằng đã chọn file

    const randomString = getRandomString(8); // Chuỗi ngẫu nhiên 8 ký tự
    const cleanFileName = file.name.replace(/[^a-zA-Z0-9.]/g, ""); // Làm sạch tên file
    const fileName = `${randomString}_${cleanFileName}`; // Tên file mới
    const storageRef = ref(storage, `/profile_image/${fileName}`);

    try {
      await uploadBytes(storageRef, file);
      const imageUrl = await getDownloadURL(storageRef);
      setProfileData((prevData) => ({
        ...prevData,
        profile_image: imageUrl,
      }));
      toast.success("Tải ảnh lên thành công!");
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const validatePNum = (phoneNumber) => {
    const errors = {};

    if (!phoneNumber) {
      return errors;
    }

    if (!/^\d{10}$/.test(phoneNumber)) {
      errors.phone_number =
        "Số điện thoại phải là chuỗi số và có độ dài là 10 kí tự";
    }

    return errors;
  };

  const handleSubmit = async () => {
    const phoneNumber = profileData.phone_number;
    const errors = validatePNum(phoneNumber);

    if (Object.keys(errors).length > 0) {
      toast.error(errors.phone_number);
      return;
    }

    try {
      const response = await api.put(`/user/${userAuth.user._id}`, profileData);
      if (response.status === 200) {
        dispatch(updateUserInfo(profileData));
        toast.success("Cập nhật thông tin thành công!");
      }
    } catch (error) {
      toast.error("Có lỗi khi cập nhật thông tin!");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="">
      <h1 className="font-bold text-2xl">Thông tin cá nhân</h1>
      <div className="flex flex-rows items-start py-4 gap-4">
        {/* upload image field */}
        <div className="mb-5 mt-16">
          <label
            htmlFor="uploadImg"
            id="profileImgLabel"
            className=" relative block w-48 h-48 bg-gray-100 rounded-full overflow-hidden"
          >
            <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center text-white bg-black/80 opacity-0 hover:opacity-100 cursor-pointer">
              Tải ảnh lên
            </div>
            <img src={profileData.profile_image} />
          </label>
          <input
            type="file"
            id="uploadImg"
            accept=".jpg, .png, .jpeg"
            hidden
            onChange={handleUploadImage}
          ></input>
        </div>
        {/* inputBox field */}
        <div className="w-[1000px]">
          <div className="">
            <div className="flex items-center">
              <div className="w-[800px]">
                <InputBox
                  name="fullname"
                  type="text"
                  value={profileData.fullname || ""}
                  placeholder="Họ tên"
                  className="w-[100%]"
                  onChange={handleInputChange}
                ></InputBox>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-[800px]">
                <InputBox
                  name="email"
                  type="email"
                  value={profileData.email || ""}
                  placeholder="Email"
                  className="w-[100%]"
                  onChange={handleInputChange}
                  disabled={true}
                ></InputBox>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-[800px]">
                <InputBox
                  name="address"
                  type="text"
                  value={profileData.address || ""}
                  placeholder="Địa chỉ"
                  className="w-[100%]"
                  onChange={handleInputChange}
                ></InputBox>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-[800px]">
                <InputBox
                  name="phone_number"
                  type="text"
                  value={profileData.phone_number || ""}
                  placeholder="Điện thoại"
                  className="w-[100%]"
                  onChange={handleInputChange}
                ></InputBox>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-[800px]">
                <InputBox
                  name="expertise"
                  type="text"
                  value={profileData.expertise || ""}
                  placeholder="Chuyên môn"
                  className="w-[100%]"
                  onChange={handleInputChange}
                ></InputBox>
              </div>
            </div>
          </div>
          <button className="button mr-40" onClick={handleSubmit}>
            Cập nhật
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
