import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText } from 'lucide-react';
import { SEO } from '../../components/SEO';
import ReactGA from 'react-ga4';

export function UXDesignPage() {
  React.useEffect(() => {
    ReactGA.event({
      category: 'Page View',
      action: 'View UX Design Page',
    });
  }, []);

  return (
    <>
      <SEO
        title="UX Design & Website Optimization"
        description="Explore my expertise in website optimization and UX design. Learn how I achieve perfect Lighthouse scores and transform slow WordPress sites into high-performance machines."
        keywords="UX design, website optimization, WordPress optimization, performance optimization, Lighthouse score, Malaysia"
        path="/ux-design"
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
            <h1>Website User Experience Design and Optimization</h1>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Experience This Site's Performance</h2>
              <p className="text-gray-300 mb-6">
                This website showcases modern web development practices, featuring blazing fast performance 
                and intuitive user experience. Built with React and Vite, it achieves sub-second page loads 
                and a perfect Lighthouse performance score.
              </p>
              <img 
                src="https://images.unsplash.com/photo-XXXXXXXXXXXX-afdab827c52f?auto=format&fit=crop&q=80&w=2000"
                alt="Website performance visualization"
                className="w-full rounded-lg my-8"
              />
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">WordPress Optimization Expertise</h2>
              <p className="text-gray-300 mb-6">
                Speed is crucial for success. A 1-second delay can result in 7% fewer conversions and 11% 
                fewer page views. My WordPress optimization services have achieved:
              </p>
              <ul className="text-gray-300 list-disc pl-6 mb-6">
                <li>92% Performance Score</li>
                <li>40% Average Improvement</li>
              </ul>
              <img 
                src="https://images.unsplash.com/photo-XXXXXXXXXXXX-14dd9538aa97?auto=format&fit=crop&q=80&w=2000"
                alt="WordPress optimization"
                className="w-full rounded-lg my-8"
              />
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Common Website Issues</h2>
              <p className="text-gray-300 mb-4">Issues that often drive visitors away include:</p>
              <ul className="text-gray-300 list-disc pl-6 mb-6">
                <li>Slow loading times (3+ seconds)</li>
                <li>Poor hosting performance</li>
                <li>Bloated WordPress themes</li>
                <li>High server response time</li>
                <li>Unoptimized images</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Optimization Method</h2>
              <p className="text-gray-300 mb-4">My approach to transform slow sites into high-performance machines:</p>
              <ul className="text-gray-300 list-disc pl-6 mb-6">
                <li>Strategic Hosting Migration with Cloudways</li>
                <li>Implementation of lightweight themes like Astra</li>
                <li>Premium optimization with WP Rocket</li>
                <li>Smart image compression and optimization</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Case Studies</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-800/50 p-6 rounded-lg text-center">
                  <h3 className="text-xl font-semibold text-white mb-3">"Getting It Strait" WordPress.com Migration</h3>
                  <ul className="text-gray-300 list-disc pl-6">
                    <li>Same-day migration</li>
                    <li>Enhanced functionality</li>
                    <li>Fixed all issues</li>
                    <li>Added security</li>
                  </ul>
                </div>
                <div className="bg-gray-800/50 p-6 rounded-lg text-center">
                  <h3 className="text-xl font-semibold text-white mb-3">Website Speed Optimization</h3>
                  <ul className="text-gray-300 list-disc pl-6">
                    <li>Score: D (52%) → A (92%)</li>
                    <li>Load: 3.0s → 1.5s</li>
                    <li>Block: 265ms → 6ms</li>
                  </ul>
                </div>
              </div>
              <div className="mt-8 text-center">
                <h3 className="text-2xl font-bold text-white mb-6">
                  Select a Case Study
                </h3>
                <div className="grid gap-4">
                  <a
                    href="https://alancopywritingservices.s3.ap-southeast-1.amazonaws.com/Previous+Works+by+Alan+Copywriting+Services/By+Topics/WordPress/Case+Study+-+GIS+Host+Migration/GIS+Site+Migration+-+Case+Study.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-yellow-700/20 rounded-lg group-hover:bg-yellow-700/30 transition-colors">
                        <FileText className="h-6 w-6 text-yellow-500" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">
                          GIS Website Migration
                        </h3>
                        <p className="text-gray-400">
                          A comprehensive case study on migrating a GIS website to improve performance and functionality.
                        </p>
                      </div>
                    </div>
                  </a>
                  <a
                    href="https://alancopywritingservices.s3.ap-southeast-1.amazonaws.com/Previous+Works+by+Alan+Copywriting+Services/By+Topics/User+Experience+(UX)/Case+Study+-+Increase+Website+Loading+Speed/increase+site+loading+speed+-+case+study.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-yellow-700/20 rounded-lg group-hover:bg-yellow-700/30 transition-colors">
                        <FileText className="h-6 w-6 text-yellow-500" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">
                          Website Speed Optimization
                        </h3>
                        <p className="text-gray-400">
                          Learn how I increased website performance and reduced loading times significantly.
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </section>
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
