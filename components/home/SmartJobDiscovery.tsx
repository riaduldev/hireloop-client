import Link from "next/link"
import {
  MapPin,
  BriefcaseBusiness,
  CircleDollarSign,
  ArrowRight,
} from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "../ui/button"

const jobs = [
  {
    id: 1,
    title: "Frontend Developer",
    description:
      "Showcase your commitment to diversity and inclusion by highlighting initiatives",
    location: "New York, USA",
    type: "Hybrid",
    salary: "€25–€40/hour",
  },
  {
    id: 2,
    title: "Full Stack Developer",
    description:
      "Build modern web applications and collaborate with a passionate development team.",
    location: "London, UK",
    type: "Remote",
    salary: "€35–€50/hour",
  },
  {
    id: 3,
    title: "UI/UX Designer",
    description:
      "Create intuitive digital experiences and beautiful interfaces for modern products.",
    location: "Berlin, Germany",
    type: "On-site",
    salary: "€30–€45/hour",
  },
  {
    id: 4,
    title: "UI/UX Designer",
    description:
      "Create intuitive digital experiences and beautiful interfaces for modern products.",
    location: "Berlin, Germany",
    type: "On-site",
    salary: "€30–€45/hour",
  },
  {
    id: 5,
    title: "UI/UX Designer",
    description:
      "Create intuitive digital experiences and beautiful interfaces for modern products.",
    location: "Berlin, Germany",
    type: "On-site",
    salary: "€30–€45/hour",
  },
  {
    id: 6,
    title: "UI/UX Designer",
    description:
      "Create intuitive digital experiences and beautiful interfaces for modern products.",
    location: "Berlin, Germany",
    type: "On-site",
    salary: "€30–€45/hour",
  },
]

function JobCard({ job }: { job: (typeof jobs)[number] }) {
  return (
    <Card className="group flex h-full flex-col rounded-[24px] border border-white/[0.04] bg-[#151515] p-6 text-white shadow-none transition-all duration-300 hover:border-violet-500/30 hover:bg-[#191919] sm:p-7">
      <CardContent className="flex h-full flex-col p-0">
        {/* Job title */}
        <h3 className="text-2xl font-medium tracking-tight sm:text-[30px]">
          {job.title}
        </h3>

        {/* Description */}
        <p className="mt-3 line-clamp-3 text-sm leading-7 text-zinc-400 sm:text-[15px]">
          {job.description}
        </p>

        {/* Job details */}
        <div className="mt-7 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#222222] px-3 py-2 text-xs text-zinc-200 sm:text-sm">
            <MapPin className="h-4 w-4 text-fuchsia-300" />
            {job.location}
          </span>

          <span className="inline-flex items-center gap-2 rounded-full bg-[#222222] px-3 py-2 text-xs text-zinc-200 sm:text-sm">
            <BriefcaseBusiness className="h-4 w-4 text-fuchsia-300" />
            {job.type}
          </span>

          <span className="inline-flex items-center gap-2 rounded-full bg-[#222222] px-3 py-2 text-xs text-zinc-200 sm:text-sm">
            <CircleDollarSign className="h-4 w-4 text-fuchsia-300" />
            {job.salary}
          </span>
        </div>

        {/* Apply button */}
        <div className="mt-auto pt-10">
          <Link
            href={`/jobs/${job.id}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-white transition-colors hover:text-fuchsia-300"
          >
            Apply Now
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

export default function SmartJobDiscovery() {
  return (
    <section className="w-full bg-[#101010] px-4 py-16 text-white sm:px-6 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-[1320px]">
        {/* Heading */}
        <div className="mb-12 text-center sm:mb-16">
          <div className="mb-5 flex items-center justify-center gap-4">
            <span className="h-2 w-2 bg-violet-500" />

            <p className="text-sm font-medium tracking-[0.15em] text-zinc-300 uppercase">
              Smart job discovery
            </p>

            <span className="h-2 w-2 bg-violet-500" />
          </div>

          <h2 className="font-medium tracking-tight sm:text-4xl md:text-5xl">
            The roles you&apos;d never <br /> find by searching
          </h2>
        </div>

        {/* Job cards */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
      {/* View all jobs button */}
      <div className="flex items-center justify-center py-20 sm:py-10">
        <Button className="w-full rounded-full border border-white bg-white px-8 py-5 text-sm font-semibold text-black shadow-sm transition-all duration-300 hover:border-white hover:bg-transparent hover:text-white hover:shadow-lg active:scale-95 sm:w-auto">
          View all jobs
        </Button>
      </div>
    </section>
  )
}
