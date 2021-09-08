import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as blankStar } from '@fortawesome/free-regular-svg-icons'
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons'

function MovieDetails(props){

    const theMovie = props.movie;

    const renderStars = (theMovie) => {
        const avg = theMovie.average_rating;
        //need to return the map function otherwise nothing is rendered on screen
        return (
            Array.from([1,2,3,4,5]).map((x) => {
                if(avg >= x)
                    return (<FontAwesomeIcon key={x} icon={solidStar} className="colored-star"/>);
                else
                    return (<FontAwesomeIcon key={x} icon={blankStar} />);
            })
        );
    }

    return (
        <div>
            {/* without this it will not show theMovie.description
            must check the state has changed before we can render
            the move description  */}
            {theMovie ? (
                <>
                    <div>
                        <h1>{theMovie && theMovie.description}</h1>
                        {renderStars(theMovie)}
                        ({theMovie.number_of_ratings})
                    </div>
                    <div className="rate-container">
                        <h2>Rate {theMovie.title}</h2>
                        {[...Array(5)].map((e) => {

                        })
                        }
                    </div>
                </>
            ) : null}
        </div>
    );
}

export default MovieDetails;
