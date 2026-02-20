import type { Artwork } from "./types/artwork";


export const fetchArtworks = async (page: number) => {
  const response = await fetch(
    `https://api.artic.edu/api/v1/artworks?page=${page}`
  );
  const data = await response.json();

  // log to check data
  console.log("Fetched page", page, data);

  return {
    data: data.data as Artwork[],
    pagination: data.pagination,
  };
};
