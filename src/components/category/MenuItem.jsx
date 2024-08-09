import { useState } from "react";
import Image from "next/image";
import { SlArrowRight } from "react-icons/sl";
import { useRouter } from "next/router";

const MenuItem = ({ item, closeCategoryDrawer, mode }) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleCategory = () => {
    if (mode === "mobile") {
      closeCategoryDrawer();
    } else {
      router.push(`/search?category=${item?.name?.en}&_id=${item?._id}`);
    }
  };

  return (
    <li
      onClick={() => {
        handleCategory();
      }}
      className="relative flex justify-between items-center cursor-pointer py-1 px-2 my-2 rounded-md text-[#6b7280] text-sm hover:bg-[#f0fdf4] text-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex space-x-4 items-center">
        <Image
          src={item?.icon}
          height={20}
          width={20}
          className="rounded-full"
        />
        <span className="block">{item?.name?.en}</span>
      </div>
      <SlArrowRight className="text-[#1E73BE]" />

      {/* Render child menu if hovered and has children */}
      {item?.children && isHovered && (
        <ul className="absolute left-full top-0 py-2    w-full bg-white border rounded-md shadow-lg">
          {item.children.map((child, index) => (
            <MenuItemNested key={index} child={child} />
          ))}
        </ul>
      )}
      {/* End Child Menu */}
    </li>
  );
};

const MenuItemNested = ({ child }) => {
  const router = useRouter();
  const [isHoveredN, setIsHoveredN] = useState(false);

  const handleMouseEnterN = () => {
    setIsHoveredN(true);
  };

  const handleMouseLeaveN = () => {
    setIsHoveredN(false);
  };

  return (
    <li
      onClick={() =>
        router.push(`/search?category=${child?.name?.en}&_id=${child?._id}`)
      }
      className="relative flex justify-between w-full items-center cursor-pointer px-4 py-2 text-[#6b7280] text-sm hover:bg-[#f0fdf4] text-center"
      onMouseEnter={handleMouseEnterN}
      onMouseLeave={handleMouseLeaveN}
    >
      <div className="flex space-x-4 items-center">
        <Image
          src={child.icon}
          height={20}
          width={20}
          className="rounded-full"
        />
        <span className="block">{child.name.en}</span>
      </div>
      <SlArrowRight className="text-[#1E73BE]" />

      {/* Nested Child Menu */}
      {child.children && isHoveredN && (
        <ul className="absolute left-full w-full top-0 py-2 bg-white border rounded-md shadow-lg">
          {child.children.map((nestedChild, nestedIndex) => (
            <li
              onClick={() =>
                router.push(
                  `/search?category=${nestedChild?.name?.en}&_id=${nestedChild?._id}`
                )
              }
              key={nestedIndex}
              className="flex justify-between items-center cursor-pointer px-4 py-2 text-[#6b7280] text-sm hover:bg-[#f0fdf4] text-center"
            >
              <div className="flex space-x-4 items-center">
                <Image
                  src={nestedChild.icon}
                  height={20}
                  width={20}
                  className="rounded-full"
                />
                <span className="block">{nestedChild.name.en}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
      {/* End Nested Child Menu */}
    </li>
  );
};

export default MenuItem;
