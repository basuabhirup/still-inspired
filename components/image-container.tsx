"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Heart, Download } from "lucide-react";

export function ImageContainer() {
  const [imageData, setImageData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getNewImage = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/get-image");
      const data = await res.json();
      setImageData(data);
    } catch (error) {
      console.error("Error fetching image:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNewImage();
  }, []);

  return (
    <div className="relative">
      {loading ? (
        <div className="w-[600px] h-[400px] bg-gray-200 animate-pulse flex items-center justify-center">
          Loading...
        </div>
      ) : imageData ? (
        <>
          <Image
            src={imageData.urls.regular}
            alt={imageData.alt_description || "Inspirational artwork"}
            width={600}
            height={400}
            className="object-cover"
          />
          <Button
            variant="outline"
            size="icon"
            className="absolute top-2 right-2"
          >
            <Heart className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute bottom-2 right-2"
          >
            <Download className="h-4 w-4" />
          </Button>
        </>
      ) : null}
      <Button onClick={getNewImage} className="mt-4">
        Try another Picture
      </Button>
    </div>
  );
}
