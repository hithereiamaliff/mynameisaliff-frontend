import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllPosts, urlFor } from '../lib/sanity';
import { Clock, Tag, Home } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

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

  // Create JSON-LD schema for blog list
  const blogListSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    'name': 'Ramblings by YourName',
    'description': 'Personal blog sharing thoughts and experiences about technology, Malaysia, and more.',
    'url': 'https://your-website-name.co.uk/blog',
    'author': {
      '@type': 'Person',
      'name': 'YourName',
      'url': 'https://your-website-name.co.uk'
    },
    'blogPost': posts.map(post => ({
      '@type': 'BlogPosting',
      'headline': post.title,
      'datePublished': post.publishedAt,
      'author': {
        '@type': 'Person',
        'name': post.author?.name || 'YourName'
      },
      'url': `https://your-website-name.co.uk/${post.slug.current}`,
      ...(post.mainImage && {
        'image': urlFor(post.mainImage).url()
      })
    }))
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-950 via-yellow-900 to-yellow-950 py-16">
      <Helmet>
        <title>Ramblings by YourName | Personal Blog</title>
        <meta name="description" content="Explore thoughts and experiences about technology, Malaysia, and more in this personal blog by YourName." />
        <meta property="og:title" content="Ramblings by YourName | Personal Blog" />
        <meta property="og:description" content="Explore thoughts and experiences about technology, Malaysia, and more in this personal blog by YourName." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://your-website-name.co.uk/blog" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Ramblings by YourName | Personal Blog" />
        <meta name="twitter:description" content="Explore thoughts and experiences about technology, Malaysia, and more in this personal blog by YourName." />
        <script type="application/ld+json">
          {JSON.stringify(blogListSchema)}
        </script>
      </Helmet>
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
        <h1 className="text-5xl lg:text-7xl font-bold text-white mb-12">Ramblings by YourName</h1>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post._id}
              to={`/${post.slug.current}`}
              className="bg-gray-800/30 rounded-lg overflow-hidden hover:bg-gray-800/50 transition-all duration-300 border border-yellow-900/20 hover:border-yellow-900/40"
            >
              {post.mainImage && (
                <div 
                  className="w-full h-48 overflow-hidden select-none"
                  onContextMenu={(e) => e.preventDefault()}
                >
                  <img
                    src={urlFor(post.mainImage).width(600).height(300).url()}
                    alt={post.title}
                    className="w-full h-full object-cover pointer-events-none"
                    draggable="false"
                  />
                </div>
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

