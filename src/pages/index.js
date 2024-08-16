import { SidebarContext } from "@context/SidebarContext";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useMediaQuery } from "react-responsive";
import BabyKidss from "@components/BabyKidss";
import axios from "axios";
//internal import
import Layout from "@layout/Layout";
import Banner from "@components/banner/Banner";
import useGetSetting from "@hooks/useGetSetting";
import CardTwo from "@components/cta-card/CardTwo";
import OfferCard from "@components/offer/OfferCard";
import StickyCart from "@components/cart/StickyCart";
import Loading from "@components/preloader/Loading";
import ProductServices from "@services/ProductServices";
import ProductCard from "@components/product/ProductCard";
import MainCarousel from "@components/carousel/MainCarousel";
import FeatureCategory from "@components/category/FeatureCategory";
import AttributeServices from "@services/AttributeServices";
import CMSkeleton from "@components/preloader/CMSkeleton";
import CategoryCard from "@components/category/CategoryCard";
import Category from "@components/category/Category";
import FlashSale from "@components/FlashSale";
import NewArrival from "@components/NewArrival";
import ComputerAccs from "@components/ComputerAccss";
import MobileCategory from "@components/MobileCategory";
import Image from "next/image";
import Link from "next/link";
import { IoMdArrowForward } from "react-icons/io";

const products = Array.from({ length: 30 }, (_, index) => ({
  id: index + 1,
  imageSrc: "/banner/monitor.jpg",
  title: `ASUS ROG Strix 27” 1440P HDR Gaming Monitor (XG27AQM) ${index + 1}`,
}));

