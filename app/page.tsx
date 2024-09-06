import { ImageContainer } from "@/components/image-container";
import { FilterOptions } from "@/components/filter-options";
import { FavoriteImages } from "@/components/favorite-images";

export default function Home() {
  return (
    <>
      <h1 className="text-5xl font-bold mb-2 text-center">
        Still A Work of Art
      </h1>
      <p className="text-xs md:text-sm mb-4 text-center">
        Image prompts to ignite your artistic creativity.
      </p>
      <ImageContainer />
      <FilterOptions />
      <FavoriteImages />
    </>
  );
}
