import { Job } from "@/app/dashboard/recruiter/jobs/page";


const BASE_URL =process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export const createJob = async (data: Job) => {
  const res = await fetch(`${BASE_URL}/jobs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  const result = await res.json()

  if (!res.ok) {
    throw new Error(result.message || "Failed to create job")
  }

  return result
}

 