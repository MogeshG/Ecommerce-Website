"use client";

import LoaderIcon from "@/public/loader.gif";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useLoader } from "../context/LoaderContext";
import { usePathname } from "next/navigation";

const Loader = () => {
  const { loaderVisible, toggleLoader } = useLoader();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading || loaderVisible) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }
  }, [isLoading, loaderVisible]);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    toggleLoader(true);
    const timer = setTimeout(() => toggleLoader(false), 1000);
    return () => clearTimeout(timer);
  }, [pathname]);

  if (isLoading || loaderVisible) {
    return (
      <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center">
        <Image
          src={LoaderIcon}
          width={130}
          height={130}
          alt="Loader Icon"
          className="opacity-100"
        />
      </div>
    );
  }

  return null;
};

export default Loader;
