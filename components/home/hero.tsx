
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Briefcase, MapPin, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import JobStats from "./Job-Stats";

export function Hero() {
  const router = useRouter();

  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const params = new URLSearchParams();

    if (keyword.trim()) {
      params.set("q", keyword.trim());
    }

    if (location.trim()) {
      params.set("location", location.trim());
    }

    const queryString = params.toString();

    router.push(queryString ? `/jobs?${queryString}` : "/jobs");
  };

  const trendingPositions = [
    "Product Designer",
    "AI Engineering",
    "Dev-ops Engineer",
  ];

  return (
    <section className="relative w-full overflow-visible bg-[#05050a]">

      {/* Background Globe Image */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <Image
          src="/images/globe.png"
          alt="Global job network"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Background Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[#05050a]/30" />

      {/* Hero Content */}
      <div className="relative z-10 mx-auto flex min-h-[85svh] w-full max-w-[1320px] flex-col items-center justify-center px-4 py-24 text-center sm:px-6 sm:py-28 lg:px-10">

        {/* Top Badge */}
        <div className="mb-5 flex items-center justify-center gap-2 sm:mb-7 sm:gap-3">
          <span className="hidden h-px w-8 bg-gradient-to-r from-transparent to-white/25 sm:block md:w-12" />

          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#121218]/90 px-3 py-1.5 shadow-[0_0_25px_rgba(92,83,254,0.15)] backdrop-blur-md sm:px-4 sm:py-2">
            <Briefcase className="size-3.5 shrink-0 text-[#f59e0b] sm:size-4" />

            <span className="font-[family-name:var(--font-space-mono)] text-[10px] tracking-wider text-white/90 sm:text-xs md:text-sm">
              <strong className="font-bold text-white">
                50,000+
              </strong>{" "}
              NEW JOBS THIS MONTH
            </span>
          </div>

          <span className="hidden h-px w-8 bg-gradient-to-l from-transparent to-white/25 sm:block md:w-12" />
        </div>

        {/* Headline */}
        <h1 className="font-[family-name:var(--font-manrope)] text-3xl leading-[1.15] font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
          Find Your Dream Job Today
        </h1>

        {/* Description */}
        <p className="mt-4 max-w-[650px] px-1 font-[family-name:var(--font-manrope)] text-sm leading-relaxed text-white/75 sm:text-base md:text-lg">
          HireLoop connects top talent with world-class companies.
          Browse thousands of curated opportunities and land your
          next role — faster.
        </p>

        {/* Search Form */}
        <form
          onSubmit={handleSearch}
          className="mt-7 flex w-full max-w-[740px] flex-col gap-2 rounded-2xl border border-white/15 bg-[#0f0f14]/90 p-2 shadow-2xl backdrop-blur-md sm:mt-10 sm:flex-row sm:items-center"
        >
          {/* Keyword */}
          <div className="flex min-w-0 flex-1 items-center gap-2.5 px-3 py-2 sm:py-0">
            <Search className="size-4 shrink-0 text-white/50" />

            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Job title, skill or company"
              aria-label="Search by job title, skill or company"
              className="w-full min-w-0 bg-transparent font-sans text-sm text-white outline-none placeholder:text-white/40 sm:text-base"
            />
          </div>

          {/* Divider */}
          <span className="h-px w-full bg-white/10 sm:h-7 sm:w-px sm:bg-white/15" />

          {/* Location */}
          <div className="flex min-w-0 flex-1 items-center gap-2.5 px-3 py-2 sm:py-0">
            <MapPin className="size-4 shrink-0 text-white/50" />

            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location or Remote"
              aria-label="Search by location"
              className="w-full min-w-0 bg-transparent font-sans text-sm text-white outline-none placeholder:text-white/40 sm:text-base"
            />
          </div>

          {/* Search Button */}
          <Button
            type="submit"
            className="flex h-11 w-full shrink-0 items-center justify-center rounded-xl bg-[#5c53fe] px-4 text-white transition-colors hover:bg-[#4b42f5] sm:w-11 sm:px-0"
          >
            <Search className="size-5" />
            <span className="ml-2 text-sm font-medium sm:sr-only">
              Search Jobs
            </span>
          </Button>
        </form>

        {/* Trending Positions */}
        <div className="mt-5 flex w-full flex-wrap items-center justify-center gap-2.5 sm:mt-6 sm:gap-3">
          <span className="w-full font-[family-name:var(--font-manrope)] text-xs text-white/60 sm:w-auto sm:text-sm">
            Trending Positions
          </span>

          <div className="flex flex-wrap justify-center gap-2">
            {trendingPositions.map((tag) => (
              <Link
                key={tag}
                href={`/jobs?q=${encodeURIComponent(tag)}`}
                className="rounded-full border border-white/10 bg-[#14141a]/85 px-3 py-1.5 font-[family-name:var(--font-manrope)] text-xs text-white/85 backdrop-blur-sm transition-colors hover:border-white/25 hover:bg-[#1f1f29] hover:text-white"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Job Stats */}
      <div className="relative z-20 mx-auto -mt-10 w-full max-w-[1320px] px-4 pb-8 sm:-mt-14 sm:px-6 lg:px-10">
        <JobStats />
      </div>

    </section>
  );
}
