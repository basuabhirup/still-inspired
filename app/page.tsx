// import { ImageContainer } from "@/components/image-container";
// import { FilterOptions } from "@/components/filter-options";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <div className="w-full max-w-5xl flex justify-end mb-8">
        <ThemeToggle />
      </div>
      <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">
        Still A Work of Art
      </h1>
      <p className="text-sm md:text-xl mb-8 text-center">
        Image prompts to ignite your artistic creativity.
      </p>
      {/* <ImageContainer />
      <FilterOptions /> */}
      <footer className="mt-16 text-center text-sm">
        Made by Anusha & Abhirup <br />
        in pursuit of art-block-free days.
      </footer>
    </main>
  );
}
