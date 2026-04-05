import React from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section id="home" className="pt-16 pb-32 px-8 md:px-16 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        <div className="lg:col-span-7">
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tighter leading-[1.05] text-gray-900">
            Crafting digital <br />
            <span className="font-editorial italic text-blue-600 font-light tracking-normal pr-2">systems</span> <br />
            with intention.
          </h1>
          <p className="mt-8 text-lg text-gray-600 max-w-lg leading-relaxed font-light">
            An engineering student focusing on building intelligent architectures, high-fidelity interfaces, and capturing symmetry through photography.
          </p>
          <div className="mt-12 flex flex-wrap gap-6 items-center">
            <a href="#projects" className="bg-blue-600 text-white px-8 py-4 text-sm font-semibold hover:bg-blue-700 transition-colors">
              View Selected Works
            </a>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="border border-gray-300 text-gray-900 px-8 py-4 text-sm font-semibold hover:border-blue-600 hover:text-blue-600 transition-colors flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Resume
            </a>
          </div>
        </div>

        {/* Hero Image */}
        <div className="lg:col-span-5 h-[500px] lg:h-[700px] bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl overflow-hidden relative shadow-2xl">
          <div className="absolute inset-0 bg-black/5 mix-blend-overlay"></div>
          <img
            src="/profile.jpg"
            alt="Vidhu P Vinod"
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
          />
        </div>
      </section>

      {/* Selected Works */}
      <section id="projects" className="py-24 px-8 md:px-16 bg-white border-t border-gray-100">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-16">
          <div>
            <p className="text-blue-600 text-xs font-bold tracking-widest uppercase mb-4">Archive 01</p>
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter">Selected Works</h2>
          </div>
          <p className="text-gray-500 font-editorial italic text-lg max-w-sm mt-6 md:mt-0">
            A curation of projects that bridge the gap between complex utility and aesthetic excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
          {projects.map((proj, index) => (
            <Link to={`/projects/${proj.id}`} key={proj.id} className="group cursor-pointer block">
              <div className="aspect-[4/3] bg-gray-100 mb-6 overflow-hidden relative rounded-xl shadow-sm">
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <img
                  src={proj.image || `https://images.unsplash.com/photo-${1550000000000 + index * 100000}?auto=format&fit=crop&w=800&q=80`}
                  alt={proj.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-blue-600 text-xs font-bold tracking-widest uppercase mb-2">Development</p>
                  <h3 className="text-2xl font-bold tracking-tight text-gray-900 group-hover:text-blue-600 transition-colors">{proj.title}</h3>
                  <p className="text-gray-500 mt-2 text-sm max-w-md leading-relaxed">{proj.description}</p>
                </div>
                <div className="text-gray-400 group-hover:text-blue-600 transition-colors mt-2">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-20 flex justify-center">
          <a href="https://github.com/VidhuVi" target="_blank" rel="noopener noreferrer" className="border border-gray-200 text-gray-900 px-8 py-3 text-sm font-semibold rounded-full hover:border-gray-900 transition-colors flex items-center gap-2">
            Explore All on GitHub ↗
          </a>
        </div>
      </section>

      {/* Accolades / Achievements */}
      <section id="accolades" className="py-24 px-8 md:px-16 bg-white border-t border-gray-100">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-16">
          <div>
            <p className="text-blue-600 text-xs font-bold tracking-widest uppercase mb-4">Recognition</p>
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter">Accolades</h2>
          </div>
          <p className="text-gray-500 font-editorial italic text-lg max-w-sm mt-6 md:mt-0">
            A selection of victories and recognitions earned across competitions and events.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: "1st Place — Codeum Reparo", org: "Excel 2025", description: "Won first place in the Codeum Reparo coding competition at Excel 2025.", image: "/certificates/Codeum_Reparo.jpg" },
            { title: "1st Place — Binary Baton", org: "Excel 2025", description: "Secured first place in the Binary Baton event at Excel 2025.", image: "/certificates/Binary_Baton.jpg" },
            { title: "Skylarks Drone Team — AIR 27", org: "National Drone Competition", description: "Part of the Skylarks autonomous drone team that achieved All India Rank 27.", image: "/certificates/VIDHU P VINOD - Drone certificate.jpg" },
            { title: "Fundamentals of Cyber Security", org: "Coursera Certification", description: "Professional certification covering core cybersecurity principles and practices.", image: "/certificates/VIDHU P VINOD - Coursera {Fundamentals of Cyber Security}.jpg" },
            { title: "Ethical Hacking", org: "NPTEL Certification", description: "Completed the NPTEL course on Ethical Hacking with certification.", image: "/certificates/VIDHU P VINOD - NPTEL {Ethical Hacking Certificate}_compressed.jpg" },
          ].map((accolade, index) => (
            <div key={index} className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:-translate-y-2 hover:shadow-xl transition-[transform,box-shadow] duration-300 ease-out cursor-default will-change-transform">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={accolade.image}
                  alt={accolade.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-blue-600 text-xs font-bold tracking-widest uppercase">{accolade.org}</span>
                  <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold tracking-tight text-gray-900 mb-3">{accolade.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{accolade.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Philosophy / About */}
      <section id="about" className="py-24 px-8 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="bg-gray-900 text-white p-12 md:p-20 aspect-square flex flex-col justify-center items-center text-center relative overflow-hidden rounded-2xl">
          <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center mix-blend-luminosity"></div>
          <h3 className="text-3xl md:text-5xl font-editorial italic relative z-10 leading-tight">
            "Technology is the bridge between chaos and clarity."
          </h3>
          <p className="uppercase tracking-widest text-xs font-bold text-gray-400 mt-8 relative z-10">Safe for Work</p>
        </div>

        <div className="lg:pl-12">
          <p className="text-blue-600 text-xs font-bold tracking-widest uppercase mb-4">The Philosophy</p>
          <h2 className="text-5xl md:text-6xl font-black tracking-tighter leading-tight mb-8">
            Curating logic <br />through <span className="font-editorial italic text-blue-600 font-light pr-2">precision</span> <br />and emotion.
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed font-light mb-6">
            I believe that each and every individual has a role to play. My role starts here and never ends..
          </p>
          <p className="text-gray-600 text-lg leading-relaxed font-light mb-12">
            My work, I believe combines the structural rigor of software engineering and the never ending quest to make a difference.
          </p>

          <div className="flex gap-16 border-t border-gray-200 pt-8">
            <div>
              <p className="text-4xl font-black text-blue-600 mb-1">3+</p>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Years Coding</p>
            </div>
            <Link to="/photography" className="group cursor-pointer">
              <p className="text-4xl font-black text-blue-600 mb-1 group-hover:text-gray-900 transition-colors">My</p>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500 group-hover:text-blue-600 transition-colors flex items-center gap-1">Perspective<span className="opacity-0 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">↗</span></p>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-[#111111] text-white py-32 px-8 text-center mt-12 mb-[-32px] rounded-t-3xl">
        <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
          Ready to build <br />something <span className="font-editorial italic font-light text-gray-300">timeless?</span>
        </h2>
        <p className="text-gray-400 font-editorial italic text-xl mb-12">
          Currently open for new opportunities and creative partnerships.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a 
            href="https://mail.google.com/mail/?view=cm&fs=1&to=vidhupvinod@gmail.com" 
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 text-white px-8 py-4 text-sm font-semibold hover:bg-blue-500 transition-colors rounded"
          >
            Start a Conversation
          </a>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="border border-gray-600 text-white px-8 py-4 text-sm font-semibold hover:border-gray-400 transition-colors rounded flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            View Resume
          </a>
          <a href="https://www.linkedin.com/in/vidhu-p-vinod-66a84b291/" target="_blank" rel="noopener noreferrer" className="border border-gray-600 text-white px-8 py-4 text-sm font-semibold hover:border-gray-400 transition-colors rounded">
            Connect on LinkedIn
          </a>
        </div>
      </section>
    </>
  );
}
