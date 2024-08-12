import React from "react";
import Image from "next/image";
import Link from "next/link";

function ImgLink() {
  return (
    <>
      <div>
        {/* <div className="   flex items-center justify-center  py-[0.3rem] rounded-md bg-[#1E73BE]">
          <marquee className=" text-white font-semibold">
            "🎉 Enjoy up to 50% off on our Summer Collection! Limited time only!
            🎉 | 🚚 Get free shipping on all orders over $50! Shop now and save!
            🚚
          </marquee>
        </div> */}

        <Link href={"/offer"}>
          <div className=" cursor-pointer   lg:hidden md:mt-5 justify-between gap-4 max-w-[1505px] m-auto pb-4">
            <span className="rounded-[4px] overflow-hidden">
              <Image
                src={"/banner/25percent.jpg"}
                alt="25 Percent Offer"
                width={800}
                height={100}
                className="    h-16 rounded-md"
              />
            </span>
          </div>
        </Link>

        <div className=" hidden lg:block">
          <div className="  grid grid-cols-2 md:grid-cols-4 md:mt-5 justify-between gap-4 max-w-[1505px] m-auto pb-4">
            <span className="rounded-[4px] overflow-hidden">
              <Image
                src={"/banner/free-delivery.jpg"}
                alt="Free Delivery"
                width={10000}
                height={1000}
              />
            </span>

            <span className="rounded-[4px] overflow-hidden">
              <Image
                src={"/banner/25percent.jpg"}
                alt="25 Percent Offer"
                width={10000}
                height={1000}
              />
            </span>

            <span className="rounded-[4px] overflow-hidden">
              <Image
                src={"/banner/pro-quality.jpg"}
                alt="Premium Quality"
                width={10000}
                height={1000}
              />
            </span>

            <span className="rounded-[4px] overflow-hidden">
              <Image
                src={"/banner/5percent.jpg"}
                alt="Order from the App"
                width={10000}
                height={1000}
              />
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default ImgLink;