const Home = ({ popularProducts, discountProducts, attributes }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isDesktop = useMediaQuery({ minWidth: 992 });
  // Define your categories with their corresponding IDs
  const categories = [
    { id: "66976a27e8e49c4354ec7c2c", name: "Baby & Kids" },

    { id: "66976b37e8e49c4354ec7c8b", name: "Cellphones & Tabs" },

    { id: "66976b93e8e49c4354ec7cb5", name: "Women Fashion" },
  ];
  // Dynamically generate filter functions for each category
  const filterFunctions = {};
  categories.forEach((category) => {
    filterFunctions[category.name.replace(/\s+/g, "")] = (products) =>
      products.filter((product) => product.categories.includes(category.id));
  });
  // Create an Axios instance with default configuration
  const api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}`, // Replace with your API base URL
  });

  const [cellphones, setCellphones] = useState([]);
  const [computerAccs, setComputerAccs] = useState([]);
  const [womenFashion, setWomenFashion] = useState([]);
  const [beauty, setBeauty] = useState([]);
  const [kitchen, setKitchen] = useState([]);
  const [menFashion, setMenFashion] = useState([]);

  // Fetching cellphones
  const fetchCellphones = async () => {
    try {
      const response = await api.get(
        "/products/store?category=66bcbcbdf1b80e0f752b53ba&title=&slug=&count=6"
      );
      setCellphones(response.data.products);
    } catch (error) {
      console.error("Error fetching cellphones:", error);
      // Handle error appropriately
    }
  };

  // Fetching computer accessories
  const fetchComputerAccs = async () => {
    try {
      const response = await api.get(
        "/products/store?category=66bcb80ef1b80e0f752b5265&title=&slug=&count=6"
      );
      setComputerAccs(response.data.products);
    } catch (error) {
      console.error("Error fetching computer accessories:", error);
      // Handle error appropriately
    }
  };

  // Fetching women fashion
  const fetchWomenFashion = async () => {
    try {
      const response = await api.get(
        "/products/store?category=66bc9552f1b80e0f752b4c06"
      );
      setWomenFashion(response.data.products);
    } catch (error) {
      console.error("Error fetching women fashion:", error);
      // Handle error appropriately
    }
  };

  // Fetching beauty products
  const fetchBeauty = async () => {
    try {
      const response = await api.get(
        "/products/store?category=66bc9c15f1b80e0f752b4eae"
      );
      setBeauty(response.data.products);
    } catch (error) {
      console.error("Error fetching beauty products:", error);
      // Handle error appropriately
    }
  };

  // Fetching kitchen items
  const fetchKitchen = async () => {
    try {
      const response = await api.get(
        "/products/store?category=66bc9733f1b80e0f752b4d20"
      );
      setKitchen(response.data.products);
    } catch (error) {
      console.error("Error fetching kitchen items:", error);
      // Handle error appropriately
    }
  };

  // Fetching men fashion
  const fetchMenFashion = async () => {
    try {
      const response = await api.get(
        "/products/store?category=66bc919ff1b80e0f752b49d9"
      );
      setMenFashion(response.data.products);
    } catch (error) {
      console.error("Error fetching men fashion:", error);
      // Handle error appropriately
    }
  };

  // Fetching all categories when the component mounts
  useEffect(() => {
    fetchCellphones();
    fetchComputerAccs();
    fetchWomenFashion();
    fetchBeauty();
    fetchKitchen();
    fetchMenFashion();
  }, []);


  const router = useRouter();
  const { isLoading, setIsLoading } = useContext(SidebarContext);
  const { loading, error, storeCustomizationSetting } = useGetSetting();
  const [visibleProduct, setVisibleProduct] = useState(2);
  const [allProduct, setAllProduct] = useState(2);
  const [cateProducts, setCateProducts] = useState(2);

  useEffect(() => {
    if (isMobile) {
      setVisibleProduct(2);
      setAllProduct(2);
      setCateProducts(2);
      return;
    }
    if (isTablet) {
      setVisibleProduct(3);
      setAllProduct(3);
      setCateProducts(3);
      return;
    }
    if (isDesktop) {
      setVisibleProduct(12);
      setAllProduct(6);
      setCateProducts(6);

      return;
    }
  }, [isMobile, isTablet, isDesktop]);

  useEffect(() => {
    if (router.asPath === "/") {
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [router]);

  return (
    <>
      {isLoading ? (
        <Loading loading={isLoading} />
      ) : (
        <Layout>
          <div className="min-h-screen">
            {/* <StickyCart /> */}

            <div className="bg-[#F9FAFB] ">
              <div className="mx-auto py-3 max-w-screen-2xl px-3 sm:px-10">
                <div className="flex  lg:space-x-4  justify-between  ">
                  <div className="w-full  min-h-[20rem] hidden lg:flex  z-20">
                    <Category />
                  </div>

                  <div className="flex-shrink-0  z-10    w-full lg:w-[82%] ">
                    <MainCarousel />
                  </div>
                </div>

                <div className=" rounded-lg   mt-1 lg:mt-6">
                  <Banner />
                </div>

                <div className=" block lg:hidden">
                  <FeatureCategory />
                </div>

                {/* <MobileCategory /> */}
              </div>
            </div>

            {cellphones && <NewArrival data={cellphones} />}
            {computerAccs && <NewArrival data={computerAccs} />}
            {womenFashion && <NewArrival data={womenFashion} />}
            {beauty && <NewArrival data={beauty} />}
            {kitchen && <NewArrival data={kitchen} />}
            {menFashion && <NewArrival data={menFashion} />}

            {/* // all products */}

            {/* feature category's */}

            {/* {storeCustomizationSetting?.home?.featured_status && (
              <div className="bg-gray-100 lg:py-16 py-10">
                <div className="mx-auto max-w-screen-2xl px-3 sm:px-10">
                  <div className="mb-10 flex justify-center">
                    <div className="text-center w-full lg:w-2/5">
                      <h2 className="text-xl lg:text-2xl mb-2 font-serif font-semibold">
                        <CMSkeleton
                          count={1}
                          height={30}
                          // error={error}
                          loading={loading}
                          data={storeCustomizationSetting?.home?.feature_title}
                        />
                      </h2>
                      <p className="text-base font-sans text-gray-600 leading-6">
                        <CMSkeleton
                          count={4}
                          height={10}
                          error={error}
                          loading={loading}
                          data={
                            storeCustomizationSetting?.home?.feature_description
                          }
                        />
                      </p>
                    </div>
                  </div>

                  <FeatureCategory />
                </div>
              </div>
            )} */}

            {/* popular products */}
            {/* {storeCustomizationSetting?.home?.popular_products_status && (
              <div className="bg-gray-50 lg:py-16 py-10 mx-auto max-w-screen-2xl px-3 sm:px-10">
                <div className="mb-10 flex justify-center">
                  <div className="text-center w-full lg:w-2/5">
                    <h2 className="text-xl lg:text-2xl mb-2 font-serif font-semibold">
                      <CMSkeleton
                        count={1}
                        height={30}
                        // error={error}
                        loading={loading}
                        data={storeCustomizationSetting?.home?.popular_title}
                      />
                    </h2>
                    <p className="text-base font-sans text-gray-600 leading-6">
                      <CMSkeleton
                        count={5}
                        height={10}
                        error={error}
                        loading={loading}
                        data={
                          storeCustomizationSetting?.home?.popular_description
                        }
                      />
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <div className="w-full">
                    {loading ? (
                      <CMSkeleton
                        count={20}
                        height={20}
                        error={error}
                        loading={loading}
                      />
                    ) : (
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 gap-2 md:gap-3 lg:gap-3">
                        {popularProducts
                          ?.slice(
                            0,
                            storeCustomizationSetting?.home
                              ?.popular_product_limit
                          )
                          .map((product) => (
                            <ProductCard
                              key={product._id}
                              product={product}
                              attributes={attributes}
                            />
                          ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )} */}

            {/* promotional banner card */}
            {/* {storeCustomizationSetting?.home?.delivery_status && (
              <div className="block mx-auto max-w-screen-2xl">
                <div className="mx-auto max-w-screen-2xl px-4 sm:px-10">
                  <div className="lg:p-16 p-6 bg-[#1E73BE] shadow-sm border rounded-lg">
                    <CardTwo />
                  </div>
                </div>
              </div>
            )} */}

            {/* discounted products */}
            {/* {storeCustomizationSetting?.home?.discount_product_status &&
              discountProducts?.length > 0 && (
                <div
                  id="discount"
                  className="bg-gray-50 lg:py-16 py-10 mx-auto max-w-screen-2xl px-3 sm:px-10"
                >
                  <div className="mb-10 flex justify-center">
                    <div className="text-center w-full lg:w-2/5">
                      <h2 className="text-xl lg:text-2xl mb-2 font-serif font-semibold">
                        <CMSkeleton
                          count={1}
                          height={30}
                          // error={error}
                          loading={loading}
                          data={
                            storeCustomizationSetting?.home
                              ?.latest_discount_title
                          }
                        />
                      </h2>
                      <p className="text-base font-sans text-gray-600 leading-6">
                        <CMSkeleton
                          count={5}
                          height={20}
                          // error={error}
                          loading={loading}
                          data={
                            storeCustomizationSetting?.home
                              ?.latest_discount_description
                          }
                        />
                      </p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="w-full">
                      {loading ? (
                        <CMSkeleton
                          count={20}
                          height={20}
                          error={error}
                          loading={loading}
                        />
                      ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 gap-2 md:gap-3 lg:gap-3">
                          {discountProducts
                            ?.slice(
                              0,
                              storeCustomizationSetting?.home
                                ?.latest_discount_product_limit
                            )
                            .map((product) => (
                              <ProductCard
                                key={product._id}
                                product={product}
                                attributes={attributes}
                              />
                            ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )} */}
          </div>
        </Layout>
      )}
    </>
  );
};

export const getServerSideProps = async (context) => {
  const { cookies } = context.req;
  const { query, _id } = context.query;

  const [data, attributes] = await Promise.all([
    ProductServices.getShowingStoreProducts({
      category: _id ? _id : "",
      title: query ? query : "",
    }),

    AttributeServices.getShowingAttributes(),
  ]);

  return {
    props: {
      popularProducts: data.popularProducts,
      discountProducts: data.discountedProducts,
      cookies: cookies,
      attributes,
    },
  };
};

export default Home;
