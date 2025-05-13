import React from 'react';
import { useEffect, useState } from 'react'
import axios from 'axios'

const MovieCard = ({ title, year, url }) => {
    const bearerToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MTM2ZDlmODhiNWVhNTZmOThjNTQwYWM3ZDJhZDFlNyIsIm5iZiI6MTcwNzU5MDQzNC4wOTksInN1YiI6IjY1YzdjMzIyOTQ1MWU3MDE4NDdiNDIxOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mv3temcIfbm9RNzRAV-JWCMDWvWpjqr15jnbysIhyBE';
    const [config, setConfig] = useState(null);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [posterPath, setPosterPath] = useState(null);
    const [posterUrl, setPosterUrl] = useState(null);

    useEffect(() => {
        axios.get('https://api.themoviedb.org/3/movie/550', {
            headers: {
                'Authorization': `Bearer ${bearerToken}`
            }
        }).then(response => {
            setData(response.data);
        }).catch(setError);

        axios.get('https://api.themoviedb.org/3/configuration', {
            headers: {
                'Authorization': `Bearer ${bearerToken}`
            }
        }).then(response => {
            setConfig(response.data);
        }).catch(setError);
    }, []);

    useEffect(() => {
        if (config && data) {
            const url = config.images.base_url + config.images.poster_sizes[2] + data.poster_path;
            //const url = config.images.base_url + config.images.poster_sizes.slice(-1)[0] + data.poster_path;
            setPosterUrl(url);
            console.log(url);
        }
    }, [config, data]);

    if (error) return <p>Error: {error.message}</p>;
    if (!data) return <p>Loading...</p>;

    return (
        <div>
            <div>{title}</div>
            <div>{year}</div>
            {posterUrl ? (
                <img src={posterUrl} alt="Poster" />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
export default MovieCard;
