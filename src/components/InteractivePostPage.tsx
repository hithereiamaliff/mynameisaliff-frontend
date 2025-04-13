import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPost } from '../lib/sanity';
import { InteractiveBlogPost } from './InteractiveBlogPost';
import { Helmet } from 'react-helmet-async';

interface InteractiveSection {
  id: number;
  title: string;
  content: React.ReactNode;
  plainText: string;
  quiz?: {
    question: string;
    options: string[];
    correctAnswer: number;
  };
  poll?: {
    question: string;
    options: string[];
  };
}

interface TransformedPost {
  id: number;
  title: string;
  date: string;
  readTime: string;
  image: string;
  imageAlt: string;
  sections: InteractiveSection[];
}

export function InteractivePostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [post, setPost] = useState<TransformedPost | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (!slug) return;
        const fetchedPost = await getPost(slug);
        
        if (!fetchedPost?.isInteractive) {
          setError('This post does not have an interactive version.');
          return;
        }

        // Transform Sanity post data into InteractiveBlogPost format
        const transformedPost = {
          id: parseInt(fetchedPost._id.replace(/[^0-9]/g, '')) || Date.now(), // Convert string ID to number
          title: fetchedPost.title,
          date: new Date(fetchedPost.publishedAt).toLocaleDateString(),
          readTime: '5 min read', // You might want to calculate this based on content length
          image: fetchedPost.mainImage?.asset?.url || '',
          imageAlt: fetchedPost.title,
          sections: fetchedPost.interactiveContent?.sections.map((section: any, index: number) => ({
            id: index + 1,
            title: section.title,
            content: section.content,
            plainText: section.content,
            quiz: section.quiz,
            poll: section.poll
          })) || []
        };

        setPost(transformedPost);
      } catch (error) {
        console.error('Error fetching post:', error);
        setError('Failed to load the interactive post. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-700"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-900 flex justify-center items-center">
        <div className="text-center text-gray-400">
          <p className="text-xl">{error || 'Post not found'}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{post.title} - Interactive Version | YourName</title>
        <meta name="description" content={`Interactive version of ${post.title} with quizzes and polls.`} />
      </Helmet>
      <InteractiveBlogPost post={post} />
    </>
  );
}

