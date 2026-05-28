import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ProjectDetails from './pages/ProjectDetails';
import Photography from './pages/Photography';
import InteractiveArchive from './pages/InteractiveArchive';
import TetrisGame from './pages/TetrisGame';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="projects/:id" element={<ProjectDetails />} />
          <Route path="photography" element={<Photography />} />
          <Route path="arcade" element={<InteractiveArchive />} />
          <Route path="arcade/tetris" element={<TetrisGame />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}