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

  const [gadgetItem, setGadgetItem] = useState([]);
  const [kitchenDining, setKitchenDining] = useState([]);
  const [healthHair, setHealthHair] = useState([]);
  const [accessories, setAccessories] = useState([]);
  const [babyKids, setBabyKids] = useState([]);
  const [womenFashion, setWomenFashion] = useState([]);
  const [menFashion, setMenFashion] = useState([]);

  // Fetching Gadget item
  const fetchGadgetItem = async () => {
    try {
      const response = await api.get(
        "/products/store?category=6904c832bd8ad70004b12c90&title=&slug=&count=6"
      );
      setGadgetItem(response.data.products);
    } catch (error) {
      console.error("Error fetching gadget items:", error);
    }
  };

  // Fetching Kitchen & Dining
  const fetchKitchenDining = async () => {
    try {
      const response = await api.get(
        "/products/store?category=6904c2c4ff7ef3000474cdef&title=&slug=&count=6"
      );
      setKitchenDining(response.data.products);
    } catch (error) {
      console.error("Error fetching kitchen & dining:", error);
    }
  };

  // Fetching Health & Hair
  const fetchHealthHair = async () => {
    try {
      const response = await api.get(
        "/products/store?category=6904c2a37fb26c0004842589&title=&slug=&count=6"
      );
      setHealthHair(response.data.products);
    } catch (error) {
      console.error("Error fetching health & hair:", error);
    }
  };

  // Fetching Accessories
  const fetchAccessories = async () => {
    try {
      const response = await api.get(
        "/products/store?category=6904c23cff7ef3000474cde5&title=&slug=&count=6"
      );
      setAccessories(response.data.products);
    } catch (error) {
      console.error("Error fetching accessories:", error);
    }
  };

  // Fetching Baby & Kids
  const fetchBabyKids = async () => {
    try {
      const response = await api.get(
        "/products/store?category=6904c1e9a1d8080004bda905&title=&slug=&count=6"
      );
      setBabyKids(response.data.products);
    } catch (error) {
      console.error("Error fetching baby & kids:", error);
    }
  };

  // Fetching Women Fashion
  const fetchWomenFashion = async () => {
    try {
      const response = await api.get(
        "/products/store?category=6904c25912c51f00045913f4&title=&slug=&count=6"
      );
      setWomenFashion(response.data.products);
    } catch (error) {
      console.error("Error fetching women fashion:", error);
    }
  };

  // Fetching Men Fashion
  const fetchMenFashion = async () => {
    try {
      const response = await api.get(
        "/products/store?category=6904c283a1d8080004bda90f&title=&slug=&count=6"
      );
      setMenFashion(response.data.products);
    } catch (error) {
      console.error("Error fetching men fashion:", error);
    }
  };

  // Fetching all categories when the component mounts
  useEffect(() => {
    fetchGadgetItem();
    fetchKitchenDining();
    fetchHealthHair();
    fetchAccessories();
    fetchBabyKids();
    fetchWomenFashion();
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

            {gadgetItem.length > 0 && <NewArrival data={gadgetItem} />}
            {kitchenDining.length > 0 && <NewArrival data={kitchenDining} />}
            {healthHair.length > 0 && <NewArrival data={healthHair} />}
            {accessories.length > 0 && <NewArrival data={accessories} />}
            {babyKids.length > 0 && <NewArrival data={babyKids} />}
            {womenFashion.length > 0 && <NewArrival data={womenFashion} />}
            {menFashion.length > 0 && <NewArrival data={menFashion} />}

            {/* feature category's */}
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
