import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";

type CardProps = {
  title: string;
  description: string;
  image: string;
  url: string;
  tags?: string[];
};

export const OGPCard = ({
  title,
  description,
  image,
  url,
  tags = [],
}: CardProps) => {
  return (
    <Link href={url} passHref>
      <div className="w-80 h-64 rounded overflow-hidden shadow-lg m-4 cursor-pointer">
        <div className="w-full h-32 relative">
          <Image
            className="object-cover"
            src={image}
            alt={title}
            layout="fill"
          />
        </div>
        <Separator />
        <div className="px-6 py-2">
          <div className="font-bold text-base mb-1">{title}</div>
          <div className="flex flex-wrap">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="text-xs bg-gray-200 text-gray-800 px-2 py-1 rounded mr-2 mb-2"
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="text-gray-700 text-sm">{description}</p>
        </div>
      </div>
    </Link>
  );
};
