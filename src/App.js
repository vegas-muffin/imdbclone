import FilmList from "./components/FilmList";
import FilmPage from "./components/FilmPage";
import Trailer from "./components/Trailer";
import SearchArea from "./components/SearchArea";
import MovieList from "./components/MovieList";
import Footer from "./components/Footer";
import mainLogo from "./logo-imdb.png";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Component } from "react";
import { Route, Link } from "react-router-dom";
import Watchlist from "./components/WatchList";
import Statistics from "./components/Statistics";
import GoogleAuth from "./components/GoogleAuth";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";

class App extends Component {
  constructor(props) {
    super(props);
    this.incrementWatchListNumber = this.incrementWatchListNumber.bind(this);
    this.decrementWatchListNumber = this.decrementWatchListNumber.bind(this);
    this.clearWatchList = this.clearWatchList.bind(this);
    this.change = this.change.bind(this);
    this.state = {
      watchlist: 0,
      movies: [],
      searchTerm: "",
      color: "",
      count: 0,
      colors: ["blue", "yellow", "white", "brown", "purple", "red", "green"],
      font: "",
      fonts: [
        "Times New Roman",
        "Arial",
        "Courier New",
        "Brush Spirit MT",
        "Copperplate",
        "Lucida Console",
        "Helvetica",
      ],
      flag: false,
      language: "en",
    };

    this.apiKey = "c9ebd652172bbcdaa5b3746fa2e60207";
  }
  // flag: false,
  change(option) {
    localStorage.setItem("lang", option.target.value);
    sessionStorage.removeItem("lang");
    sessionStorage.setItem("lang", option.target.value);
    this.setState({ language: option.target.value });
  }

  incrementWatchListNumber(filmid) {
    let arr = JSON.parse(localStorage.getItem("films"));
    if (arr) {
      if (!arr.includes(filmid)) {
        this.setState({ watchlist: this.state.watchlist + 1 });
      }
    } else {
      this.setState({ watchlist: this.state.watchlist + 1 });
    }
  }

  decrementWatchListNumber() {
    //without it nothing worked
    localStorage.setItem("films", JSON.stringify([]));
    let currentNum = JSON.parse(localStorage.getItem("films")).length / 2;
    if (currentNum > 1) {
      currentNum -= 1;
      this.setState({ watchlist: currentNum });
    }
  }

  clearWatchList(e, data) {
    e.preventDefault();
    localStorage.setItem("films", JSON.stringify([]));
    this.setState({ watchlist: 0 });
  }

  defineNumberWatchList() {
    if (localStorage.getItem("films")) {
      this.setState({
        watchlist: JSON.parse(localStorage.getItem("films")).length / 2,
      });
    }
  }

  componentDidMount() {
    this.defineNumberWatchList();
  }

