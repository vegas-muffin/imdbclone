import React from 'react';
import star from './assets/megastar.png';
import CarouselMain from './CaurouselMain';


 class FilmPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {video:"",font:'', dat:JSON.parse(sessionStorage.getItem("val")), lang: this.props.lang, id: sessionStorage.getItem("val").id};
    }

    async updateURL(lang, id) {
        let response ='';
        try {
            let response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=fb0fcc2d34caffc53da53d676fbf678a&language=${lang}`);
            const json = await response.json();
            return json;
        } catch(err) {
            alert(err);
        }
    }

    async componentDidMount(){
     const response = await fetch(`https://api.themoviedb.org/3/movie/${this.state.dat.id}/videos?api_key=fb0fcc2d34caffc53da53d676fbf678a&language=${this.state.lang}`);
     const res = await response.json();
     this.setState({ video: res.results[0]?res.results[0].key:''});
     let val = JSON.parse(sessionStorage.getItem("val"));
     this.setState({dat: val});
    }

    componentDidUpdate(prevProps) {
        let res = '';
        if (prevProps.lang !== this.props.lang) {
            console.log(prevProps, this.props.lang)    
            res = this.updateURL(this.props.lang, this.state.dat.id).then((value) => {
                this.setState({ dat: value});
                this.setState({lang: this.props.lang});
            })
        }
    }
    componentWillReceiveProps(props) {
        this.setState({font:props})
        
      }
    render(){
        return(
            
            <div id = "fp" className=" container-fluid wrapperStyle" style={{fontFamily: this.state.font.value}}>
               
               <div id = "upperBlock" className="wrapper">
                 <div className="row"></div>
                 <div className="row">

                     <h2 className="col">{this.props.lang === 'ru' ? this.state.dat.title :this.state.dat.original_title}</h2>
                    
                     
                     <h4 className="col-auto">{this.props.lang === 'ru' ? 'Рейтинг':'Average Vote:'} {this.state.dat.vote_average}
                     <img className = "star"src={star} ></img>
                     </h4>
                     
                     
                     <h4 className="col-auto">{this.props.lang === 'ru' ? 'Голоса':'Votes:'} {this.state.dat.vote_count}</h4>
                
               </div>
               </div>
               <div id = "briefInfo" className="wrapper">
                   <h5>{this.props.lang === 'ru' ? 'Дата выпуска':'Release Date:'} {this.state.dat.release_date}</h5>
                   <div></div>
                </div>

               <div id = "photoVideo" className="row" style={{padding:'1% 5% 1% 5%', margin:'0%', border:'0%'}}>
                   
                <img  width="36%" height ="auto" src={`https://image.tmdb.org/t/p/original/${this.state.dat.poster_path}`} alt={this.state.dat.title} style={{ margin:'2%'}}/>
                {this.state.video?(
                <iframe  width="56%" height="auto" src={`https://www.youtube.com/embed/${this.state.video}`} style={{ margin:'2%'}}/>
                ):(
                <div style={{color:'white', margin:'0% 5% 5% 1%',maxWidth:'45%'}}>
                Sorry, there seems to be no video provided for this film. 
                <hr/>The Universe wants you to watch it without spoilers, apparently.</div>
                )}
               </div>
               <div style={{  margin: "8px"}}>
               <h4 style={{  fontWeight: "bolder"}}>{this.props.lang === 'ru' ? 'Обзор':'Overview'}:</h4>
              <h5 > {this.state.dat.overview}</h5></div>
             
               <div id = "videoCarousel" className="wrapper"></div>
               <div id = "photoCarousel" className="wrapper"></div>
               <div id = "cast"></div>
               <div className="head-text">
               {this.props.lang === 'ru' ? 'Актеры':'Actors'}
               </div>
               <CarouselMain type={"actors"} filmId={this.state.dat.id} lang={this.props.lang} key={1} />
            </div>
        )
    }
}


export default FilmPage;