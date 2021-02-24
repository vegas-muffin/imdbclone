import React from "react";


class MovieRow extends React.Component {
  render() {
    return (
  
   
      <option className="search__item" value={this.props.movie.title}>
        {this.props.movie.overview}
        
      </option>
    
    
      // <div className="search__item" key={this.props.movie.id}>
      //   <div className="search__item-image"><img className="img" alt="poster" src={this.props.movie.poster_path} /></div>
      //   <div className="search__item-about">
      //     <h3>{this.props.movie.title}</h3>
      //   <p>{this.props.movie.overview}</p>
      //   </div>
      // </div>
    );
  }
}

export default MovieRow;
