import { ImageContainer } from "@/components/image-container";
import { FilterOptions } from "@/components/filter-options";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <div className="w-full max-w-4xl flex justify-end mb-4">
        <ThemeToggle />
      </div>
      <h1 className="text-5xl font-bold mb-2 text-center">
        Still A Work of Art
      </h1>
      <p className="text-xs md:text-sm mb-4 text-center">
        Image prompts to ignite your artistic creativity.
      </p>
      <ImageContainer />
      <FilterOptions />
      <footer className="mt-16 text-center text-sm">
        Made by Anusha & Abhirup <br />
        in pursuit of art-block-free days.
      </footer>
    </main>
  );
}
