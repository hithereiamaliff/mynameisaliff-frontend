import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPost, urlFor } from '../lib/sanity';
import { PortableText } from '@portabletext/react';
import { Clock, Tag, User, Home, Newspaper } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

interface Post {
  _id: string;
  title: string;
  mainImage: any;
  body: any[];
  publishedAt: string;
  excerpt?: string;
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

  // Create JSON-LD schema for blog post
  const blogPostSchema = post ? {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': post.title,
    'datePublished': post.publishedAt,
    'author': {
      '@type': 'Person',
      'name': post.author?.name || 'YourName',
      'url': 'https://your-website-name.co.uk'
    },
    'publisher': {
      '@type': 'Person',
      'name': 'YourName',
      'url': 'https://your-website-name.co.uk'
    },
    'url': `https://your-website-name.co.uk/${slug}`,
    ...(post.mainImage && {
      'image': urlFor(post.mainImage).url()
    }),
    'description': post.excerpt || 'Read this blog post by YourName about technology, Malaysia, and more.',
    'articleBody': post.body ? post.body.map((block: any) => 
      block._type === 'block' ? block.children.map((child: any) => child.text).join('') : ''
    ).join(' ') : ''
  } : null;

  return (
    <article className="min-h-screen bg-gradient-to-br from-yellow-950 via-yellow-900 to-yellow-950 py-16">
      {post && (
        <Helmet>
          <title>{post.title} | Ramblings by YourName</title>
          <meta name="description" content={post.excerpt || `Read ${post.title} - a blog post by YourName about technology, Malaysia, and more.`} />
          <meta property="og:title" content={`${post.title} | Ramblings by YourName`} />
          <meta property="og:description" content={post.excerpt || `Read ${post.title} - a blog post by YourName about technology, Malaysia, and more.`} />
          <meta property="og:type" content="article" />
          <meta property="og:url" content={`https://your-website-name.co.uk/${slug}`} />
          {post.mainImage && (
            <meta property="og:image" content={urlFor(post.mainImage).url()} />
          )}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={`${post.title} | Ramblings by YourName`} />
          <meta name="twitter:description" content={post.excerpt || `Read ${post.title} - a blog post by YourName about technology, Malaysia, and more.`} />
          {post.mainImage && (
            <meta name="twitter:image" content={urlFor(post.mainImage).url()} />
          )}
          {blogPostSchema && (
            <script type="application/ld+json">
              {JSON.stringify(blogPostSchema)}
            </script>
          )}
        </Helmet>
      )}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 bg-gray-800/50 hover:bg-gray-800/70 text-white rounded-lg transition-colors"
          >
            <Home className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>
        {post.mainImage && (
          <div className="relative mb-8">
            <div 
              className="w-full h-[400px] rounded-lg overflow-hidden select-none"
              onContextMenu={(e) => e.preventDefault()}
            >
              <img
                src={urlFor(post.mainImage).width(1200).height(600).url()}
                alt={post.title}
                className="w-full h-full object-cover pointer-events-none"
                draggable="false"
              />
            </div>
          </div>
        )}
        <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">{post.title}</h1>
        
        <div className="flex items-center space-x-6 mb-8 text-sm text-white/70">
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

        <div className="prose prose-invert prose-yellow max-w-none prose-p:text-white/80 prose-headings:text-amber-400">
          <div className="bg-gray-800/30 p-8 rounded-lg border border-yellow-900/20">
            <PortableText value={post.body} />
          </div>
        </div>
        <div className="mt-12 flex justify-center space-x-4">
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 bg-gray-800/50 hover:bg-gray-800/70 text-white rounded-lg transition-colors"
          >
            <Home className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <Link
            to="/blog"
            className="inline-flex items-center px-4 py-2 bg-gray-800/50 hover:bg-gray-800/70 text-white rounded-lg transition-colors"
          >
            <Newspaper className="w-4 h-4 mr-2" />
            View More Ramblings
          </Link>
        </div>
      </div>
    </article>
  );
}

