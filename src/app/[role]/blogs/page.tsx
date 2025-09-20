import { allPostsQuery, urlFor } from "@/lib/sanity";
import { client } from "@/sanity/lib/client";
import BlogCard from "@/components/BlogCard";

// Main page component to display all blog posts
export default async function BlogPage() {
  const posts = await client.fetch(allPostsQuery);
  console.log("posts:", posts);

  return (
    <div className="flex-1 pl-20 pr-10 my-10">
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {posts.map((post: any) => (
            <BlogCard key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 text-lg mt-10">
          No blog posts found.
        </div>
      )}
    </div>
  );
}
