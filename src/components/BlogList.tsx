import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllPosts, urlFor } from '../lib/sanity';
import { Clock, Tag, Home } from 'lucide-react';

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage: any;
  publishedAt: string;
  excerpt: string;
  categories: Array<{ _id: string; title: string }>;
  author: {
    name: string;
    image: any;
  };
}

export default function BlogList() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const fetchedPosts = await getAllPosts();
      setPosts(fetchedPosts);
    };
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-950 via-yellow-900 to-yellow-950 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 bg-gray-800/50 hover:bg-gray-800/70 text-white rounded-lg transition-colors"
          >
            <Home className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>
        <h1 className="text-5xl lg:text-7xl font-bold text-white mb-12">Ramblings by Aliff</h1>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post._id}
              to={`/${post.slug.current}`}
              className="bg-gray-800/30 rounded-lg overflow-hidden hover:bg-gray-800/50 transition-all duration-300 border border-yellow-900/20 hover:border-yellow-900/40"
            >
              {post.mainImage && (
                <img
                  src={urlFor(post.mainImage).width(600).height(300).url()}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <h2 className="text-xl font-semibold text-amber-400 mb-2">
                  {post.title}
                </h2>
                <p className="text-white/80 mb-4 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center text-sm text-white/70 space-x-4">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {new Date(post.publishedAt).toLocaleDateString()}
                  </div>
                  {post.categories && post.categories.length > 0 && (
                    <div className="flex items-center">
                      <Tag className="w-4 h-4 mr-1" />
                      {post.categories[0].title}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 bg-gray-800/50 hover:bg-gray-800/70 text-white rounded-lg transition-colors"
          >
            <Home className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
