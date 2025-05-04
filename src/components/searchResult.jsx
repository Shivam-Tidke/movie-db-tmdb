import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const SearchResults = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query) {
      fetch(`https://api.themoviedb.org/3/search/movie?api_key=c45a857c193f6302f2b5061c3b85e743&query=${query}`)
        .then(res => res.json())
        .then(data => setResults(data.results || []));
    }
  }, [query]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Search Results for "{query}"</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {results.map(movie => (
          <Link to={`/movie/${movie.id}`} >
          <div key={movie.id} className="bg-gray-800 p-4 rounded shadow">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-60 object-cover rounded"
            />
            <h3 className="text-lg font-semibold mt-2">{movie.title}</h3>
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
};