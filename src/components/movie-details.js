import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as blankStar } from '@fortawesome/free-regular-svg-icons'
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons'
import { useCookies } from 'react-cookie';
import { API } from '../api-service';

function MovieDetails(props){
	const theMovie = props.movie;
	
	const [highlighted, setHighlighted] = useState(-1);
	const [token] = useCookies(['token']);

	const highlightRate = high => evt => {
		setHighlighted(high);
	}
	const renderStars = (theMovie) => {
		const avg = theMovie.average_rating;
		//need to return the map function otherwise nothing is rendered on screen
		return (
			[...Array(5)].map((e,i) => {
				if(avg >= i+1)
					return (<FontAwesomeIcon key={i+1} icon={solidStar} className="colored-star"/>);
				else
					return (<FontAwesomeIcon key={i+1} icon={blankStar} />);
			})
		);
	}
	const rateClicked = rate => evt =>{
		API.rateMovie(theMovie.id, {stars: rate}, token['token'])
		.then(console.log("this is the new ratemovie function"))
		.then(() => getDetailes())
		.catch(error => console.log(error))
	}
	
	const getDetailes = () => {
		API.getMovieDetails(theMovie.id, token['token'])
		.then(resp => props.updateMovie(resp))
		.then(console.log("this is the new getDetailes calls"))
		.catch(error => console.log(error))
	}

	const renderRateStars = () => {
		return (
			[...Array(5)].map((e,i) => {
				if(highlighted >= i+1)
					return (<FontAwesomeIcon onClick={rateClicked(i+1)} onMouseEnter={highlightRate(i+1)} onMouseLeave={highlightRate(-1)} key={i+1} icon={solidStar} className="rate-star clickable"/>);
				else
					return (<FontAwesomeIcon onClick={rateClicked(i+1)} onMouseEnter={highlightRate(i+1)} onMouseLeave={highlightRate(-1)} key={i+1} icon={blankStar} className="clickable" />);
			})
		);
	}
	return (
		<>
			{/* without this it will not show theMovie.description
			must check the state has changed before we can render
			the move description  */}
			{theMovie ? (
				<div>
					<div>
						<h1>{theMovie && theMovie.description}</h1>
						{renderStars(theMovie)}
						({theMovie.number_of_ratings})
					</div>
					<div className="rate-container">
						<h2>Rate {theMovie.title}</h2>
						{renderRateStars()}
					</div>
				</div>
			) : null}
		</>
	);
}

export default MovieDetails;
