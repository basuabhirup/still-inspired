"use client";

import { defaultFilters } from "@/utils/constants";
import React, { createContext, useState, useContext, ReactNode } from "react";

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
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedFilters, setSelectedFilters] =
    useState<string[]>(defaultFilters);

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
