import React from 'react';
import Chart from "react-google-charts";

class Statistics extends React.Component {
    constructor(props){
        super(props);
        this.state={
         data: JSON.parse(sessionStorage.getItem('fullInf')),
         switcher: 0,
         lang: this.props.lang
        };
       
    }
    interested() {
      let all;
      if(localStorage.getItem('count')) {
      all = Object.entries(JSON.parse(localStorage.getItem('count')));
      }else all = [['no movies yet','no movies yet']];
      all.sort((a,b)=>b[1]-a[1]);
      all = all.slice(0,5);
     
      all.unshift(['Film','Number of Clicks']);
      return all;
    }
    mostRecent() {
      let all = this.state.data;
      all.sort((a,b)=>Date.parse(b.release_date)-Date.parse(a.release_date));
      all = all.slice(0,5);
      all = all.map(el=>[el.original_title,el.release_date]);
      all.unshift(['Film','Recent']);
      return all;
    }
    
    bestRatings() {
      let all = this.state.data;
      all.sort((a,b)=>parseFloat(b.vote_average)-parseFloat(a.vote_average));
      all = all.slice(0,5);
      all = all.map(el=>[el.original_title,parseFloat(el.vote_average)]);
      all.unshift(['Film','Rating']);
      return all;
    }
    mostOftenSeen() {
      let all = this.state.data;
      all.sort((a,b)=>parseFloat(b.popularity)-parseFloat(a.popularity));
      all = all.slice(0,5);
      all = all.map(el=>[el.original_title,parseFloat(el.popularity)]);
      all.unshift(['Film','Popularity']);
      return all;
    }
        render () {
            let best_rated = 'Best Rated Movies';
            let popular = 'Movies Seen by the Largest Number of People';
            let recently_released = 'Most Recently Released Movies';
            let interested = 'Movies you were interested in';
            let btn_best = 'Best Ratings';
            let btn_often_seen = 'Most Often Seen';
            let btn_recent = 'Most Recent';
            let btn_interested_in = 'You Were Interested'; 
            if (this.props.lang === 'ru') {
              best_rated = 'Фильмы с лучшим рейтингом';
              popular = 'Популярные фильмы';
              recently_released = 'Новинки';
              interested = 'Фильмы, которые интересны Вам';
              btn_best = 'Лучший рейтинг';
              btn_often_seen = 'Популярные';
              btn_recent = 'Новинки';
              btn_interested_in = 'Вы интересовались'; 
            }
            return (
             <div id = 'st' className = 'container-fluid'>
               <div className='row' style={{margin: '1%'}}>
              <button id = 'bestRatings'  className="btn btn-secondary" onClick={()=>this.setState({switcher:0})}>{btn_best}</button>
              <button id = 'mostOftenSeen' className="btn btn-secondary" onMouseUp={()=>this.setState({switcher:1})}>{btn_often_seen}</button>
              <button id = 'mostRecent' className="btn btn-secondary" onClick={()=>this.setState({switcher:2})}>{btn_recent}</button>
              <button id = 'youWereInterested' className="btn btn-secondary" onClick={()=>this.setState({switcher:3})}>{btn_interested_in}</button>
              </div>
              <div id = 'columnchart_values' style={{height:'90vh',backgroundColor:'white', padding: '2%'}}>
              
  <Chart 
 
 
  width={'100%'}
  height={'95%'}
  chartType="Bar"
  loader={<div >Loading Chart</div>}
  data={this.state.switcher===0?this.bestRatings():this.state.switcher===1?this.mostOftenSeen():this.state.switcher===2?this.mostRecent():this.interested()}
  options={{
    colors: 'rgb(245, 197, 24)',
   
    chart:{
    title: `${this.state.switcher===0?best_rated:this.state.switcher===1?popular:this.state.switcher===2?recently_released:interested}`,
    subtitle: '',
  
    },
    
  
  
  }}
  // For tests
  rootProps={{ 'data-testid': '1' }}
/>
            </div>
             </div>
            )
        }
         
    }
    export default Statistics;


    /*[
    ['Film', '2010 Population', '2000 Population'],
    ['New York City, NY', 8175000, 8008000],
    ['Los Angeles, CA', 3792000, 3694000],
    ['Chicago, IL', 2695000, 2896000],
    ['Houston, TX', 2099000, 1953000],
    ['Philadelphia, PA', 1526000, 1517000],
  ]
  */