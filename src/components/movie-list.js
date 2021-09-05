import React from 'react';

function MovieList(props){

    const movieClicked = theMovie => evt => {
        //this is sending the data up/
        //telling the user/ parent component to trigger a function called movie clicked
        props.movieClicked(theMovie)
    }

    return (
        <div>
        {props.movies && props.movies.map(theMovie => {
            return (
            <div className="movie-title" key={theMovie.id}>
                <h2 onClick={movieClicked(theMovie)}>{theMovie.title}</h2>
            </div>
            )
          })}
        </div>
    );
}

export default MovieList;