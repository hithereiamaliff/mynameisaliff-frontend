import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { SEO } from '../../components/SEO';
import ReactGA from 'react-ga4';

const TOOLS = [
  {
    name: "Model Context Protocol (MCP) Servers",
    description: "A collection of server implementations for the Model Context Protocol, designed to enhance AI model interactions with structured context.",
    features: [
      "Standardized context handling",
      "Multiple server implementations",
      "Easy integration with AI models",
      "Detailed documentation"
    ],
    techStack: ["Node.js", "WSL", "Various API keys"],
    repoUrl: "https://github.com/hithereiamaliff/mcp-servers"
  },
  {
    name: "WSL Claude Code Launcher",
    description: "A specialized tool for launching Claude Code session through Windows Subsystem for Linux (WSL) without entering commands manually.",
    features: [
      "Seamless WSL integration",
      "Automated session management",
      "Claude API integration configuration",
      "Detailed documentation"
    ],
    techStack: ["Shell Script", "WSL", "Claude API"],
    repoUrl: "https://github.com/hithereiamaliff/wsl-claudecode-launcher"
  }
];

export function DevToolsPage() {
  React.useEffect(() => {
    ReactGA.event({
      category: 'Page View',
      action: 'View Dev Tools Page',
    });
  }, []);

  return (
    <>
      <SEO
        title="Developer Tools & Automation"
        description="Explore my collection of AI-powered developer tools, including MCP servers and WSL utilities, designed to enhance development workflows for non-developers."
        keywords="developer tools, MCP servers, WSL, automation, AI tools, Claude API, Malaysia"
        path="/dev-tools"
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
            <h1>Developer Tools for Non-Developers</h1>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">AI-Powered Developer Tools</h2>
              <p className="text-gray-300 mb-6">
                I've developed these tools initially for my own use, leveraging AI to enhance my development 
                workflow. Now, I'm excited to share them with the community as open-source projects.
              </p>
              <p className="text-gray-300 mb-6">
                While some technical knowledge is required to use these tools, I've provided detailed README 
                documentation to help you get started.
              </p>
              <img 
                src="https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&q=80&w=2000"
                alt="Developer tools concept"
                className="w-full rounded-lg my-8"
              />
            </section>

            {TOOLS.map((tool, index) => (
              <section key={index} className="mt-12">
                <h2 className="text-2xl font-bold text-white mb-4">{tool.name}</h2>
                <p className="text-gray-300 mb-6">{tool.description}</p>
                
                <h3 className="text-xl font-semibold text-white mb-3">Key Features</h3>
                <ul className="text-gray-300 list-disc pl-6 mb-6">
                  {tool.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>

                <div className="bg-gray-800/50 p-6 rounded-lg my-8">
                  <h3 className="text-xl font-semibold text-white mb-3">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {tool.techStack.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-gray-700/50 rounded-full text-sm text-yellow-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <a
                    href={tool.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-yellow-700 hover:bg-yellow-800 text-white rounded-lg font-medium transition-colors"
                  >
                    View on GitHub
                  </a>
                </div>
              </section>
            ))}
            
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