"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ChevronLeft, MapPin, Building2, CalendarIcon } from "lucide-react"
import { toast } from "sonner"
import { createJob } from "@/lib/actions/jobs"

export type JobFormData = {
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
  responsibilities: string
  qualifications: string
}

const JOB_TYPES = ["Full time", "Part time", "Contract", "Internship"] as const

const CATEGORIES = [
  { value: "engineering-tech", label: "Engineering & Tech" },
  { value: "design", label: "Design" },
  { value: "marketing", label: "Marketing" },
  { value: "finance", label: "Finance" },
  { value: "sales", label: "Sales" },
] as const

function formatLocalDate(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

function getTodayDate(): string {
  return formatLocalDate(new Date())
}

function getDefaultDeadline(): string {
  const future = new Date()
  future.setDate(future.getDate() + 30)
  return formatLocalDate(future)
}

export default function NewJobPage() {
  const router = useRouter()

  const [title, setTitle] = useState("Frontend Developer")
  const [companyName, setCompanyName] = useState("Nexuslink Network")
  const [category, setCategory] = useState("engineering-tech")
  const [jobType, setJobType] = useState("Full time")

  const [remoteAllowed, setRemoteAllowed] = useState(true)
  const [location, setLocation] = useState("New York, USA")
  const [deadline, setDeadline] = useState(getDefaultDeadline)

  const [minSalary, setMinSalary] = useState("80")
  const [maxSalary, setMaxSalary] = useState("120")
  const [salaryFrequency, setSalaryFrequency] = useState("per year")

  const [responsibilities, setResponsibilities] = useState(
    "Spearhead our commitment to delivering exceptional user experiences and digital interfaces. You will collaborate closely with product managers and backend engineers to craft responsive, intuitive web applications for millions."
  )
  const [qualifications, setQualifications] = useState(
    "5+ years of experience with React, TypeScript, and modern CSS frameworks\nSolid understanding of DOM performance and component-driven design\nExperience partnering closely with product teams and UX/UI designers"
  )

  const [errorMsg, setErrorMsg] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErrorMsg("")

    if (!title.trim()) {
      toast.error("Job title is required.")
      return
    }

    if (!companyName.trim()) {
      toast.error("Company name is required.")
      return
    }

    if (!category) {
      toast.error("Please select a job category.")
      return
    }

    if (!jobType) {
      toast.error("Please select a job type.")
      return
    }

    if (!location.trim()) {
      toast.error("Location is required.")
      return
    }

    if (deadline && deadline < getTodayDate()) {
      toast.error("Application deadline cannot be in the past.")
      return
    }

    const minimum = minSalary.trim() ? Number(minSalary) : null
    const maximum = maxSalary.trim() ? Number(maxSalary) : null

    if (minimum !== null && (!Number.isFinite(minimum) || minimum < 0)) {
      toast.error("Minimum salary must be a valid non-negative number.")
      return
    }

    if (maximum !== null && (!Number.isFinite(maximum) || maximum < 0)) {
      toast.error("Maximum salary must be a valid non-negative number.")
      return
    }

    if (minimum !== null && maximum !== null && minimum > maximum) {
      toast.error("Minimum salary cannot be greater than maximum salary.")
      return
    }

    const jobData: JobFormData = {
      title: title.trim(),
      companyName: companyName.trim(),
      category,
      jobType,
      remoteAllowed,
      location: location.trim(),
      deadline: deadline || null,
      salary: {
        min: minimum,
        max: maximum,
        frequency: salaryFrequency,
      },
      responsibilities: responsibilities.trim(),
      qualifications: qualifications.trim(),
    }

    setLoading(true)

    try {
      const result = await createJob(jobData)

      if (result && typeof result === "object" && "error" in result && result.error) {
        const message = String(result.error)
        setErrorMsg(message)
        toast.error(message)
        return
      }

      toast.success("Job posted successfully!")
      router.push("/dashboard/recruiter/jobs")
      router.refresh()
    } catch (error) {
      console.error("Failed to create job:", error)
      const message =
        error instanceof Error ? error.message : "Failed to publish job. Please try again."
      setErrorMsg(message)
      toast.error("Something went wrong!", {
        description: message,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#05050a] pb-20 font-sans text-white">
      {/* Top Navigation / Breadcrumb Area */}
      <div className="border-b border-white/10 bg-[#05050a]">
        <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="mb-1 flex flex-wrap items-center gap-1 text-xs text-neutral-400">
                <span>Recruiter Jobs</span>
                <span>/</span>
                <span className="text-neutral-300">Create New Listing</span>
              </p>
              <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Post a New Job
              </h1>
              <p className="mt-1 text-sm text-neutral-400">
                Fill in the position specification to attract qualified candidates across our platform.
              </p>
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/dashboard/recruiter/jobs")}
              className="w-full shrink-0 rounded-lg border-[#5c53fe]/30 bg-[#5c53fe]/10 text-[#a8a3ff] transition-colors hover:bg-[#5c53fe]/20 hover:text-white sm:w-auto sm:self-start"
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Job List
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section 1: Basic Information */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 border-b border-white/10 pb-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#5c53fe]/20 text-xs font-bold text-[#8d86ff]">
                1
              </div>
              <h2 className="text-lg font-semibold text-white">
                Basic Information
              </h2>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-neutral-200">
                  Job Title <span className="text-red-400">*</span>
                </label>
                <Input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Senior Frontend Developer"
                  required
                  className="h-11 w-full border-white/10 bg-[#0f0f15] text-white placeholder:text-neutral-500 focus-visible:ring-[#5c53fe]/50"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-neutral-200">
                    Company Name <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <Building2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                    <Input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="Your company name"
                      required
                      className="h-11 w-full border-white/10 bg-[#0f0f15] pl-10 text-white placeholder:text-neutral-500 focus-visible:ring-[#5c53fe]/50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-neutral-200">
                    Job Category <span className="text-red-400">*</span>
                  </label>
                  <Select
                    value={category}
                    onValueChange={(value) => {
                      if (value !== null) setCategory(value)
                    }}
                  >
                    <SelectTrigger className="h-11 w-full border-white/10 bg-[#0f0f15] text-white focus:ring-[#5c53fe]/50">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="border-white/10 bg-[#141418] text-white">
                      {CATEGORIES.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-neutral-200">
                  Job Type <span className="text-red-400">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                  {JOB_TYPES.map((type) => {
                    const isSelected = jobType === type
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setJobType(type)}
                        className={`flex min-h-11 items-center justify-center rounded-lg border px-3 py-2.5 text-sm font-medium transition-all ${
                          isSelected
                            ? "border-[#5c53fe] bg-[#5c53fe]/15 text-[#a8a3ff]"
                            : "border-white/10 bg-[#0f0f15] text-neutral-400 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        {type}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Location, Compensation & Timeline */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 border-b border-white/10 pb-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#5c53fe]/20 text-xs font-bold text-[#8d86ff]">
                2
              </div>
              <h2 className="text-lg font-semibold text-white">
                Location, Compensation & Timeline
              </h2>
            </div>

            <div className="space-y-4">
              {/* Remote Toggle Card */}
              <div className="flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-[#0f0f15] p-4">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#5c53fe]/10 sm:flex">
                    <MapPin className="h-5 w-5 text-[#8d86ff]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white">
                      Remote Work Allowed (Worldwide)
                    </p>
                    <p className="text-xs text-neutral-400">
                      Enable candidates to work from any location.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  role="switch"
                  aria-label="Remote Work Allowed"
                  aria-checked={remoteAllowed}
                  onClick={() => setRemoteAllowed((prev) => !prev)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    remoteAllowed ? "bg-[#5c53fe]" : "bg-white/20"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      remoteAllowed ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-neutral-200">
                    Application Deadline
                  </label>
                  <div className="relative">
                    <CalendarIcon className="pointer-events-none left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400 absolute" />
                    <Input
                      type="date"
                      value={deadline}
                      onChange={(e) => setDeadline(e.target.value)}
                      className="h-11 w-full border-white/10 bg-[#0f0f15] pl-10 text-white placeholder:text-neutral-500 focus-visible:ring-[#5c53fe]/50 [color-scheme:dark]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-neutral-200">
                    Location <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                    <Input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. New York, USA or Remote"
                      required
                      className="h-11 w-full border-white/10 bg-[#0f0f15] pl-10 text-white placeholder:text-neutral-500 focus-visible:ring-[#5c53fe]/50"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-neutral-200">
                    Min Salary / Rate
                  </label>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
                      $
                    </span>
                    <Input
                      type="number"
                      min="0"
                      value={minSalary}
                      onChange={(e) => setMinSalary(e.target.value)}
                      placeholder="0"
                      className="h-11 w-full border-white/10 bg-[#0f0f15] pl-8 text-white placeholder:text-neutral-500 focus-visible:ring-[#5c53fe]/50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-neutral-200">
                    Max Salary / Rate
                  </label>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
                      $
                    </span>
                    <Input
                      type="number"
                      min="0"
                      value={maxSalary}
                      onChange={(e) => setMaxSalary(e.target.value)}
                      placeholder="0"
                      className="h-11 w-full border-white/10 bg-[#0f0f15] pl-8 text-white placeholder:text-neutral-500 focus-visible:ring-[#5c53fe]/50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-neutral-200">
                    Frequency
                  </label>
                  <Select
                    value={salaryFrequency}
                    onValueChange={(value) => {
                      if (value !== null) setSalaryFrequency(value)
                    }}
                  >
                    <SelectTrigger className="h-11 w-full border-white/10 bg-[#0f0f15] text-white focus:ring-[#5c53fe]/50">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent className="border-white/10 bg-[#141418] text-white">
                      <SelectItem value="per year">per year</SelectItem>
                      <SelectItem value="per month">per month</SelectItem>
                      <SelectItem value="per hour">per hour</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Requirements & Responsibilities */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 border-b border-white/10 pb-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#5c53fe]/20 text-xs font-bold text-[#8d86ff]">
                3
              </div>
              <h2 className="text-lg font-semibold text-white">
                Requirements & Responsibilities
              </h2>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-neutral-200">
                  Key Responsibilities
                </label>
                <textarea
                  value={responsibilities}
                  onChange={(e) => setResponsibilities(e.target.value)}
                  rows={4}
                  className="w-full resize-y rounded-md border border-white/10 bg-[#0f0f15] p-3 text-sm leading-relaxed text-white placeholder:text-neutral-500 focus:border-[#5c53fe] focus:outline-none focus:ring-1 focus:ring-[#5c53fe]/50"
                  placeholder="Describe the day-to-day responsibilities..."
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-neutral-200">
                  Qualifications & Requirements
                </label>
                <textarea
                  value={qualifications}
                  onChange={(e) => setQualifications(e.target.value)}
                  rows={4}
                  className="w-full resize-y rounded-md border border-white/10 bg-[#0f0f15] p-3 text-sm leading-relaxed text-white placeholder:text-neutral-500 focus:border-[#5c53fe] focus:outline-none focus:ring-1 focus:ring-[#5c53fe]/50"
                  placeholder="List the required skills, experience, and qualifications..."
                />
              </div>
            </div>
          </section>

          {errorMsg && (
            <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-4">
              <p className="text-sm text-red-400">{errorMsg}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col-reverse gap-3 border-t border-white/10 pt-5 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              disabled={loading}
              onClick={() => router.push("/dashboard/recruiter/jobs")}
              className="h-11 w-full border-white/10 bg-transparent text-neutral-200 hover:bg-white/5 hover:text-white sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="h-11 w-full rounded-lg bg-[#5c53fe] px-8 font-medium text-white transition-colors hover:bg-[#5c53fe]/90 sm:w-auto"
            >
              {loading ? "Publishing..." : "Post Job"}
            </Button>
          </div>
        </form>
      </div>
    </main>
  )
}