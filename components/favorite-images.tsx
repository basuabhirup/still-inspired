"use client";

import { useAppContext } from "@/contexts/AppContext";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Expand, Trash2 } from "lucide-react";
import { Dialog, DialogContent } from "./ui/dialog";
import { useState } from "react";

export function FavoriteImages() {
  const { getFavoriteImages, toggleFavorite } = useAppContext();
  const favoriteImages = getFavoriteImages();
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Favorite Images</h2>
      {favoriteImages.length === 0 ? (
        <p>No favorite images yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl">
          {favoriteImages.map((image) => (
            <div key={image.id} className="relative">
              <Image
                src={image.urls.regular}
                alt={image.alt_description || "Favorite artwork"}
                width={200}
                height={200}
                className="object-cover w-full h-48 hover:mx-[-1px] hover:cursor-pointer"
                onClick={() => setFullscreenImage(image.urls.regular)}
              />
              <Button
                onClick={() => toggleFavorite(image.id)}
                variant="outline"
                size="icon"
                className="absolute bottom-2 left-2 bg-white dark:bg-gray-800"
              >
                <Trash2 className="h-4 w-4" />
              </Button>

              <Button
                onClick={() => setFullscreenImage(image.urls.regular)}
                variant="outline"
                size="icon"
                className="absolute top-2 right-2 bg-white dark:bg-gray-800"
              >
                <Expand className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Dialog
            open={!!fullscreenImage}
            onOpenChange={() => setFullscreenImage(null)}
          >
            <DialogContent className="max-w-full max-h-full p-0">
              <div
                className="relative w-screen h-screen"
                onClick={() => setFullscreenImage(null)}
              >
                {fullscreenImage && (
                  <Image
                    src={fullscreenImage}
                    alt="Fullscreen view of favorite artwork"
                    layout="fill"
                    objectFit="contain"
                  />
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
}
