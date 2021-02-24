import React from 'react'
import { Button, Modal, Container, Row, Col, Image } from 'react-bootstrap'


class ModalWindow extends React.Component{


    render(){
        let msgText = 'Successfully added to WatchList';
        this.props.lang === 'ru' ?  msgText = 'Успешно добавлен в список фильмов для просмотра' : msgText = 'Successfully added to WatchList';
        if (this.props.toWatchList) {
            if (localStorage.getItem('films')) {
                let arr = JSON.parse(localStorage.getItem('films'));
                if (! arr.includes(this.props.filmInfo.id)) {
                    arr.push(this.props.filmInfo.id);
                    let infoArr = [];
                    infoArr.push(this.props.filmInfo.id);
                    infoArr.push(this.props.filmInfo.poster_path);
                    infoArr.push(this.props.filmInfo.release_date);
                    infoArr.push(this.props.filmInfo.vote_average);
                    infoArr.push(this.props.filmInfo.title);
                    infoArr.push(this.props.filmInfo.overview);
                    arr.push(infoArr);
                } else {
                    this.props.lang === 'ru' ? msgText = 'Фильм уже добавлен к списку для просмотра' : msgText ='It is already in Watchlist'
                }
                localStorage.setItem('films', JSON.stringify(arr));
            } else { 
                localStorage.setItem('films', JSON.stringify([this.props.filmInfo.id, [this.props.filmInfo.id, this.props.filmInfo.poster_path,this.props.filmInfo.release_date, this.props.filmInfo.vote_average, this.props.filmInfo.title, this.props.filmInfo.overview]]));
            }
            return(
                <div>
                    <Modal className="main-modal" show={true} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                        <Modal.Header closeButton onClick={this.props.handleModalShowHide}>
                         <Modal.Title id="contained-modal-title-vcenter">{this.props.filmInfo.original_title}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="show-grid">
                        <Container>
                            <Row>
                               {msgText}
                            </Row>
                        </Container>
                        
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.handleModalShowHide}>
                            {this.props.lang === 'ru' ? 'Закрыть' : 'Close'}
                        </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            )
        } else {
            return (
                <div>
                    <Modal className="main-modal" show={true} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                        <Modal.Header closeButton onClick={this.props.handleModalShowHide}>
                        <Modal.Title id="contained-modal-title-vcenter">{this.props.filmInfo.original_title}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="show-grid">
                        <Container>
                            <Row>
                                <Col xs={6} md={4}>
                                    <Image className="poster-img-modal" src={`https://image.tmdb.org/t/p/original/${this.props.filmInfo.poster_path}`} alt={this.props.filmInfo.title} thumbnail />
                                </Col>
                                <Col xs={12} md={8}>
                                <strong>{this.props.lang === 'ru' ? 'Обзор:' : 'Overview:'} </strong>  {this.props.filmInfo.overview} <br/><br/>
                                <strong>{this.props.lang === 'ru' ? 'Дата выпуска:' : 'Release date:'} </strong> {this.props.filmInfo.release_date}
                                </Col>
                            </Row>
                        </Container>
                        
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.handleModalShowHide}>
                            Close
                        </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            );
        }

    }
    
}

export default ModalWindow;