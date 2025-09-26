"use client";

import React, { useEffect, useState } from "react";
import { Clock, User, ArrowLeft } from "lucide-react";
import { PortableText } from '@portabletext/react'; 
import { POST_QUERY } from "@/lib/sanityQueries";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";

// --- UPDATED TYPESCRIPT INTERFACES START ---

// Updated to reflect the flat data structure provided
interface Author {
    name: string;
    authorSlug: string;
}

interface Category {
    _id: string;
    title: string;
    categorySlug: string;
}

interface SanityImage {
    asset: {
        _ref: string;
        _type: 'reference';
        url: string; 
    };
    alt?: string;
}

interface Post {
    _id: string;
    _createdAt?: string; 
    _updatedAt?: string; 
    publishedAt?: string;  
    title: string;
    slug: string;  
    mainImage?: SanityImage;
    body: any[]; 
    
    // Fields mapped directly from the provided data
    author: Author; 
    categories: Category[]; 
    
    // Fallback/optional fields
    readTime?: string; 
}

type PostData = Post | null;
// --- UPDATED TYPESCRIPT INTERFACES END ---

// Portable Text Components (placeholder)
const portableTextComponents = {
  types: {
    // ... custom components
  },
  block: {
    h2: ({ children }: { children: React.ReactNode }) => <h2 className="text-3xl font-semibold my-3">{children}</h2>,
    normal: ({ children }: { children: React.ReactNode }) => <p className="mb-4 leading-relaxed">{children}</p>,
    bullet: ({ children }: { children: React.ReactNode }) => <li className="list-disc">{children}</li>
  },
  list: {
    bullet: ({ children }: { children: React.ReactNode }) => <ul className="list-disc list-inside ml-5 my-4">{children}</ul>,
  }
};


const extractPostData = (data: PostData[] | PostData | null): PostData => {
    if (Array.isArray(data) && data.length > 0) {
        return data[0] as Post; // Extract the first item if it's an array
    }
    return data as Post;
};


const BlogDetails = ({ slug }: { slug: string }) => {
    // Set the state type to the correct PostData interface
    const [post, setPost] = useState<PostData>(null);
    const [loading, setLoading] = useState(true);

    const fetchPost = async () => {
        setLoading(true);
        try {
            const data = await client.fetch(POST_QUERY, { slug });
            const postData = Array.isArray(data) ? data[0] : data; 
            console.log(postData)
            setPost(postData);
        } catch (error) {
            console.error("Error fetching posts:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPost();
    }, [slug]);

    // Handle loading and not found states
    if (loading) {
        return <div className="text-center py-20">Loading blog post...</div>;
    }

    if (!post) {
        return <div className="text-center py-20 text-red-600">Post not found.</div>;
    }
    
    // --- UPDATED DESTRUCTURING AND MAPPING ---
    const { 
        title, 
        mainImage, 
        body, 
        author, 
        categories,
        publishedAt,
        _createdAt
    } = post;
    
    // MAP to display variables using the new nested structure
    const authorName = author?.name || "Unknown Author"; 
    const categoryName = categories?.[0]?.title || "Uncategorized"; // Use the title of the first category
    const readTime = post.readTime || "5 min read"; 
    
    // Data preparation
    const publishedDate = publishedAt || _createdAt
        ? new Date(publishedAt || _createdAt || '').toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : "Date Unspecified";

    const imageUrl = (mainImage?.asset?.url) || "";
    const contentBody = body;


    return (
        <div className="bg-white min-h-screen pt-18">
            {/* Header / Hero Image */}
            <div className="relative h-96 overflow-hidden">
                {imageUrl && (
                    <Image
                        layout="fill"
                        src={urlFor(imageUrl).url()}
                        alt={mainImage?.alt || title} 
                        className="w-full h-full object-cover brightness-75"
                    />
                )}
                <div className="absolute inset-0 bg-black/40 bg-opacity-30 flex items-end">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
                        <span className="bg-[#FF7F3F] text-white text-sm font-semibold px-3 py-1 rounded-full mb-3 inline-block shadow-md">
                            {categoryName}
                        </span>
                        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
                            {title}
                        </h1>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                {/* Back Link */}
                <Link
                    href="/blogs" 
                    className="inline-flex items-center text-[#FF7F3F] font-semibold transition-colors hover:text-orange-600 mb-8"
                >
                    <ArrowLeft size={20} className="mr-2" />
                    Back to all articles
                </Link>

                {/* Metadata */}
                <div className="flex flex-wrap items-center text-gray-600 text-sm md:text-base border-b border-gray-200 pb-5 mb-10">
                    <div className="flex items-center mr-6">
                        <User size={18} className="text-[#FF7F3F] mr-2" />
                        <span>
                            By <strong>{authorName}</strong>
                        </span>
                    </div>
                    <div className="flex items-center mr-6">
                        <Clock size={18} className="text-[#FF7F3F] mr-2" />
                        <span>{publishedDate}</span>
                    </div>
                    <div className="flex items-center">
                        <span>{readTime}</span>
                    </div>
                </div>

                {/* Blog Content (PortableText) */}
                <div className="prose prose-lg max-w-none text-gray-800">
                    {contentBody && contentBody.length > 0 ? (
                        <PortableText value={contentBody} components={portableTextComponents as any} />
                    ) : (
                        <p>No content available for this post.</p>
                    )}
                </div>

                {/* Share/Action Footer */}
                <div className="mt-16 pt-8 border-t border-gray-200 flex justify-center">
                    <button className="bg-[#FF7F3F] text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-orange-600 transition-colors">
                        Share this Article
                    </button>
                </div>
            </div>

            {/* Floating "Talk with Us" Button (Reused) */}
            <div className="fixed bottom-6 right-6 z-50">
                <button className="bg-[#FF7F3F] text-white font-medium py-3 px-6 rounded-full shadow-lg hover:bg-orange-600 transition-colors flex items-center space-x-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <span>Talk with Us</span>
                </button>
            </div>
        </div>
    );
};

export default BlogDetails;