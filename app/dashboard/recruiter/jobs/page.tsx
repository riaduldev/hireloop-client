"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Pencil, Trash2, BriefcaseBusiness } from "lucide-react"

import { Button } from "@/components/ui/button"
import { getJobs, deleteJob } from "@/lib/api/jobs"
import DeleteJobDialog from "@/app/components/DeleteJobDialog"
import { toast } from "sonner"

export type Job = {
  _id?: string
  id?: string | number
  title: string
  companyName: string
  category: string
  jobType: string
  remoteAllowed: boolean
  location: string
  deadline: string | null
  salary: {
    min: number | null
    max: number | null
    frequency: string
  }
  createdAt?: string
}

export default function JobsPage() {
  const router = useRouter()

  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [deletingId, setDeletingId] = useState<string | null>(null)

  // Fetch all jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true)
        setError("")

        const result = await getJobs()

        // Handle different API response formats
        if (Array.isArray(result)) {
          setJobs(result)
        } else if (Array.isArray(result.data)) {
          setJobs(result.data)
        } else if (Array.isArray(result.jobs)) {
          setJobs(result.jobs)
        } else {
          setJobs([])
        }
      } catch (error) {
        console.error("Failed to fetch jobs:", error)
        setError("Failed to load jobs. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchJobs()
  }, [])

  // Delete job
  const handleDelete = async (id: string): Promise<boolean> => {
  try {
    setDeletingId(id);

    await deleteJob(id);

    setJobs((prevJobs) =>
      prevJobs.filter(
        (job) => String(job._id ?? job.id) !== id
      )
    );

    toast.success("Job deleted successfully!");

    return true;
  } catch (error) {
    console.error("Delete job error:", error);

    toast.error(
      error instanceof Error
        ? error.message
        : "Failed to delete job!"
    );

    return false;
  } finally {
    setDeletingId(null);
  }
};

  // Format salary
  const formatSalary = (salary: Job["salary"]) => {
    if (!salary) return "Not specified"

    const { min, max, frequency } = salary

    if (min && max) {
      return `$${min.toLocaleString()} - $${max.toLocaleString()}`
    }

    if (min) {
      return `$${min.toLocaleString()}+`
    }

    if (max) {
      return `Up to $${max.toLocaleString()}`
    }

    return "Negotiable"
  }

  // Format date
  const formatDate = (date?: string) => {
    if (!date) return "N/A"

    const formattedDate = new Date(date)

    if (isNaN(formattedDate.getTime())) return "N/A"

    return formattedDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
  }

  return (
    <section className="min-h-screen bg-[#0a0a0f] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1320px]">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">Manage Jobs</h1>

            <p className="mt-2 text-sm text-gray-400">
              Manage and track all your posted jobs.
            </p>
          </div>

          <Button
            onClick={() => router.push("/dashboard/recruiter/jobs/new")}
            className="bg-[#5c53fe] text-white hover:bg-[#4b42e8]"
          >
            <BriefcaseBusiness className="mr-2 h-4 w-4" />
            Post a Job
          </Button>
        </div>

        {/* Table Container */}
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
              <p className="text-red-400">{error}</p>

              <Button
                onClick={() => window.location.reload()}
                className="mt-4 bg-[#5c53fe] hover:bg-[#4b42e8]"
              >
                Try Again
              </Button>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && jobs.length === 0 && (
            <div className="flex min-h-[300px] flex-col items-center justify-center px-4 text-center">
              <BriefcaseBusiness className="mb-4 h-12 w-12 text-gray-500" />

              <h3 className="text-lg font-semibold">No jobs found</h3>

              <p className="mt-2 text-sm text-gray-400">
                You haven&apos;t posted any jobs yet.
              </p>

              <Button
                onClick={() => router.push("/dashboard/recruiter/jobs/new")}
                className="mt-5 bg-[#5c53fe] hover:bg-[#4b42e8]"
              >
                Post Your First Job
              </Button>
            </div>
          )}

          {/* Jobs Table */}
          {!loading && !error && jobs.length > 0 && (
            <div className="w-full overflow-x-auto">
              <table className="w-full min-w-[1150px] text-left">
                {/* Table Header */}
                <thead className="bg-[#1b1b22]">
                  <tr className="border-b border-white/10">
                    <th className="px-6 py-5 text-xs font-semibold tracking-wider text-gray-400 uppercase">
                      Job Title
                    </th>

                    <th className="px-6 py-5 text-xs font-semibold tracking-wider text-gray-400 uppercase">
                      Category
                    </th>

                    <th className="px-6 py-5 text-xs font-semibold tracking-wider text-gray-400 uppercase">
                      Job Type
                    </th>

                    <th className="px-6 py-5 text-xs font-semibold tracking-wider text-gray-400 uppercase">
                      Location
                    </th>

                    <th className="px-6 py-5 text-xs font-semibold tracking-wider text-gray-400 uppercase">
                      Salary
                    </th>

                    <th className="px-6 py-5 text-xs font-semibold tracking-wider text-gray-400 uppercase">
                      Posted Date
                    </th>

                    <th className="px-6 py-5 text-center text-xs font-semibold tracking-wider text-gray-400 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                  {jobs.map((job) => {
                    const jobId = String(job._id ?? job.id)

                    return (
                      <tr
                        key={jobId}
                        className="border-b border-white/10 transition-colors hover:bg-[#1c1c26]"
                      >
                        {/* Job Title */}
                        <td className="px-6 py-5">
                          <div>
                            <p className="font-medium whitespace-nowrap text-white">
                              {job.title}
                            </p>

                            <p className="mt-1 text-sm text-gray-400">
                              {job.companyName}
                            </p>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="px-6 py-5">
                          <span className="text-sm whitespace-nowrap text-gray-300">
                            {job.category}
                          </span>
                        </td>

                        {/* Job Type */}
                        <td className="px-6 py-5">
                          <span className="inline-flex rounded-full border border-[#5c53fe]/20 bg-[#5c53fe]/10 px-3 py-1 text-xs font-medium whitespace-nowrap text-[#a5a0ff] capitalize">
                            {job.jobType?.replaceAll("-", " ")}
                          </span>
                        </td>

                        {/* Location */}
                        <td className="px-6 py-5">
                          <span className="text-sm whitespace-nowrap text-gray-300">
                            {job.remoteAllowed ? "Remote" : job.location}
                          </span>
                        </td>

                        {/* Salary */}
                        <td className="px-6 py-5">
                          <span className="text-sm whitespace-nowrap text-gray-300">
                            {formatSalary(job.salary)}
                          </span>
                        </td>

                        {/* Posted Date */}
                        <td className="px-6 py-5">
                          <span className="text-sm whitespace-nowrap text-gray-400">
                            {formatDate(job.createdAt)}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-5">
                          <div className="flex items-center justify-center gap-2">
                            {/* Edit Button */}
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                router.push(
                                  `/dashboard/recruiter/jobs/edit/${jobId}`
                                )
                              }
                              className="border-white/10 bg-transparent text-gray-300 hover:bg-[#5c53fe]/10 hover:text-white"
                            >
                              <Pencil className="mr-1 h-4 w-4" />
                            </Button>

                            {/* Delete Button */}
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
          <div className="mt-4 text-sm text-gray-500">
            Showing {jobs.length} jobs
          </div>
        )}
      </div>
    </section>
  )
}
