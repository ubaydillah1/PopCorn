"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Parallax } from "react-parallax"
import { Star, Clock, CalendarDays, UserIcon, Building2Icon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export interface HeroProps {
  title: string
  backdropPath: string
  posterPath: string
  rating: number
  duration: string
  releaseDate: string
  genres: string[]
  author: { id: number; name: string }
  studio: { id: number; name: string }
  className?: string
}

function PosterImage({
  src,
  alt,
  className,
  ...props
}: React.ComponentProps<typeof Image>) {
  return (
    <div
      data-slot="poster"
      className={cn("w-48 md:w-64 shadow-lg rounded-md overflow-hidden mr-0 md:mr-8", className)}
    >
      <Image
        src={src}
        alt={alt}
        width={300}
        height={450}
        className="object-cover"
        {...props}
      />
    </div>
  )
}

function HeroInfoItem({
  icon: Icon,
  children,
  iconClassName,
  className,
}: {
  icon: React.ComponentType<{ className?: string }>
  children: React.ReactNode
  iconClassName?: string
  className?: string
}) {
  return (
    <div className={cn("flex items-center gap-1 text-sm text-gray-300", className)}>
      <Icon className={cn("h-4 w-4", iconClassName)} />
      <span>{children}</span>
    </div>
  )
}

function HeroContent({
  title,
  rating,
  duration,
  releaseDate,
  genres,
  author,
  studio,
  className,
  ...props
}: Omit<HeroProps, "posterPath" | "backdropPath"> & { className?: string }) {
  return (
    <div data-slot="hero-content" className={cn("text-white", className)} {...props}>
      <h1 className="text-3xl md:text-4xl font-bold mb-2">{title}</h1>
      <div className="flex gap-4 mb-2 flex-wrap">
        <HeroInfoItem icon={Star} iconClassName="fill-yellow-500 text-yellow-500">
          {rating}
        </HeroInfoItem>
        <HeroInfoItem icon={Clock}>{duration}</HeroInfoItem>
        <HeroInfoItem icon={CalendarDays}>{releaseDate}</HeroInfoItem>
      </div>
      <div className="mb-4 flex flex-wrap gap-2">
        {genres.map((genre) => (
          <Badge key={genre} variant="secondary">
            {genre}
          </Badge>
        ))}
      </div>
      <div className="text-sm text-gray-300 mb-4 flex gap-6 flex-wrap">
        <div className="flex items-center gap-2">
          <UserIcon className="w-4 h-4 text-white" />
          <Link
            href={`/author/${author.id}`}
            className="text-white hover:text-blue-400 transition-colors font-medium hover:font-semibold"
          >
            {author.name}
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Building2Icon className="w-4 h-4 text-white" />
          <Link
            href={`/studio/${studio.id}`}
            className="text-white hover:text-blue-400 transition-colors font-medium hover:font-semibold"
          >
            {studio.name}
          </Link>
        </div>
      </div>
      <Button asChild className="w-full md:w-auto">
        <Link href="#">Book Ticket</Link>
      </Button>
    </div>
  )
}

function Hero({
  title,
  backdropPath,
  posterPath,
  rating,
  duration,
  releaseDate,
  genres,
  author,
  studio,
  className,
  ...props
}: HeroProps) {
  return (
    <section
      data-slot="hero"
      className={cn("relative w-full h-[600px] md:h-[500px]", className)}
      {...props}
    >
      <Parallax
        blur={5}
        bgImage={backdropPath}
        bgImageAlt={title}
        strength={200}
        bgImageStyle={{
          opacity: 0.6,
          objectFit: "cover",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-40" />
        <div
          className="
            relative max-w-7xl mx-auto px-4 py-10 md:py-10
            flex flex-col md:flex-row justify-center items-center h-full
          "
        >
          <PosterImage src={posterPath} alt={title} className="mb-6 md:mb-0" />
          <HeroContent
            title={title}
            rating={rating}
            duration={duration}
            releaseDate={releaseDate}
            genres={genres}
            author={author}
            studio={studio}
            className="text-center md:text-left md:ml-8"
          />
        </div>
      </Parallax>
    </section>
  )
}

export {
  Hero,
  HeroContent,
  PosterImage,
}