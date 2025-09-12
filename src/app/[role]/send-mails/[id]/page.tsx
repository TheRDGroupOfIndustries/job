import MailDetails from "@/components/MailDetails";


export default function Page({ params }: { params: { id: string } }) {
    const { id } = params;
    console.log(id);
    
  return (
    <MailDetails id={id}/>
  );
}
