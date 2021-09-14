const TOKEN = 'be17769c2231b85acef4e73dd24721b2ef2fef34'

export class API{
  static updateMovie(movieID, body){
    return (
      fetch(`http://127.0.0.1:8000/api/movies/${movieID}/`,{
        method: 'PUT', 
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${TOKEN}`,
        },
        body: JSON.stringify(body)
      }).then(resp => resp.json())
    );
  }
}