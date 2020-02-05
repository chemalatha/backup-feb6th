import React from 'react';

const cockpit = (props)=>{
    return (
        <div>
            <h1>{props.title}</h1>
            <p>This is really working!</p>
            <button
            style={props.style}
            onClick={props.clicked}>Toggle Persons</button>
        </div>

    )
}
export default cockpit;