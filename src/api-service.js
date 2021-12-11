//const TOKEN = 'be17769c2231b85acef4e73dd24721b2ef2fef34'
const APIPath = process.env.REACT_APP_API_LOCAL;
console.log(`APIPath value is : ${APIPath}`);

export class API{
  static loginUser(body){
    //fetch(`http://127.0.0.1:8000/auth/`,{
    return fetch(`${APIPath}/auth/`,{
      method: 'POST', 
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    }).then(resp => resp.json())
  }

  static registerUser(body){
    //fetch(`http://127.0.0.1:8000/api/users/`,{
    return fetch(`${APIPath}/api/users/`,{
      method: 'POST', 
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    }).then(resp => resp.json())
  }

  static getMovies(token){
    //fetch("http://127.0.0.1:8000/api/movies/",{
    return fetch(`${APIPath}/api/movies/`,{
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
      }
    })
    .then(resp => resp.json())
  }

  static getMovieDetails(movieID, token){
    //fetch(`http://127.0.0.1:8000/api/movies/${movieID}/`,{
    return fetch(`${APIPath}/api/movies/${movieID}/`,{
			method: 'GET',
			headers: {
					'Content-Type': 'application/json',
					'Authorization': `Token ${token}`,
			}
		}).then(resp => resp.json())
  }

  static rateMovie(movieID, body, token){
    //fetch(`http://127.0.0.1:8000/api/movies/${movieID}/rate_movie/`,{
    return fetch(`${APIPath}/api/movies/${movieID}/rate_movie/`,{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Token ${token}`,
			},
			body: JSON.stringify(body)
		});
  }

  static updateMovie(movieID, body, token){
    //fetch(`http://127.0.0.1:8000/api/movies/${movieID}/`,{
    return fetch(`${APIPath}/api/movies/${movieID}/`,{
      method: 'PUT', 
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
      },
      body: JSON.stringify(body)
    }).then(resp => resp.json())
  }

  static createMovie(body, token){
    //fetch(`http://127.0.0.1:8000/api/movies/`,{
    return fetch(`${APIPath}/api/movies/`,{
      method: 'POST', 
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
      },
      body: JSON.stringify(body)
    }).then(resp => resp.json())
  }

  static deleteMovie(movieID, token){
    //fetch(`http://127.0.0.1:8000/api/movies/${movieID}/`,{
    return fetch(`${APIPath}/api/movies/${movieID}/`,{
      method: 'DELETE', 
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
      }
    })
  }

}