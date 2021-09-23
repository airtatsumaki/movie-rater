import { useState, useEffect } from 'react';
import { API } from '../api-service';
import { useCookies } from 'react-cookie';

function useFetch(){
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [token] = useCookies(['token']);

  useEffect(() => {
    async function fetchData(){
      setLoading(true);
      setError();
      const data = await API.getMovies(token['token'])
      .catch(err => setError(err))
      setData(data);
      setLoading(false);
      console.log("fetching data");
    }

    fetchData();
  },[]);

  return [data, loading, error];

}
export {useFetch};