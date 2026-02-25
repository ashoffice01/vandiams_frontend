import DiamondDetailsClient from "./DiamondDetailsClient";

export async function generateStaticParams() {
  return [
    { id: "1" },
    { id: "2" },
    { id: "3" },
    { id: "4" },
    { id: "5" },
  ];
}

export default async function Page({ params }) {
   const { id } = await params;

  return <DiamondDetailsClient id={id} />;
}