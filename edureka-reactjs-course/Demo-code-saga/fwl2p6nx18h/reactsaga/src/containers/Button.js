import React from 'react';
import { connect } from 'react-redux';
import { getNews } from '../actions';
let Button=({getNews})=>(
    <div>
    <br/>
    <center>
    <button onClick={getNews}
    className="btn btn-success">Press to see Products</button>
    </center>
    </div>
   
)
const mapDispatchToProps = {
     getNews: getNews,
};
Button = connect(null,mapDispatchToProps)(Button);
export default Button;