import { client } from "@/sanity/lib/client";
import { notFound } from "next/navigation";
import Image from "next/image";
import { PortableText, PortableTextReactComponents } from "@portabletext/react";
import { singlePostQuery, urlFor } from "@/lib/sanity";
import { ReactNode } from "react";

// Define a type for the Post data
interface Post {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  mainImage: {
    alt: string;
    asset: {
      _ref: string;
    };
  };
  body: any; // Use a more specific type if you have one, e.g., PortableTextBlock[]
}

// This function tells Next.js to pre-render pages for all existing posts
// export async function generateStaticParams() {
//   const posts = await client.fetch(`*[_type == "post"] { "slug": slug.current }`);
//   return posts.map((post: { slug: string }) => ({
//     slug: post.slug,
//   }));
// }

// Custom components for rendering Sanity Portable Text
const myPortableTextComponents: Partial<PortableTextReactComponents> = {
  types: {
    image: ({ value }: { value: any}) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <div className="relative w-full h-96 my-8">
          <Image
            src={`https://cdn.sanity.io/images/your_project_id/production/${value.asset._ref.split("-")[1]}.${value.asset._ref.split("-")[2]}`}
            alt={value.alt || "Content Image"}
            fill
            style={{ objectFit: 'contain' }}
            className="rounded-lg"
          />
        </div>
      );
    },
  },
  block: {
    h1: ({ children }) => <h1 className="text-4xl font-bold mt-8 mb-4">{children}</h1>,
    h2: ({ children }) => <h2 className="text-3xl font-bold mt-6 mb-3">{children}</h2>,
    normal: ({ children }) => <p className="text-lg text-gray-700 leading-relaxed mb-4">{children}</p>,
  },
  listItem: ({ children }) => (
    <li className="list-disc list-inside ml-4 text-gray-700">{children}</li>
  ),
};

// Main page component to display a single blog post
export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  console.log(slug)

  // Fetch the post from Sanity based on the slug and cast it to the Post type
  const post: Post = await client.fetch(singlePostQuery, { slug });
  console.log("post", post);

  // If no post is found, return a 404 page
//   if (!post) {
//     notFound();
//   }

  return (
    <div className="pl-20 pr-10  custom-scrollbar flex-1 overflow-auto">
    <article className=" my-10">
      <div className="text-center mb-10">
        <h1 className="text-2xl text-left md:text-3xl font-extrabold text-gray-900 leading-tight">
          {post.title}
        </h1>
        {post.mainImage && post.mainImage.asset && (
          <div className="relative w-full h-96 mt-6 rounded-lg overflow-hidden shadow-lg">
            <Image
              src={urlFor(post.mainImage).width(1200).height(600).url()}
              alt={post.mainImage.alt || "Blog Post Cover"}
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
        )}
      </div>

      <div className="prose prose-lg mx-auto text-gray-700">
        <PortableText
          value={post.body}
          components={myPortableTextComponents}
        />
      </div>
    </article>
    </div>
  );
}