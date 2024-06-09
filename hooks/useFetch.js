import { useState, useEffect } from 'react';
import axios from 'axios';

const rapidApiKey = process.env.RAPID_API_KEY;

export const useFetch = (endpoint, query) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const options = {
        method: 'GET',
        url: `https://jsearch.p.rapidapi.com/${endpoint}`,
        params: { ...query },
        headers: {
            'x-rapidapi-key': rapidApiKey,
            'x-rapidapi-host': 'jsearch.p.rapidapi.com'
        }
    };

    const fetchData = async () => {
        setIsLoading(true);

        try {
            const response = await axios.request(options);
            setData(response.data.data);

        } catch (error) {
            setError(error);

        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    const refetch = () => {
        fetchData();
    }

    return { data, isLoading, error, refetch };
}

// const options = {
//     method: 'GET',
//     url: `https://jsearch.p.rapidapi.com/${endpoint}`,
//     params: {
//       query: 'Python developer in Texas, USA',
//       page: '1',
//       num_pages: '1',
//       date_posted: 'all'
//     },
//     headers: {
//       'x-rapidapi-key': rapidApiKey,
//       'x-rapidapi-host': 'jsearch.p.rapidapi.com'
//     }
//   };

