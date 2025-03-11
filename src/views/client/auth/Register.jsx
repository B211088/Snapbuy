import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo_snapbuy from "../../../assets/images/logo_snapbuy.png";
import logo_google from "../../../assets/images/logo_google.png";
import logo_facebook from "../../../assets/images/logo_facebook.png";
import { useTheme } from "../../../Provider/ThemeProvider";
import { AuthContext } from "../../../contexts/User/AuthContext";
import { ToastContainer } from "react-toastify";
import HeaderFlexibleView from "../../../components/Header/HeaderFlexibleView";
import {
  notifySuccess,
  notifyWarning,
  notifyError,
} from "../../../utils/client/Notify";

const Register = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setshowConfirmPass] = useState(false);
  const [accessibility, setAccessibility] = useState(false);
  const {
    authState: { isAuthenticated },
    registerUser,
  } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  });

  console.log(accessibility);

  const handleChangeAccessibility = (e) => {
    setAccessibility(e.target.checked);
  };

  const changeStatusShowPass = () => {
    setShowPass(!showPass);
  };
  const changeStatusShowConfirmPass = () => {
    setshowConfirmPass(!showConfirmPass);
  };

  const [formData, setFormData] = useState({
    phone_number: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async () => {
    const { phone_number, password, confirmPassword } = formData;

    const phoneRegex = /^[0-9]{9,11}$/;
    if (!phoneRegex.test(phone_number)) {
      notifyWarning("Số điện thoại không hợp lệ", 3000, isDarkMode);
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,30}$/;
    if (!passwordRegex.test(password)) {
      notifyWarning(
        "Mật khẩu phải từ 8-30 ký tự, có chữ hoa, chữ thường và số",
        4000,
        isDarkMode
      );
      return;
    }

    if (password !== confirmPassword) {
      notifyWarning("Mật khẩu không trùng khớp", 3000, isDarkMode);
      return;
    }

    if (!accessibility) {
      notifyWarning(
        "Bạn có đồng ý với chính sách và điều khoản sử dụng của chúng tôi",
        3000,
        isDarkMode
      );
      return;
    }

    try {
      const response = await registerUser({ phone_number, password });

      if (!response || response.status !== 200) {
        notifyError(response.message, 3000, isDarkMode);
        return;
      }
      notifySuccess("Đăng ký thành công!", 3000, isDarkMode);
      navigate("/login");
      return;
    } catch (error) {
      console.error("Đăng ký thất bại:", error);
      notifyError("Đăng ký thất bại! Vui lòng thử lại.", 3000, isDarkMode);
    }
  };

  return (
    <div
      className={`w-full h-[100vh] flex flex-col items-center  ${
        isDarkMode ? "bg-background text-dark-100" : "bg-dark-200 text-white"
      }`}
    >
      <ToastContainer />
      <HeaderFlexibleView title={"Đăng ký"} />
      <div className="w-full container-minus-headerflexible flex items-center justify-center  ">
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
            <h1 className="text-[1.5rem] font-nunito font-bold ">
              Đăng ký tài khoản
            </h1>
            <p className="text-[0.9rem] font-nunito font-light ">
              Vui lòng nhập thông tin đăng ký
            </p>
          </div>
          <div className="flex flex-col mt-[20px] gap-[20px]">
            <div className="w-full flex items-center border-[1px] rounded-[5px] ">
              <div className="p-[10px] flex items-center justify-center">
                <i className="fa-solid fa-phone"></i>
              </div>
              <input
                className="w-full bg-transparent outline-none py-[10px] rounded-[5px] text-[0.9rem]"
                type="tel"
                pattern="^0[0-9]{9,10}$"
                placeholder="Nhập số điện thoại"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                required
              />
            </div>
            <div className="w-full flex items-center border-[1px] rounded-[5px] ">
              <div className="p-[10px] flex items-center justify-center">
                <i className="fa-solid fa-lock"></i>
              </div>
              <input
                className="w-full bg-transparent outline-none py-[10px] rounded-[5px] text-[0.9rem]"
                type={`${showPass ? "text" : "password"}`}
                placeholder="Nhập mật khẩu"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
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
            <div className="w-full flex items-center border-[1px] rounded-[5px] ">
              <div className="p-[10px] flex items-center justify-center">
                <i className="fa-solid fa-lock"></i>
              </div>
              <input
                className="w-full bg-transparent outline-none  py-[10px] rounded-[5px] text-[0.9rem]"
                type={`${showConfirmPass ? "email" : "password"}`}
                placeholder="Nhập lại mật khẩu"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <div
                onClick={changeStatusShowConfirmPass}
                className="p-[10px] flex items-center justify-center cursor-pointer"
              >
                {showConfirmPass ? (
                  <i className="fa-regular fa-eye-slash"></i>
                ) : (
                  <i className="fa-regular fa-eye"></i>
                )}
              </div>
            </div>
            <div className="flex gap-[5px] ">
              <div className="">
                <input
                  className="outline-none bg-transparent"
                  type="checkbox"
                  name="accessibility"
                  onChange={handleChangeAccessibility}
                  checked={accessibility}
                />
              </div>
              <span className="text-[0.8rem] font-nunito font-normal mt-[2px]">
                Bạn có đồng ý với{" "}
                <a className="text-blue-600 font-bold" href="">
                  chính sách
                </a>{" "}
                và{" "}
                <a className="text-blue-600 font-bold" href="">
                  điều khoản sử dụng
                </a>{" "}
                của chúng tôi
              </span>
            </div>
            <button
              className="w-full outline-none px-[10px] py-[8px] rounded-[5px]  text-[1rem] text-white font-bold bg-primary"
              onClick={handleRegister}
            >
              Đăng ký
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
          <div className="w-full flex justify-center items-center gap-[5px] pt-[10px] c">
            <div>Bạn đã có tài khoản?</div>
            <Link
              to="/login"
              className="text-[1rem] font-nunito font-bold mt-[2px] text-[#2f7ddc] cursor-pointer"
            >
              Đăng nhập
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
