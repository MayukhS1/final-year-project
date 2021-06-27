import React, { useEffect, useState } from 'react';
import './MovieCard.css';

const MovieCards = ({movieName, countMovieApiCall, setCountMovieApiCall}) => {

    const [fetchedJson, setFetchedJson] = useState({});
    const [posterUrl, setPosterUrl] = useState("https://movieplayer.net-cdn.it/t/images/2017/12/20/bright_jpg_191x283_crop_q85.jpg");
    const year = movieName.substring(movieName.indexOf("(")+1, movieName.indexOf(")"));
    var name = movieName.substring(0,movieName.indexOf("(")-1); 

    const t = name.indexOf(", ");
    if(t!==-1){
        const part1 = name.substring(t+1,movieName.indexOf("(")-1);
        const part2 = name.substring(0,t);
        name = part1+" " + part2;
    }

    const posterApiUrl = `http://www.omdbapi.com/?i=tt3896198&apikey=391eed79&t=${name}&y=${year}`;


    useEffect (()=>{
        fetch(posterApiUrl)
            .then(results=>results.json())
            .then(data=>{
                setFetchedJson(data);
                setPosterUrl(data["Poster"]);
            })
    },[posterApiUrl]);


    // const fetchMoviePoster = async () =>{
    //     const response = await fetch(posterApiUrl);
    //     const jsonData = await response.json();
    //     console.log(jsonData["Genre"]);
    //     setFetchedJson(jsonData);
    //     setPosterUrl(jsonData["Poster"]);
    // }
    
    // if(name.length>0 && countMovieApiCall!==0){
    //     fetchMoviePoster();
    //     setCountMovieApiCall(0);
    // }
    
    return(
        <React.Fragment>
            <div className="movie_card" id="bright">
                <div className="info_section">
                    <div className="movie_header">
                        <img className="locandina" src={posterUrl} alt="poster"/>
                        <h1>{movieName}</h1>
                        <h4>{fetchedJson["Runtime"]}</h4>
                        <p className="type">{fetchedJson["Genre"]}</p>
                    </div>
                    <div className="movie_desc">
                        <p className="text"> {fetchedJson["Plot"]} </p>
                    </div>
                </div>
                <div className="blur_back bright_back"></div>
            </div>
        </React.Fragment>
    );
};

export default MovieCards;