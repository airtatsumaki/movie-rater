import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as blankStar } from '@fortawesome/free-regular-svg-icons'
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons'

function MovieDetails(props){

    const theMovie = props.movie;

    const renderStars = props => {
        const avg = theMovie.average_rating;
        const stars = [];
        for(let x = 1; x <= 5; x++){
            avg >= x ? (
                stars.push(<FontAwesomeIcon icon={solidStar} className="colored-star"/>)
            ) : (
                stars.push(<FontAwesomeIcon icon={blankStar} />)
            )
        }
        return stars;
    }

    return (
        <div>
            {/* without this it will not show theMovie.description
            must check the state has changed before we can render
            the move description  */}
            {theMovie ? (
                <>
                    <h1>{theMovie && theMovie.description}</h1>
                    {renderStars(props)}
                    ({theMovie.number_of_ratings})
                </>
            ) : null}
        </div>
    );
}

export default MovieDetails;
