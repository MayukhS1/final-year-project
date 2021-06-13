import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({setWelcomeBg, setMovie, setNumState, setCountAPICall}) => {
    var data = "";
    var query = "";
    var numRecomendation = 0;
    const [suggestion, setSuggestion] = useState([]);

    const selectSuggestion =(name)=>{
        data = name;
        setMovie(data);
        document.getElementById('searchBar').value = data;
        console.log("selected movie " + data + " Num " + numRecomendation);
        setSuggestion([])
    }


    const fetchMovieName = async () => {
        
        // console.log("inside fetch : "+ document.getElementById("searchBar").value);
        const apiUrl = `/api/get_names?short_name=${query}`;
        const response = await fetch(apiUrl);
        const jsonData = await response.json();
        
        var res = []
        for(var i in jsonData){
            res.push(jsonData[i]);
        }

        setSuggestion(res);

    }

    const handleChange = (event) =>{
        event.preventDefault();
        console.log(event.target.value);
        query = event.target.value;
        console.log("query : "+query);
        fetchMovieName();
        
    }

   

    return (
        <React.Fragment>
            <div className="srch-form">
                <input className="search-bar" id="searchBar"  placeholder="Type the movie name..."
                    onChange = {handleChange}
                ></input>
                <input type="text" className="search-bar" id="numInput" placeholder="Number of recomendation"
                    onChange={(event)=>{
                        try {
                            numRecomendation = event.target.value;
                            console.log(numRecomendation);
                        } catch (error) {
                            numRecomendation = 0;
                        }
                    }}
                ></input>
                <button className="go-btn" onClick={(e)=>{
                    e.preventDefault();
                    setWelcomeBg(false);
                    setNumState(document.getElementById('numInput').value);
                    setCountAPICall(1);
                }}>Go</button>
            </div>
            
            <ul className="suggestion-box">
                {suggestion.map((item,index)=>{
                    return(
                        <div key={index}>
                            <li onClick={()=>{selectSuggestion(`${item}`)}}>{item}</li>
                        </div>
                    )
                })}
                {
                    (suggestion.length === 0 && query.length>0) && 
                    <div>
                        <li>No Such Movie Exists in the DB</li>
                    </div>
                }
            </ul>
            
        </React.Fragment>
        
    );
}

export default SearchBar;