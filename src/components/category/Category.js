import { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { IoClose } from "react-icons/io5";
import { SlArrowRight } from "react-icons/sl";
//internal import
import { pages } from "@utils/data";
import useAsync from "@hooks/useAsync";
import Loading from "@components/preloader/Loading";
import CategoryServices from "@services/CategoryServices";
import CategoryCard from "@components/category/CategoryCard";
import useUtilsFunction from "@hooks/useUtilsFunction";
import MenuItem from "./MenuItem";

const Category = ({ sidebar, closeCategoryDrawer, mode }) => {
  const { showingTranslateValue } = useUtilsFunction();

  const { data, loading, error } = useAsync(() =>
    CategoryServices.getShowingCategory()
  );

  return (
    <div className={`{ group h-full ${sidebar ? "w-full" : "w-[240px]"}`}>
      <div className="bg-white h-full  transition duration-150 ease-linear transform   ">
        <menu>
          <ul
            className={`w-full    p-2 min-h-full ${mode != "mobile" ? "border" : ""
              } rounded-md group relative`}
          >
            {data?.[0]?.children?.map((item, key) => (
              <MenuItem
                mode={mode}
                item={item}
                key={key}
                closeCategoryDrawer={closeCategoryDrawer}
              />
            ))}
          </ul>
        </menu>
      </div>
    </div>
  );
};

export default Category;
