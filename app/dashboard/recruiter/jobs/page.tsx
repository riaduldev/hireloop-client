
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  BriefcaseBusiness,
  CalendarDays,
  MapPin,
  Search,
  Plus,
  Trash2,
  Pencil,
  FileText,
  X,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface JobTableRow {
  id: number
  title: string
  description: string
  location: string
  jobType: string
  createdAt: string
}

const initialJobs: JobTableRow[] = [
  {
    id: 1,
    title: "Senior React Developer",
    description:
      "We are looking for an experienced React developer to join our team.",
    location: "New York, NY",
    jobType: "full-time",
    category: "technology",
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    title: "UI/UX Designer",
    description:
      "Design intuitive interfaces and improve user experience.",
    location: "Remote",
    jobType: "full-time",
    category: "design",
    createdAt: "2024-01-20",
  },
  {
    id: 3,
    title: "Node.js Developer",
    description:
      "Backend development using Node.js, Express, and MongoDB.",
    location: "San Francisco, CA",
    jobType: "contract",
    category: "technology",
    createdAt: "2024-02-01",
  },
  {
    id: 4,
    title: "Marketing Specialist",
    description:
      "Create and execute marketing campaigns across digital channels.",
    location: "Chicago, IL",
    jobType: "part-time",
    category: "marketing",
    createdAt: "2024-02-10",
  },
  {
    id: 5,
    title: "Data Scientist",
    description:
      "Analyze complex data sets and build predictive models.",
    location: "Boston, MA",
    jobType: "full-time",
    category: "technology",
    createdAt: "2024-03-05",
  },
]

