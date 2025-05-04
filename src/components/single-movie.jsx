import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export const MovieDetail = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [cast, setCast] = useState([]);
    const API_KEY = 'c45a857c193f6302f2b5061c3b85e743';

    useEffect(() => {
        window.scrollTo(0, 0);
        axios
            .get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`)
            .then((res) => setMovie(res.data))
            .catch((err) => console.error(err));

        axios
            .get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`)
            .then((res) => setCast(res.data.cast))
            .catch((err) => console.error(err));
    }, [id]);

    if (!movie) return <div className="text-center mt-10 text-white">Loading.....</div>;

    return (
        <div className=" text-white min-h-screen px-4 pb-10">
        
            <div className="max-w-6xl mx-auto mt-8 rounded-lg overflow-hidden shadow-lg bg-[#0e0e0e] flex flex-col md:flex-row">

                <div className="flex flex-col md:flex-row p-6 md:p-8 w-full md:w-2/3 gap-6">
                    <img
                        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                        alt={movie.title}
                        className="rounded-lg w-[150px] sm:w-[180px] h-auto shadow-md"
                    />
                    <div className="flex flex-col justify-center">
                        <h2 className="text-2xl font-bold mb-1">{movie.title}</h2>
                        <p className="text-blue-400 mb-1">Rating: {movie.vote_average}</p>
                        <p className="text-sm text-gray-400 mb-1">
                            {movie.runtime} min &nbsp;&bull;&nbsp; {movie.genres.map((g) => g.name).join(', ')}
                        </p>
                        <p className="text-sm text-gray-400 mb-3">
                            Release Date: {new Date(movie.release_date).toDateString()}
                        </p>
                        <h3 className="font-semibold text-white mb-1">Overview</h3>
                        <p className="text-sm text-gray-300 leading-relaxed">{movie.overview}</p>
                    </div>
                </div>

     
                <div className="hidden md:block md:w-1/3 relative">
                    <img
                        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                        alt="Backdrop"
                        className="object-cover w-full h-full"
                    />
                    <div className="absolute left-0 top-0 w-16 h-full bg-gradient-to-l from-transparent to-[#0e0e0e]"></div>
                </div>
            </div>

    
            <div className="max-w-6xl mx-auto mt-10">
                <h3 className="text-xl font-semibold mb-4">Cast</h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                    {cast.slice(0, 12).map((actor) => (
                        <div
                            key={actor.id}
                            className="text-center transform transition-transform hover:scale-105"
                        >
                            <img
                                src={
                                    actor.profile_path
                                        ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                                        : 'https://via.placeholder.com/150x225?text=No+Image'
                                }
                                alt={actor.name}
                                className="rounded-lg shadow mb-2 w-full h-auto max-h-[250px] object-cover"
                            />
                            <p className="text-sm">{actor.name}</p>
                            <p className="text-xs text-gray-400">{actor.character}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};