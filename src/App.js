import React, { useState, useEffect } from 'react';
import './App.css';
import MovieList from './components/movie-list';
import MovieDetails from './components/movie-details';
import MovieForm from './components/movie-form';


function App() {
  //this is a hooks
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] =  useState(null);
  const [editedMovie, setEditedMovie] =  useState(null);
  // raises CORS error
  // use this django app to fix
  // https://github.com/adamchainz/django-cors-headers
  useEffect(()=>{
    fetch("http://127.0.0.1:8000/api/movies/",{
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token be17769c2231b85acef4e73dd24721b2ef2fef34',
      }
    })
    .then(resp => resp.json())
    .then(resp => setMovies(resp))
    .catch(error => console.log(error))
  },[]);

  //triggered from the movie-list component's props
  const loadMovie = theMovie => {
    setSelectedMovie(theMovie);
    setEditedMovie(null);
  }

  const editClicked = theMovie => {
    setEditedMovie(theMovie);
    setSelectedMovie(null);
    //console.log(theMovie.title);
  }

  const updatedMovie = theMovie => {
    const newMovies = movies.map( movie => {
      if (movie.id === theMovie.id){
        return theMovie;
      }
      return movie;
    })
    setMovies(newMovies);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>MOVIE RATER</h1>
      </header>
      <div className="layout">
        <MovieList movies={movies} movieClicked={loadMovie} editClicked={editClicked}/>
        <MovieDetails movie={selectedMovie} updateMovie={loadMovie}/>
        {editedMovie ? <MovieForm movie={editedMovie} updatedMovie={updatedMovie}/> : null}
      </div>
    </div>
  );
}

export default App;
