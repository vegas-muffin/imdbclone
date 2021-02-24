// import Option from "./Option";
import React from "react";
import i18next from "i18next";
import { Link } from "react-router-dom";

class SearchArea extends React.Component{
  render(){
  return (
   
    <form
      className="container-fluid my-2 my-lg-0"
      onSubmit={this.props.handleSubmit}
    >
      <Link to="/MovieList" onClick={(event)=>{!document.querySelector('input').value?event.preventDefault():event.returnValue = true}}>
      <input
        className="form-control mr-sm-2"
        style={{minWidth: '120px'}}
        //onChange={this.searchCnangeHandler.bind(this)}
        onChange={this.props.handleChange}
        type="text"
        list="datalistOptions"
        id="exampleDataList"
        placeholder={i18next.t("Search")}
   />
   </Link>
    
    </form>
    
   
  );
  }
};

// class SearchArea extends React.Component {
//   render() {

//   }
// }

export default SearchArea;
