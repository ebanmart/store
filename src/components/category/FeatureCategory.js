import Image from "next/image";
import { useRouter } from "next/router";
import { useContext } from "react";
import { IoChevronForwardSharp } from "react-icons/io5";

//internal import

import useAsync from "@hooks/useAsync";
import CategoryServices from "@services/CategoryServices";
import CMSkeleton from "@components/preloader/CMSkeleton";
import { SidebarContext } from "@context/SidebarContext";
import useUtilsFunction from "@hooks/useUtilsFunction";

const FeatureCategory = () => {

  const router = useRouter();
  const { isLoading, setIsLoading } = useContext(SidebarContext);
  const { showingTranslateValue } = useUtilsFunction();

  const { data, error, loading } = useAsync(
    CategoryServices.getShowingCategory
  );

  // console.log('category',data)

  const handleCategoryClick = (id, categoryName) => {
    const category_name = categoryName
      .toLowerCase()
      .replace(/[^A-Z0-9]+/gi, "-");
    const url = `/search?category=${category_name}&_id=${id}`;
    router.push(url);
    setIsLoading(!isLoading);
  };

  return (
    <>
      {loading ? (
        <CMSkeleton count={10} height={20} error={error} loading={loading} />
      ) : (
        <ul className="grid grid-cols-4 gap-y-5 lg:grid-cols-6  xl:grid-cols-6">
          {data[0]?.children?.map((category, i) => (
            <li className="group" key={i + 1}>
              <div className="flex w-full justify-center h-full   cursor-pointer transition duration-200 ease-linear transform ">
                <div className="flex  flex-col items-center ">
                  <div>
                    {category.icon ? (
                      <Image
                        src={category?.icon}
                        alt="category"
                        width={47}
                        height={47}
                        className=" rounded-lg"
                      />
                    ) : (
                      <Image
                        src="https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png"
                        alt="category"

                        width={47}
                        height={47}
                      />
                    )}
                  </div>

                  <div className="">
                    <h3
                      onClick={() =>
                        handleCategoryClick(
                          category._id,
                          showingTranslateValue(category?.name)
                        )
                      }
                      className=" text-xs text-gray-600 pt-2 font-serif font-medium leading-tight line-clamp-1  group-hover"
                    >
                      {showingTranslateValue(category?.name)}
                    </h3>
                    {/* <ul className="pt-1 mt-1">
                      {category?.children?.slice(0, 3).map((child) => (
                        <li key={child._id} className="pt-1">
                          <a
                            onClick={() =>
                              handleCategoryClick(
                                child._id,
                                showingTranslateValue(child?.name)
                              )
                            }
                            className="flex items-center font-serif text-xs text-gray-400 cursor-pointer"
                          >
                            <span className="text-xs text-gray-400 ">
                              <IoChevronForwardSharp />
                            </span>
                            {showingTranslateValue(child?.name)}
                          </a>
                        </li>
                      ))}
                    </ul> */}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default FeatureCategory;