export default function JobsPage() {
  const router = useRouter()

  const [jobs, setJobs] = useState<JobTableRow[]>(initialJobs)
  const [searchTerm, setSearchTerm] = useState("")

  // Search jobs
  const filteredJobs = jobs.filter((job) => {
    const search = searchTerm.trim().toLowerCase()

    return (
      job.title.toLowerCase().includes(search) ||
      job.location.toLowerCase().includes(search) ||
      job.category.toLowerCase().includes(search) ||
      job.jobType.toLowerCase().includes(search)
    )
  })

  // Delete job
  const handleDelete = (id: number) => {
    setJobs((prevJobs) =>
      prevJobs.filter((job) => job.id !== id)
    )
  }

  // Format date
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <section className="min-h-screen space-y-6 bg-[#0a0a0f] p-4 text-white sm:p-6 lg:p-8">

      {/* Header */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm text-gray-400">
            <BriefcaseBusiness className="size-4" />
            <span>Recruiter Dashboard</span>
            <span className="text-gray-600">/</span>
            <span className="font-medium text-[#938dff]">Jobs</span>
          </div>

          <h1 className="font-[family-name:var(--font-manrope)] text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Manage Job Posts
          </h1>

          <p className="mt-2 text-sm text-gray-400">
            Manage, track and organize all your job listings.
          </p>
        </div>

        <Button
          onClick={() =>
            router.push("/dashboard/recruiter/jobs/new")
          }
          className="h-11 w-full border-0 bg-[#5c53fe] px-5 text-white hover:bg-[#4b42e8] sm:w-auto"
        >
          <Plus className="mr-2 size-4" />
          Post New Job
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

        {/* Total Jobs */}
        <div className="rounded-xl border border-white/10 bg-[#141418] p-5 transition-colors hover:border-[#5c53fe]/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">
                Total Job Posts
              </p>
              <h2 className="mt-2 text-3xl font-bold text-white">
                {jobs.length}
              </h2>
            </div>

            <div className="rounded-xl bg-[#5c53fe]/15 p-3 text-[#938dff]">
              <BriefcaseBusiness className="size-6" />
            </div>
          </div>
        </div>

        {/* Search Results */}
        <div className="rounded-xl border border-white/10 bg-[#141418] p-5 transition-colors hover:border-emerald-500/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">
                Search Results
              </p>
              <h2 className="mt-2 text-3xl font-bold text-white">
                {filteredJobs.length}
              </h2>
            </div>

            <div className="rounded-xl bg-emerald-500/10 p-3 text-emerald-400">
              <FileText className="size-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Jobs Table Container */}
      <div className="overflow-hidden rounded-xl border border-white/10 bg-[#141418] shadow-lg shadow-black/10">

        {/* Table Header */}
        <div className="flex flex-col gap-4 border-b border-white/10 bg-[#141418] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">

          <div>
            <h2 className="text-lg font-semibold text-white">
              All Job Listings
            </h2>
            <p className="mt-1 text-xs text-gray-400">
              View and manage your published opportunities.
            </p>
          </div>

          {/* Search */}
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-500" />

            <Input
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoComplete="off"
              className="h-11 border border-white/10 bg-[#0a0a0f] pl-10 pr-10 text-white placeholder:text-gray-500 focus-visible:border-[#5c53fe] focus-visible:ring-[#5c53fe]/30"
            />

            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 transition-colors hover:text-white"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
        </div>

        {/* Table */}
        {filteredJobs.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left">

              <thead>
                <tr className="border-b border-white/10 bg-[#1b1b22] text-xs uppercase tracking-wider text-gray-400">
                  <th className="px-6 py-4 font-medium">
                    Job Title
                  </th>
                  <th className="px-6 py-4 font-medium">
                    Location
                  </th>
                  <th className="px-6 py-4 font-medium">
                    Job Type
                  </th>
                  <th className="px-6 py-4 font-medium">
                    Category
                  </th>
                  <th className="px-6 py-4 font-medium">
                    Posted Date
                  </th>
                  <th className="px-6 py-4 text-right font-medium">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredJobs.map((job) => (
                  <tr
                    key={job.id}
                    className="border-b border-white/5 bg-[#141418] text-white transition-colors hover:bg-[#1c1c26] last:border-0"
                  >
                    {/* Job Title */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#5c53fe]/10 text-[#938dff]">
                          <BriefcaseBusiness className="size-5" />
                        </div>

                        <div className="max-w-[220px]">
                          <p className="truncate text-sm font-semibold text-white">
                            {job.title}
                          </p>
                          <p className="mt-1 truncate text-xs text-gray-400">
                            {job.description}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Location */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <MapPin className="size-4 shrink-0 text-gray-500" />
                        {job.location}
                      </div>
                    </td>

                    {/* Job Type */}
                    <td className="px-6 py-5">
                      <span className="inline-flex rounded-full border border-[#5c53fe]/20 bg-[#5c53fe]/10 px-3 py-1 text-xs font-medium capitalize text-[#a5a0ff]">
                        {job.jobType.replace("-", " ")}
                      </span>
                    </td>

                    {/* Category */}
                    <td className="px-6 py-5">
                      <span className="text-sm capitalize text-gray-300">
                        {job.category}
                      </span>
                    </td>

                    {/* Posted Date */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 whitespace-nowrap text-sm text-gray-400">
                        <CalendarDays className="size-4 text-gray-500" />
                        {formatDate(job.createdAt)}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-5">
                      <div className="flex items-center justify-end gap-2">

                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label={`Edit ${job.title}`}
                          onClick={() =>
                            router.push(
                              `/dashboard/recruiter/jobs/edit/${job.id}`
                            )
                          }
                          className="size-9 text-gray-400 hover:bg-[#5c53fe]/10 hover:text-[#a5a0ff]"
                        >
                          <Pencil className="size-4" />
                        </Button>

                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label={`Delete ${job.title}`}
                          onClick={() => handleDelete(job.id)}
                          className="size-9 text-gray-400 hover:bg-red-500/10 hover:text-red-400"
                        >
                          <Trash2 className="size-4" />
                        </Button>

                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (

          /* Empty State */
          <div className="flex flex-col items-center justify-center bg-[#141418] px-5 py-16 text-center">

            <div className="mb-5 flex size-16 items-center justify-center rounded-2xl border border-white/10 bg-[#1b1b22]">
              {searchTerm ? (
                <Search className="size-7 text-gray-400" />
              ) : (
                <BriefcaseBusiness className="size-7 text-gray-400" />
              )}
            </div>

            <h3 className="text-lg font-semibold text-white">
              {searchTerm
                ? "No matching jobs found"
                : "No job posts yet"}
            </h3>

            <p className="mt-2 max-w-sm text-sm leading-6 text-gray-400">
              {searchTerm
                ? `We couldn't find any jobs matching "${searchTerm}". Try another keyword.`
                : "You haven't posted any jobs yet. Create your first job listing to get started."}
            </p>

            {searchTerm ? (
              <Button
                variant="outline"
                onClick={() => setSearchTerm("")}
                className="mt-5 border-white/10 bg-[#1b1b22] text-white hover:bg-[#252530] hover:text-white"
              >
                Clear Search
              </Button>
            ) : (
              <Button
                onClick={() =>
                  router.push("/dashboard/recruiter/jobs/new")
                }
                className="mt-5 bg-[#5c53fe] text-white hover:bg-[#4b42e8]"
              >
                <Plus className="mr-2 size-4" />
                Post Your First Job
              </Button>
            )}

          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex flex-col items-center justify-between gap-2 text-xs text-gray-500 sm:flex-row">
        <p>
          Showing {filteredJobs.length} of {jobs.length} jobs
        </p>
        <p>Manage your opportunities with HireLoop</p>
      </div>

    </section>
  )
}
