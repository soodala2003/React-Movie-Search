import { useState, useEffect } from "react";
import logo from './logo.svg';
import './App.css';

import MovieDisplay from "./components/MovieDisplay";
import Form from "./components/Form";

export default function App() {
  const apikey = "98e3fb1f"; 

  // State to hold movie data
  const [movie, setMovie] = useState(null);

  // Function to get movies
  const getMovie = async(searchTerm) => {
    try {
      // Make fetch request and store the response
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${apikey}&t=${searchTerm}`
      );
      // Parse JSON response into a JavaScript object
      const data = await response.json();
      // Parse JSON response into a JavaScript object
      setMovie(data);
    } catch(e) {
      console.error(e);
    }
  };

  // This will run on the first render but not on subsquent renders
  useEffect(() => {
    getMovie("Clueless");
  }, []);

  // We pass the getMovie function as a prop called moviesearch
  return (
    <div className="App">
      <Form moviesearch={getMovie} />
      <MovieDisplay movie={movie} />
    </div>
  );
}
