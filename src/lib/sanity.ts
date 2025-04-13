import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-04-07',
});

const builder = imageUrlBuilder(client);

export const urlFor = (source: any) => {
  return builder.image(source);
};

// Helper function to fetch all blog posts
export const getAllPosts = async () => {
  return await client.fetch(
    `*[_type == "post"] {
      _id,
      title,
      slug,
      mainImage,
      publishedAt,
      excerpt,
      categories[]->{
        _id,
        title
      },
      author->{
        name,
        image
      },
      isInteractive,
      interactiveContent
    } | order(publishedAt desc)`
  );
};

// Helper function to fetch a single blog post by slug
export const getPost = async (slug: string) => {
  return await client.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      mainImage,
      body,
      publishedAt,
      isInteractive,
      interactiveContent,
      categories[]->{
        _id,
        title
      },
      author->{
        name,
        image,
        bio
      }
    }`,
    { slug }
  );
};

