"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Heart, Download } from "lucide-react";
import { useAppContext } from "@/contexts/AppContext";
import { cn } from "@/lib/utils";

export function ImageContainer() {
  const { imageData, isLoading, getNewImage } = useAppContext();

  // const fetchNewImage = async () => {
  //   setIsLoading(true);
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 3000);
  // };

  console.log(isLoading);
  console.log(imageData);

  return (
    <div className="relative w-full max-w-2xl">
      {!!isLoading && (
        <div className="mx-4 lg:mx-8 min-h-[60vh] bg-gray-200 animate-pulse flex items-center justify-center text-gray-400 dark:bg-gray-800 dark:text-gray-600">
          Loading...
        </div>
      )}

      {!isLoading && imageData && (
        <>
          <Image
            src={imageData.urls.regular}
            alt={imageData.alt_description || "Inspirational artwork"}
            width={(imageData.width / imageData.height) * 400}
            height={400}
            className="w-full h-full object-cover border-4 border-black"
          />
          <Button
            variant="outline"
            size="icon"
            className="absolute top-2 right-2 bg-white"
          >
            <Heart className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute bottom-2 right-2 bg-white"
          >
            <Download className="h-4 w-4" />
          </Button>
        </>
      )}

      {!isLoading && !imageData && (
        <div className="mx-4 lg:mx-8 min-h-[60vh] bg-gray-200 flex items-center text-sm justify-center text-center text-gray-400 dark:bg-gray-600">
          Oops! Unable to fetch image. Please try again
        </div>
      )}

      <Button
        onClick={getNewImage}
        className={cn(
          "mt-4 block mx-auto bg-black text-white dark:text-black dark:bg-white hover:bg-gray-800",
          isLoading && "cursor-wait"
        )}
        disabled={isLoading}
      >
        Try another Picture
      </Button>
    </div>
  );
}
