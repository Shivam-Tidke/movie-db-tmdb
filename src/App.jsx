import { useState } from 'react';
import './App.css';
import { BrowserRouter, Link, Route, Routes, useNavigate } from 'react-router-dom';
import { Home } from './components/home';
import { TopRated } from './components/top-rated';
import { UpcomingMovie } from './components/upcomming';
import { MovieDetail } from './components/single-movie';
import { SearchResults } from './components/searchResult';

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className='text-gray-200'>
      <header className="bg-gray-900 p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-2xl font-bold flex-shrink-0">MovieDb</h2>

          <nav className="flex gap-4 flex-wrap">
            <Link to="/" className="hover:text-lime-400">Popular</Link>
            <Link to="/top-rated" className="hover:text-lime-400">Top Rated</Link>
            <Link to="/upcoming" className="hover:text-lime-400">Upcoming</Link>
          </nav>

          <div className="flex flex-grow md:flex-grow-0 max-w-full md:max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search..."
              className="rounded-l bg-gray-200 border-2 border-gray-200 w-full py-2 px-4 text-gray-700 focus:outline-none focus:bg-white focus:shadow-sm focus:border-lime-200"
            />
            <button
              onClick={handleSearch}
              className="bg-lime-400 px-4 text-white font-bold rounded-r hover:bg-lime-600 hover:shadow-lg transition duration-150 ease-in-out"
            >
              Search
            </button>
          </div>
        </div>
      </header>

      <section>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/top-rated' element={<TopRated />} />
          <Route path='/upcoming' element={<UpcomingMovie />} />
          <Route path='/movie/:id' element={<MovieDetail />} />
          <Route path='/search' element={<SearchResults />} />
        </Routes>
      </section>
    </div>
  );
}

export default AppWrapper;