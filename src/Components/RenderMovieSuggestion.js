import React, { useState } from 'react';
import MovieCards from './MovieCard';


const RenderMovieSuggestions = ({movie, numState}) => {

    const [recomendedMovies, setRecomendedMovies] = useState([]);
    
    const fetchRecomendations = async (name, number) => {

        const urlToFetch = `/api/?name=${name}&nor=${number}`;

        const response = await fetch(urlToFetch);
        const jsonData = await response.json();
        console.log(jsonData);

        var res = []
        for(var i in jsonData){
            res.push(jsonData[i]);
        }
        setRecomendedMovies(res);
    }

    if(movie.length>0 && numState>0){
        console.log("here " + movie,numState);
        fetchRecomendations(movie, numState);
    }
    
    return(
      <ul>
          {
              recomendedMovies.map((name,key)=>{
                  return(
                <div key={key}>
                    <MovieCards movieName={name}/>
                </div>
              );})
          }
      </ul>
    );
  }

  export default RenderMovieSuggestions;