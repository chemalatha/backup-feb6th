import React from 'react';
import classes from './Menu.css'

const menu = (props)=>{
    return (
        <div className={classes.DrawerToggle} onClick={props.clicked}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
};
export default menu;