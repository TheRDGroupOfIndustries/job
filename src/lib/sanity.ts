import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { ImageUrlBuilder } from "@sanity/image-url/lib/types/builder";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { groq } from "next-sanity";


export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID as string,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  useCdn: false,
  apiVersion: "2023-01-01", // 👈 lock API version
});

const builder: ImageUrlBuilder = imageUrlBuilder(client);

export const urlFor = (source: SanityImageSource) => builder.image(source);




export const allPostsQuery = groq`
  *[_type == "post"]{
    _id,
    title,
    slug,
    mainImage,
    body,
    "author": author->name,
    "categories": categories[]->title,
    _createdAt
  } | order(_createdAt desc)
`;

export const singlePostQuery = groq`
  *[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    mainImage,
    body,
    "author": author->name,
    "categories": categories[]->title,
    _createdAt
  }
`;
