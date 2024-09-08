"use client";

import { Button } from "@/components/ui/button";
import { X, Plus } from "lucide-react";
import { useAppContext } from "@/contexts/AppContext";
import { cn } from "@/lib/utils";
import { defaultFilters } from "@/utils/constants";
import { useEffect, useState } from "react";

const filters = defaultFilters;

export function FilterOptions() {
  const { selectedFilters, setSelectedFilters } = useAppContext();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleFilter = (filter: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  if (!mounted) {
    return (
      <div className="flex flex-wrap max-w-screen-md justify-center gap-2 mt-4">
        {filters.map((filter) => (
          <Button
            key={filter}
            variant="ghost"
            onClick={() => toggleFilter(filter)}
            className="border rounded-none bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-700"
          >
            {filter} <Plus className="ml-2 h-4 w-4" />
          </Button>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap max-w-screen-md justify-center gap-2 mt-4">
      {filters.map((filter) => {
        const isSelected = selectedFilters.includes(filter);
        return (
          <Button
            key={filter}
            variant={isSelected ? "ghost" : "outline"}
            onClick={() => toggleFilter(filter)}
            className={cn(
              "border rounded-none bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-100",
              isSelected
                ? "border-gray-900 dark:border-gray-300"
                : "border-gray-200 dark:border-gray-700"
            )}
          >
            {filter}{" "}
            {isSelected ? (
              <X className="ml-2 h-4 w-4" />
            ) : (
              <Plus className="ml-2 h-4 w-4" />
            )}
          </Button>
        );
      })}
    </div>
  );
}
