import { useContext, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useCart } from "react-use-cart";
import { IoSearchOutline } from "react-icons/io5";
import { FiShoppingCart, FiUser, FiBell } from "react-icons/fi";
import { CiUser } from "react-icons/ci";

import useTranslation from "next-translate/useTranslation";

//internal import
import { getUserSession } from "@lib/auth";
import useGetSetting from "@hooks/useGetSetting";
import { handleLogEvent } from "src/lib/analytics";
import NavbarPromo from "@layout/navbar/NavbarPromo";
import CartDrawer from "@components/drawer/CartDrawer";
import { SidebarContext } from "@context/SidebarContext";

const Navbar = () => {
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState("");
  const { toggleCartDrawer } = useContext(SidebarContext);
  const { totalItems } = useCart();
  const router = useRouter();
  const userInfo = getUserSession();
  const { storeCustomizationSetting } = useGetSetting();

  const handleSubmit = (e) => {
    e.preventDefault();

    // return;
    if (searchText) {
      router.push(`/search?query=${searchText}`, null, { scroll: false });
      setSearchText("");
      handleLogEvent("search", `searched ${searchText}`);
    } else {
      router.push(`/ `, null, { scroll: false });
      setSearchText("");
    }
  };

  return (
    <>
      <CartDrawer />

      <div className="  text-white bg-[#1E73BE] sticky top-0 z-30">
        <div className="max-w-screen-2xl mx-auto px-3 sm:px-10">
          <div className="top-bar   flex flex-col lg:flex-row   items-center justify-between py-4 mx-auto">
            <Link href="/" className="mr-3 lg:mr-12 xl:mr-12   lg:block">
              <div className="relative w-32 h-10 ">
                <Image
                  width="0"
                  height="0"
                  sizes="100vw"
                  className="w-full h-auto"
                  priority
                  src={
                    storeCustomizationSetting?.navbar?.logo ||
                    "/logo/logo-white.png"
                  }
                  alt="logo"
                />
              </div>
            </Link>

            <div className="w-full transition-all duration-200 ease-in-out lg:flex lg:max-w-[520px] xl:max-w-[750px] 2xl:max-w-[900px] md:mx-12 lg:mx-4 xl:mx-0">
              <div className="w-full flex flex-col justify-center flex-shrink-0 relative z-30">
                <div className="flex flex-col mx-auto w-full    rounded-md">
                  <form
                    onSubmit={handleSubmit}
                    className="relative pr-12   text-black md:pr-14 bg-white overflow-hidden shadow-sm rounded-md w-full"
                  >
                    <button
                      aria-label="Search"
                      type="submit"
                      className="outline-none text-xl     text-black absolute top-0 right-0 end-0 w-12 md:w-14 h-full flex items-center justify-center transition duration-200 ease-in-out hover:text-heading focus:outline-none"
                    >
                      <IoSearchOutline />
                    </button>

                    <label className="flex items-center py-0.5">
                      <input
                        onChange={(e) => setSearchText(e.target.value)}
                        value={searchText}
                        className="form-input w-full pl-5 appearance-none transition ease-in-out border text-input text-sm font-sans rounded-md min-h-10 h-10 duration-200 bg-white focus:ring-0 outline-none border-none focus:outline-none placeholder-gray-500 placeholder-opacity-75"
                        placeholder={"Search by name..."}
                      />
                    </label>
                  </form>
                </div>
              </div>
            </div>

            <div className="hidden md:hidden md:items-center  lg:flex  xl:block absolute inset-y-0 right-0 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {/* Profile dropdown */}

              <button
                className="pl-5 text-[#565E6C]text-2xl   border-r  pr-4 "
                aria-label="Login"
              >
                {userInfo?.image ? (
                  <Link
                    href="/user/dashboard"
                    className="relative top-1 w-6 h-6"
                  >
                    <Image
                      width={29}
                      height={29}
                      src={userInfo?.image}
                      alt="user"
                      className="bg-white rounded-full"
                    />
                  </Link>
                ) : userInfo?.name ? (
                  <Link
                    href="/user/dashboard"
                    className="leading-none font-bold font-serif block"
                  >
                    {userInfo?.name[0]}
                  </Link>
                ) : (
                  <Link href="/auth/login">
                    <div className=" flex  items-center space-x-2">
                      <FiUser className="w-6 h-6 hidden xl:block drop-shadow-xl" />
                      <p className=" text-sm">Sign In</p>
                    </div>
                  </Link>
                )}
              </button>

              {!userInfo && (
                <button
                  aria-label="Total"
                  className="relative px-5   xl:-top-2  top-0     text-white text-2xl "
                >
                  <Link href={"/auth/signup"} aria-label="Total">
                    <p className=" text-sm">Register</p>
                  </Link>
                </button>
              )}

              <button
                aria-label="Total"
                onClick={toggleCartDrawer}
                className="relative px-5   text-white text-2xl font-bold"
              >
                <span className="absolute z-10 top-0 right-0 inline-flex items-center justify-center p-1 h-5 w-5 text-xs font-medium leading-none text-red-100 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
                  {totalItems}
                </span>
                <FiShoppingCart className="w-6 h-6 drop-shadow-xl" />
              </button>
            </div>
          </div>
        </div>

        {/* second header */}
        <NavbarPromo />
      </div>
    </>
  );
};
export default dynamic(() => Promise.resolve(Navbar), { ssr: false });
