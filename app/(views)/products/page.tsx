import React from "react";
import { productType } from "@/app/types/Products";
import Card from "@/app/components/Card";

const page = () => {
  const products: productType[] = [
    {
      id: 1,
      name: "Shirt",
      image: "https://wpkoi.com/demos3/narmada/wp-content/uploads/sites/11/2019/06/tshirt-2.jpg",
      price: 999.99,
      description: "This is a shirt",
      discountPercent: 57,
    },
    {
      id: 2,
      name: "shirt",
      image:
        "https://img.freepik.com/free-psd/stylish-blue-plaid-shirt-men-isolated-transparent-background_191095-23044.jpg",
      price: 1000,
      description:
        "akjvbkjans aj asva ascas asvasvaascascasc asv  asa asa   as ks njan jasjasoaias",
      // discountPercent: 20,
    },
    // {
    //   id: 3,
    //   name: "shirt",
    //   image:
    //     "https://w7.pngwing.com/pngs/895/199/png-transparent-spider-man-heroes-download-with-transparent-background-free-thumbnail.png",
    //   price: 1000,
    //   description: "ajn askjva va sva vasoiasv avsava avsasvas asv",
    //   discountPercent: 20,
    // },
    // {
    //   id: 4,
    //   name: "shirt",
    //   image: "",
    //   price: 1000,
    //   discountPercent: 20,
    // },
    // {
    //   id: 5,
    //   name: "shirt",
    //   image: "",
    //   price: 1000,
    //   discountPercent: 20,
    // },
    // {
    //   id: 6,
    //   name: "shirt",
    //   image: "",
    //   price: 1000,
    //   discountPercent: 20,
    // },
  ];

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 md:grid-cols-[repeat(auto-fit,minmax(150px,200px))] gap-3 w-full justify-center md:justify-start">
        {products.map((item) => (
          <Card item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default page;
