"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import {
  BriefcaseBusiness,
  Building2,
  MapPin,
  CalendarDays,
  Wallet,
  FileText,
  Monitor,
  ArrowLeft,
  Loader2,
  Save,
  X,
  AlertCircle,
  CheckCircle2,
} from "lucide-react"

import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"

import { updateJob } from "@/lib/api/jobs"
import { Job } from "@/types/jobs"

const jobTypes = [
  "Full time",
  "Part time",
  "Contract",
  "Internship",
]

const categories = [
  { value: "engineering-tech", label: "Engineering & Tech" },
  { value: "design", label: "Design" },
  { value: "marketing", label: "Marketing" },
  { value: "finance", label: "Finance" },
  { value: "sales", label: "Sales" },
]

const initialJob: Job = {
  title: "",
  companyName: "",
  category: "",
  jobType: "",
  remoteAllowed: false,
  location: "",
  description: "",
  deadline: "",
  salary: {
    min: null,
    max: null,
    frequency: "per year",
  },
}

export default function EditJobPage() {
  const router = useRouter()
  const pathname = usePathname()
  const jobId = pathname.split("/").filter(Boolean).pop() || ""

  const [job, setJob] = useState<Job>(initialJob)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fetch existing job details
  useEffect(() => {
    if (!jobId) {
      router.push("/dashboard/recruiter/jobs")
      return
    }

    const fetchJob = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/jobs/${jobId}`
        )

        const result = await res.json()

        if (!res.ok) {
          throw new Error(result.message || "Failed to load job")
        }

        const fetchedJob = result.job || result

        setJob({
          ...initialJob,
          ...fetchedJob,
          // Ensure ISO date strings format cleanly for <input type="date">
          deadline: fetchedJob.deadline
            ? String(fetchedJob.deadline).split("T")[0]
            : "",
          salary: {
            ...initialJob.salary,
            ...fetchedJob.salary,
          },
        })
      } catch (err) {
        console.error(err)
        setError("Unable to load job details. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchJob()
  }, [jobId, router])

  // Update individual job fields
  const handleChange = <K extends keyof Job>(field: K, value: Job[K]) => {
    setJob((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // Update salary fields
  const handleSalaryChange = (
    field: "min" | "max" | "frequency",
    value: string
  ) => {
    setJob((prev) => ({
      ...prev,
      salary: {
        ...prev.salary,
        [field]:
          field === "frequency"
            ? value
            : value === ""
              ? null
              : Number(value),
      },
    }))
  }

  // Submit updated job
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    if (!job.category) {
      setError("Please select a job category.")
      return
    }

    if (!job.jobType) {
      setError("Please select an employment type.")
      return
    }

    if (
      job.salary?.min !== null &&
      job.salary?.max !== null &&
      job.salary.min > job.salary.max
    ) {
      setError("Minimum salary cannot be greater than maximum salary.")
      return
    }

    setIsSubmitting(true)

    try {
      await updateJob(jobId, job)
      router.push("/dashboard/recruiter/jobs")
    } catch (err) {
      console.error(err)
      setError("Failed to update job. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputClass =
    "h-12 w-full rounded-xl border-[#292929] bg-[#151515] px-4 text-sm text-neutral-100 placeholder:text-neutral-500 focus-visible:border-[#5c53fe] focus-visible:ring-[#5c53fe]/20"

  const labelClass =
    "mb-2 block text-sm font-medium tracking-wide text-neutral-200"

  // Loading state
  if (isLoading) {
    return (
      <section className="min-h-screen bg-[#101010] px-4 py-24 text-white">
        <div className="mx-auto max-w-5xl">
          <div className="flex min-h-[500px] items-center justify-center">
            <div className="text-center">
              <Loader2 className="mx-auto mb-4 h-10 w-10 animate-spin text-[#5c53fe]" />
              <p className="text-sm text-neutral-400">
                Loading job details...
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Error state
  if (error && !job.title) {
    return (
      <section className="min-h-screen bg-[#101010] px-4 py-24 text-white">
        <div className="mx-auto flex min-h-[400px] max-w-5xl items-center justify-center">
          <div className="max-w-md text-center">
            <AlertCircle className="mx-auto mb-4 h-12 w-12 text-red-400" />

            <h2 className="mb-2 text-xl font-semibold text-neutral-100">
              Something went wrong
            </h2>

            <p className="mb-6 text-sm leading-relaxed text-neutral-400">
              {error}
            </p>

            <Button
              onClick={() => router.push("/dashboard/recruiter/jobs")}
              className="rounded-xl bg-[#5c53fe] px-6 text-sm font-medium text-white hover:bg-[#4b42e8]"
            >
              Back to Jobs
            </Button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="min-h-screen bg-[#101010] px-4 pb-20 pt-28 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Page Header */}
        <div className="mb-8">
          <button
            type="button"
            onClick={() => router.push("/dashboard/recruiter/jobs")}
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-neutral-400 transition-colors hover:text-white"
          >
            <ArrowLeft size={16} />
            Back to Job Listings
          </button>

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <div className="mb-2.5 flex items-center gap-2.5">
                <span className="rounded-lg bg-[#5c53fe]/15 p-2 text-[#817aff]">
                  <BriefcaseBusiness size={18} />
                </span>

                <span className="text-xs font-semibold uppercase tracking-wider text-[#817aff]">
                  Recruiter Dashboard
                </span>
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-neutral-100 sm:text-3xl">
                Edit Job Post
              </h1>

              <p className="mt-1.5 text-sm leading-relaxed text-neutral-400">
                Update your job information and keep your listing fresh.
              </p>
            </div>

            <div className="flex items-center gap-2 self-start rounded-full border border-[#5c53fe]/25 bg-[#5c53fe]/10 px-3.5 py-1.5">
              <span className="h-2 w-2 rounded-full bg-[#817aff]" />
              <span className="text-xs font-medium text-[#aaa5ff]">
                Editing Job
              </span>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <Card className="overflow-hidden rounded-2xl border border-[#292929] bg-[#141414] p-0 shadow-xl shadow-black/25">
          <form onSubmit={handleSubmit}>
            {/* Basic Information */}
            <div className="border-b border-[#292929] p-5 sm:p-8">
              <div className="mb-6 flex items-start gap-3.5">
                <div className="rounded-xl bg-[#5c53fe]/15 p-2.5 text-[#817aff]">
                  <BriefcaseBusiness size={20} />
                </div>

                <div>
                  <h2 className="text-base font-semibold text-neutral-100 sm:text-lg">
                    Basic Information
                  </h2>
                  <p className="mt-0.5 text-sm text-neutral-400">
                    Provide the essential details about this position.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {/* Job Title */}
                <div className="sm:col-span-2">
                  <label className={labelClass}>
                    Job Title <span className="text-red-400">*</span>
                  </label>

                  <Input
                    value={job.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    placeholder="e.g. Senior Frontend Developer"
                    required
                    className={inputClass}
                  />
                </div>

                {/* Company */}
                <div>
                  <label className={labelClass}>
                    Company Name <span className="text-red-400">*</span>
                  </label>

                  <div className="relative">
                    <Building2 className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />

                    <Input
                      value={job.companyName}
                      onChange={(e) =>
                        handleChange("companyName", e.target.value)
                      }
                      placeholder="Your company name"
                      required
                      className={`${inputClass} pl-10`}
                    />
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label className={labelClass}>
                    Job Category <span className="text-red-400">*</span>
                  </label>

                  <Select
                    value={job.category}
                    onValueChange={(value) => {
                      if (value !== null) handleChange("category", value)
                    }}
                  >
                    <SelectTrigger className="h-12 w-full rounded-xl border-[#292929] bg-[#151515] px-4 text-sm text-neutral-100 data-[placeholder]:text-neutral-500 focus:border-[#5c53fe] focus:ring-[#5c53fe]/20">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>

                    <SelectContent className="border-[#292929] bg-[#191919] text-neutral-100">
                      {categories.map((category) => (
                        <SelectItem
                          key={category.value}
                          value={category.value}
                          className="text-sm focus:bg-[#5c53fe]/20 focus:text-white"
                        >
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Job Type */}
                <div className="sm:col-span-2">
                  <label className={labelClass}>
                    Employment Type <span className="text-red-400">*</span>
                  </label>

                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {jobTypes.map((type) => {
                      const selected = job.jobType === type

                      return (
                        <button
                          key={type}
                          type="button"
                          onClick={() => handleChange("jobType", type)}
                          className={`flex items-center justify-center gap-1.5 rounded-xl border px-3 py-3 text-sm font-medium transition-all ${
                            selected
                              ? "border-[#5c53fe] bg-[#5c53fe]/15 text-[#aaa5ff] shadow-sm shadow-[#5c53fe]/10"
                              : "border-[#292929] bg-[#191919] text-neutral-400 hover:border-[#5c53fe]/50 hover:text-neutral-100"
                          }`}
                        >
                          {selected && <CheckCircle2 className="h-4 w-4 shrink-0" />}
                          <span>{type}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Location & Deadline */}
            <div className="border-b border-[#292929] p-5 sm:p-8">
              <div className="mb-6 flex items-start gap-3.5">
                <div className="rounded-xl bg-[#5c53fe]/15 p-2.5 text-[#817aff]">
                  <MapPin size={20} />
                </div>

                <div>
                  <h2 className="text-base font-semibold text-neutral-100 sm:text-lg">
                    Location & Availability
                  </h2>
                  <p className="mt-0.5 text-sm text-neutral-400">
                    Where will the candidate work?
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>
                    Job Location <span className="text-red-400">*</span>
                  </label>

                  <Input
                    value={job.location}
                    onChange={(e) => handleChange("location", e.target.value)}
                    placeholder="e.g. New York, USA"
                    required
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Application Deadline</label>

                  <div className="relative">
                    <CalendarDays className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />

                    <Input
                      type="date"
                      value={job.deadline || ""}
                      onChange={(e) =>
                        handleChange("deadline", e.target.value || null)
                      }
                      className={`${inputClass} pl-10 [color-scheme:dark]`}
                    />
                  </div>
                </div>

                {/* Remote Toggle */}
                <div className="sm:col-span-2">
                  <div className="flex items-center justify-between gap-4 rounded-xl border border-[#292929] bg-[#191919] p-4">
                    <div className="flex items-center gap-3.5">
                      <div className="rounded-lg bg-[#5c53fe]/15 p-2.5 text-[#817aff]">
                        <Monitor size={19} />
                      </div>

                      <div>
                        <p className="text-sm font-medium text-neutral-100">
                          Remote Work Available
                        </p>
                        <p className="mt-0.5 text-xs leading-relaxed text-neutral-400">
                          Allow candidates to work remotely from anywhere.
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      role="switch"
                      aria-checked={job.remoteAllowed}
                      onClick={() =>
                        handleChange("remoteAllowed", !job.remoteAllowed)
                      }
                      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                        job.remoteAllowed ? "bg-[#5c53fe]" : "bg-[#393939]"
                      }`}
                    >
                      <span
                        className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-all ${
                          job.remoteAllowed ? "left-6" : "left-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Salary Information */}
            <div className="border-b border-[#292929] p-5 sm:p-8">
              <div className="mb-6 flex items-start gap-3.5">
                <div className="rounded-xl bg-[#5c53fe]/15 p-2.5 text-[#817aff]">
                  <Wallet size={20} />
                </div>

                <div>
                  <h2 className="text-base font-semibold text-neutral-100 sm:text-lg">
                    Salary Information
                  </h2>
                  <p className="mt-0.5 text-sm text-neutral-400">
                    Set a competitive salary range for this position.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                <div>
                  <label className={labelClass}>Minimum Salary</label>

                  <Input
                    type="number"
                    min="0"
                    value={job.salary?.min ?? ""}
                    onChange={(e) => handleSalaryChange("min", e.target.value)}
                    placeholder="e.g. 50000"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Maximum Salary</label>

                  <Input
                    type="number"
                    min="0"
                    value={job.salary?.max ?? ""}
                    onChange={(e) => handleSalaryChange("max", e.target.value)}
                    placeholder="e.g. 80000"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Salary Frequency</label>

                  <Select
                    value={job.salary?.frequency || "per year"}
                    onValueChange={(value) => {
                      if (value !== null) {
                        handleSalaryChange("frequency", value)
                      }
                    }}
                  >
                    <SelectTrigger className="h-12 w-full rounded-xl border-[#292929] bg-[#151515] px-4 text-sm text-neutral-100 data-[placeholder]:text-neutral-500 focus:border-[#5c53fe] focus:ring-[#5c53fe]/20">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>

                    <SelectContent className="border-[#292929] bg-[#191919] text-neutral-100">
                      <SelectItem
                        value="per year"
                        className="text-sm focus:bg-[#5c53fe]/20 focus:text-white"
                      >
                        Per Year
                      </SelectItem>
                      <SelectItem
                        value="per month"
                        className="text-sm focus:bg-[#5c53fe]/20 focus:text-white"
                      >
                        Per Month
                      </SelectItem>
                      <SelectItem
                        value="per hour"
                        className="text-sm focus:bg-[#5c53fe]/20 focus:text-white"
                      >
                        Per Hour
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <p className="mt-4 flex items-center gap-1.5 text-xs text-neutral-400">
                <AlertCircle className="h-3.5 w-3.5 shrink-0 text-neutral-500" />
                <span>
                  Leave salary fields empty if you prefer not to disclose
                  compensation.
                </span>
              </p>
            </div>

            {/* Job Description */}
            <div className="p-5 sm:p-8">
              <div className="mb-6 flex items-start gap-3.5">
                <div className="rounded-xl bg-[#5c53fe]/15 p-2.5 text-[#817aff]">
                  <FileText size={20} />
                </div>

                <div>
                  <h2 className="text-base font-semibold text-neutral-100 sm:text-lg">
                    Job Description
                  </h2>
                  <p className="mt-0.5 text-sm text-neutral-400">
                    Describe the responsibilities and expectations.
                  </p>
                </div>
              </div>

              <div>
                <label className={labelClass}>Key Responsibilities</label>

                <textarea
                  value={job.description || ""}
                  onChange={(e) =>
                    handleChange("description", e.target.value || undefined)
                  }
                  rows={6}
                  placeholder="Describe the day-to-day responsibilities, required skills, and expectations..."
                  className="w-full resize-y rounded-xl border border-[#292929] bg-[#151515] p-4 text-sm leading-relaxed text-neutral-100 outline-none transition-all placeholder:text-neutral-500 focus:border-[#5c53fe] focus:ring-2 focus:ring-[#5c53fe]/15"
                />

                <p className="mt-2 text-right text-xs text-neutral-400">
                  {job.description?.length || 0} characters
                </p>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mx-5 mb-5 flex items-center gap-2.5 rounded-xl border border-red-500/25 bg-red-500/10 p-4 text-sm text-red-400 sm:mx-8">
                <AlertCircle size={18} className="shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Footer Actions */}
            <div className="flex flex-col-reverse gap-3 border-t border-[#292929] bg-[#111111] p-5 sm:flex-row sm:justify-end sm:px-8 sm:py-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/dashboard/recruiter/jobs")}
                disabled={isSubmitting}
                className="h-11 rounded-xl border-[#333333] bg-transparent px-6 text-sm font-medium text-neutral-300 hover:bg-[#222222] hover:text-white"
              >
                <X size={16} className="mr-2" />
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-11 rounded-xl bg-[#5c53fe] px-7 text-sm font-semibold text-white shadow-lg shadow-[#5c53fe]/20 transition-all hover:bg-[#4b42e8] disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating Job...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </form>
        </Card>

        <p className="mt-5 text-center text-xs text-neutral-500">
          Make sure all job information is accurate before saving your changes.
        </p>
      </div>
    </section>
  )
}