export type Job = {
  _id?: string
  id?: string | number
  title: string
  companyName: string
  category: string
  jobType: string
  remoteAllowed: boolean
  location: string
  description?: string
  deadline: string | null
  salary: {
    min: number | null
    max: number | null
    frequency: string
  }
  createdAt?: string
}