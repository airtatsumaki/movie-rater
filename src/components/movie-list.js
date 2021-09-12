import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

function MovieList(props){
  const movieClicked = theMovie => evt => {
    //this is sending the data up/
    //telling the user/ parent component to trigger a function called movie clicked
    props.movieClicked(theMovie)
  }
  const editClicked = theMovie => evt => {
    props.editClicked(theMovie);
    console.log("you clicked edit for movie " + theMovie.title);
  }
  return (
    <div>
    	{props.movies && props.movies.map(theMovie => {
    	  return (
    	  	<div className="movie-item" key={theMovie.id}>
    	  	  <h2 className="clickable" onClick={movieClicked(theMovie)}>{theMovie.title}</h2>
    	  	  <FontAwesomeIcon className="clickable" icon={faEdit} onClick={editClicked(theMovie)} />
    	  	  <FontAwesomeIcon className="clickable" icon={faTrash} />
    	  	</div>
    	  )
    	})}
    </div>
  );
}

export default MovieList;