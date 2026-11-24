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