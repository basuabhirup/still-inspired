import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

  if (!UNSPLASH_ACCESS_KEY) {
    return NextResponse.json(
      { error: "Unsplash API key is missing" },
      { status: 500 }
    );
  }

  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q");

  let apiUrl = "https://api.unsplash.com/photos/random";
  const params = new URLSearchParams({
    client_id: UNSPLASH_ACCESS_KEY,
  });

  if (query) {
    params.append("query", query);
  }

  apiUrl += `?${params.toString()}`;

  try {
    const response = await fetch(apiUrl, { cache: "no-store" });
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching image from Unsplash:", error);
    return NextResponse.json(
      { error: "Failed to fetch image" },
      { status: 500 }
    );
  }
}
