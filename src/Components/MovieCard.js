import React from 'react';
import './MovieCard.css';

const MovieCards = () => {
    return(
        <React.Fragment>
            <div className="movie_card" id="bright">
                <div className="info_section">
                    <div className="movie_header">
                        <img className="locandina" src="https://movieplayer.net-cdn.it/t/images/2017/12/20/bright_jpg_191x283_crop_q85.jpg" alt="poster"/>
                        <h1>Movie Name</h1>
                        <h4>2017 (Year)</h4>
                        <p className="type">Action, Crime, Fantasy (Genre)</p>
                    </div>
                    <div className="movie_desc">
                        <p className="text">
                            Set in a world where fantasy creatures live side by side with humans. 
                            A human cop is forced to work with an Orc to find a weapon everyone is prepared to kill for. 
                        </p>
                    </div>
                </div>
                <div className="blur_back bright_back"></div>
            </div>
        </React.Fragment>
    );
};

export default MovieCards;