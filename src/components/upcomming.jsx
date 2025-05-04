import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export function UpcomingMovie() {
  const [upcoming, setUpcoming] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_KEY = 'c45a857c193f6302f2b5061c3b85e743';

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`)
      .then((res) => {
        setUpcoming(res.data.results);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching upcoming movies:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center text-xl mt-10">Loading upcoming movies...</div>;
  }

  return (
    <div className="p-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {upcoming.map((movie) => (
        <Link to={`/movie/${movie.id}`}>
        <div key={movie.id} className="bg-gray-800 rounded shadow-lg p-2 hover:scale-105 hover:shadow-xl transition-transform duration-300">
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : 'https://via.placeholder.com/500x750?text=No+Image'
            }
            alt={movie.title}
            className="rounded mb-2"
          />
          <h3 className="text-lg font-semibold">{movie.title}</h3>
          <p className="text-sm text-gray-400">
            Release: {movie.release_date} • Rating: {movie.vote_average}
          </p>
        </div>
        </Link>
      ))}
    </div>
  );
}
