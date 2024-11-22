import React, { useEffect, useState } from "react";
import axios from "../../Utils/axios";
import requests from "../../Utils/requests";
import "./Banner.css"


const Banner = () => {
  const [movie, setMovie] = useState({}); // Use an object instead of an array for a single movie

  useEffect(() => {
    (async () => {
      try {
        // Fetch data from the Netflix Originals API
        const request = await axios.get(requests.fetchNetflixOriginals);

        // Select a random movie from the fetched data
        setMovie(
          request.data.results[
            Math.floor(Math.random() * request.data.results.length)
          ]
        );
      } catch (error) {
        console.error("Error fetching Netflix Originals:", error);
      }
    })();
  }, []);

  function truncate(str, n) {
    return str?.length >n? str.substr(0, n-1)+'...':str;
  }


  return (
    <div
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`, // TMDB base URL for images. BAckdrop path -img path ?optional chain-incase of loading-to avoid any error while inserting img while the movie is loading
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="banner_contents">
        <h1 className="banner_title">
          {movie?.title || movie?.name || movie?.original_name} 
          {/* // sourcing out movie tile or name or ogrginal name */}
        </h1>

        <div className="banner-buttons">
            <button className="banner-button play">Play</button>
            <button className="banner-button">My List</button>
        </div>
        <h1 className="banner-description">{truncate(movie?.overview, 150)}</h1>
      </div>
      <div className="banner-fadeBottom" />
    </div>
  );
};

export default Banner;
