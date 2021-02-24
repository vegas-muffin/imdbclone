import React from "react";
import noImage from "./assets/noimage.jpg";
import star from "./assets/megastar.png";

const Movie = (props) => {
  return (
    <div id="fp" className="container-fluid wrapper wrapperStyle">
      <div id="upperBlock" className="wrapper">
        <div className="row">

                     <h2 className="col">{props.original_title}</h2>



          <h4 className="col-auto">
            Average Vote: {props.vote_average}
            <img className="star" src={star} />
          </h4>

          <h4 className="col-auto">Votes: {props.vote_count}</h4>
        </div>
      </div>
      <div id="briefInfo" className="wrapper">
        <h5>Release Date: {props.release_date}</h5>
        <div></div>
      </div>

      <div
        id="photoVideo"
        className="row"
        style={{ padding: "1% 5% 1% 5%", margin: "0%", border: "0%" }}
      >
        {props.poster_path == null ? (
          <img src={noImage} width="50%" height="auto" alt="card image"></img>
        ) : (
          <img
            width="50%"
            height="auto"
            src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${props.poster_path}`}
            alt={props.release_date}
            style={{ margin: "2%" }}
          />
        )}
      </div>
      <div style={{ margin: "8px" }}>
        <h4 style={{ fontWeight: "bolder" }}>Overview:</h4>
        <h5> {props.overview}</h5>
      </div>

      <div id="videoCarousel" className="wrapper"></div>
      <div id="photoCarousel" className="wrapper"></div>
      <div id="cast"></div>
    </div>
  );
};

export default Movie;
