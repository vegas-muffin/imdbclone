import React from 'react';
import {Row, Col, Image } from 'react-bootstrap';
import close from './assets/close.png'


class Watchlist extends React.Component{
    constructor(props) {
        super(props);
        this.state = {data: [], lang: this.props.lang};
        this.updateWatchList = this.updateWatchList.bind(this);
        
    }

    async componentDidMount() {
        let filmsList = JSON.parse(localStorage.getItem('films'));
        this.setState({data: filmsList});
    }

    // for removing id from watchList
    updateWatchList(filmID) {
        let currentArray = this.state.data;
        const idx = currentArray.indexOf(filmID);
        currentArray.splice(idx, 1);
        currentArray.splice(idx, 1);
        localStorage.setItem('films', JSON.stringify(currentArray));
        this.setState({data: currentArray});
    }
    
    render() {
        if (this.state.data) {         
            return (
                <div id = "fp" className="container-fluid wrapperStyle">
                    <div className="top-menu-wrapper">
                        <div className="head-text">{this.state.lang === 'ru' ? 'Фильмы к просмотру' : 'Your Watchlist'}</div>
                    </div>
                    <div>
                    {this.state.data.map(el => (
                        <div key={el.id}>
                            <Row key={el.id} className="row-bottom-padding">
                                <Col xs={6} md={4}>
                                    {el[1] ? <Image className="poster-img-modal img-watchlist" src={`https://image.tmdb.org/t/p/original/${el[1]}`} alt={el[0]} thumbnail />: null}
                                </Col>
                                <Col xs={11} md={7}>
                                    {el[4] ? <div><strong>{this.state.lang === 'ru' ? 'Наименование' : 'Title'}: </strong> {el[4]}</div> : null}
                                    {el[2] ? <div><strong>{this.state.lang === 'ru' ? 'Дата выпуска' : 'Release date'}: </strong>  {el[2]}</div> : null}
                                    {el[3] ? <div><strong>{this.state.lang === 'ru' ? 'Рейтинг' : 'Stars'}: </strong> {el[3]}</div> : null}
                                    {el[5] ? <div><strong>{this.state.lang === 'ru' ? 'Обзор' : 'Overview'}: </strong> {el[5]}</div> : null}
                                </Col>
                                <Col xs={1} md={1}>
                                    {el[0] ? <div className="background-close-btn"><Image className="close-btn-img" src={close} alt="close button" onClick = {() => {this.updateWatchList(el[0]); }}/></div> : null}
                                </Col>
                            </Row>
                        </div>
                    ))}
                    </div>
                </div>
            )
        } else {
            return (<div id = "fp" className="container-fluid wrapperStyle">
                        <div className="head-text">{this.state.lang === 'ru' ? 'Фильмы к просмотру' : 'Your Watchlist'}</div>
                            {this.state.lang === 'ru' ? 'Ничего не было найдено' : 'Nothing was found'} 
                    </div>);
        }

    }
}

export default Watchlist;