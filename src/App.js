import { useState, useEffect } from "react";
import './App.css';
import searchIcon from './search.svg'
import MovieCard from './MovieCard.jsx'
const API_URL = 'http://www.omdbapi.com?apikey=cbe4befb'

const App = () => {
    const [movies, setMovies] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`)
        const data = await response.json()
        setMovies(data.Search)
    }
    useEffect(() => {
        searchMovies('Movie')
    }, [])
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            searchMovies(searchTerm)
        }
      };
    return(
        <div className="app">
            <h1 onClick={() => searchMovies('Movie')}>MovieWorld</h1>
            <div className="search">
                <input
                    placeholder="Search for movies"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <img
                    src={searchIcon}
                    alt="search"
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>
            {movies?.length > 0
                ? (
                    <div className="container">
                        {movies.map((movie) => (
                            <MovieCard movie={movie} />
                        ))}
                    </div>
                ) : (
                    <div className="empty">
                        <h2>No Movies Found.</h2>
                    </div>
                )}
        </div>
    );
}
export default App;