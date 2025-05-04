import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const Home = () => {
  const [movies, setMovies] = useState([]);

  const API_KEY = 'c45a857c193f6302f2b5061c3b85e743'; 

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`)
      .then((res) => {
        setMovies(res.data.results);
      })
      .catch((err) => {
        console.error('Failed to fetch popular movies:', err);
      });
  }, []);

  return (
    <div className="p-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {movies.map((movie) => (
        <Link to={`/movie/${movie.id}`}>
        <div key={movie.id} className="bg-gray-900 rounded shadow-lg p-2 hover:scale-105 hover:shadow-xl transition-transform duration-300">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="rounded mb-2"
          />
          <h3 className="text-lg font-semibold">{movie.title}</h3>
          <p className="text-sm text-gray-400">Rating: {movie.vote_average}</p>
        </div>
        </Link>
      ))}
    </div>
  );
};
