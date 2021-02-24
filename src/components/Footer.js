import React from "react";
import rsschool from "./assets/rs_school_js.svg";
import i18next from "i18next";

class Footer extends React.Component {
  constructor(props) {
    super(props);
 
    this.state={font:''};
  
  }
componentWillReceiveProps(props) {
  this.setState({font:props})
  
}
  render() {
    return (
      <footer className="bg-dark text-center text-lg-start" >
        <div className="container p-4" style={{fontFamily:`${this.state.font.value}`}}>
          <div className="row">
            <div className="col-lg-6 col-md-12 mb-4 mb-md-0" >
              <h5 className="text-uppercase yellow-text">
                {" "}
                The Rolling Scopes School
              </h5>
              <p className="text-white">
                {i18next.t("FreeCourse")}{" "}
                <a
                  className="footer__link"
                  target="_blank"
                  href="https://rs.school/js/"
                >
                  rs.school/js
                </a>
              </p>
            </div>

            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
              <h5 className="text-uppercase"></h5>
              <div>
                <img className="footer__image" src={rsschool}></img>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
              <h5 className="text-uppercase mb-0 yellow-text">
                {i18next.t("Developed")}
              </h5>

              <ul className="list-unstyled">
                <li>
                  <a className="" href="https://github.com/YuPashintseva">
                    YuPashintseva
                  </a>
                </li>
                <li>
                  <a className="" href="https://github.com/anatkig">
                    anatkig
                  </a>
                </li>
                <li>
                  <a className="" href="https://github.com/vegas-muffin">
                    vegas-muffin
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center p-3 text-white">
          {" "}
          &copy; 2021 {i18next.t("Copyright")} IMDb-clone
        </div>
      </footer>
    );
  }
}

export default Footer;
