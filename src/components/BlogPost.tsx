import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPost, urlFor } from '../lib/sanity';
import { PortableText } from '@portabletext/react';
import { Clock, Tag, User } from 'lucide-react';

interface Post {
  _id: string;
  title: string;
  mainImage: any;
  body: any[];
  publishedAt: string;
  categories: Array<{ _id: string; title: string }>;
  author: {
    name: string;
    image: any;
    bio: any[];
  };
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (slug) {
        const fetchedPost = await getPost(slug);
        setPost(fetchedPost);
      }
    };
    fetchPost();
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-yellow-700"></div>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-gray-900 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {post.mainImage && (
          <img
            src={urlFor(post.mainImage).width(1200).height(600).url()}
            alt={post.title}
            className="w-full h-[400px] object-cover rounded-lg mb-8"
          />
        )}
        <h1 className="text-4xl font-bold text-white mb-6">{post.title}</h1>
        
        <div className="flex items-center space-x-6 mb-8 text-sm text-gray-400">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            {new Date(post.publishedAt).toLocaleDateString()}
          </div>
          {post.categories && post.categories.length > 0 && (
            <div className="flex items-center">
              <Tag className="w-4 h-4 mr-2" />
              {post.categories[0].title}
            </div>
          )}
          {post.author && (
            <div className="flex items-center">
              <User className="w-4 h-4 mr-2" />
              {post.author.name}
            </div>
          )}
        </div>

        <div className="prose prose-invert prose-yellow max-w-none">
          <PortableText value={post.body} />
        </div>
      </div>
    </article>
  );
}
