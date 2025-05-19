import React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays } from "lucide-react";
import Image from "next/image";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function RecommendedFilmCard({ film, index }: { film: any; index: number }) {
  const formattedDate = React.useMemo(() => {
    const date = new Date(new Date(film.releaseDate).getTime());
    date.setMonth(date.getMonth() + index + 1);
    return date.toISOString().split("T")[0];
  }, [film.releaseDate, index]);

  return (
    <Link
      href={`/film/${film.id}`}
      className="relative flex-shrink-0 snap-start w-[260px] sm:w-[300px] md:w-[340px] h-[180px] overflow-hidden rounded-lg block"
      passHref
    >
      <Card className="cursor-pointer h-full">
        <Image src={film.poster} alt={`Recommended: ${film.title}`} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <CardContent className="absolute bottom-0 text-white w-full p-3 z-10">
          <h3 className="text-base font-bold line-clamp-2">{film.title}</h3>
          <div className="flex items-center gap-1 text-sm text-gray-300">
            <CalendarDays className="h-4 w-4" />
            <span>{formattedDate}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
