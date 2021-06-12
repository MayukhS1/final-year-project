import React, { useEffect, useState } from 'react';
import './SearchBar.css';

const SearchBar = ({setWelcomeBg}) => {
    const [data, setData] = useState("");
    const [query, setQuery] = useState('');
    const [heros, setHeros] = useState([]);

    
    const fetchMovieName = async () => {
        
        const apiUrl = '/get_names?short_name=th';
        fetch(apiUrl, {mode: 'no-cors'})
            .then((response) => {
                console.log(response);
                response.json();
            })
            .then((data) => console.log('This is your data', data));
        
    }

    useEffect (()=>{
        fetchMovieName();
    }, [] );

    return (
        <React.Fragment>
            <div className="srch-form">
                <input className="search-bar" id="searchBar" value={query} placeholder="Type the movie name..."
                    onChange = {(event)=>{
                        console.log(event.target.value);
                        setQuery(event.target.value)
                        fetchMovieName();   
                    }}
                ></input>
                <input type="text" className="search-bar" placeholder="Number of recomendation"></input>
                <button className="go-btn" onClick={()=>{
                    setWelcomeBg(false);
                }}>Go</button>
            </div>  
            <ul>
                
            </ul>
        </React.Fragment>
        
    );
}

export default SearchBar;