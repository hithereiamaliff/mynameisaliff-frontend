import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Compass, Camera, Coffee, ArrowRight } from 'lucide-react';

const EXPERIENCES = [
  {
    title: "Heritage Walking Tours",
    description: "Curated walking tours through George Town's most picturesque streets, focusing on the beauty of historical architecture and local life.",
    icon: <MapPin className="h-6 w-6 text-yellow-500" />
  },
  {
    title: "Hidden Gems Discovery",
    description: "Off-the-beaten-path explorations to discover Penang's secret spots, from quiet cafes to stunning viewpoints.",
    icon: <Compass className="h-6 w-6 text-yellow-500" />
  },
  {
    title: "Photography Walks",
    description: "Specially designed routes for photography enthusiasts, capturing Penang's most Instagram-worthy locations.",
    icon: <Camera className="h-6 w-6 text-yellow-500" />
  },
  {
    title: "Food Adventures",
    description: "Guided tours to experience Penang's renowned street food scene, from hawker stalls to local coffee shops.",
    icon: <Coffee className="h-6 w-6 text-yellow-500" />
  }
];

export function TourismPage() {
  return (
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
          <h1>Tourism & Local Experiences in Penang</h1>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Sharing Penang's Beauty</h2>
            <p className="text-gray-300 mb-6">
              As a tour guide-in-training and lifelong resident of Penang, I'm passionate about sharing 
              the island's stunning beauty and hidden treasures with visitors. My approach focuses on 
              creating authentic, personalized experiences that showcase Penang's most picturesque locations 
              and vibrant local life.
            </p>
            <img 
              src="https://images.unsplash.com/photo-1592811069126-7e43dde028eb?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Penang skyline view"
              className="w-full rounded-lg my-8"
            />
            <div className="bg-yellow-900/30 p-8 rounded-lg text-center mt-8">
              <h3 className="text-2xl font-bold text-yellow-500 mb-4">🚧 Under Development</h3>
              <p className="text-gray-300 text-lg mb-4">
                This section is currently under development as I complete my tour guide training program.
              </p>
              <p className="text-gray-400">
                Check back soon for detailed information about guided tours and local experiences in Penang!
              </p>
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
  );
}