"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  Pencil,
  BriefcaseBusiness,
  Eye,
  MapPin,
  Calendar,
  Wallet,
} from "lucide-react"
import { toast } from "sonner"

import JobDetailsDialog from "@/app/components/JobDetailsDialog"
import DeleteJobDialog from "@/app/components/DeleteJobDialog"
import { Button } from "@/components/ui/button"
import { getJobs, deleteJob } from "@/lib/api/jobs"
import { Job } from "@/types/jobs"

export default function JobsPage() {
  const router = useRouter()

  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const [selectedJobId, setSelectedJobId] = useState("")
  const [viewOpen, setViewOpen] = useState(false)

  // Fetch all jobs
  useEffect(() => {
    let isMounted = true

    const fetchJobs = async () => {
      try {
        setLoading(true)
        setError("")

        const result = await getJobs()

        if (!isMounted) return

        if (Array.isArray(result)) {
          setJobs(result)
        } else if (Array.isArray(result?.data)) {
          setJobs(result.data)
        } else if (Array.isArray(result?.jobs)) {
          setJobs(result.jobs)
        } else {
          setJobs([])
        }
      } catch (err) {
        console.error("Failed to fetch jobs:", err)
        if (isMounted) {
          setError("Failed to load jobs. Please try again.")
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchJobs()

    return () => {
      isMounted = false
    }
  }, [])

  // Delete job
  const handleDelete = async (id: string): Promise<boolean> => {
    try {
      setDeletingId(id)
      await deleteJob(id)

      setJobs((prevJobs) =>
        prevJobs.filter((job) => String(job._id ?? job.id) !== id)
      )

      toast.success("Job deleted successfully!")
      return true
    } catch (err) {
      console.error("Delete job error:", err)
      toast.error(
        err instanceof Error ? err.message : "Failed to delete job!"
      )
      return false
    } finally {
      setDeletingId(null)
    }
  }

  // Format salary safely (handles 0 properly)
  const formatSalary = (salary?: Job["salary"]) => {
    if (!salary) return "Not specified"

    const { min, max, frequency } = salary
    const hasMin = typeof min === "number" && !Number.isNaN(min)
    const hasMax = typeof max === "number" && !Number.isNaN(max)

    let rangeText = "Negotiable"

    if (hasMin && hasMax) {
      rangeText = `$${min.toLocaleString()} - $${max.toLocaleString()}`
    } else if (hasMin) {
      rangeText = `$${min.toLocaleString()}+`
    } else if (hasMax) {
      rangeText = `Up to $${max.toLocaleString()}`
    }

    return frequency ? `${rangeText} (${frequency})` : rangeText
  }

  // Format date
  const formatDate = (date?: string) => {
    if (!date) return "N/A"

    const parsedDate = new Date(date)
    if (Number.isNaN(parsedDate.getTime())) return "N/A"

    return parsedDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
  }

  const handleOpenView = (jobId: string) => {
    setSelectedJobId(jobId)
    setViewOpen(true)
  }

  return (
    <section className="min-h-screen bg-[#0a0a0f] px-4 py-6 text-white sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto w-full">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Manage Jobs
            </h1>
            <p className="mt-1.5 text-sm text-neutral-400">
              Manage and track all your posted jobs.
            </p>
          </div>

          <Button
            onClick={() => router.push("/dashboard/recruiter/jobs/new")}
            className="w-full bg-[#5c53fe] text-white hover:bg-[#4b42e8] sm:w-auto"
          >
            <BriefcaseBusiness className="mr-2 h-4 w-4" />
            Post a Job
          </Button>
        </div>

        {/* Content Container */}
        <div className="overflow-hidden rounded-xl border border-white/10 bg-[#141418]">
          {/* Loading */}
          {loading && (
            <div className="flex min-h-[300px] items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#5c53fe] border-t-transparent" />
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="flex min-h-[300px] flex-col items-center justify-center px-4 text-center">
              <p className="text-sm text-red-400">{error}</p>
              <Button
                onClick={() => window.location.reload()}
                className="mt-4 bg-[#5c53fe] text-white hover:bg-[#4b42e8]"
              >
                Try Again
              </Button>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && jobs.length === 0 && (
            <div className="flex min-h-[300px] flex-col items-center justify-center px-4 text-center">
              <BriefcaseBusiness className="mb-4 h-12 w-12 text-neutral-500" />
              <h3 className="text-lg font-semibold">No jobs found</h3>
              <p className="mt-1.5 text-sm text-neutral-400">
                You haven&apos;t posted any jobs yet.
              </p>
              <Button
                onClick={() => router.push("/dashboard/recruiter/jobs/new")}
                className="mt-5 bg-[#5c53fe] text-white hover:bg-[#4b42e8]"
              >
                Post Your First Job
              </Button>
            </div>
          )}

          {/* Mobile & Tablet Card View (< 1024px) */}
          {!loading && !error && jobs.length > 0 && (
            <div className="divide-y divide-white/10 lg:hidden">
              {jobs.map((job, index) => {
                const jobId = String(job._id ?? job.id ?? index)

                return (
                  <div
                    key={jobId}
                    className="space-y-4 p-4 transition-colors hover:bg-[#191921] sm:p-5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h2 className="truncate font-semibold text-white">
                          {job.title}
                        </h2>
                        <p className="mt-0.5 truncate text-sm text-neutral-400">
                          {job.companyName}
                        </p>
                      </div>

                      <span className="shrink-0 rounded-full border border-[#5c53fe]/25 bg-[#5c53fe]/10 px-2.5 py-1 text-xs font-medium text-[#a5a0ff] capitalize">
                        {job.jobType?.replaceAll("-", " ") || "N/A"}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 gap-2 text-xs text-neutral-300 sm:grid-cols-2">
                      <div className="flex items-center gap-2">
                        <BriefcaseBusiness className="h-3.5 w-3.5 shrink-0 text-neutral-400" />
                        <span className="truncate">
                          {job.category || "Uncategorized"}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <MapPin className="h-3.5 w-3.5 shrink-0 text-neutral-400" />
                        <span className="truncate">
                          {job.remoteAllowed
                            ? "Remote"
                            : job.location || "N/A"}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Wallet className="h-3.5 w-3.5 shrink-0 text-neutral-400" />
                        <span className="truncate">
                          {formatSalary(job.salary)}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Calendar className="h-3.5 w-3.5 shrink-0 text-neutral-400" />
                        <span>Posted: {formatDate(job.createdAt)}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-1">
                      <Button
                        size="sm"
                        variant="outline"
                        aria-label={`View ${job.title}`}
                        onClick={() => handleOpenView(jobId)}
                        className="border-white/10 bg-transparent text-neutral-300 hover:bg-[#5c53fe]/10 hover:text-white"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>

                      <Button
                        size="sm"
                        variant="outline"
                        aria-label={`Edit ${job.title}`}
                        onClick={() =>
                          router.push(`/dashboard/recruiter/jobs/edit/${jobId}`)
                        }
                        className="border-white/10 bg-transparent text-neutral-300 hover:bg-[#5c53fe]/10 hover:text-white"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>

                      <DeleteJobDialog
                        jobId={jobId}
                        deletingId={deletingId}
                        onDelete={handleDelete}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* Desktop Table View (>= 1024px) */}
          {!loading && !error && jobs.length > 0 && (
            <div className="hidden w-full overflow-x-auto lg:block">
              <table className="w-full text-left">
                <thead className="bg-[#1b1b22]">
                  <tr className="border-b border-white/10">
                    <th className="px-6 py-4 text-xs font-semibold tracking-wider text-neutral-400 uppercase">
                      Job Title
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold tracking-wider text-neutral-400 uppercase">
                      Category
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold tracking-wider text-neutral-400 uppercase">
                      Job Type
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold tracking-wider text-neutral-400 uppercase">
                      Location
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold tracking-wider text-neutral-400 uppercase">
                      Salary
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold tracking-wider text-neutral-400 uppercase">
                      Posted Date
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold tracking-wider text-neutral-400 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-white/10">
                  {jobs.map((job, index) => {
                    const jobId = String(job._id ?? job.id ?? index)

                    return (
                      <tr
                        key={jobId}
                        className="transition-colors hover:bg-[#1c1c26]"
                      >
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-white">
                              {job.title}
                            </p>
                            <p className="mt-0.5 text-sm text-neutral-400">
                              {job.companyName}
                            </p>
                          </div>
                        </td>

                        <td className="px-6 py-4 text-sm whitespace-nowrap text-neutral-300">
                          {job.category || "N/A"}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex rounded-full border border-[#5c53fe]/25 bg-[#5c53fe]/10 px-3 py-1 text-xs font-medium text-[#a5a0ff] capitalize">
                            {job.jobType?.replaceAll("-", " ") || "N/A"}
                          </span>
                        </td>

                        <td className="px-6 py-4 text-sm whitespace-nowrap text-neutral-300">
                          {job.remoteAllowed
                            ? "Remote"
                            : job.location || "N/A"}
                        </td>

                        <td className="px-6 py-4 text-sm whitespace-nowrap text-neutral-300">
                          {formatSalary(job.salary)}
                        </td>

                        <td className="px-6 py-4 text-sm whitespace-nowrap text-neutral-400">
                          {formatDate(job.createdAt)}
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              aria-label={`View ${job.title}`}
                              onClick={() => handleOpenView(jobId)}
                              className="border-white/10 bg-transparent text-neutral-300 hover:bg-[#5c53fe]/10 hover:text-white"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>

                            <Button
                              size="sm"
                              variant="outline"
                              aria-label={`Edit ${job.title}`}
                              onClick={() =>
                                router.push(
                                  `/dashboard/recruiter/jobs/edit/${jobId}`
                                )
                              }
                              className="border-white/10 bg-transparent text-neutral-300 hover:bg-[#5c53fe]/10 hover:text-white"
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>

                            <DeleteJobDialog
                              jobId={jobId}
                              deletingId={deletingId}
                              onDelete={handleDelete}
                            />
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Table Footer */}
        {!loading && !error && jobs.length > 0 && (
          <div className="mt-4 text-sm text-neutral-400">
            Showing {jobs.length} {jobs.length === 1 ? "job" : "jobs"}
          </div>
        )}
      </div>

      {/* Job Details Dialog */}
      {selectedJobId && (
        <JobDetailsDialog
          jobId={selectedJobId}
          open={viewOpen}
          onOpenChange={setViewOpen}
        />
      )}
    </section>
  )
}