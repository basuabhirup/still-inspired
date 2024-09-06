"use client";

import { useState } from "react";
import { useAppContext } from "@/contexts/AppContext";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Expand, Trash2 } from "lucide-react";
import { Dialog, DialogContent } from "./ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

export function FavoriteImages() {
  const { getFavoriteImages, toggleFavorite } = useAppContext();
  const favoriteImages = getFavoriteImages();
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const [imageToRemove, setImageToRemove] = useState<string | null>(null);

  const handleRemove = (id: string) => {
    toggleFavorite(id);
    setImageToRemove(null);
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Favorite Images</h2>
      {favoriteImages.length === 0 ? (
        <p>No favorite images yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl">
          {favoriteImages.reverse().map((image) => (
            <div key={image.id} className="relative flex flex-col gap-y-0">
              <div className="relative">
                <Image
                  src={image.urls.regular}
                  alt={image.alt_description || "Favorite artwork"}
                  width={400}
                  height={600}
                  className="object-cover w-full h-60 hover:mx-[-1px] border rounded-sm hover:border-gray-500 hover:cursor-pointer "
                  onClick={() => setFullscreenImage(image.urls.regular)}
                />
                <Button
                  onClick={() => setImageToRemove(image.id)}
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
              <div className="w-full block text-xs p-2 text-center font-thin">
                <a
                  href={`${image.user.links.html}?utm_source=Still-a-Work-of-Art&utm_medium=referral`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:font-bold"
                >
                  {image.user.name + " / "}
                </a>
                <a
                  href={`${image.links.html}?utm_source=Still-a-Work-of-Art&utm_medium=referral`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:font-bold"
                >
                  Unsplash
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

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

      <AlertDialog
        open={!!imageToRemove}
        onOpenChange={() => setImageToRemove(null)}
      >
        <AlertDialogContent className="bg-white dark:bg-gray-800">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-gray-800 dark:text-gray-50">
              Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove the image from your favorites.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="text-gray-800 dark:text-gray-50">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => imageToRemove && handleRemove(imageToRemove)}
            >
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
