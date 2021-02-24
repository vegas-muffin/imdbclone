import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";

class CarouselMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = { dataMain: [], type: "films", lang: this.props.lang };
  }

  async componentDidMount() {
    let responseMain = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=fb0fcc2d34caffc53da53d676fbf678a&language=${this.props.lang}&page=2`
    );
    if (this.props.type) {
      if (this.props.type === "films") {
        responseMain = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=fb0fcc2d34caffc53da53d676fbf678a&language=${this.props.lang}&page=2`
        );
      } else if (this.props.type === "people") {
        responseMain = await fetch(
          `https://api.themoviedb.org/3/person/popular?api_key=fb0fcc2d34caffc53da53d676fbf678a&language=${this.props.lang}&page=2`
        );
      } else {
        responseMain = await fetch(
          `https://api.themoviedb.org/3/movie/464052/credits?api_key=fb0fcc2d34caffc53da53d676fbf678a&language=${this.props.lang}`
        );
        if (this.props.filmId) {
          responseMain = await fetch(
            `https://api.themoviedb.org/3/movie/${this.props.filmId}/credits?api_key=fb0fcc2d34caffc53da53d676fbf678a&language=${this.props.lang}`
          );
        }
      }
      this.setState({ type: this.props.type });
    }
    const jsonMain = await responseMain.json();
    this.setState({ dataMain: jsonMain });
  }
  interestedCount(title) {
    if (localStorage.getItem("count")) {
      let obj = JSON.parse(localStorage.getItem("count"));
      if (obj[title]) {
        obj[title] = parseInt(obj[title]) + 1;
      } else {
        obj[title] = 1;
      }
      localStorage.setItem("count", JSON.stringify(obj));
    } else {
      let obj = {};
      obj[title] = 1;
      localStorage.clear();
      localStorage.setItem("count", JSON.stringify(obj));
    }
  }

  async updateURL(lang) {
    let response = "";
    try {
      let response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=fb0fcc2d34caffc53da53d676fbf678a&language=${lang}&page=2`
      );
      const json = await response.json();
      return json;
    } catch (err) {
      alert(err);
    }
  }

  componentDidUpdate(prevProps) {
    let res = "";
    if (prevProps.lang !== this.props.lang && this.props.type === "films") {
      console.log(prevProps, this.props.lang);
      res = this.updateURL(this.props.lang).then((value) => {
        this.setState({ dataMain: value });
        this.setState({ lang: this.props.lang });
      });
    }
  }

  render() {
    if (this.state.dataMain.results) {
      if (this.state.type === "films") {
        const responsive = {
          superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5,
          },
          desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1,
          },
          tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1,
          },
          mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
          },
        };
        return (
          <div className="main-carousel-wrapper">
            <Carousel
              swipeable={false}
              draggable={false}
              showDots={false}
              responsive={responsive}
              ssr={true}
              infinite={false}
              autoPlaySpeed={1000}
              keyBoardControl={true}
              customTransition="all .5"
              transitionDuration={1000}
              containerClass="carousel-container"
              dotListClass="custom-dot-list-style"
              itemClass="carousel-item-padding"
              centerMode={false}
              slidesToSlide={3}
            >
              {this.state.dataMain.results.map((el) =>
                el.backdrop_path ? (
                  <div key={el.id}>
                    <div key={el.id} className="main-carousel-img">
                      <Link to="/FilmPage">
                        <img
                          className="poster-img-main"
                          onClick={() =>
                            this.interestedCount(el.original_title)
                          }
                          onMouseOver={() => {
                            sessionStorage.removeItem("val");
                            sessionStorage.setItem("val", JSON.stringify(el));
                            sessionStorage.removeItem("lang");
                            sessionStorage.setItem("lang", this.state.lang);
                          }}
                          src={`https://image.tmdb.org/t/p/original/${el.backdrop_path}`}
                          alt={el.title}
                        />
                      </Link>
                      <h2>
                        <span>{el.title}</span>
                      </h2>
                    </div>
                  </div>
                ) : null
              )}
              ;
            </Carousel>
          </div>
        );
      } else if (this.state.type === "people") {
        const responsive = {
          superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5,
          },
          desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 5,
          },
          tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 3,
          },
          mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 2,
          },
        };
        return (
          <div className="main-carousel-wrapper">
            <Carousel
              swipeable={false}
              draggable={true}
              showDots={false}
              responsive={responsive}
              ssr={true}
              infinite={false}
              autoPlaySpeed={1000}
              keyBoardControl={true}
              customTransition="all .5"
              transitionDuration={1000}
              containerClass="carousel-container"
              dotListClass="custom-dot-list-style"
              itemClass="carousel-item-padding"
              centerMode={false}
              slidesToSlide={3}
            >
              {this.state.dataMain.results.map((el) =>
                el.profile_path ? (
                  <div key={el.id}>
                    <div key={el.id} className="main-carousel-img">
                        <img
                          className="poster-img-main rounded-img"
                          onMouseOver={() => {
                            sessionStorage.removeItem("val");
                            sessionStorage.setItem("val", JSON.stringify(el));
                          }}
                          src={`https://image.tmdb.org/t/p/original/${el.profile_path}`}
                          alt={el.profile_path}
                        />
                      <h2 className="star-name-carousel">{el.name}</h2>
                    </div>
                  </div>
                ) : null
              )}
              ;
            </Carousel>
          </div>
        );
      }
    } else if (this.state.type === "actors" && this.state.dataMain.cast) {
      const responsive = {
        superLargeDesktop: {
          breakpoint: { max: 4000, min: 3000 },
          items: 5,
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 5,
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 4,
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 2,
        },
      };

      return (
        <div className="main-carousel-wrapper">
          <Carousel
            swipeable={false}
            draggable={false}
            showDots={false}
            responsive={responsive}
            ssr={true}
            infinite={false}
            autoPlaySpeed={1000}
            keyBoardControl={true}
            customTransition="all .5"
            transitionDuration={1000}
            containerClass="carousel-container"
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding"
            centerMode={false}
            slidesToSlide={3}
          >
            {this.state.dataMain.cast.map((el) =>
              el.profile_path ? (
                <div key={el.id}>
                  <div key={el.id} className="main-carousel-img">
                    {el.profile_path && (
                      <img
                        className="poster-img-main rounded-img"
                        onMouseOver={() => {
                          sessionStorage.removeItem("val");
                          sessionStorage.setItem("val", JSON.stringify(el));
                        }}
                        src={`https://image.tmdb.org/t/p/original/${el.profile_path}`}
                        alt={el.profile_path}
                      />
                    )}
                    <div>
                      <h2 className="star-name-carousel">{el.name}</h2>
                    </div>
                  </div>
                </div>
              ) : null
            )}
          </Carousel>
        </div>
      );
    } else {
      return <div className="text-white">Wait a little</div>;
    }
  }
}

export default CarouselMain;
