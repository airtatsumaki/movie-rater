import React, { useState, useEffect } from 'react';
import './App.css';
import MovieList from './components/movie-list';
import MovieDetails from './components/movie-details';
import MovieForm from './components/movie-form';
import { useCookies } from 'react-cookie';


function App() {
  //this is a hooks
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] =  useState(null);
  const [editedMovie, setEditedMovie] =  useState(null);
  const [token] = useCookies(['token']);

  // raises CORS error
  // use this django app to fix
  // https://github.com/adamchainz/django-cors-headers
  useEffect(()=>{
    fetch("http://127.0.0.1:8000/api/movies/",{
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token['token']}`,
      }
    })
    .then(resp => resp.json())
    .then(resp => setMovies(resp))
    .catch(error => console.log(error))
    //added editedMovie and selectedMovie to reender
    //dependencies. Otherwise the move list/ details would 
    //on rerender on page refresh
  },[token, editedMovie, selectedMovie]);

  useEffect(() => {
    // our token object has a propterty of token: '' inside.
    // so have to check token['token']
    console.log(token);
    if(!token['token']) {
      window.location.href = "/";
    }
  },[token]);

  //triggered from the movie-list component's props
  const loadMovie = theMovie => {
    setSelectedMovie(theMovie);
    setEditedMovie(null);
  }

  const editClicked = theMovie => {
    setEditedMovie(theMovie);
    setSelectedMovie(null);
    //console.log(editedMovie);
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

  const newMovie = () => {
    //since editedMovie's state has changed the movie-form component
    //loads up with this black fields for title and description
    setEditedMovie({title: '', description: ''});
    setSelectedMovie(null);
  }

  const movieCreated = theMovie => {
    const newMovies = [...movies,theMovie];
    setMovies(newMovies);
    
  }

  // const deleteClicked = theMovie => {
  //   const newMovies = movies.filter(movie => {
  //     if(movie.id === theMovie.id){
  //       return false;
  //     }
  //     return true;
  //   })
  //   setMovies(newMovies);
  // }

  const deleteClicked = theMovie => {
    const newMovies = movies.filter(movie => movie.id !== theMovie.id);
    setMovies(newMovies);
    //setting these to null. otherwise deleting only removes from the list
    //the movie details or movie form components stay on screen.
    setEditedMovie(null);
    setSelectedMovie(null);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>MOVIE RATER</h1>
      </header>
      <div className="layout">
        <div>
          <MovieList movies={movies} movieClicked={loadMovie} editClicked={editClicked} deleteClicked={deleteClicked}/>
          <button onClick={newMovie}>New Movie</button>
        </div>
        <MovieDetails movie={selectedMovie} updateMovie={loadMovie}/>
        {editedMovie ? <MovieForm movie={editedMovie} updatedMovie={updatedMovie} movieCreated={movieCreated}/> : null}
      </div>
    </div>
  );
}

export default App;
