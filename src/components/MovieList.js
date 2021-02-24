import React from "react";
import Movie from "./Movie";

const MovieList = (props) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col s12">
          {props.movies.map((movie, i) => {
            return (
              <Movie
                key={i}
                poster_path={movie.poster_path}
                title={movie.title}
                original_title={movie.title}
                overview={movie.overview}
                release_date={movie.release_date}
                vote_average={movie.vote_average}
                vote_count={movie.vote_count}
                popularity={movie.popularity}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
