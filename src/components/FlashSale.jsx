import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IoMdArrowForward } from "react-icons/io";

function FlashSale({ data }) {
  return (
    <>
      <div className="max-w-[1460px]  m-auto bg-gradient-flash rounded-md p-3 mb-4">
        {/* Section's Header area started */}
        <div className="flex justify-between items-center  pb-4">
          <h2 className="text-base text-white font-bold">Flash Sale</h2>

          <Link
            href={"/"}
            className="text-sm text-white font-semibold flex items-center gap-2"
          >
            See more
            <IoMdArrowForward />
          </Link>
        </div>

        {/* Card started from here */}

        <div className="   grid  grid-cols-2 gap-5  justify-items-center  md:grid-cols-3 lg:grid-cols-6">
          <div className="max-w-52 rounded-md p-2 bg-[#F1F5F9]">
            <Image
              width={1000}
              height={1000}
              src={"/banner/monitor.jpg"}
              alt="Product Image"
              className="rounded-md"
            />
            <h6 className="mt-2">
              ASUS ROG Strix 27â€ 1440P HDR Gaming Monitor (XG27AQM)
            </h6>
          </div>
          <div className="max-w-52 rounded-md p-2 bg-[#F1F5F9]">
            <Image
              width={1000}
              height={1000}
              src={data?.Image}
              alt="Product Image"
              className="rounded-md"
            />
            <h6 className="mt-2">
              ASUS ROG Strix 27â€ 1440P HDR Gaming Monitor (XG27AQM)
            </h6>
          </div>
          <div className="max-w-52 rounded-md p-2 bg-[#F1F5F9]">
            <Image
              width={1000}
              height={1000}
              src={"/banner/monitor.jpg"}
              alt="Product Image"
              className="rounded-md"
            />
            <h6 className="mt-2">
              ASUS ROG Strix 27â€ 1440P HDR Gaming Monitor (XG27AQM)
            </h6>
          </div>
          <div className="max-w-52 rounded-md p-2 bg-[#F1F5F9]">
            <Image
              width={1000}
              height={1000}
              src={"/banner/monitor.jpg"}
              alt="Product Image"
              className="rounded-md"
            />
            <h6 className="mt-2">
              ASUS ROG Strix 27â€ 1440P HDR Gaming Monitor (XG27AQM)
            </h6>
          </div>
          <div className="max-w-52 rounded-md p-2 bg-[#F1F5F9]">
            <Image
              width={1000}
              height={1000}
              src={"/banner/monitor.jpg"}
              alt="Product Image"
              className="rounded-md"
            />
            <h6 className="mt-2">
              ASUS ROG Strix 27â€ 1440P HDR Gaming Monitor (XG27AQM)
            </h6>
          </div>
          <div className="max-w-52 rounded-md p-2 bg-[#F1F5F9]">
            <Image
              width={1000}
              height={1000}
              src={"/banner/monitor.jpg"}
              alt="Product Image"
              className="rounded-md"
            />
            <h6 className="mt-2">
              ASUS ROG Strix 27â€ 1440P HDR Gaming Monitor (XG27AQM)
            </h6>
          </div>
        </div>
      </div>
    </>
  );
}

export default FlashSale;
