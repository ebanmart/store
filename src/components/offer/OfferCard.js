import React, { useState } from "react";
//internal import
import Coupon from "@components/coupon/Coupon";
import useGetSetting from "@hooks/useGetSetting";
import useUtilsFunction from "@hooks/useUtilsFunction";
import useAsync from "@hooks/useAsync";
import CategoryServices from "@services/CategoryServices";
import { SlArrowRight } from "react-icons/sl";
import Image from "next/image";

// Define the menu structure
const menuItems = [
  {
    text: "Menu 1",
    flag: "/flags/us.svg",
    children: [
      {
        text: "Submenu 1-1",
        flag: "/flags/us.svg",
        children: [
          {
            text: "Submenu 1-1-1",
            flag: "/flags/us.svg",
          },
        ],
      },
    ],
  },
  {
    text: "Menu 2",
    flag: "/flags/us.svg",
    children: [
      {
        text: "Submenu 2-1",
        flag: "/flags/us.svg",
        children: [
          {
            text: "Submenu 2-1-1",
            flag: "/flags/us.svg",
          },
        ],
      },
    ],
  },
  {
    text: "Menu 3",
    flag: "/flags/us.svg",
    children: [
      {
        text: "Submenu 3-1",
        flag: "/flags/us.svg",
        children: [
          {
            text: "Submenu 3-1-1",
            flag: "/flags/us.svg",
          },
        ],
      },
    ],
  },
];

const MenuItem = ({ item }) => (
  <li className="flex justify-between items-center cursor-pointer py-1 px-2 rounded-md text-[#6b7280] text-sm hover:bg-[#f0fdf4] text-center  ">
    <div className="flex space-x-4">
      <Image src={item.flag} height={20} width={20} className="rounded-full" />
      <span className="block">{item.text}</span>
    </div>
    <SlArrowRight className="text-[#1E73BE]" />

    {item.children && (
      <ul className="hidden group-hover:block absolute w-full group2 -right-[100%] top-0 px-3 py-2 border rounded-md bg-white z-10">
        {item.children.map((child, index) => (
          <li className="flex justify-between items-center cursor-pointer py-1 px-2 rounded-md text-[#6b7280] text-sm hover:bg-[#f0fdf4] text-center  ">
            <div className="flex space-x-4">
              <Image
                src={item.flag}
                height={20}
                width={20}
                className="rounded-full"
              />
              <span className="block">{item.text}</span>
            </div>
            <SlArrowRight className="text-[#1E73BE]" />
            <ul className="hidden group2__child absolute w-full -right-[100%] top-0 px-3 py-2 border rounded-md bg-white z-10">
              {item.children.map((child, index) => (
                <li className="flex justify-between items-center cursor-pointer py-1 px-2 rounded-md text-[#6b7280] text-sm hover:bg-[#f0fdf4] text-center  ">
                  <div className="flex space-x-4">
                    <Image
                      src={item.flag}
                      height={20}
                      width={20}
                      className="rounded-full"
                    />
                    <span className="block">{item.text}</span>
                  </div>
                  <SlArrowRight className="text-[#1E73BE]" />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    )}
  </li>
);

const OfferCard = () => {
  return (
    <div className="w-[240px] group">
      <div className="bg-white h-full  transition duration-150 ease-linear transform   ">
        <menu>
          <ul className="w-full p-2 min-h-[20rem] border rounded-md group relative">
            {menuItems.map((item, index) => (
              <MenuItem key={index} item={item} />
            ))}
          </ul>
        </menu>
      </div>
    </div>
  );
};

export default OfferCard;
