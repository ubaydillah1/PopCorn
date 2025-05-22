import { LoaderCircle } from "lucide-react";
import HeroCarousel from "@/components/HeroSlides";
import NowPlayingSection from "@/components/NowPlayingSection";
import ComingSoonSection from "@/components/ComingSoonSection";
import { Suspense } from "react";
export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <div className="mx-auto w-full">
      <HeroCarousel />
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-[50vh]">
            <div className="flex flex-col items-center gap-4 text-muted-foreground">
              <LoaderCircle className="h-10 w-10 animate-spin text-primary" />
              <span className="text-sm font-medium">Loading movies...</span>
            </div>
          </div>
        }
      >
        <NowPlayingSection />
        <ComingSoonSection />
      </Suspense>
    </div>
  );
}
