import React from 'react';
import { Link } from 'react-router-dom';

// Mini tetris board preview — a frozen "mid-game" snapshot using actual piece colors
const PREVIEW: (string | null)[][] = [
  [null, null, null, null, '#a855f7', null, null, null, null, null],
  [null, null, null, '#a855f7', '#a855f7', '#a855f7', null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, '#22c55e', '#22c55e', null, null, '#ef4444', '#ef4444', null, null],
  [null, '#22c55e', '#22c55e', null, null, null, null, '#ef4444', '#ef4444', null],
  ['#3b82f6', null, null, '#06b6d4', '#06b6d4', '#06b6d4', '#06b6d4', null, null, '#f97316'],
  ['#3b82f6', '#3b82f6', '#3b82f6', null, '#eab308', '#eab308', null, '#f97316', '#f97316', '#f97316'],
];

const games = [
  {
    id: 'tetris',
    title: 'Classic Tetris',
    description:
      'The timeless block-stacking puzzle. Rotate, drop, and clear lines in this minimalist rendition.',
    category: 'Arcade',
    path: '/arcade/tetris',
  },
];

export default function InteractiveArchive() {
  return (
    <div className="py-24 px-8 md:px-16 w-full pb-32">
      {/* Page header — mirrors Photography.tsx pattern */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-gray-200 pb-16">
        <div className="max-w-2xl">
          <p className="text-blue-600 text-xs font-bold tracking-widest uppercase mb-4">
            Interactive Archive
          </p>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-gray-900">
            Play a{' '}
            <span className="font-editorial italic text-blue-600 font-light tracking-normal pr-2">
              little.
            </span>
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed font-light">
            A curated collection of interactive experiments and classic games, that satisfies my
            inner child and tech nerd.
          </p>
        </div>
      </div>

      {/* Game cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
        {games.map((game) => (
          <Link to={game.path} key={game.id} className="group cursor-pointer block">
            {/* Card thumbnail — rendered tetromino preview */}
            <div className="aspect-[4/3] bg-[#111111] mb-6 overflow-hidden relative rounded-xl shadow-sm flex items-center justify-center">
              {/* Subtle grid lines */}
              <div
                className="absolute inset-0 opacity-[0.07]"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
                  backgroundSize: '30px 30px',
                }}
              />
              {/* Tetromino blocks */}
              <div className="relative z-10 grid grid-cols-10 gap-[3px] group-hover:scale-105 transition-transform duration-700" style={{ width: '220px' }}>
                {PREVIEW.flat().map((color, i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-[2px] transition-opacity duration-500"
                    style={{
                      backgroundColor: color || 'transparent',
                      opacity: color ? 0.75 : 0,
                    }}
                  />
                ))}
              </div>
              {/* Hover overlay fade */}
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-20" />
            </div>

            <div className="flex justify-between items-start">
              <div>
                <p className="text-blue-600 text-xs font-bold tracking-widest uppercase mb-2">
                  {game.category}
                </p>
                <h3 className="text-2xl font-bold tracking-tight text-gray-900 group-hover:text-blue-600 transition-colors">
                  {game.title}
                </h3>
                <p className="text-gray-500 mt-2 text-sm max-w-md leading-relaxed">
                  {game.description}
                </p>
              </div>
              <div className="text-gray-400 group-hover:text-blue-600 transition-colors mt-2">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                  />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
