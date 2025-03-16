import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Calendar, Clock, ArrowRight } from 'lucide-react';

interface BlogPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: {
    id: number;
    title: string;
    excerpt: string;
    date: string;
    readTime: string;
    image: string;
    imageAlt: string;
  };
}

export function BlogPreviewModal({ isOpen, onClose, post }: BlogPreviewModalProps) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-gray-800/90 rounded-xl w-full max-w-2xl overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-full transition-colors z-10"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>
        
        <img
          src={post.image}
          alt={post.imageAlt}
          className="w-full h-64 object-cover"
        />
        
        <div className="p-6">
          <div className="flex items-center text-sm text-gray-400 mb-4">
            <Calendar className="h-4 w-4 mr-1" />
            <span className="mr-4">{post.date}</span>
            <Clock className="h-4 w-4 mr-1" />
            <span>{post.readTime}</span>
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-4">
            {post.title}
          </h2>
          
          <p className="text-gray-300 mb-6">
            {post.excerpt}
          </p>
          
          <div className="flex justify-between items-center">
            <button
              onClick={() => {
                navigate(`/blog/${post.id}`);
                onClose();
              }}
              className="inline-flex items-center px-6 py-3 bg-yellow-700 hover:bg-yellow-800 text-white rounded-lg font-medium transition-colors"
            >
              Read Full Post
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
            
            <button
              onClick={() => {
                navigate('/blog');
                onClose();
              }}
              className="px-6 py-3 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-lg font-medium transition-colors"
            >
              View All Posts
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}