"use client"

import { useEffect, useState } from "react"
import {
  BriefcaseBusiness,
  MapPin,
  CalendarDays,
  Building2,
  Banknote,
  Clock,
  Globe,
  Loader2,
} from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { getJobById } from "@/lib/api/jobs"
import { Job } from "@/types/jobs"



type JobDetailsDialogProps = {
  jobId: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function JobDetailsDialog({
  jobId,
  open,
  onOpenChange,
}: JobDetailsDialogProps) {
  const [job, setJob] = useState<Job | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!open || !jobId) return

    const fetchJobDetails = async () => {
      try {
        setLoading(true)
        setError("")
        setJob(null)

        const result = await getJobById(jobId)
        console.log("API RESULT:", result)
        setJob(result)
      } catch (error) {
        console.error("JOB DETAILS ERROR:", error)
        setError(
          error instanceof Error
            ? error.message
            : "Failed to load job details"
        )
      } finally {
        setLoading(false)
      }
    }

    fetchJobDetails()
  }, [open, jobId])

  const formatSalary = () => {
    if (!job?.salary) return "Not specified"

    const { min, max, frequency } = job.salary

    if (min && max) {
      return `$${min.toLocaleString()} - $${max.toLocaleString()} / ${frequency}`
    }

    if (min) return `$${min.toLocaleString()} / ${frequency}`
    if (max) return `$${max.toLocaleString()} / ${frequency}`

    return "Not specified"
  }

  const formatDate = (date: string | null) => {
    if (!date) return "Not specified"

    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] w-[calc(100%-24px)] max-w-3xl overflow-y-auto border-white/10 bg-[#141418] p-4 text-white sm:p-6">
        {loading ? (
          <div className="flex min-h-[300px] flex-col items-center justify-center gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-[#5c53fe]" />
            <p className="text-sm text-gray-400">
              Loading job details...
            </p>
          </div>
        ) : error ? (
          <div className="flex min-h-[250px] flex-col items-center justify-center gap-3 text-center">
            <p className="text-red-400">{error}</p>
          </div>
        ) : job ? (
          <>
            <DialogHeader className="border-b border-white/10 pb-5 text-left">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-[#5c53fe]/10 text-[#8b85ff]">
                <BriefcaseBusiness className="h-6 w-6" />
              </div>

              <DialogTitle className="pr-6 text-xl font-bold sm:text-2xl">
                {job.title}
              </DialogTitle>

              <DialogDescription className="flex flex-wrap items-center gap-2 text-gray-400">
                <Building2 className="h-4 w-4" />
                {job.companyName}
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-1 gap-3 py-5 sm:grid-cols-2">
              <DetailItem
                icon={<BriefcaseBusiness />}
                label="Category"
                value={job.category}
              />

              <DetailItem
                icon={<Clock />}
                label="Job Type"
                value={job.jobType.replaceAll("-", " ")}
              />

              <DetailItem
                icon={<MapPin />}
                label="Location"
                value={job.location}
              />

              <DetailItem
                icon={<Globe />}
                label="Work Mode"
                value={job.remoteAllowed ? "Remote" : "On-site"}
              />

              <DetailItem
                icon={<Banknote />}
                label="Salary"
                value={formatSalary()}
              />

              <DetailItem
                icon={<CalendarDays />}
                label="Application Deadline"
                value={formatDate(job.deadline)}
              />
            </div>

            <div className="rounded-xl border border-white/10 bg-[#101014] p-4 sm:p-5">
              <h3 className="mb-3 text-base font-semibold text-white">
                Job Description
              </h3>

              <p className="text-sm leading-7 whitespace-pre-line text-gray-400">
                {job.description || "No job description provided."}
              </p>
            </div>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  )
}

function DetailItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="flex min-w-0 items-start gap-3 rounded-xl border border-white/10 bg-[#101014] p-3 sm:p-4">
      <div className="mt-0.5 shrink-0 text-[#8b85ff] [&>svg]:h-5 [&>svg]:w-5">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-xs text-gray-500">{label}</p>
        <p className="mt-1 break-words text-sm font-medium capitalize text-gray-200">
          {value}
        </p>
      </div>
    </div>
  )
}