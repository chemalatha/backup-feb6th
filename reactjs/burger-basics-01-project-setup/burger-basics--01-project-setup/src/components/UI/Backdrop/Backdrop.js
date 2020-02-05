import classes from './Backdrop.css';
import React from 'react';

const backdrop = (props)=>{
    return(
        props.show?<div className={classes.Backdrop} onClick={props.clicked}></div>:null
    )
}
export default backdrop;