"use client";

import { defaultFilters } from "@/utils/constants";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

type ImageData = {
  id: string;
  urls: { raw: string; regular: string };
  alt_description: string;
  user: { name: string; links: { html: string } };
  height: number;
  width: number;
};

type AppContextType = {
  imageData: ImageData | null;
  setImageData: React.Dispatch<React.SetStateAction<ImageData | null>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  selectedFilters: string[];
  setSelectedFilters: React.Dispatch<React.SetStateAction<string[]>>;
  getNewImage: () => Promise<void>;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  getFavoriteImages: () => ImageData[];
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedFilters, setSelectedFilters] =
    useState<string[]>(defaultFilters);
  const [favorites, setFavorites] = useState<string[]>([]);

  const getNewImage = async () => {
    setIsLoading(true);
    let API_URL = "/api/get-image";
    if (selectedFilters.length > 0) {
      const queryString = selectedFilters.join(",");
      API_URL += `?q=${queryString}`;
    }
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setImageData(data);
    } catch (error) {
      console.error("Error fetching image:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFavorite = (id: string) => {
    const newFavorites = favorites.includes(id)
      ? favorites.filter((fav) => fav !== id)
      : [...favorites, id];
    setFavorites(newFavorites);
    localStorage.setItem("stillArtFavorites", JSON.stringify(newFavorites));

    // If the current image is being unfavorited, also remove it from localStorage
    if (!newFavorites.includes(id) && imageData && imageData.id === id) {
      localStorage.removeItem(`stillArtFavoriteImage_${id}`);
    } else if (imageData && imageData.id === id) {
      // If it's being favorited, store the image data
      localStorage.setItem(
        `stillArtFavoriteImage_${id}`,
        JSON.stringify(imageData)
      );
    }
  };

  const getFavoriteImages = (): ImageData[] => {
    return favorites
      .map((id) => {
        const storedImage = localStorage.getItem(`stillArtFavoriteImage_${id}`);
        return storedImage ? JSON.parse(storedImage) : null;
      })
      .filter((img): img is ImageData => img !== null);
  };

  useEffect(() => {
    const storedFavorites = localStorage.getItem("stillArtFavorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        imageData,
        setImageData,
        isLoading,
        setIsLoading,
        selectedFilters,
        setSelectedFilters,
        getNewImage,
        favorites,
        toggleFavorite,
        getFavoriteImages,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}