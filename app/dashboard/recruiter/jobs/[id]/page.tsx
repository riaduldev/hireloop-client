import JobDetailsDialog from "@/app/components/JobDetailsDialog"

type JobDetailsPageProps = {
  params: Promise<{
    id: string
  }>
}

const JobDetailsPage = async ({ params }: JobDetailsPageProps) => {
  const { id } = await params
  return (
    <div>
      <JobDetailsDialog
        jobId={id}
        open={true}
        onOpenChange={() => {}}
      ></JobDetailsDialog>
    </div>
  )
}

export default JobDetailsPage
