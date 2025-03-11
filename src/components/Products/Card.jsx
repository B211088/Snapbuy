import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "../../Provider/ThemeProvider";
import InfoShop from "./InfoShop";
import Rank from "../features/Rank";

import CoupouList from "../features/CoupouList";
import { Link } from "react-router-dom";

const Card = ({ cardContent }) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { id, thumbnail, nameProduct, coupous, price, sales } = cardContent;

  return (
    <div
      className={`card  min-w-[160px] pc:mt-[20px]  mb:mt-[10px]  pc:ml-[20px]  mb:ml-[10px] flex flex-col rounded-[5px] shadow-md relative group ${
        isDarkMode ? "bg-white text-black" : "bg-dark-300 text-white"
      }`}
    >
      <div className=" flex overflow-hidden rounded-[5px]">
        <div className="w-full flex  rounded-[5px]">
          <img
            className="aspect-square z-10 w-full object-cover rounded-[5px] hover:scale-[1.3] transition-all duration-500"
            src={thumbnail[0]}
            alt=""
            loading="lazy"
          />
        </div>
      </div>

      <div className="w-full flex flex-col ">
        <Link to={`/product/${id}`} className="w-full flex-col">
          <div className="w-full h-[50px]  flex my-[5px] px-[10px] cursor-pointer">
            <h3
              className={`font-bold text-[1rem] ${
                isDarkMode ? "text-[#373737]" : "text-white"
              }  line-clamp-2`}
            >
              {nameProduct}
            </h3>
          </div>
          <div className="w-full flex items-center gap-[10px] py-[0px] px-[10px] cursor-pointer">
            {(() => {
              const discountVoucher = coupous.find(
                (coupou) => coupou.tag === "discount"
              );

              const discountedPrice = discountVoucher
                ? price * (1 - discountVoucher.treatment / 100)
                : price;

              return (
                <>
                  <span className="font-bold pc:text-[1rem] tl:text-[1rem] mb:text-[1rem] text-[#ee2f2f]">
                    {discountedPrice.toLocaleString("vi-VN")}đ
                  </span>

                  {discountVoucher && (
                    <span
                      className={`font-bold pc:text-[0.8rem] tl:text-[0.8rem] mb:text-[0.8rem] line-through ${
                        isDarkMode ? "text-[#292929]" : "text-white"
                      }`}
                    >
                      {price.toLocaleString("vi-VN")}đ
                    </span>
                  )}
                </>
              );
            })()}
          </div>
          <div className="w-full  flex  items-center justify-between my-[5px] px-[10px] cursor-pointer">
            <span
              className={`font-normal pc:text-[0.8rem] tl:text-[0.7rem] mb:text-[0.7rem]   whitespace-nowrap  ${
                isDarkMode ? "text-[#292929]" : "text-white"
              }`}
            >
              {sales >= 10000
                ? (sales / 10000).toFixed(1) + "k"
                : sales >= 1000
                ? (sales / 1000).toFixed(1) + "k"
                : sales}{" "}
              đã bán
            </span>
          </div>
        </Link>
        <div
          className={`w-full flex items-center justify-between gap-[5px] border-t-[1px] ${
            isDarkMode ? "border-[#ccc] " : "border-border-dark"
          } border-dashed px-[10px] py-[10px]`}
        >
          <CoupouList coupouList={coupous} />
        </div>
      </div>

      <div className="absolute flex flex-col gap-[5px] top-[2%] right-[2%] opacity-0 translate-x-[20px] group-hover:opacity-100 group-hover:translate-x-0  transition-all duration-300 ease-in-out z-10  ">
        <div
          className={`w-[34px] h-[34px]  flex items-center justify-center ${
            isDarkMode
              ? " bg-white text-[#4b4b4b] hover:text-[#F8AF24]"
              : "bg-[#20202074] text-white"
          } font-nunito text-[1rem]   transition-all duration-300 ease-in-out rounded-full cursor-pointer `}
        >
          <i className="mt-[2px] mr-[2px] fa-solid fa-cart-plus"></i>
        </div>
        <Link
          to={`/product/${id}`}
          className={`w-[34px] h-[34px]  flex items-center justify-center ${
            isDarkMode
              ? " bg-white text-[#4b4b4b] hover:text-[#4b7dfb]"
              : "bg-[#20202074] text-white"
          } font-nunito text-[1rem]   transition-all duration-300 ease-in-out rounded-full cursor-pointer `}
        >
          <i className="fa-solid fa-circle-info"></i>
        </Link>
        <div
          className={`w-[34px] h-[34px]  flex items-center justify-center ${
            isDarkMode
              ? " bg-white text-[#4b4b4b] hover:text-[#f04646]"
              : "bg-[#20202074] text-white"
          } font-nunito text-[1rem] transition-all duration-300 ease-in-out rounded-full cursor-pointer `}
        >
          <i className=" fa-solid fa-heart"></i>
        </div>
      </div>
    </div>
  );
};

export default Card;
