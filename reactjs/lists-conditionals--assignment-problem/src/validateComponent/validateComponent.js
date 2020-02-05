import React from 'react';
const validateComponent = (props) =>{
    let result = (props.textLen<5)?('Text is too short'):('Text is long enough');
    return(
        <div>{result}</div>
    )
}

export default validateComponent;