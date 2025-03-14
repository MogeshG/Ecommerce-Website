import React from "react";
import Carousel from "../components/Carousel";

const page = () => {
  const carouselItem = [
    {
      image: "https://wpkoi.com/demos3/narmada/wp-content/uploads/sites/11/2019/06/tshirt-2.jpg",
      link: "/",
    },
    {
      image:
        "https://img.freepik.com/free-psd/stylish-blue-plaid-shirt-men-isolated-transparent-background_191095-23044.jpg",
      link: "/products",
    },
    {
      image:
        "https://w7.pngwing.com/pngs/895/199/png-transparent-spider-man-heroes-download-with-transparent-background-free-thumbnail.png",
      link: "/",
    },
  ];
  return (
    <div className="flex flex-col">
      <Carousel items={carouselItem} duration={3} autoplay={true} />
    </div>
  );
};

export default page;

