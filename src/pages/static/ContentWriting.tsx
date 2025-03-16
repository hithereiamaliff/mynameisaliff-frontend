import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { SEO } from '../../components/SEO';

export function ContentWritingPage() {
  return (
    <>
      <SEO 
        title="Content Writing Evolution"
        description="Journey from traditional content writing to AI-enhanced solutions. Discover how I leverage AI to create more impactful digital content and solutions."
        keywords="content writing, AI writing, digital content, content strategy, AI solutions, Malaysia"
        path="/content-writing"
      />
      <div className="min-h-screen py-12 px-4 bg-gradient-to-br from-yellow-950 via-yellow-900 to-yellow-950">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center text-yellow-500 hover:text-yellow-600 mb-8"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>

          <article className="text-white space-y-12">
            <h1>Content Writing Evolution: From Traditional to AI-Enhanced</h1>
            
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">The Evolution of My Journey</h2>
              <p className="text-gray-300 mb-6">
                What started as a passion for content writing has evolved into something much more exciting. 
                The integration of AI has transformed how I approach digital solutions, opening new possibilities 
                I never imagined.
              </p>
              <img 
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=2000"
                alt="Digital content writing evolution"
                className="w-full rounded-lg my-8"
              />
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">From Writing to Innovation</h2>
              <p className="text-gray-300 mb-6">
                While I still value the art of storytelling, my focus has shifted to leveraging AI and 
                technology to create more impactful solutions. This transformation has allowed me to combine 
                creativity with technical innovation in ways that better serve modern needs.
              </p>
              <img 
                src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=2000"
                alt="Innovation in content creation"
                className="w-full rounded-lg my-8"
              />
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">The Future is AI-Powered</h2>
              <p className="text-gray-300 mb-6">
                Today, I'm excited to be working on AI-powered solutions that make technology more accessible 
                to everyone. From chatbots to intelligent automation, I'm passionate about creating tools that 
                enhance human capabilities rather than replace them.
              </p>
              <img 
                src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=2000"
                alt="AI-powered future"
                className="w-full rounded-lg my-8"
              />
            </section>

            <div className="mt-12">
              <a
                href="https://works.alancopywritingservices.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-yellow-700 hover:bg-yellow-800 text-white rounded-lg font-medium transition-colors"
              >
                View My Written Content
              </a>
            </div>
            
            <div className="mt-12 pt-8 border-t border-gray-800">
              <Link
                to="/"
                className="inline-flex items-center text-yellow-500 hover:text-yellow-600"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </div>
          </article>
        </div>
      </div>
    </>
  );
}