import { projects } from './data/projects'

export default function App() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 to-purple-950 p-6 max-w-screen mx-auto font-sans text-gray-100">
      
      {/* Hero Section */}
      <section className="text-center py-24 md:py-32 px-4 relative overflow-hidden">
        {/* Abstract background shapes - purely conceptual, you might need SVG or more complex CSS for this */}
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-56 h-56 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>


        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight leading-tight text-white relative z-10">
          Hey, I'm <span className="text-blue-400 drop-shadow-lg">Vidhu P Vinod</span>
        </h1>
        <p className="mt-8 text-xl sm:text-2xl md:text-3xl text-gray-300 max-w-4xl mx-auto leading-relaxed relative z-10 font-light">
          A awkwardly basic person who loves animals, taking photos and going for night rides, currently exploring computer science, and silently hoping for an<span className="font-semibold text-green-300"> AGI</span>. Technology both inspires and scares me — and that's what makes it special for me.
        </p>
      </section>

      {/* Projects Section */}
      <section className="my-20">
        <h2 className="text-4xl md:text-5xl font-bold mb-10 text-center text-white">My Creations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((proj) => (
            <div 
              key={proj.title} 
              className="bg-gray-800/70 backdrop-blur-md p-8 rounded-3xl 
                         hover:scale-[1.03] hover:shadow-2xl hover:shadow-blue-500/30 
                         transition-all duration-300 transform border border-gray-700/50"
            >
              <h3 className="text-3xl font-extrabold text-white mb-3">{proj.title}</h3>
              <p className="text-lg text-gray-300 mt-2 leading-relaxed">{proj.description}</p>
              <div className="flex gap-6 mt-6">
                <a 
                  href={proj.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 font-semibold text-lg flex items-center gap-2
                             transition-colors duration-200 group"
                >
                  GitHub 
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                </a>
                {proj.demo && (
                  <a 
                    href={proj.demo} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-green-400 hover:text-green-300 font-semibold text-lg flex items-center gap-2
                               transition-colors duration-200 group"
                  >
                    Demo 
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section className="my-20">
        <h2 className="text-4xl md:text-5xl font-bold mb-10 text-center text-white">My Toolkit</h2>
        <div className="flex flex-wrap justify-center gap-4 text-lg md:text-xl mt-2">
          {['HTML', 'CSS', 'JavaScript', 'Java', 'C', 'Linux', 'Python', 'Git'].map(skill => (
            <span key={skill} className="bg-blue-600/60 text-white px-5 py-2 rounded-full 
                                        shadow-lg hover:bg-blue-500/80 transition-colors duration-200
                                        flex items-center gap-2 border border-blue-500/80">
              {/* You might add icons here later, e.g., <FaHtml5 /> */}
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="my-20 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-10 text-white">Let's Connect</h2>
        <div className="flex justify-center gap-8 text-xl md:text-2xl font-semibold text-blue-400">
          <a href="https://github.com/VidhuVi" target="_blank" rel="noopener noreferrer" 
             className="hover:text-blue-300 transition-colors duration-200 flex items-center gap-2 group">
            GitHub
            <svg className="w-6 h-6 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
          </a>
          <a href="mailto:vidhupvinod@gmail.com" target="_blank" rel="noopener noreferrer" 
             className="hover:text-blue-300 transition-colors duration-200 flex items-center gap-2 group">
            Email
            <svg className="w-6 h-6 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-9 13V3"></path></svg>
          </a>
          <a href="https://www.linkedin.com/in/vidhu-p-vinod-66a84b291/" target="_blank" rel="noopener noreferrer" 
             className="hover:text-blue-300 transition-colors duration-200 flex items-center gap-2 group">
            LinkedIn
            <svg className="w-6 h-6 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-base text-gray-500 mt-24 mb-6 italic">
        <p>“Hoping to leave a mark, not just a commit.”</p>
        <p className="mt-2 text-sm text-gray-600">Designed and developed with curiosity and a dash of AI magic.</p>
      </footer>

    </main>
  )
}