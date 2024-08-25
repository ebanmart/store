import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IoMdArrowForward } from "react-icons/io";
import ProductCard from "./product/ProductCard";
import { useRouter } from "next/router";

// data/products.js

function NewArrival({ data }) {
  const router = useRouter();

  const showCategory = (id, categoryName) => {
    if (id) {
      const name = categoryName.toLowerCase().replace(/[^A-Z0-9]+/gi, "-");
      router.push(`/search?category=${name}&_id=${id}`);
      return;
    }
  };

  return (
    <>
      <div className="max-w-[1460px] overflow-hidden m-auto bg-white rounded-md  mb-4">
        {/* Section's Header area started */}

        <div className="flex justify-between items-center  mx-5 pt-5  ">
          <h2 className="text-base text-black font-bold">
            {data && data[0]?.category.name?.en}
          </h2>
          <a
            onClick={() =>
              showCategory(data[0]?.category?._id, data[0]?.category.name?.en)
            }
            className="text-sm cursor-pointer text-black font-semibold flex items-center gap-2"
          >
            See more
            <IoMdArrowForward />
          </a>
        </div>

        {/* Card started from here */}

        <div
          className="  grid     py-5    
        
          md:px-5 
          
     gap-x-5
   

  items-center 
    justify-items-center
        
        gap-y-5  lg:gap-y-[3rem]  lg:gap-x-[2rem]  grid-cols-2  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
        >
          {data && data?.map((data) => <ProductCard product={data} />)}
        </div>
      </div>
    </>
  );
}

export default NewArrival;
