import React, { useContext } from "react";
import dynamic from "next/dynamic";
import Drawer from "rc-drawer";
import Category from "@components/category/Category";
import { SidebarContext } from "@context/SidebarContext";
import Image from "next/image";
import { IoClose } from "react-icons/io5";

const CategoryDrawer = () => {
  const { categoryDrawerOpen, closeCategoryDrawer } =
    useContext(SidebarContext);

  return (
    <Drawer
      open={categoryDrawerOpen}
      onClose={closeCategoryDrawer}
      parent={null}
      level={null}
      width={320}
      placement={"left"}
    >
      {/* <div>
        <Image
          width="0"
          height="0"
          sizes="100vw"
          className="w-full h-auto"
          priority
          src={"/logo/logo-white.png"}
          alt="logo"
        />
      </div> */}

      <div className="header  h-16 flex  px-5   justify-between items-center   bg-[#1E73BE]">
        <Image height={100} width={100} src={"/logo/logo-white.png"} />
        <div
          onClick={() => closeCategoryDrawer()}
          className="  flex justify-center cursor-pointer items-center    h-8 w-8 rounded-full   bg-white"
        >
          <IoClose className=" text-red-600 text-2xl " />
        </div>
      </div>

      <Category
        mode={"mobile"}
        sidebar={true}
        closeCategoryDrawer={closeCategoryDrawer}
      />
    </Drawer>
  );
};
export default dynamic(() => Promise.resolve(CategoryDrawer), { ssr: false });
