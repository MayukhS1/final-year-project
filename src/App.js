import React, { useState, useEffect } from 'react';
import MovieCards from './Components/MovieCard';
import SearchBar from './Components/SearchBar';
import {motion} from 'framer-motion';
import './App.css';


const welcomeMessageVariant = {
  start:{
    scale: .7,
    opacity: .3
  },
  end:{
    scale: 1,
    opacity: 1,
    transition:{
      duration: 0.5
    }
  }
}

function App() {

  const [welcomeBg, setWelcomeBg] = useState(true);
  
  const [hidden, setHidden] = useState(false);

  const handleScroll = () => {
    const top = window.pageYOffset || document.documentElement.scrollTop;
    setHidden(top !== 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  var navsate = {
    opacity : '1'
  }

  if(hidden===true) {
    navsate = {
      opacity : '0'
    }
  }

  return (
    <div className="App">
      {welcomeBg && <motion.div 
        className="front-message"
        variants = {welcomeMessageVariant}
        initial = {'start'}
        animate = {'end'}
      >
        <h1>Welcome to WIK</h1>
        <h3>A ML Based Movie Recomendation App</h3>
      </motion.div>}
      <div className={welcomeBg?"welcome-bg":""}></div>
      <motion.div className="head-bar"
        drag
        dragConstraints={{ left: 0, top: 0, right: 0, bottom: 0}}
        dragElastic={.5}
        style={navsate}
      >
        <SearchBar setWelcomeBg={setWelcomeBg}/>
      </motion.div>
        {!welcomeBg && <MovieCards/>}
        {!welcomeBg && <MovieCards/>}
        {!welcomeBg && <MovieCards/>}
        {!welcomeBg && <MovieCards/>}
        {!welcomeBg && <MovieCards/>}
      
    </div>
  );
}

export default App;