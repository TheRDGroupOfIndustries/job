import ApplicationDetails from "@/components/ApplicationDetails";

export default async function Page ({ params }: { params: { id: string }}) {
  const { id } = await params;

  return (
    <ApplicationDetails id={id} />
  );
};
