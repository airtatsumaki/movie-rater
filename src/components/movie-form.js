import React, { useState, useEffect } from 'react';
//{ API } - exports the api class so no need for export default in API class
import { API } from '../api-service';
import { useCookies } from 'react-cookie';

function MovieForm(props){
  const [title, setTitle] = useState(props.movie.title);
  const [description, setDescription] = useState(props.movie.description);
  const [token] = useCookies(['token']);
  const isDisabled = title.length === 0 || description.length === 0;
  // even tho props.movie changes the title and desc remain as default
  // this triggers the change of state (when edit button is clicked)
  // and updates title and desc based on the correct movie
  useEffect(() => {
    setTitle(props.movie.title);
    setDescription(props.movie.description);
  },[props.movie.title, props.movie.description]);

  const updateClicked = () => {
      API.updateMovie(props.movie.id, {title, description}, token['token'])
      .then(resp => props.updatedMovie(resp))
      //{title, description} - automatically replaced with {title: title, description: description}
      .catch(error => console.log(error));
  }

  const createClicked = () => {
    API.createMovie({title, description}, token['token'])
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
            <button className="clickable" onClick={updateClicked} disabled={isDisabled}>Update</button>
          ) :(
            <button className="clickable" onClick={createClicked} disabled={isDisabled}>Create</button>
          )
        }
        
      </div>
    ) : null}
    </>   
  );
}

export default MovieForm;