import React from 'react';

export interface BlogSection {
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

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  imageAlt: string;
  mediumSlug?: string;
  sections: BlogSection[];
}

export function createBlogPost(post: Omit<BlogPost, "sections"> & { 
  sections: Array<Omit<BlogSection, "content"> & { content: string }> 
}): BlogPost {
  return {
    ...post,
    sections: post.sections.map(section => ({
      ...section,
      content: React.createElement(React.Fragment, null,
        ...section.content.split('\n\n').map((paragraph, i) =>
          React.createElement('p', { 
            key: i,
            className: i < section.content.split('\n\n').length - 1 ? 'mb-4' : undefined 
          }, paragraph)
        )
      ),
      plainText: section.content // Store original text for SEO
    }))
  };
}