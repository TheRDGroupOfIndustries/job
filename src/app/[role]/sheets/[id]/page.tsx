import Luckysheet from "@/components/Luckysheet";

export default async function Page ({params}: {params: {id: string}}) {
    const {id} = await params;
  return (
    <Luckysheet id={id} />
  );
};
