import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ThumbsUp, MessageCircle, Book, Gamepad2, ExternalLink } from 'lucide-react';

interface Section {
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

interface InteractiveBlogPostProps {
  post: {
    id: number;
    title: string;
    date: string;
    readTime: string;
    image: string;
    imageAlt: string;
    sections: Section[];
  };
}

export function InteractiveBlogPost({ post }: InteractiveBlogPostProps) {
  const [currentSection, setCurrentSection] = useState(0);
  const [viewMode, setViewMode] = useState<'interactive' | 'static'>('interactive');
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [pollAnswers, setPollAnswers] = useState<Record<number, number>>({});
  const [pollVotes, setPollVotes] = useState<Record<string, number>>({});
  const [likes, setLikes] = useState(0);
  const isLastSection = currentSection === post.sections.length - 1;

  const handleQuizAnswer = (sectionId: number, answerIndex: number) => {
    setQuizAnswers(prev => ({ ...prev, [sectionId]: answerIndex }));
  };

  const handlePollAnswer = (sectionId: number, optionIndex: number) => {
    setPollAnswers(prev => ({ ...prev, [sectionId]: optionIndex }));
    setPollVotes(prev => ({
      ...prev,
      [`${sectionId}-${optionIndex}`]: (prev[`${sectionId}-${optionIndex}`] || 0) + 1
    }));
  };

  const section = post.sections[currentSection];
  const totalVotesForCurrentPoll = section.poll
    ? Object.keys(pollVotes)
      .filter(key => key.startsWith(`${section.id}-`))
      .reduce((sum, key) => sum + (pollVotes[key] || 0), 0)
    : 0;

  return (
    <div className="min-h-screen py-12 px-4 bg-gray-900/50">
      <div className="max-w-4xl mx-auto">
        {/* SEO-optimized content (hidden but indexable) */}
        <article className="sr-only">
          <h1>{post.title}</h1>
          <p>Published on {post.date} · {post.readTime}</p>
          {post.sections.map(section => (
            <section key={section.id}>
              <h2>{section.title}</h2>
              <div>{section.plainText}</div>
            </section>
          ))}
        </article>

        {/* View Mode Toggle */}
        <div className="flex justify-end mb-4">
          <div className="bg-gray-800/50 rounded-lg p-1 flex gap-1">
            <button
              onClick={() => setViewMode('interactive')}
              className={`px-4 py-2 rounded-md flex items-center gap-2 transition-colors ${
                viewMode === 'interactive'
                  ? 'bg-yellow-700 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Gamepad2 className="h-4 w-4" />
              Interactive
            </button>
            <button
              onClick={() => setViewMode('static')}
              className={`px-4 py-2 rounded-md flex items-center gap-2 transition-colors ${
                viewMode === 'static'
                  ? 'bg-yellow-700 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Book className="h-4 w-4" />
              Article
            </button>
            <a
              href={`https://medium.com/@mynameisaliff/${post.mediumSlug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-md flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              Read on Medium
            </a>
          </div>
        </div>

        <div className="mb-8">
          <Link
            to="/blog"
            className="inline-flex items-center text-yellow-500 hover:text-yellow-600 mb-8 text-lg font-medium"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Link>
          <img
            src={post.image}
            alt={post.imageAlt}
            className="w-full h-80 object-cover rounded-xl mb-8 shadow-xl"
          />
          <h1 className="text-5xl font-bold text-white mb-6 leading-tight">{post.title}</h1>
          <div className="flex items-center justify-between border-b border-gray-800 pb-6">
            <div className="text-gray-400 text-lg">
              {post.date} · {post.readTime}
            </div>
            <button
              onClick={() => setLikes(prev => prev + 1)}
              className="inline-flex items-center gap-2 text-gray-400 hover:text-yellow-500 transition-colors text-lg"
            >
              <ThumbsUp className="h-5 w-5" />
              <span>{likes}</span>
            </button>
          </div>
        </div>

        {viewMode === 'interactive' ? (
          /* Interactive Content Section */
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 mb-8 shadow-lg">
            <div className="prose prose-invert prose-lg max-w-none text-gray-300">
              {section.content}
            </div>

            {/* Quiz */}
            {section.quiz && (
            <div className="mt-10 p-8 bg-gray-700/50 rounded-lg border border-gray-700 text-gray-300">
              <h3 className="text-2xl font-semibold text-white mb-6">
                {section.quiz.question}
              </h3>
              <div className="space-y-3">
                {section.quiz.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuizAnswer(section.id, index)}
                    className={`w-full p-4 rounded-lg text-left transition-colors ${
                      quizAnswers[section.id] === index
                        ? index === section.quiz!.correctAnswer
                          ? 'bg-green-600/20 text-green-200 border border-green-500/30'
                          : 'bg-red-600/20 text-red-200 border border-red-500/30'
                        : 'bg-gray-700 hover:bg-gray-600 text-white border border-gray-600'
                    }`}
                    disabled={quizAnswers[section.id] !== undefined}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

            {/* Poll */}
            {section.poll && (
            <div className="mt-10 p-8 bg-gray-700/50 rounded-lg border border-gray-700 text-gray-300">
              <h3 className="text-2xl font-semibold text-white mb-6">
                {section.poll.question}
              </h3>
              <div className="space-y-3">
                {section.poll.options.map((option, index) => {
                  const votes = pollVotes[`${section.id}-${index}`] || 0;
                  const percentage = totalVotesForCurrentPoll
                    ? Math.round((votes / totalVotesForCurrentPoll) * 100)
                    : 0;

                  return (
                    <button
                      key={index}
                      onClick={() => handlePollAnswer(section.id, index)}
                      disabled={pollAnswers[section.id] !== undefined}
                      className="w-full"
                    >
                      <div className="relative">
                        <div
                          className="absolute inset-0 bg-yellow-600/20 rounded-lg transition-all duration-300 ease-out"
                          style={{ width: `${percentage}%` }}
                        />
                        <div className="relative p-4 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors border border-gray-600">
                          <div className="flex justify-between text-white">
                            <span>{option}</span>
                            <span>{percentage}%</span>
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
        ) : (
          /* Static Article View */
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 mb-8 shadow-lg">
            <div className="prose prose-invert prose-lg max-w-none text-gray-300">
              {post.sections.map(section => (
                <section key={section.id} className="mb-12">
                  <h2 className="text-2xl font-bold text-white mb-6">{section.title}</h2>
                  <div className="text-gray-300">{section.content}</div>
                </section>
              ))}
            </div>
          </div>
        )}

        {/* End of Blog CTA */}
        {isLastSection && (
          <div className="bg-yellow-900/30 rounded-xl p-8 mb-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Thanks for Reading!</h3>
            <p className="text-gray-300 mb-6">
              Did you enjoy this guide to Penang's hidden gems? There's more where that came from!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/blog"
                className="inline-flex items-center justify-center px-6 py-3 bg-yellow-700 hover:bg-yellow-800 text-white rounded-lg font-medium transition-colors"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                More Travel Guides
              </Link>
              <button
                onClick={() => setLikes(prev => prev + 1)}
                className="inline-flex items-center justify-center px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
              >
                <ThumbsUp className="h-5 w-5 mr-2" />
                Like this Post ({likes})
              </button>
            </div>
          </div>
        )}

        {/* Navigation (only show in interactive mode) */}
        {viewMode === 'interactive' && (
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={() => setCurrentSection(prev => prev - 1)}
              disabled={currentSection === 0}
              className="px-6 py-3 rounded-lg bg-gray-800 text-white hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              Previous
            </button>
            <span className="text-gray-400 font-medium">
              Section {currentSection + 1} of {post.sections.length}
            </span>
            <button
              onClick={() => setCurrentSection(prev => prev + 1)}
              disabled={currentSection === post.sections.length - 1}
              className="px-6 py-3 rounded-lg bg-gray-800 text-white hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}