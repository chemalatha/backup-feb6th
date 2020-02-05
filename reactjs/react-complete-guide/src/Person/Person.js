import React from 'react';
import Radium from 'radium';

const person = (props)=>{
    const style={
        '@media (min-width:500px)':{
            width:'10px'
        }
    }
    return (
        <div>
            <p style={style}>I am a person!!! {props.name} And My Age is {props.age} years</p>
            <h1>{props.children}</h1>
        </div>

    );
}
export default person;