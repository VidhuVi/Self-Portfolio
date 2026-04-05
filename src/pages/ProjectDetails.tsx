import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { projects } from '../data/projects';

export default function ProjectDetails() {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="py-24 px-8 md:px-16 w-full animate-fade-in pb-32">
      <Link to="/#projects" className="text-gray-500 hover:text-blue-600 transition-colors flex items-center gap-2 text-sm font-semibold mb-12">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Archive
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        <div className="lg:col-span-8">
          <div className="aspect-video bg-gray-100 rounded-2xl overflow-hidden shadow-2xl relative">
            <img
              src={project.image || `https://images.unsplash.com/photo-1550000000000?auto=format&fit=crop&w=1200&q=80`}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="lg:col-span-4 sticky top-12">
          <p className="text-blue-600 text-xs font-bold tracking-widest uppercase mb-4">Case Study</p>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-6 text-gray-900">{project.title}</h1>
          <p className="text-gray-600 text-lg leading-relaxed font-light mb-12">
            {project.description}
          </p>

          <div className="flex flex-col gap-4 mb-12">
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-center text-white px-8 py-4 text-sm font-semibold rounded hover:bg-blue-700 transition-colors w-full">
                View Live Project
              </a>
            )}
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="border border-gray-300 text-center text-gray-900 px-8 py-4 text-sm font-semibold rounded hover:border-gray-900 transition-colors w-full">
              View Source on GitHub
            </a>
          </div>

          <div className="border-t border-gray-200 pt-8">
            <h3 className="text-xl font-bold tracking-tight mb-6">Key Engineering Features</h3>
            <ul className="space-y-4">
              {project.features?.map((feature, idx) => (
                <li key={idx} className="flex gap-4 items-start text-gray-600 text-sm font-light">
                  <span className="text-blue-600 mt-0.5">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
