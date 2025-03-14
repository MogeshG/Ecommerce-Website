"use client";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import Image from "next/image";

type carouselItem = {
  image: string;
  link: string;
};

type CarouselProps = {
  autoplay: boolean;
  duration?: number;
  items: carouselItem[];
};

const Carousel: React.FC<CarouselProps> = ({ autoplay, items, duration = 3 }) => {
  const carouselContainer = useRef<HTMLDivElement>(null);
  let index = 0;

  useEffect(() => {
    if (autoplay && carouselContainer.current) {
      const startAutoPlay = setInterval(() => {
        if (carouselContainer.current) {
          const container = carouselContainer.current;
          index = (index + 1) % items.length;
          container.scrollTo({
            left: container.clientWidth * index,
            behavior: "smooth",
          });
        }
      }, duration * 1000);

      return () => clearInterval(startAutoPlay);
    }
  }, [autoplay, duration, items.length]);

  return (
    <>
      {items?.length > 0 && (
        <div
          ref={carouselContainer}
          className="bg-white w-full md:aspect-[7/2] aspect-[7/4] h-fit rounded-md flex overflow-hidden shadow-md"
        >
          {items.map((item, index) => (
            <Link key={index} href={item.link} className="w-full flex-shrink-0">
              <Image
                src={item.image}
                width={100}
                height={100}
                alt="Image"
                className="h-full w-full object-fill"
              />
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default Carousel;
