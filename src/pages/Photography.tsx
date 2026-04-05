import React from 'react';

export default function Photography() {
  // Since VSCO restricts embedding their site directly onto other websites (via iframes), 
  // you can upload your absolute favorite exports to your public folder to serve as an 
  // embedded gallery, and push users out to your full VSCO feed with a prominent button!
  
  const galleryPlaceholders = [
    "/photos/WhatsApp Image 2026-04-05 at 13.28.29.jpeg",
    "/photos/WhatsApp Image 2026-04-05 at 13.29.04.jpeg",
    "/photos/WhatsApp Image 2026-04-05 at 13.29.24.jpeg",
    "/photos/WhatsApp Image 2026-04-05 at 13.29.44.jpeg",
    "/photos/WhatsApp Image 2026-04-05 at 13.30.02.jpeg",
    "/photos/WhatsApp Image 2026-04-05 at 13.30.18.jpeg"
  ];

  return (
    <div className="py-24 px-8 md:px-16 w-full animate-fade-in pb-32">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-gray-200 pb-16">
        <div className="max-w-2xl">
          <p className="text-blue-600 text-xs font-bold tracking-widest uppercase mb-4">Perspective</p>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-gray-900">Through the lens.</h1>
          <p className="text-gray-600 text-lg leading-relaxed font-light">
            My photography is a study of geometry, lighting, and transient moments. 
            Here is a curated selection of some of my favorite captures over the years.
          </p>
        </div>
        <div className="mt-8 md:mt-0">
          <a
            href="https://vsco.co/vidhup/gallery" 
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-900 text-white px-8 py-4 text-sm font-semibold rounded hover:bg-blue-600 transition-colors inline-block"
          >
            Follow to Full Gallery
          </a>
        </div>
      </div>

      {/* Masonry or Grid Layout for local/favorite images */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {galleryPlaceholders.map((src, index) => (
           <div key={index} className="aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden group">
             <img 
                src={src} 
                alt="Photography snapshot" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
             />
           </div>
        ))}
      </div>
      
      <div className="mt-24 text-center">
        <a
          href="https://vsco.co/vidhup/gallery" 
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-900 border-b border-gray-900 pb-1 font-semibold hover:text-blue-600 hover:border-blue-600 transition-colors"
        >
          Explore the complete archive on VSCO ↗
        </a>
      </div>
    </div>
  );
}
