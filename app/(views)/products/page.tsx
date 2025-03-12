import React from "react";
import { products } from "@/app/tempData/Products";
import Card from "@/app/components/Card";

const page = () => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-2 md:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-3 w-full justify-center md:justify-start">
        {products.map((item) => (
          <Card item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default page;
