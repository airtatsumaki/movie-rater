import React, { useState, useEffect } from 'react';
import './App.css';
import MovieList from './components/movie-list';
import MovieDetails from './components/movie-details';
import MovieForm from './components/movie-form';
import { useCookies } from 'react-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilm, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
// import { useFetch } from './hooks/useFetch';


function App() {
  //this is a hooks
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] =  useState(null);
  const [editedMovie, setEditedMovie] =  useState(null);
  //const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);
  // blank setToken since we don't need it in this component
  const [token, , deleteToken] = useCookies(['token']);
  //custom hook
  // const [data, loading, error] = useFetch();

  // useEffect(()=>{
  //   setMovies(data);
  //   console.log('update');
  // }, [token, data, editedMovie, selectedMovie])
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
    //added editedMovie and selectedMovie to render
    //dependencies. Otherwise the move list/ details would 
    //on rerender on page refresh
  },[token]);

  useEffect(() => {
    // our token object has a propterty of token: '' inside.
    // so have to check token['token']
    // since token changes this redirect triggers
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
    setSelectedMovie(theMovie);
    setMovies(newMovies);
  }

  const newMovie = () => {
    //since editedMovie's state has changed the movie-form component
    //loads up with these blank fields for title and description
    setEditedMovie({title: '', description: ''});
    setSelectedMovie(null);
  }

  const movieCreated = theMovie => {
    const newMovies = [...movies,theMovie];
    setMovies(newMovies);
    setEditedMovie(null);
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

  const logoutUser = () =>{
    deleteToken(['token']);
  }

  // if(loading) return <h3>Loading...</h3>
  // if(error) return <h3>Error {error}</h3>
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          <FontAwesomeIcon className="logo" icon={faFilm} />
          <span>Movie Rater</span>
        </h1>
        <FontAwesomeIcon className="signOut clickable" icon={faSignOutAlt} onClick={logoutUser}/>
      </header>
      <div className="layout">
        <div>
          <MovieList movies={movies} movieClicked={loadMovie} editClicked={editClicked} deleteClicked={deleteClicked}/>
          <button className="clickable" onClick={newMovie}>New Movie</button>
        </div>
        <MovieDetails movie={selectedMovie} updateMovie={updatedMovie}/>
        {editedMovie ? <MovieForm movie={editedMovie} updatedMovie={updatedMovie} movieCreated={movieCreated}/> : null}
      </div>
    </div>
  );
}

export default App;
