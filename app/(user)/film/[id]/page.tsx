/* eslint-disable @typescript-eslint/no-unused-vars */
import FilmDetailClient from "@/components/FilmDetailClient";
import { notFound } from "next/navigation";

async function getFilmDetail(id: string) {
  try {
    const res = await fetch(`http://localhost:3000/api/user/films/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Film not found");

    return await res.json();
  } catch (error) {
    return null;
  }
}

export default async function FilmDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const film = await getFilmDetail(id);

  if (!film) return notFound();

  return <FilmDetailClient film={film} />;
}
