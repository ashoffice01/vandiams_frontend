import Image from "next/image";

type Props = {
  title: string;
  image: string;
};

export default function CollectionCard({ title, image }: Props) {
  return (
    <div className="group relative overflow-hidden">
      <Image
        src={image}
        alt={title}
        width={600}
        height={600}
        className="w-full h-[420px] object-cover transition-transform duration-500 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />

      <div className="absolute inset-0 flex items-center justify-center">
        <h3 className="font-serif text-white text-3xl tracking-wide">
          {title}
        </h3>
      </div>
    </div>
  );
}
