import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as blankStar } from '@fortawesome/free-regular-svg-icons'
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons'

//does this work.

function MovieDetails(props){

	const theMovie = props.movie;
	const [highlighted, setHighlighted] = useState(-1);
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
		//using `` means you can pipe in dynamic variables
		fetch(`http://127.0.0.1:8000/api/movies/${theMovie.id}/rate_movie/`,{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Token be17769c2231b85acef4e73dd24721b2ef2fef34',
			},
			body: JSON.stringify({stars: rate})
		})
		.then(() => getDetailes())
		.catch(error => console.log(error))
	}
	const getDetailes = () => {
		fetch(`http://127.0.0.1:8000/api/movies/${theMovie.id}/`,{
			method: 'GET',
			headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Token be17769c2231b85acef4e73dd24721b2ef2fef34',
			}
		})
		.then(resp => resp.json())
		.then(resp => props.updateMovie(resp))
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
