"use client";

import React, { useEffect, useState } from "react";
import { Clock, User, ArrowLeft, Send, CalendarDays } from "lucide-react"; // Added 'Send' for the button
import { PortableText } from '@portabletext/react'; 
import { POST_QUERY } from "@/lib/sanityQueries"; // Assuming this utility is present
import { client } from "@/sanity/lib/client"; // Assuming this utility is present
import { urlFor } from "@/sanity/lib/image"; // Assuming this utility is present
import Image from "next/image";
import Link from "next/link";

// --- TYPESCRIPT INTERFACES (Kept for completeness) ---

interface Author {
    name: string;
    authorSlug: string;
    image?: { // Added author image structure
        asset: {
            url: string; 
        };
    };
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
    publishedAt?: string; 
    title: string;
    slug: string; 
    mainImage?: SanityImage;
    body: any[]; 
    author: Author; 
    categories: Category[]; 
    readTime?: number; // Changed to number based on example data
}

type PostData = Post | null;

// --- PORTABLE TEXT COMPONENTS (Theming the content) ---
const portableTextComponents = {
    types: {
        // Custom component for the main image if it appears inline
        image: ({ value }: { value: SanityImage }) => (
            <div className="my-8 rounded-xl overflow-hidden shadow-lg">
                <Image
                    src={urlFor(value.asset.url).url()}
                    alt={value.alt || "Blog image"}
                    width={800}
                    height={500}
                    className="w-full h-auto object-cover"
                />
            </div>
        ),
    },
    block: {
        // Stronger headline style
        h2: ({ children }: { children: React.ReactNode }) => <h2 className="text-3xl font-bold text-gray-800 mt-8 mb-4">{children}</h2>,
        // Default text style
        normal: ({ children }: { children: React.ReactNode }) => <p className="mb-4 text-gray-700 leading-7">{children}</p>,
        // Themed bold text, specifically for the opening paragraph
        strong: ({ children }: { children: React.ReactNode }) => <strong className="font-extrabold text-indigo-600">{children}</strong>,
    },
    list: {
        // Themed list bullets
        bullet: ({ children }: { children: React.ReactNode }) => <ul className="list-disc list-inside ml-5 my-4 space-y-2 text-gray-700">{children}</ul>,
    },
    marks: {
        // Themed links with the coral/orange accent
        link: ({ children, value }: { children: React.ReactNode, value: { href: string } }) => (
            <a 
                href={value.href} 
                className="text-[#FF7F3F] hover:text-orange-600 font-semibold transition-colors underline" 
                target="_blank" 
                rel="noopener noreferrer"
            >
                {children}
            </a>
        ),
    }
};


