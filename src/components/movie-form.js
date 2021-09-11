import React, { useState } from 'react';
//{ API } - exports the api class so no need for export default in API class
import { API } from '../api-service';

function MovieForm(props){
  const theMovie = props.movie;
  const [title, setTitle] = useState(theMovie.title);
  const [description, setDescription] = useState(theMovie.description);
  const updateClicked = () =>{
      API.updateMovie(theMovie.id, {title, description})
      .then(resp => props.updatedMovie(resp))
      //{title, description} - automatically replaced with {title: title, description: description}
      .catch(error => console.log(error));
  }

  return (
    <>
    {theMovie ? (
      <div>
        <label htmlFor="title">Title</label><br />
        <input id="title" type="text" placeholder="title" value={title} 
        onChange={evt => setTitle(evt.target.value)}/><br />
        <label htmlFor="description">Description</label><br />
        <textarea id="description" type="text" placeholder="description" value={description}
        onChange={evt => setDescription(evt.target.value)}></textarea><br />
        <button onClick={updateClicked}>Update</button>
      </div>
    ) : null}
    </>   
  );
}

export default MovieForm;