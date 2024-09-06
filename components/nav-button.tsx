"use client";

import { House, Images } from "lucide-react";
import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";

export function NavButton() {
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = () => {
    if (pathname === "/") {
      router.push("/favorites");
    } else {
      router.push("/");
    }
  };

  return (
    <Button variant="outline" size="icon" onClick={handleClick}>
      {pathname === "/" ? (
        <Images className="size-[1.2rem]" />
      ) : (
        <House className="size-[1.2rem]" />
      )}
    </Button>
  );
}
