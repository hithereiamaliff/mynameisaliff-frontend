import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllPosts, urlFor } from '../lib/sanity';
import { Clock, Tag, Book, Gamepad2 } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

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
  isInteractive: boolean;
  interactiveContent?: {
    sections: Array<{
      title: string;
      content: any;
      quiz?: {
        question: string;
        options: string[];
        correctAnswer: number;
      };
      poll?: {
        question: string;
        options: string[];
      };
    }>;
  };
}

export default function RamblingsList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await getAllPosts();
        // Filter only posts that have interactive versions
        const interactivePosts = fetchedPosts.filter((post: Post) => post.isInteractive);
        setPosts(interactivePosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Ramblings - Interactive Blog Posts | Aliff</title>
        <meta name="description" content="Interactive versions of my blog posts with quizzes, polls, and more." />
      </Helmet>

      <motion.div 
        className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white py-16"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back to Home Button - Top */}
          <div className="mb-8">
            <button
              onClick={() => {
                navigate('/');
                // Small delay to ensure navigation happens first
                setTimeout(() => {
                  const contactSection = document.getElementById('contact');
                  contactSection?.scrollIntoView({ behavior: 'instant' });
                }, 100);
              }}
              className="flex items-center text-yellow-500 hover:text-yellow-400 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </button>
          </div>

          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-300 mb-4 leading-relaxed py-1">
              Ramblings by Aliff
            </h1>
          </div>

          {loading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
            </div>
          ) : posts.length === 0 ? (
            <div className="space-y-8">
              <div className="text-center text-gray-300 py-8 bg-gray-800 rounded-lg shadow-xl">
                <p className="mb-4">No interactive posts published yet.</p>
                <p className="mb-8">In the meantime, check out my latest ramblings here:</p>
              </div>
              
              {/* Medium Blog Embed */}
              <div className="relative overflow-hidden pb-[56.25%] h-0 rounded-lg shadow-xl">
                <iframe
                  src="https://hithere.mynameisaliff.co.uk/"
                  className="absolute top-0 left-0 w-full h-full border-0"
                  title="Aliff's Medium Blog"
                  allowFullScreen
                />
              </div>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
            <Link
              key={post._id}
              to={`/ramblings/${post.slug.current}`}
              className="bg-gray-800/50 hover:bg-gray-800/70 rounded-lg p-6 transition-all duration-300 flex flex-col"
            >
              {post.mainImage && (
                <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
                  <img
                    src={urlFor(post.mainImage).url()}
                    alt={post.title}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute top-2 right-2 bg-yellow-700 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
                    <Gamepad2 size={16} />
                    <span>Interactive</span>
                  </div>
                </div>
              )}

              <h2 className="text-xl font-semibold text-white mb-4">{post.title}</h2>
              <p className="text-gray-400 mb-6">{post.excerpt}</p>

              <div className="mt-auto flex flex-wrap gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                </div>
                {post.categories?.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Tag size={16} />
                    <span>{post.categories[0].title}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Book size={16} />
                  <span>{post.interactiveContent?.sections.length || 0} sections</span>
                </div>
              </div>
            </Link>
          ))}
            </div>
          )}

          {/* Back to Home Button - Bottom */}
          <div className="mt-12 text-center">
            <button
              onClick={() => {
                navigate('/');
                // Small delay to ensure navigation happens first
                setTimeout(() => {
                  const contactSection = document.getElementById('contact');
                  contactSection?.scrollIntoView({ behavior: 'instant' });
                }, 100);
              }}
              className="inline-flex items-center text-yellow-500 hover:text-yellow-400 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