const BlogDetails = ({ slug }: { slug: string }) => {
    const [post, setPost] = useState<PostData>(null);
    const [loading, setLoading] = useState(true);

    // Placeholder for fetching data (using the provided static data for demo)
    const fetchPost = async () => {
        // Simulating the fetch and data extraction for the provided JSON object
        setLoading(true);
        try {
             // --- Replace with actual Sanity fetch in production ---
            const data = await client.fetch(POST_QUERY, { slug });
            console.log(data)
            const postData = Array.isArray(data) ? data[0] : data; 
            console.log(postData)

            // Hardcoding the provided JSON object for immediate UI development
            // const providedData = {
            //     _id: "ed75a7a8-b286-47fd-b958-e726053a2fb6",
            //     author: {
            //         _id: "ce031498-0388-4ebb-9d7f-ab80451a5744",
            //         authorSlug: "dolamani-rohidas",
            //         bio: [{ _key: "d1d894f3e0a4", _type: "block", children: [{ _key: "454126394600", _type: "span", marks: [], text: "A Fullstack developer with skilled experience" }], markDefs: [], style: "normal" }],
            //         image: { asset: { url: "https://cdn.sanity.io/images/a48wrt9m/production/41857d0b34cbfd7f94ab70c33bf507640be0f1d8-1892x1920.jpg" } },
            //         name: "Dolamani Rohidas"
            //     },
            //     body: [
            //         { _key: "d656b5fceb1a", _type: "block", children: [{ _key: "3b2d012ac986", _type: "span", marks: ["strong"], text: "Are you preparing to apply for a new job? It's important to make sure you are fully prepared before submitting your application. Here are five points to know before applying for a job:" }], markDefs: [], style: "normal" },
            //         { _key: "ae4abe01c713", _type: "block", children: [{ _key: "4f7d71a49450", _type: "span", marks: [], text: "" }], markDefs: [], style: "normal" },
            //         { _key: "373b0223bd70", _type: "block", children: [{ _key: "5617178caaf8", _type: "span", marks: ["strong"], text: "Research the company and the job position" }, { _key: "a73b5f9e5eab", _type: "span", marks: [], text: ": It's essential to do your homework before applying for a job. This means researching the company, its culture, and its values, as well as the specific job position you are applying for. Understanding the expectations and requirements of the role will help you tailor your application and make a more informed decision about whether the job is a good fit for you." }], markDefs: [], style: "normal" },
            //         { _key: "0ae10246cf6a", _type: "block", children: [{ _key: "35f2581e74c4", _type: "span", marks: ["strong"], text: "Tailor your resume and cover letter" }, { _key: "75ace5bc8a87", _type: "span", marks: [], text: ": A customized resume and cover letter are crucial to standing out in the job market. Make sure to highlight the skills and experiences that are most relevant to the position you are applying for, and use language and terminology that is specific to the industry. This will help you show the employer that you are the best candidate for the job." }], markDefs: [], style: "normal" },
            //         { _key: "a1365d424016", _type: "block", children: [{ _key: "5c98bda2981b", _type: "span", marks: ["strong"], text: "Practice for the interview" }, { _key: "a75dd48103a1", _type: "span", marks: [], text: ": The job interview is your chance to shine and show the employer why you are the best fit for the position. It's a good idea to practice for the interview by thinking about common interview questions and practising your responses. You can also ask a friend or family member to role-play with you to get a feel for the types of questions you might be asked." }], markDefs: [], style: "normal" },
            //         { _key: "e63f613c7272", _type: "block", children: [{ _key: "479045dd4fef", _type: "span", marks: ["strong"], text: "Prepare for assessment tests" }, { _key: "3f997aeea85e", _type: "span", marks: [], text: ": Some companies may require you to take assessment tests as part of the hiring process. These tests may be aptitude tests, personality tests, or skills tests, and they are designed to evaluate your suitability for the job. It's a good idea to familiarize yourself with the types of tests you may be asked to take and to practice taking them in advance." }], markDefs: [], style: "normal" },
            //         { _key: "78ea4f7c8771", _type: "block", children: [{ _key: "9f480a602483", _type: "span", marks: ["strong"], text: "Know your rights" }, { _key: "7c8d9e59119e", _type: "span", marks: [], text: ": As a job seeker, it's important to be aware of your rights, including your rights to privacy, fair treatment, and equal opportunity. Familiarize yourself with laws and regulations that protect these rights, and be prepared to speak up if you feel that your rights are being violated during the hiring process." }], markDefs: [], style: "normal" },
            //         { _key: "53d48c20ddb0", _type: "block", children: [{ _key: "c16ade5cc1af", _type: "span", marks: [], text: "By following these five points, you can increase your chances of success in the job application process and land your dream job." }], markDefs: [], style: "normal" },
            //         { _key: "9f50601ca7b0", _type: "block", children: [{ _key: "abf94fe439e3", _type: "span", marks: [], text: "" }], markDefs: [], style: "normal" },
            //         { _key: "3f91d18b2acd", _type: "block", children: [{ _key: "0700ad8a7955", _type: "span", marks: [], text: "If you're looking for a Job" }], markDefs: [], style: "normal" },
            //         { _key: "b34ffbbee05c", _type: "block", children: [{ _key: "8de4469d2afe", _type: "span", marks: [], text: "Apply Now at " }, { _key: "8f924e649189", _type: "span", marks: ["08a911950c55"], text: "www.alpranhrservices.com" }], markDefs: [{ _key: "08a911950c55", _type: "link", href: "http://www.alpranhrservices.com/" }], style: "normal" },
            //         { _key: "e80f39b51326", _type: "block", children: [{ _key: "591f2edaf91f", _type: "span", marks: [], text: "We have 100+Job listed from verified employer" }], markDefs: [], style: "normal" }
            //     ],
            //     categories: [{ _id: "754416f7-04bd-48bb-b867-5de3b3852abd", categorySlug: "blogs", description: "These are the posts related to the Blog.", title: "Blogs" }],
            //     mainImage: {
            //         alt: "Are you preparing to apply for a new job",
            //         asset: {
            //             _id: "image-ad8d52783887e65bc92345ca84455e8f56cb17b8-1080x1080-png",
            //             metadata: { dimensions: { aspectRatio: 1, height: 1080, width: 1080 }, lqip: "...", },
            //             url: "https://cdn.sanity.io/images/a48wrt9m/production/ad8d52783887e65bc92345ca84455e8f56cb17b8-1080x1080.png"
            //         }
            //     },
            //     publishedAt: "2025-09-30T15:38:00.000Z",
            //     readTime: 10, // Assuming this is now a number of minutes
            //     slug: "are-you-preparing-to-apply-for-a-new-job",
            //     title: "Are you preparing to apply for a new job"
            // };
            
            setPost(postData as Post);
            // --- End of hardcoded data ---

        } catch (error) {
            console.error("Error fetching posts:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Only run fetch on mount or slug change
        if (slug) fetchPost(); 
    }, [slug]);

    if (loading) {
        return <div className="text-center py-20 text-lg font-medium">Loading blog post...</div>;
    }

    if (!post) {
        return <div className="text-center py-20 text-xl text-red-600 font-bold">Post not found.</div>;
    }
    
    // --- Data Mapping ---
    const { 
        title, 
        mainImage, 
        body, 
        author, 
        categories,
        publishedAt,
    } = post;
    
    const authorName = author?.name || "Unknown Author"; 
    const authorImageUrl = author?.image?.asset?.url;
    const categoryTitle = categories?.[0]?.title || "Uncategorized"; 
    const readTime = post.readTime ? `${post.readTime} min read` : "5 min read"; 
    
    const publishedDate = publishedAt
        ? new Date(publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
          })
        : "Date Unspecified";

    const imageUrl = (mainImage?.asset?.url) || "";
    const contentBody = body;


    return (
        <div className="bg-gray-50 min-h-screen pt-10">

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
                <div className="max-w-6xl mx-auto flex items-center mb-4">
                    <Link
                        href="/blogs" 
                        className="inline-flex items-center text-gray-600 font-medium py-2 px-4 rounded-xl transition-colors hover:bg-gray-100"
                    >
                        <ArrowLeft size={20} className="mr-2" />
                        Back to Blogs
                    </Link>
                    {/* Optionally show the title here if you want it sticky */}
                    {/* <h1 className="text-xl font-bold ml-4 truncate">{title}</h1> */}
                </div>

                {/* --- HEADER IMAGE & CATEGORY TAG --- */}
                {imageUrl && (
                    <div className="relative h-[420px] w-full rounded-2xl overflow-hidden mb-10 shadow-xl">
                        <Image
                            src={urlFor(imageUrl).url()}
                            alt={mainImage?.alt || title} 
                            layout="fill"
                            className=" object-cover object-center"
                        />
                        <div className="absolute top-4 left-4">
                            <span className="bg-[#FF7F3F] text-white text-sm font-bold px-4 py-2 rounded-xl shadow-md uppercase tracking-wider">
                                {categoryTitle}
                            </span>
                        </div>
                    </div>
                )}


                {/* --- MAIN TITLE --- */}
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                    {title}
                </h1>

                {/* --- AUTHOR AND METADATA BAR --- */}
                <div className="flex flex-wrap items-center text-gray-500 text-sm md:text-base border-b border-gray-200 pb-5 mb-10">
                    <div className="flex items-center mr-6">
                        {/* Author Image/Avatar */}
                        {authorImageUrl ? (
                            <Image
                                src={urlFor(authorImageUrl).url()}
                                alt={authorName}
                                width={32}
                                height={32}
                                className="rounded-full w-8 h-8 object-cover mr-2 shadow-sm border border-gray-200"
                            />
                        ) : (
                            <User size={18} className="text-[#FF7F3F] mr-2" />
                        )}
                        <span className="text-gray-700">
                            By <strong className="font-semibold text-gray-900">{authorName}</strong>
                        </span>
                    </div>
                    <div className="flex items-center mr-6">
                        <CalendarDays size={18} className="text-[#FF7F3F] mr-2" />
                        <span>{publishedDate}</span>
                    </div>
                    <div className="flex items-center">
                        <Clock size={18} className="text-[#FF7F3F] mr-2" />
                        <span className="">{readTime}</span>
                    </div>
                </div>

                {/* --- BLOG CONTENT --- */}
                <div className="text-gray-800">
                    {contentBody && contentBody.length > 0 ? (
                        // Used a custom prose class to better control typography styles
                        <div className="prose prose-lg max-w-none prose-h2:text-indigo-700 prose-a:text-[#FF7F3F] prose-strong:font-extrabold">
                            <PortableText value={contentBody} components={portableTextComponents as any} />
                        </div>
                    ) : (
                        <p className="text-xl text-gray-600">No content available for this post.</p>
                    )}
                </div>

                {/* --- ACTION CALLOUT/FOOTER --- */}
                <div className="mt-16 pt-8 border-t border-gray-200 flex flex-col items-center justify-center space-y-4 text-center">
                    <h3 className="text-2xl font-bold text-gray-800">Ready to find your next role?</h3>
                    <p className="text-lg text-gray-600">
                        We have 100+ Jobs listed from verified employers.
                    </p>
                    
                    <Link href={`${process.env.NEXT_PUBLIC_API_URL}/browse-jobs`} target="_blank" passHref>
                        <button className="bg-[#FF7F3F] text-white font-bold text-lg py-3 px-8 rounded-xl shadow-lg hover:bg-orange-600 transition-all duration-300 transform hover:scale-[1.02] flex items-center space-x-2 cursor-pointer">
                            <Send className="h-5 w-5" />
                            <span>Apply Now</span>
                        </button>
                    </Link>
                </div>
            </div>

            {/* --- FLOATING CHAT/CONTACT BUTTON (Themed) --- */}
            {/* <div className="fixed bottom-6 right-6 z-50">
                <button className="bg-indigo-600 text-white font-medium py-3 px-6 rounded-xl shadow-xl hover:bg-indigo-700 transition-colors flex items-center space-x-2">
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
            </div> */}
        </div>
    );
};

export default BlogDetails;