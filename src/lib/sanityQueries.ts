export const POSTS_QUERY = `
  *[_type == "post"]{
  _id,
  title,
  "author": author->name,
  publishedAt,
  readTime,
  slug,
  categories[]->{
    title
  },
  mainImage{
    asset->{
      url
    }
  }
} | order(publishedAt desc)
`;

// Query to get a single post by slug
export const POST_QUERY = `
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    body,
    "slug": slug.current,
    publishedAt,
    mainImage{
        asset->{
         url 
        }
    },
    author->{
        name,          
        "authorSlug": slug.current
    },
    
    categories[]->{
        _id,
        title,         
        "categorySlug": slug.current
    },

  }
`;