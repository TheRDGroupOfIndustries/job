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
    "slug": slug.current,
    publishedAt,
    readTime,
    body[],
    mainImage{
      asset->{
        _id,
        url,
        metadata {
          lqip,
          dimensions {
            aspectRatio,
            width,
            height
          }
        }
      },
      alt
    },
    author->{
      _id,
      name,
      "authorSlug": slug.current,
      image {
        asset->{
          url
        }
      },
      bio
    },
    categories[]->{
      _id,
      title,
      description,
      "categorySlug": slug.current
    }
  }
`;
