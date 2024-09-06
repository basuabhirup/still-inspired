"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/contexts/AppContext";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "./ui/dialog";
import { Expand, Heart, Share2 } from "lucide-react";

export function ImageContainer() {
  const {
    imageData,
    isLoading,
    selectedFilters,
    getNewImage,
    favorites,
    toggleFavorite,
  } = useAppContext();
  const [imageLoading, setImageLoading] = useState<boolean>(true);
  const [fullscreen, setFullscreen] = useState<boolean>(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isLoading) {
      setImageLoading(true);
    } else {
      timeout = setTimeout(() => {
        setImageLoading(false);
      }, 600);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [isLoading]);

  useEffect(() => {
    (async () => {
      await getNewImage();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="relative w-full max-w-2xl">
        {(!!isLoading || !!imageLoading) && (
          <div className="mx-4 lg:mx-8 min-h-[65vh] bg-gray-200 animate-pulse flex items-center justify-center text-gray-400 dark:bg-gray-800 dark:text-gray-600">
            Loading...
          </div>
        )}

        {!isLoading && imageData && (
          <div
            className={cn(
              "flex flex-col justify-center items-center w-full min-h-[65vh]",
              imageLoading && "absolute inset-0 invisible"
            )}
          >
            <Image
              src={imageData.urls.regular}
              alt={imageData.alt_description || "Inspirational artwork"}
              width={imageData.width || 400}
              height={imageData.height || 600}
              className="w-auto max-h-[50vh] mx-auto text-center object-cover border-4 border-black dark:border-white hover:cursor-pointer"
              onClick={() =>
                !isLoading && !imageLoading && imageData && setFullscreen(true)
              }
            />
            <div className="flex w-screen-xm justify-around items-center gap-x-3 mt-0 text-gray-500 dar:text-gray-300">
              <Button
                variant="ghost"
                onClick={() => toggleFavorite(imageData.id)}
                size="icon"
                className="block mx-auto text-center my-0 py-0"
              >
                <Heart
                  className={`size-5 mx-auto text-sm ${
                    favorites.includes(imageData.id) &&
                    "fill-current text-red-500"
                  }`}
                />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="block mx-auto text-center my-0 py-0"
              >
                <Share2 className="size-5 mx-auto text-sm" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="block mx-auto text-center my-0 py-0"
                onClick={() =>
                  !isLoading &&
                  !imageLoading &&
                  imageData &&
                  setFullscreen(true)
                }
              >
                <Expand className="size-5 mx-auto text-sm" />
              </Button>
            </div>
            <div className="w-full block text-sm p-4 pb-2 text-center font-thin">
              <a
                href={`${imageData.user.links.html}?utm_source=Still-a-Work-of-Art&utm_medium=referral`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {imageData.user.name + " / "}
              </a>
              <a
                href={`${imageData.links.html}?utm_source=Still-a-Work-of-Art&utm_medium=referral`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Unsplash
              </a>
            </div>
          </div>
        )}

        {!isLoading && !imageLoading && !imageData && (
          <div className="mx-4 lg:mx-8 min-h-[60vh] bg-gray-200 flex items-center text-sm justify-center text-center text-gray-400 dark:bg-gray-600">
            Oops! Unable to fetch image. Please try again
          </div>
        )}

        <Button
          onClick={getNewImage}
          className={cn(
            "mt-4 block mx-auto mb-1 bg-black text-white dark:text-black dark:bg-white hover:bg-gray-800",
            isLoading && "hover:cursor-wait",
            selectedFilters.length === 0 && "hover:cursor-not-allowed"
          )}
          disabled={imageLoading || selectedFilters.length === 0}
          size="lg"
        >
          {imageLoading ? "Loading new Picture" : "Try another Picture"}
        </Button>
        <p
          className={cn(
            "w-full text-[0.65rem] text-center mt-3 pt-0 mb-0 py-0",
            selectedFilters.length > 0 ? "invisible" : "visible"
          )}
        >
          Please select at least one tag to continue
        </p>
      </div>
      <Dialog open={fullscreen} onOpenChange={setFullscreen}>
        <DialogContent className="max-w-full h-full">
          {!!imageData && (
            <Image
              src={imageData.urls.regular}
              alt={imageData.alt_description || "Inspirational artwork"}
              layout="fill"
              objectFit="contain"
              onClick={() => setFullscreen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
