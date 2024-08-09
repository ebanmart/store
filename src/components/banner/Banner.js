import Link from "next/link";
import React from "react";
import ImgLink from "@components/ImgLink";

//internal import
import useGetSetting from "@hooks/useGetSetting";
import useUtilsFunction from "@hooks/useUtilsFunction";

const Banner = () => {
  const { storeCustomizationSetting } = useGetSetting();
  const { showingTranslateValue } = useUtilsFunction();

  return (
    <>
      <ImgLink />
    </>
  );
};

export default Banner;
