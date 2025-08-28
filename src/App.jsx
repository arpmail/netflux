import React, {useEffect, useState} from 'react'
import Search from "./component/Search.jsx";
import Spinner from "./component/Spinner.jsx";
import MovieCard from "./component/MovieCard.jsx";
import {useDebounce} from "react-use";
import {getTrendingMovies, updateSearchCount} from "./appwrite.js";


const API_BASE_URL = 'https://api.themoviedb.org/3';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + API_KEY
    }
}

const App = () => {

    const [searchTerm, setSearchTerm] = useState('');
    const [debounceSearchTerm, setDebounceSearchTerm] = useState('');

    const [movieList, setMovieList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [trendingMovies, setTrendingMovies] = useState([]);

    // debounce the search term to prevent making too fast API requests
    // by waiting for the user to stop typing for 500ms
    useDebounce(() => setDebounceSearchTerm(searchTerm), 500, [searchTerm]);

    const fetchMovies = async (query = '') => {

        setIsLoading(true);
        setErrorMessage('');

        try {
            const endpoint = query ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}` : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
            
            const response = await fetch(endpoint, API_OPTIONS);

            if(!response.ok) {
                throw new Error('Failed to fetch movies')
            }

            const data = await response.json();

            if(data.Response === 'False'){
                setErrorMessage(data.Error || 'Failed to fetch movies');
                setMovieList([]);
            }

            setMovieList(data.results || []);

            if(query && data.results.length > 0) {
                await updateSearchCount(query, data.results[0]);
            }

        } catch (error) {
            console.log(`Error fetching movies: ${error}`);
            setErrorMessage(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    const loadTrendingMovies = async () => {
        try {
            const movies = await getTrendingMovies();

            setTrendingMovies(movies)
        } catch (e) {
            console.error(`Error fetching trending movies =`, e);
        }
    }

    useEffect(() => {
        fetchMovies(debounceSearchTerm);
    }, [debounceSearchTerm]);

    useEffect(() => {
       loadTrendingMovies();
    },[])

    return (
        <main>
            <div className="pattern">
            </div>
            <div className="wrapper">
                <header>
                    <img src="./hero.png" alt="Hero Banner"/>
                    <h1>No need for lucks, your movies live at <span className={"text-gradient"}>Netflux</span>!</h1>


                    <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                </header>

                {trendingMovies.length > 0 && (
                    <section className="trending">
                        <h2>Trending Movies</h2>

                        <ul>
                            {trendingMovies.map((movie, index) => (
                                <li key={movie.id}>
                                    <p>{index + 1}</p>
                                    <img src={movie.poster_url} alt={movie.title} />
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                <section className="all-movies">
                    <h2 className="mt-[20px]">All Movies</h2>

                    <p className="text-amber-50">{movieList.length < 1 ? <>Sorry, your movie was not found.</> : <></>}</p>


                    {isLoading ? (
                        <Spinner />
                    ) : errorMessage ? (
                        <p>{errorMessage}</p>
                    ) : (
                        <>
                        <ul>
                            {movieList.map((movie) => (
                                <MovieCard key={movie.id} movie={movie} />
                            ))}
                        </ul>
                        </>
                    )}
                </section>

            </div>
        </main>
    )
}
export default App
