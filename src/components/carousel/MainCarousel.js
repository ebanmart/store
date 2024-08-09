import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

//internal import

import useGetSetting from "@hooks/useGetSetting";
import useUtilsFunction from "@hooks/useUtilsFunction";

const MainCarousel = () => {
  const { storeCustomizationSetting } = useGetSetting();
  const { showingTranslateValue, showingUrl, showingImage } =
    useUtilsFunction();

  const sliderData = [
    {
      id: 1,

      title: showingTranslateValue(
        storeCustomizationSetting?.slider?.first_title
      ),
      info: showingTranslateValue(
        storeCustomizationSetting?.slider?.first_description
      ),
      buttonName: showingTranslateValue(
        storeCustomizationSetting?.slider?.first_button
      ),
      url: showingUrl(storeCustomizationSetting?.slider?.first_link),
      image:
        showingImage(storeCustomizationSetting?.slider?.first_img) ||
        "/slider/slider-1.jpg",
    },
    {
      id: 2,
      title: showingTranslateValue(
        storeCustomizationSetting?.slider?.second_title
      ),
      info: showingTranslateValue(
        storeCustomizationSetting?.slider?.second_description
      ),
      buttonName: showingTranslateValue(
        storeCustomizationSetting?.slider?.second_button
      ),
      url: showingUrl(storeCustomizationSetting?.slider?.second_link),
      image:
        showingImage(storeCustomizationSetting?.slider?.second_img) ||
        "/slider/slider-2.jpg",
    },
    {
      id: 3,
      title: showingTranslateValue(
        storeCustomizationSetting?.slider?.third_title
      ),
      info: showingTranslateValue(
        storeCustomizationSetting?.slider?.third_description
      ),
      buttonName: showingTranslateValue(
        storeCustomizationSetting?.slider?.third_button
      ),
      url: showingUrl(storeCustomizationSetting?.slider?.third_link),
      image:
        showingImage(storeCustomizationSetting?.slider?.third_img) ||
        "/slider/slider-3.jpg",
    },
    {
      id: 4,
      title: showingTranslateValue(
        storeCustomizationSetting?.slider?.four_title
      ),
      info: showingTranslateValue(
        storeCustomizationSetting?.slider?.four_description
      ),
      buttonName: showingTranslateValue(
        storeCustomizationSetting?.slider?.four_button
      ),
      url: showingUrl(storeCustomizationSetting?.slider?.four_link),
      image:
        showingImage(storeCustomizationSetting?.slider?.four_img) ||
        "/slider/slider-1.jpg",
    },
    {
      id: 5,
      title: showingTranslateValue(
        storeCustomizationSetting?.slider?.five_title
      ),
      info: showingTranslateValue(
        storeCustomizationSetting?.slider?.five_description
      ),
      buttonName: showingTranslateValue(
        storeCustomizationSetting?.slider?.five_button
      ),
      url: showingUrl(storeCustomizationSetting?.slider?.five_link),
      image:
        showingImage(storeCustomizationSetting?.slider?.five_img) ||
        "/slider/slider-2.jpg",
    },
  ];

  return (
    <>
      <div
        className="h-full relative w-full rounded-lg overflow-hidden"
        
      >
        <div className="text-sm max-h-[180px] min-w-full text-gray-600 hover:text-emerald-dark">
          <Image
            width={1500}
            height={200}
            src={"https://bponi.sgp1.cdn.digitaloceanspaces.com/bponi/file/9afe66c8-c3a9-4813-aad8-150275031c6f.jpg"}
            alt={sliderData[0]?.title}
            className="object-cover"
            priority
          />
        </div>
        {/* <div className="absolute top-0 left-0 z-10 p-r-16 flex-col flex w-full h-full place-items-start justify-center">
          <div className="pl-4 pr-12 sm:pl-10 sm:pr-16 w-10/12 lg:w-8/12 xl:w-7/12">
            <h1 className="mb-2 font-serif text-xl sm:text-lg md:text-2xl line-clamp-1 md:line-clamp-none  lg:line-clamp-none  lg:text-3xl font-bold text-gray-800">
              {sliderData[0]?.title}
            </h1>
            <p className="text-base leading-6 text-gray-600 font-sans line-clamp-1  md:line-clamp-none lg:line-clamp-none">
              {sliderData[0]?.info}
            </p>
            <Link
              href={sliderData[0]?.url}
              className="hidden sm:inline-block lg:inline-block text-sm leading-6 font-serif font-medium mt-6 px-6 py-2 bg-[#1E73BE] text-center rounded-md text-white "
            >
              {sliderData[0]?.buttonName}
            </Link>
          </div>
        </div> */}
      </div>

      {/* <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={
          (storeCustomizationSetting?.slider?.bottom_dots ||
            storeCustomizationSetting?.slider?.both_slider) && {
            clickable: true,
          }
        }
        navigation={
          (storeCustomizationSetting?.slider?.left_right_arrow ||
            storeCustomizationSetting?.slider?.both_slider) && {
            clickable: true,
          }
        }
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {sliderData?.map((item, i) => (
          <SwiperSlide
            className="h-full relative w-full rounded-lg overflow-hidden"
            key={i + 1}
          >
            <div className="text-sm text-gray-600 hover:text-emerald-dark">
              <Image
                width={950}
                height={400}
                src={item.image}
                alt={item.title}
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute top-0 left-0 z-10 p-r-16 flex-col flex w-full h-full place-items-start justify-center">
              <div className="pl-4 pr-12 sm:pl-10 sm:pr-16 w-10/12 lg:w-8/12 xl:w-7/12">
                <h1 className="mb-2 font-serif text-xl sm:text-lg md:text-2xl line-clamp-1 md:line-clamp-none  lg:line-clamp-none  lg:text-3xl font-bold text-gray-800">
                  {item.title}
                </h1>
                <p className="text-base leading-6 text-gray-600 font-sans line-clamp-1  md:line-clamp-none lg:line-clamp-none">
                  {item.info}
                </p>
                <Link
                  href={item.url}
                  className="hidden sm:inline-block lg:inline-block text-sm leading-6 font-serif font-medium mt-6 px-6 py-2 bg-[#1E73BE] text-center rounded-md text-white "
                >
                  {item.buttonName}
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper> */}
    </>
  );
};

export default MainCarousel;