  // search
  handleSubmit = (e) => {
    e.preventDefault();

    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${this.state.searchTerm}`
    )
      .then((data) => data.json())
      .then((data) => {
        this.setState({ movies: [...data.results] });
      });
  };
  // search
  handleChange = (e) => {
    this.setState({ searchTerm: e.target.value });
  };

  changeLinkState() {
    const inp = document.querySelector("input");
    const datl = document.querySelector("#datalistOptions").childNodes;
    const filmDATA = JSON.parse(sessionStorage.getItem("fullInf"));

    const currFilm = filmDATA.filter((el) => el.original_title === inp.value);

    sessionStorage.setItem("val", JSON.stringify(currFilm[0]));

    let flag = true;
    datl.forEach((el) => {
      if (el.value === inp.value) flag = false;
    });
    if (
      !flag &&
      document.querySelector("#photoVideo") &&
      document.querySelector("h2").innerHTML !== inp.value
    )
      window.location.reload();
    return flag;
  }

  secondNav() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container
          style={{ display: "flex", fontFamily: `${this.state.font}` }}
        >
          <a className="cursor" onClick={() => this.backgroundChange()}>
            {this.state.language === "ru"
              ? "Изменить фон"
              : "Change Background"}
          </a>
          <a className="cursor" onClick={() => this.setState({ color: "" })}>
            {this.state.language === "ru"
              ? "Фон по умолчанию"
              : "Default Background"}
          </a>
          <a className="cursor" onClick={() => this.fontChange()}>
            {this.state.language === "ru" ? "Изменить шрифт" : "Change Font"}
          </a>
          <a className="cursor" onClick={() => this.setState({ font: "" })}>
            {this.state.language === "ru"
              ? "Шрифт по умолчанию"
              : "Default Font"}
          </a>
        </Container>
      </Navbar>
    );
  }
  backgroundChange() {
    this.setState({ color: this.state.colors[this.state.count] });

    if (this.state.count >= this.state.colors.length - 1)
      this.setState({ count: 0 });
    else this.setState({ count: this.state.count + 1 });
  }
  fontChange() {
    this.setState({ font: this.state.fonts[this.state.count] });

    if (this.state.count >= this.state.fonts.length - 1)
      this.setState({ count: 0 });
    else this.setState({ count: this.state.count + 1 });
  }
  render() {
    const lang = localStorage.getItem("lang") || "en";

    // setTimeout(() => {
    //   this.setState({ flag: true });
    // }, 7000);
    // if (this.state.flag) {
    return (
      <div className="App">
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container style={{ fontFamily: `${this.state.font}` }}>
            <Navbar.Brand>
              <Link to="/">
                <img className="navbar-mainlogo" src={mainLogo}></img>
              </Link>
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="responsive-navbar-nav" />

            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link>
                  <Link style={{ textDecoration: "none" }} to="/WatchList">
                    <a className="nav-link nav__item">
                      <div className="nav__item_flex">
                        <ContextMenuTrigger
                          id="add_same_id"
                          className="context-menu-item"
                        >
                          <div>
                            <ContextMenuTrigger
                              id="add_same_id"
                              className="context-menu-item"
                            >
                              <div className="wl">
                                {this.state.language === "ru"
                                  ? "Фильмы к просмотру"
                                  : "WatchList"}
                              </div>
                            </ContextMenuTrigger>
                            <ContextMenu className="menu" id="add_same_id">
                              <MenuItem
                                onClick={(e) => this.clearWatchList(e)}
                                data={{ item: "Home" }}
                                className="menuItem"
                              >
                                {this.state.language === "ru"
                                  ? "Очистить список фильмов"
                                  : "Clear WatchList"}
                              </MenuItem>
                              <MenuItem
                                data={{ item: "Home" }}
                                className="menuItem"
                              >
                                {this.state.language === "ru"
                                  ? "Перейти к фильмам"
                                  : "Go to WatchList"}
                              </MenuItem>
                            </ContextMenu>

                            {/* <div className="watchlist-num">
                              {this.state.watchlist}
                            </div> */}
                          </div>
                        </ContextMenuTrigger>
                        <span className="badge rounded-pill badge-notification bg-warning text-dark badge__info">
                          {this.state.watchlist}
                        </span>
                      </div>
                    </a>
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <a
                    className="nav-link"
                    onClick={() => {
                      !this.state.flag
                        ? this.setState({ flag: true })
                        : this.setState({ flag: false });
                    }}
                  >
                    {this.state.language === "ru" ? "Настройки" : "Settings"}
                  </a>
                </Nav.Link>
                <Nav.Link>
                  <Link to="/Statistics">
                    <a className="nav-link">
                      {this.state.language === "ru"
                        ? "Статистика"
                        : "Statistic"}
                    </a>
                  </Link>
                </Nav.Link>

                <Nav.Link>
                  <GoogleAuth />
                </Nav.Link>

                <Nav.Link>
                  <select
                    name=""
                    id=""
                    className="custom-select pull-right"
                    onChange={this.change}
                    value={lang}
                  >
                    <option value="ru">Русский</option>
                    <option value="en">English</option>
                  </select>
                </Nav.Link>

                <Nav.Link>
                  {/*<Link to="/MovieList">*/}
                  <SearchArea
                    handleSubmit={this.handleSubmit}
                    handleChange={this.handleChange}
                  />
                  {/* </Link>*/}
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        {this.state.flag ? this.secondNav() : ""}
        <div
          id="ourRoot"
          className="d-flex justify-content-around"
          style={{ backgroundColor: `${this.state.color}` }}
        >
          <div id="fl" className="films-list">
            <Route exact path="/">
              <FilmList
                watchListincrement={this.incrementWatchListNumber}
                lang={this.state.language}
                key={1}
              />
            </Route>
            {/*
            <Route path="/">
              <MovieList movies={this.state.movies} />
            </Route>
           */}
            <Route exact path="/FilmPage">
              <FilmPage
                lang={this.state.language}
                value={this.state.font}
                key={1}
              />
            </Route>

            <Route path="/WatchList">
              <Watchlist
                watchListdecrement={this.decrementWatchListNumber}
                lang={this.state.language}
                key={1}
              />
            </Route>

            <Route path="/Statistics">
              <Statistics lang={this.state.language} key={1} />
            </Route>

            <Route path="/MovieList">
              <MovieList movies={this.state.movies} />
            </Route>
            <Route path="/Trailer">
              <Trailer />
            </Route>
          </div>
        </div>
        {/* footer isert here */}
        <Footer value={this.state.font} />
      </div>
    );
  }
  // else return <Cover />;
  //}
}

export default App;
