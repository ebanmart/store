import { Fragment, useState, useEffect, useContext } from "react";
import Link from "next/link";
import { Transition, Popover } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { MdHome } from "react-icons/md";

import SettingServices from "@services/SettingServices";
import Cookies from "js-cookie";
import {
  FiGift,
  FiAlertCircle,
  FiHelpCircle,
  FiShoppingBag,
  FiFileText,
  FiUsers,
  FiPocket,
  FiPhoneIncoming,
} from "react-icons/fi";

//internal import
import { notifyError } from "@utils/toast";
import useGetSetting from "@hooks/useGetSetting";
import Category from "@components/category/Category";
import { SidebarContext } from "@context/SidebarContext";
import useUtilsFunction from "@hooks/useUtilsFunction";

const NavbarPromo = () => {
  const [languages, setLanguages] = useState([]);
  // const [currentLang, setCurrentLang] = useState({});
  const { lang, storeCustomizationSetting } = useGetSetting();
  const { isLoading, setIsLoading } = useContext(SidebarContext);

  const { showingTranslateValue } = useUtilsFunction();
  const currentLanguage = Cookies.get("_curr_lang") || null;

  // let currentLang = currentLanguage ? JSON?.parse(currentLanguage) : {};

  const handleLanguage = (lang) => {
    // setCurrentLang(lang);
    Cookies.set("_lang", lang?.iso_code, {
      sameSite: "None",
      secure: true,
    });
    Cookies.set("_curr_lang", JSON.stringify(lang), {
      sameSite: "None",
      secure: true,
    });
  };

  useEffect(() => {
    (async () => {
      {
        try {
          const res = await SettingServices.getShowingLanguage();
          setLanguages(res);
          const currentLanguage = Cookies.get("_curr_lang");
          if (!currentLanguage) {
            const result = res?.find((language) => language?.iso_code === lang);
            Cookies.set("_curr_lang", JSON.stringify(result || res[0]), {
              sameSite: "None",
              secure: true,
            });
            // console.log("result", result);
            // // setCurrentLang(currentLanguage);
          }
        } catch (err) {
          notifyError(err);
          console.log("error on getting lang", err);
        }
      }
    })();
  }, []);

  return (
    <>
      <div className="hidden lg:block xl:block  text-black  bg-[#083862] border-b">
        <div className="max-w-screen-2xl mx-auto px-0 sm:px-10 h-12 flex justify-between items-center">
          <div className="inline-flex">
            <Popover className="relative">
              <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center md:justify-start md:space-x-10">
                  <Popover.Group
                    as="nav"
                    className="md:flex space-x-4 items-center"
                  >
                    <Link
                      href="/"
                      className="relative inline-flex items-center      w-full  font-serif   p-2 rounded text-md  font-semibold    text-white "
                    >
                      <div  className=" cursor-pointer flex  items-center justify-center space-x-1 ">
                        <span>
                          <MdHome className=" text-xl text-white font-bold" />
                        </span>

                        <span>Home</span>
                      </div>
                    </Link>

                    <Link
                      href="/offer"
                      onClick={() => setIsLoading(!isLoading)}
                      className="relative inline-flex items-center  bg-red-100 font-serif ml-4 py-0 px-2 rounded text-sm font-medium  text-red-600  "
                    >
                      {<span>FlashSale</span>}
                      <div className="absolute flex w-2 h-2 left-auto -right-1 -top-1">
                        <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                      </div>
                    </Link>
                  </Popover.Group>
                </div>
              </div>
            </Popover>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavbarPromo;
