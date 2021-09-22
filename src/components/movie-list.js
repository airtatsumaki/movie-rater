import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { API } from '../api-service';
import { useCookies } from 'react-cookie';

function MovieList(props){
  const [token] = useCookies(['token']);

  const movieClicked = theMovie => evt => {
    //this is sending the data up/
    //telling the user/ parent component to trigger a function called movie clicked
    props.movieClicked(theMovie)
  }
  const editClicked = theMovie => evt => {
    props.editClicked(theMovie);
    //console.log("you clicked edit for movie " + theMovie.title);
  }
  const deleteClicked = theMovie => evt => {
    API.deleteMovie(theMovie.id, token['token'])
    .then(() => props.deleteClicked(theMovie))
    .catch(error => console.log(error));
  }
  return (
    <div>
    	{props.movies && props.movies.map(theMovie => {
    	  return (
    	  	<div className="movie-item" key={theMovie.id}>
    	  	  <h2 className="clickable" onClick={movieClicked(theMovie)}>{theMovie.title}</h2>
    	  	  <FontAwesomeIcon className="clickable" icon={faEdit} onClick={editClicked(theMovie)} />
    	  	  <FontAwesomeIcon className="clickable" icon={faTrash} onClick={deleteClicked(theMovie)} />
    	  	</div>
    	  )
    	})}
    </div>
  );
}

export default MovieList;