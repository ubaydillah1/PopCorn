import { Suspense } from "react";
import HeroCarousel from "@/components/HeroSlides";
import NowPlayingSection from "@/components/NowPlayingSection";
import ComingSoonSection from "@/components/ComingSoonSection";

export default function HomePage() {
  return (
    <div className="mx-auto w-full">
      <HeroCarousel />
      <Suspense fallback={<div className="p-4">Loading movies...</div>}>
        <NowPlayingSection />
        <ComingSoonSection />
      </Suspense>
    </div>
  );
}
