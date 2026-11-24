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

function getTodayDate() {
  const date = new Date()

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")

  return `${year}-${month}-${day}`
}

export default function NewJobPage() {
  const router = useRouter()

  // Form state
  const [title, setTitle] = useState("Frontend Developer")
  const [companyName, setCompanyName] = useState("Nexuslink Network")
  const [category, setCategory] = useState("engineering-tech")
  const [jobType, setJobType] = useState("Full time")
  
  const [remoteAllowed, setRemoteAllowed] = useState(true)
  const [location, setLocation] = useState("New York, USA")
  const [deadline, setDeadline] = useState("2025-12-31")
  
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

  if (
    minimum !== null &&
    maximum !== null &&
    minimum > maximum
  ) {
    toast.error("Minimum salary cannot be greater than maximum salary.")
    return
  }

const jobData:JobFormData = {
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


  try {
    setLoading(true)

    console.log("Job data:", jobData)

    toast.success("Form validation successful!", {
      description: "Your job information is ready to submit.",
    })
  } catch (error) {
    console.error(error)
    toast.error("Something went wrong!", {
      description: "Please try again.",
    })
  } finally {
    setLoading(false)
  }
  
  const result =await createJob(jobData)
  console.log(result);
}


  return (
    <main className="min-h-screen bg-[#05050a] text-white pb-20 font-sans">
      {/* Top Navigation / Breadcrumb Area */}
      <div className="border-b border-white/5 bg-[#05050a]">
        <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-xs text-white/40 mb-1 flex items-center gap-1">
                <span>Recruiter Jobs</span>
                <span>/</span>
                <span>Create New Listing</span>
              </p>
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Post a New Job</h1>
              <p className="mt-1 text-sm text-white/60">
                Fill in the position specification to attract qualified candidates across our platform.
              </p>
            </div>
            <Button 
              type="button"
              variant="outline"
              onClick={() => router.push("/dashboard/recruiter/jobs")}
              className="rounded-lg border-[#5c53fe]/30 bg-[#5c53fe]/10 text-[#a8a3ff] hover:bg-[#5c53fe]/20 hover:text-white transition-colors w-full sm:w-auto self-start"
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
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#5c53fe]/20 text-xs font-bold text-[#8d86ff]">
                1
              </div>
              <h2 className="text-lg font-semibold text-white">Basic Information</h2>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80">Job Title <span className="text-red-400">*</span></label>
                <Input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Senior Frontend Developer"
                  required
                  className="h-11 border-white/10 bg-[#0f0f15] text-white placeholder:text-white/30 focus-visible:ring-[#5c53fe]/50"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80">Company Name <span className="text-red-400">*</span></label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                    <Input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="Your company name"
                      required
                      className="h-11 pl-10 border-white/10 bg-[#0f0f15] text-white placeholder:text-white/30 focus-visible:ring-[#5c53fe]/50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80">Job Category <span className="text-red-400">*</span></label>
                  <Select
                    value={category}
                    onValueChange={(value) => {
                      if (value !== null) setCategory(value)
                    }}
                  >
                    <SelectTrigger className="h-11 border-white/10 bg-[#0f0f15] text-white focus:ring-[#5c53fe]/50">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="border-white/10 bg-[#141418] text-white">
                      <SelectItem value="engineering-tech">Engineering & Tech</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="sales">Sales</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80">Job Type <span className="text-red-400">*</span></label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {["Full time", "Part time", "Contract", "Internship"].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setJobType(type)}
                      className={`flex items-center justify-center rounded-lg border py-2.5 text-sm font-medium transition-all ${
                        jobType === type
                          ? "border-[#5c53fe] bg-[#5c53fe]/10 text-[#a8a3ff]"
                          : "border-white/10 bg-[#0f0f15] text-white/60 hover:bg-white/5"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Location, Compensation & Timeline */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 border-b border-white/10 pb-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#5c53fe]/20 text-xs font-bold text-[#8d86ff]">
                2
              </div>
              <h2 className="text-lg font-semibold text-white">Location, Compensation & Timeline</h2>
            </div>

            <div className="space-y-4">
              {/* Remote Toggle Card */}
              <div className="flex items-center justify-between rounded-lg border border-white/10 bg-[#0f0f15] p-4">
                <div className="flex items-center gap-3">
                  <div className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full bg-[#5c53fe]/10">
                    <MapPin className="h-5 w-5 text-[#8d86ff]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Remote Work Allowed (Worldwide)</p>
                    <p className="text-xs text-white/50">Enable candidates to work from any location.</p>
                  </div>
                </div>
                {/* Custom Toggle Switch */}
                <button
                  type="button"
                  role="switch"
                  aria-checked={remoteAllowed}
                  onClick={() => setRemoteAllowed(!remoteAllowed)}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80">Application Deadline</label>
                  <div className="relative">
                    <CalendarIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                    <Input
                      type="date"
                      value={deadline}
                      onChange={(e) => setDeadline(e.target.value)}
                      className="h-11 pl-10 border-white/10 bg-[#0f0f15] text-white placeholder:text-white/30 focus-visible:ring-[#5c53fe]/50 [color-scheme:dark]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                    <Input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. New York, USA or Remote"
                      className="h-11 pl-10 border-white/10 bg-[#0f0f15] text-white placeholder:text-white/30 focus-visible:ring-[#5c53fe]/50"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80">Min Salary / Rate</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40">$</span>
                    <Input
                      type="number"
                      value={minSalary}
                      onChange={(e) => setMinSalary(e.target.value)}
                      placeholder="0"
                      className="h-11 pl-8 border-white/10 bg-[#0f0f15] text-white placeholder:text-white/30 focus-visible:ring-[#5c53fe]/50"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80">Max Salary / Rate</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40">$</span>
                    <Input
                      type="number"
                      value={maxSalary}
                      onChange={(e) => setMaxSalary(e.target.value)}
                      placeholder="0"
                      className="h-11 pl-8 border-white/10 bg-[#0f0f15] text-white placeholder:text-white/30 focus-visible:ring-[#5c53fe]/50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80">Frequency</label>
                  <Select
                    value={salaryFrequency}
                    onValueChange={(value) => {
                      if (value !== null) setSalaryFrequency(value)
                    }}
                  >
                    <SelectTrigger className="h-11 border-white/10 bg-[#0f0f15] text-white focus:ring-[#5c53fe]/50">
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
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#5c53fe]/20 text-xs font-bold text-[#8d86ff]">
                3
              </div>
              <h2 className="text-lg font-semibold text-white">Requirements & Responsibilities</h2>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80">Key Responsibilities</label>
                <textarea
                  value={responsibilities}
                  onChange={(e) => setResponsibilities(e.target.value)}
                  rows={4}
                  className="w-full rounded-md border border-white/10 bg-[#0f0f15] p-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-[#5c53fe]/50 resize-none"
                  placeholder="Describe the day-to-day responsibilities..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80">Qualifications & Requirements</label>
                <textarea
                  value={qualifications}
                  onChange={(e) => setQualifications(e.target.value)}
                  rows={4}
                  className="w-full rounded-md border border-white/10 bg-[#0f0f15] p-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-[#5c53fe]/50 resize-none"
                  placeholder="List the required skills, experience, and qualifications..."
                />
              </div>
            </div>
          </section>

          {errorMsg && (
            <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-4">
              <p className="text-sm text-red-400">{errorMsg}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-white/10">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/dashboard/recruiter/jobs")}
              className="w-full sm:w-auto border-white/10 bg-transparent text-white hover:bg-white/5"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto rounded-lg bg-[#5c53fe] px-8 text-white hover:bg-[#5c53fe]/90 transition-colors"
            >
              {loading ? "Publishing..." : "Post Job"}
            </Button>
          </div>
        </form>
      </div>
    </main>
  )
}