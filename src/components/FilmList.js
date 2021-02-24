import React from 'react';
import Carousel from "react-multi-carousel";
import ModalWindow from './ModalWindow';
import CaurouselMain from './CaurouselMain';
import 'react-multi-carousel/lib/styles.css';
import star from './assets/star.png'
import play from './assets/play.png'
import info from './assets/info-grey.png';
import { Link } from "react-router-dom";


const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

class FilmList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {data: [], dataMain: [], value: "", showHide: false, currFilmInfo: {}, showAlert: false, lang: this.props.lang};
        this.handleModalShowHide = this.handleModalShowHide.bind(this);
        this.handleModalShowHide2 = this.handleModalShowHide2.bind(this);
        this.escFunction = this.escFunction.bind(this);
    }

    escFunction(event){
        if(event.keyCode === 27) {
            this.setState({showHide: false});
        }
    }

    async componentDidMount() {
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=fb0fcc2d34caffc53da53d676fbf678a&language=${this.props.lang}&page=1`);
        const json = await response.json();
        this.setState({ data: json});
        sessionStorage.setItem('fullInf',JSON.stringify(json.results));
        document.addEventListener("keydown", this.escFunction, false);
    }

    componentWillUnmount(){
        document.removeEventListener("keydown", this.escFunction, false);
    }

    returnState(){
        return this.state;
    }

    
    async updateURL(lang) {
        let response ='';
        try {
            let response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=fb0fcc2d34caffc53da53d676fbf678a&language=${lang}&page=1`);
            const json = await response.json();
            return json;
        } catch(err) {
            alert(err);
        }
    }

    componentDidUpdate(prevProps) {
        let res = '';
        if (prevProps.lang !== this.props.lang) {
            let lan = 'en';
            this.state.lang === 'en' ? lan = 'ru' : lan = 'en';
            res = this.updateURL(lan).then((value) => {
                this.setState({ data: value});
                this.setState({lang: this.props.lang});
            })
        }
    }

    handleModalShowHide(film, isneedAlert) {
        this.setState({ showHide: !this.state.showHide });
        this.setState({ showAlert: isneedAlert });
        this.setState({ currFilmInfo: film });
    }

    handleModalShowHide2() {
        this.setState({ showHide: !this.state.showHide });
    }
    interestedCount(title) {
        if(localStorage.getItem('count')){
            let obj = JSON.parse(localStorage.getItem('count'));
            if (obj[title]) {
                obj[title] = parseInt(obj[title])+1;
            } else {
                obj[title] = 1;
            }
            localStorage.setItem('count', JSON.stringify(obj));
        }
        else {
            let obj ={};
            obj[title] = 1;
            localStorage.setItem('count', JSON.stringify(obj));
        }
    }

    render() {
        let mod = '';
        if (this.state.data.results) {
            if (this.state.showHide) {
                mod = <ModalWindow handleModalShowHide = {this.handleModalShowHide2} filmInfo = {this.state.currFilmInfo} toWatchList={this.state.showAlert} lang={this.state.lang} />
            }
            return (
                <div>
                <CaurouselMain type={"films"} lang={this.state.lang} key={2} />

                <div className="head-text">
                    {this.props.lang === 'ru' ? 'Рекомендуемые фильмы': 'What to watch'}
                </div>
                {mod}
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
            
            {this.state.data.results.map(el => (
                <div element={el.id} key ={el.id}>
                    <div className="films-list-img App-link" >
                    
                        <Link style={{ textDecoration: 'none', color: 'white' }} to= "/FilmPage" > 
                            <img className="poster-img" onClick={()=>this.interestedCount(el.original_title)} onMouseOver={()=> 
                                    {
                                        sessionStorage.removeItem("val");
                                        sessionStorage.setItem("val",JSON.stringify(el));
                                        sessionStorage.removeItem("lang");
                                        sessionStorage.setItem("lang",this.props.lang);
                                    }
                                }  src={`https://image.tmdb.org/t/p/original/${el.poster_path}`} alt={el.title}/>
                        </Link>    
                       
                        <div className="bottom-content-wrapper">
                            <div className="rating">
                                <div className="vote">
       
                                  <img className = "star" src={star} alt="star icon" />
                                    <div className="vote_average">{el.vote_average}</div>
                                </div>
                            </div>
                           <Link style={{ textDecoration: 'none', color: 'white' }} to= "/FilmPage">
                                <div className="film-title" onClick={()=>this.interestedCount(el.original_title)} onMouseOver={()=>
                                    {
                                        sessionStorage.removeItem("val");
                                        sessionStorage.setItem("val",JSON.stringify(el));
                                        sessionStorage.removeItem("lang");
                                        sessionStorage.setItem("lang",this.props.lang);
                                    }
                                }>{el.title}</div>
                            </Link> 
                            
                            <button type="button" className="add-to-watchlist-btn" onClick = {() => {this.handleModalShowHide(el, true); this.props.watchListincrement(el.id); }}>{this.props.lang === 'ru'? '+ Добавить к просмотру' : '+ Watchlist' }</button>
                            <div className="additional-info">
                                
                                    <div className="trailer">                                
                                        <img src={play} alt="play button" className="play-button"/>{this.props.lang === 'ru' ? 'Трейлер' : 'Trailer'}
                                    </div>
                              
                                <div className="info-button-wrapper">
                                    <img src={info} alt="info button" className="info-button" onClick = {() => this.handleModalShowHide(el, false)}/> 
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            ))};
                
            </Carousel>
            <div className="head-text">
                {this.props.lang === 'ru' ? 'Звёзды' : 'Popular people'}
            </div>
            <CaurouselMain type={"people"} lang={this.state.lang} key={1} />
            </div>
            );
        } else {
            return (
                <div className="text-white">Wait...</div>
            );
        }
    
    }

}


export default FilmList;