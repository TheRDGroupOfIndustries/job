"use client";

import React, { useState, useEffect } from "react";
import { Clock, User, ArrowRight } from "lucide-react";
import { POSTS_QUERY } from "@/lib/sanityQueries";
import { client } from "@/sanity/lib/client";
import Link from "next/link";
import Image from "next/image";

type Category = {
  title: string;
};

type Slug = {
  current: string;
};

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
    <div className="bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col h-full">
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
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
          {post.title}
        </h3>

        {/* Metadata */}
        <div className="flex flex-wrap items-center text-sm text-gray-500 mb-5 pt-2 border-t border-gray-100 mt-auto">
          {post.author && (
            <div className="flex items-center mr-4">
              <User size={16} className="text-[#FF7F3F] mr-1" />
              <span className="font-medium text-gray-700">{post.author}</span>
            </div>
          )}
          <span className="mr-4">{publishedDate}</span>
          {post.readTime && (
            <div className="flex items-center">
              <Clock size={16} className="text-[#FF7F3F] mr-1" />
              <span>{post.readTime}</span>
            </div>
          )}
        </div>

        {/* Read More */}
        <div>
          <Link
            href={postUrl}
            className="inline-flex items-center text-[#FF7F3F] font-semibold transition-colors hover:text-orange-600"
          >
            Read Article
            <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
};

const Blogs: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchPosts = async () => {
    try {
      const data: Post[] = await client.fetch(POSTS_QUERY);
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

  return (
    <div className="bg-gray-50 min-h-screen py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Header */}
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4">
          Career Insights & Blog
        </h1>
        <p className="text-lg text-gray-600 mb-16 max-w-3xl mx-auto">
          Stay ahead with the latest trends, career advice, and industry news
          from our experts.
        </p>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {loading ? (
            <p className="text-gray-600 lg:col-span-3">Loading articles...</p>
          ) : posts.length === 0 ? (
            <p className="text-gray-600 lg:col-span-3">No posts found.</p>
          ) : (
            posts.map((post) => <BlogCard key={post._id} post={post} />)
          )}
        </div>

        {/* Load More Button */}
        {/* <button className="inline-flex items-center text-[#FF7F3F] border-2 border-[#FF7F3F] font-semibold py-3 px-8 rounded-lg transition-colors hover:bg-[#FF7F3F] hover:text-white">
          Load More Articles
          <ArrowRight size={20} className="ml-3" />
        </button> */}
      </div>
    </div>
  );
};

export default Blogs;
