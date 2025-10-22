// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MovieDetailPage from './pages/MovieDetailPage';
import Navbar from './components/Navbar';
import DiscoverPage from './pages/DiscoverPage';
import GenreResultsPage from './pages/GenreResultsPage';
import PersonDetailPage from './pages/PersonDetailPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <>
      <Navbar />
      <main className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movie/:movieId" element={<MovieDetailPage />} />
          <Route path="/discover" element={<DiscoverPage />} />
          <Route path="/genre/:genreId" element={<GenreResultsPage />} />
          <Route path="/person/:personId" element={<PersonDetailPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;