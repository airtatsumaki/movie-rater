import React, { useState, useEffect } from 'react';
//{ API } - exports the api class so no need for export default in API class
import { API } from '../api-service';

function MovieForm(props){
  const [title, setTitle] = useState(props.movie.title);
  const [description, setDescription] = useState(props.movie.description);
  // even tho props.movie changes the title and desc remain as default
  // this triggers the change of state (when edit button is clicked)
  // and updates title and desc based on the correct movie
  useEffect(() => {
    // Update the document title using the browser API
    setTitle(props.movie.title);
    setDescription(props.movie.description);
  },[props.movie.title, props.movie.description]);

  const updateClicked = () => {
      API.updateMovie(props.movie.id, {title, description})
      .then(resp => props.updatedMovie(resp))
      //{title, description} - automatically replaced with {title: title, description: description}
      .catch(error => console.log(error));
  }

  const createClicked = () => {
    API.createMovie({title, description})
    .then(resp => props.movieCreated(resp))
    //{title, description} - automatically replaced with {title: title, description: description}
    .catch(error => console.log(error));
}

  return (
    <>
    {props.movie ? (
      <div>
        <label htmlFor="title">Title</label><br />
        <input id="title" type="text" placeholder="title" value={title} 
        onChange={evt => setTitle(evt.target.value)}/><br />
        <label htmlFor="description">Description</label><br />
        <textarea id="description" type="text" placeholder="description" value={description}
        onChange={evt => setDescription(evt.target.value)}></textarea><br />
        {
          props.movie.id ? (
            <button onClick={updateClicked}>Update</button>
          ) :(
            <button onClick={createClicked}>Create</button>
          )
        }
        
      </div>
    ) : null}
    </>   
  );
}

export default MovieForm;