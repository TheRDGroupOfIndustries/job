"use client";

import React, { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";
import { ArrowRight, Clock, User, X } from "lucide-react";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { POSTS_QUERY } from "@/lib/sanityQueries";
import Link from "next/link";

const ARTICLES = [
  {
    id: 1,
    imageUrl: "/images/6febcdd1c0fdfabb77b7d5b9fe762e65.jpg",
    category: "Career Tips",
    title: "10 Essential Skills for Remote Work Success",
    summary:
      "Discover the key skills that will help you thrive in a remote work environment and advance your career.",
    content: `Remote work requires discipline, communication skills, and adaptability. Learn essential skills like time management, virtual collaboration, and proactive problem solving to excel in a remote environment and advance your career.`,
    author: "Sarah Mitchell",
    date: "Dec 15, 2024",
    readTime: "5 min read",
  },
  {
    id: 2,
    imageUrl: "/images/b9981238d4661951cc12d0f467b91dcd.jpg",
    category: "Industry Trends",
    title: "The Future of Tech Hiring: AI and Beyond",
    summary:
      "Explore how artificial intelligence is transforming the recruitment process and what it means for job seekers.",
    content: `AI is automating screening, interview scheduling, and candidate assessment. Tech hiring is becoming faster, more data-driven, and more personalized. Candidates must adapt by improving their digital skills and understanding AI-driven recruitment tools.`,
    author: "Michael Chen",
    date: "Dec 12, 2024",
    readTime: "7 min read",
  },
  {
    id: 3,
    imageUrl: "/images/cecbff907c67fb809bb74473d1249a2a.jpg",
    category: "Career Growth",
    title: "Salary Negotiation Strategies That Actually Work",
    summary:
      "Learn proven techniques to negotiate better compensation packages and advance your career.",
    content: `Effective salary negotiation involves research, timing, and confidence. Understand your market value, prepare a clear case for your raise, and practice negotiation conversations. Remember to focus on value you bring rather than personal needs.`,
    author: "Emily Rodriguez",
    date: "Dec 10, 2024",
    readTime: "6 min read",
  },
];

type Post = {
  _id: string;
  title: string;
  author?: string;
  publishedAt: string;
  readTime?: string;
  slug: { current: string };
  categories?: { title: string }[];
  mainImage?: { asset?: { url?: string } };
};

// BlogCard component
const BlogCard: React.FC<{ post: Post }> = ({ post }) => {
  const publishedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const categoryTitle = post.categories?.[0]?.title || "Uncategorized";
  const postUrl = `/blogs/${post.slug.current}`;

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col h-full group hover:scale-[1.01]">
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <Image
          layout="fill"
          src={post.mainImage?.asset?.url || "/images/placeholder-image.jpg"}
          alt={post.title}
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 bg-[#FF7F3F] text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
          {categoryTitle}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl  text-left font-bold text-gray-900 group-hover:text-primary transition-all duration-300 mb-3 line-clamp-2">
          {post.title}
        </h3>

        {/* Metadata */}
        <div className="text-sm text-gray-500 mb-5 pt-2 border-t border-gray-100 mt-auto flex items-center justify-between">
          <div className="flex items-center justify-between w-full">
            {post.author && (
              <div className="flex items-center">
                <User size={16} className="text-[#FF7F3F] mr-1" />
                <span className="font-medium text-gray-700">{post.author}</span>
                {/* <span className="mx-2">•</span> */}
              </div>
            )}
            <div className="flex items-center">
              <Clock size={16} className="text-[#FF7F3F] mr-1" />
              <span>{publishedDate}</span>
            </div>

            {post.readTime && (
              <div className="flex items-center">
                <Clock size={16} className="text-[#FF7F3F] mr-1" />
                <span>{post.readTime}</span> min
              </div>
            )}
          </div>
        </div>

        {/* Read More */}
        <div className="w-full ">
          <Link
            href={postUrl}
            className="inline-flex w-full py-2 justify-center rounded-full border-2 border-primary items-center text-[#FF7F3F] font-semibold transition-all duration-300 hover:text-white hover:bg-primary hover:scale-105 "
          >
            Read Article
            <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
};

const CareerInsights = () => {
  const [activeArticle, setActiveArticle] = useState<number | null>(null);
  const selectedArticle = ARTICLES.find((a) => a.id === activeArticle);

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchPosts = async () => {
    try {
      const data: Post[] = await client.fetch(POSTS_QUERY);
      // console.log("Blog Posts: ", data);
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const openModal = (id: number) => setActiveArticle(id);
  const closeModal = () => setActiveArticle(null);

  return (
    <section className="py-16 md:py-24 bg-[#FFFFFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 text-center">
          Career Insights & Tips
        </h2>
        <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto text-center">
          Stay ahead with the latest career advice and industry insights
        </p>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {loading ? (
            <p className="text-gray-600 lg:col-span-3">Loading articles...</p>
          ) : posts.length === 0 ? (
            <p className="text-gray-600 lg:col-span-3">No posts found.</p>
          ) : (
            posts
              .slice(0, 3)
              .map((post) => <BlogCard key={post._id} post={post} />)
          )}
        </div>
      </div>

      {/* Modal */}
      {/* {selectedArticle && (
        <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full overflow-y-auto max-h-[90vh] relative shadow-lg">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              <X size={24} />
            </button>
            <Image
              height={256}
              layout="fill"
              src={selectedArticle.imageUrl}
              alt={selectedArticle.title}
              className="w-full h-64 object-cover rounded-t-lg"
            />
            <div className="p-6">
              <p className="text-sm text-gray-500 mb-2">{selectedArticle.category}</p>
              <h2 className="text-2xl font-bold mb-4">{selectedArticle.title}</h2>
              <p className="text-gray-700 mb-4">{selectedArticle.content}</p>
              <div className="flex justify-between text-gray-500 text-sm mt-4">
                <span>By {selectedArticle.author}</span>
                <span>
                  {selectedArticle.date} • {selectedArticle.readTime}
                </span>
              </div>
            </div>
          </div>
        </div>
      )} */}

      {/* View All Button */}
     <div className="flex justify-center w-full">
       <Link
        href="/blogs"
        className="inline-flex items-center text-primary border-2 border-primary font-semibold py-3 px-8 rounded-lg transition-colors hover:bg-primary hover:text-white cursor-pointer"
      >
        View All Posts
        <ArrowRight size={20} className="ml-3" />
      </Link>
     </div>
    </section>
  );
};

export default CareerInsights;
