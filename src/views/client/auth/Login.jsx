import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo_snapbuy from "../../../assets/images/logo_snapbuy.png";
import logo_google from "../../../assets/images/logo_google.png";
import logo_facebook from "../../../assets/images/logo_facebook.png";
import { useTheme } from "../../../Provider/ThemeProvider";
import { useAuth } from "../../../Provider/AuthProvider";
const Login = () => {
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();
  const [showPass, setShowPass] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const changeStatusShowPass = () => {
    setShowPass(!showPass);
  };

  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
  });

  console.log("formData:", formData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = () => {
    if (!formData.emailOrPhone || !formData.password) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    login();
    navigate("/");
  };

  return (
    <div
      className={`w-full h-[100vh] flex items-center justify-center ${
        isDarkMode ? "bg-background text-dark-100" : "bg-dark-200 text-white"
      }`}
    >
      <div
        className={`w-[30%] max-w-[420px] min-w-[340px] tl:min-w-[400px]  rounded-[5px] ${
          isDarkMode ? "bg-white border-[1px]" : "bg-dark-400"
        } py-[20px] px-[20px]`}
      >
        <Link to="/" className="w-full flex items-center gap-[10px] ">
          <img className="w-[30px]" src={logo_snapbuy} alt="" />
          <div className="flex items-centerfont-nunito font-extrabold text-[1.3rem] mt-[5px]">
            {" "}
            <span className="text-primary">Snap</span>
            <span className="text-black">Buy</span>
          </div>
        </Link>
        <div className="w-full flex flex-col py-[20px] pb-[10px]">
          <h1 className="text-[1.9rem] font-nunito font-bold ">Đăng nhập</h1>
          <p className="text-[0.9rem] font-nunito font-light ">
            Vui lòng nhập thông tin đăng nhâp
          </p>
        </div>
        <div className="flex flex-col mt-[20px] gap-[20px]">
          <div className="w-full flex items-center border-[1px] rounded-[5px] ">
            <div className="p-[10px] flex items-center justify-center">
              <i className="fa-solid fa-user"></i>
            </div>
            <input
              className="w-full bg-transparent outline-none px-[0px] py-[10px] rounded-[5px] text-[0.9rem]"
              type="text"
              name="emailOrPhone"
              value={formData.emailOrPhone}
              onChange={handleChange}
              placeholder="Nhập số điện thoại hoặc email"
            />
          </div>
          <div className="w-full flex items-center border-[1px] rounded-[5px] ">
            <div className="p-[10px] flex items-center justify-center">
              <i className="fa-solid fa-lock"></i>
            </div>
            <input
              className="w-full outline-none bg-transparent px-[0px] py-[10px] rounded-[5px] text-[0.9rem]"
              type={`${showPass ? "text" : "password"}`}
              placeholder="Nhập mật khẩu"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <div
              onClick={changeStatusShowPass}
              className="p-[10px] flex items-center justify-center cursor-pointer"
            >
              {showPass ? (
                <i className="fa-regular fa-eye-slash"></i>
              ) : (
                <i className="fa-regular fa-eye"></i>
              )}
            </div>
          </div>
          <div className="w-full flex items-center justify-between py-[5px]">
            <div className="flex items-center gap-[5px] ">
              <input
                className="outline-none bg-transparent"
                type="checkbox"
                name=""
                id=""
              />
              <span className="text-[0.9rem] font-nunito font-light mt-[2px]">
                Ghi nhớ tôi
              </span>
            </div>
            <a
              className="text-[0.9rem] font-nunito font-normal hover:text-[#1d39c6] mt-[2px]"
              href=""
            >
              Quên mật khẩu
            </a>
          </div>
          <button
            className="w-full outline-none px-[10px] py-[8px] rounded-[5px]  text-[1rem] text-white font-bold bg-primary"
            onClick={handleLogin}
          >
            Đăng nhập
          </button>
        </div>
        <div className="w-full flex  mt-[20px] gap-[20px] border-t-[1px] border-dashed py-[20px] ">
          <div
            className={`w-6/12 flex items-center justify-center  py-[5px] rounded-[5px] font-bold gap-[10px] cursor-pointer ${
              isDarkMode ? "bg-white border-[1px] text-black" : "bg-dark-500 "
            } `}
          >
            <img className="w-[26px]" src={logo_facebook} alt="" />
            <span className="text-[1rem]">facebook</span>
          </div>
          <div
            className={`w-6/12 flex items-center justify-center  py-[5px] rounded-[5px] font-bold gap-[10px] cursor-pointer ${
              isDarkMode ? "bg-white border-[1px] text-black" : "bg-dark-500 "
            } `}
          >
            <img className="w-[26px]" src={logo_google} alt="" />

            <span className="text-[1rem]">Google</span>
          </div>
        </div>
        <div className="w-full flex justify-center items-center gap-[5px] pt-[10px]">
          <p>Bạn đã có tài khoản?</p>
          <Link
            to="/register"
            className="text-[1rem] font-nunito font-bold mt-[2px] text-[#2f7ddc]"
          >
            Đăng ký
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
