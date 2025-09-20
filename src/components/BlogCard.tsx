"use client"

import { urlFor } from "@/lib/sanity";
import { RootState } from "@/redux/store";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function BlogCard ({ post }: { post: any }) {
   const { title, slug, mainImage, author } = post;
  const { userData } = useSelector((state: RootState) => state.auth)

  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white">
      {mainImage && mainImage.asset && (
        <div className="relative w-full h-48">
          <Image
            src={urlFor(post.mainImage).width(1200).height(600).url()}
            alt={mainImage.alt || "Blog Post Image"}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg" // Add a class for rounded corners
          />
        </div>
      )}
      <div className="p-4 flex flex-col items-center text-center">
        <h3 className="font-bold text-xl mb-2 text-gray-800">{title}</h3>
        <p className="text-gray-600 text-sm">
          By <span className="font-semibold">{author}</span>
        </p>
        <Link href={`/${userData?.role}/blogs/${slug.current}`} passHref className="inline-block mt-4 px-6 py-2 text-sm font-semibold text-white bg-orange-500 rounded-full hover:bg-orange-600 transition-colors">
            Read More
        </Link>
      </div>
    </div>
  );
};
