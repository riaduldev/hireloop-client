import { Job } from "@/types/jobs";

const BASE_URL =process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";


export const getJobs = async()=> {
    const res = await fetch(`${BASE_URL}/jobs`);
    return res.json()
}

export const deleteJob = async (id: string) => {
  const res = await fetch(`${BASE_URL}/jobs/${id}`, {
    method: "DELETE",
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(
      result.message || `Delete failed with status ${res.status}`
    );
  }

  return result;
};

export const getJobById = async (id: string) => {
  const res = await fetch(`${BASE_URL}/jobs/${id}`)

  const result = await res.json()

  if (!res.ok) {
    throw new Error(result.message || "Failed to get job details")
  }

  return result
}


export const updateJob = async (
  jobId: string,
  jobData: Job
) => {
  const response = await fetch(
    `${BASE_URL}/jobs/${jobId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jobData),
    }
  )

  if (!response.ok) {
    throw new Error("Failed to update job")
  }

  return response.json()
}