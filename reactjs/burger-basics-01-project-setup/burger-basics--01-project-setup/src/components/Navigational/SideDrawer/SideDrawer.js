import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationalItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import BackDrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxilary/Auxilary';

const sideDrawer = (props)=>{
    let attachClasses = [classes.SideDrawer, classes.Close];
    if(props.open){
        attachClasses = [classes.SideDrawer, classes.Open];
    }
    return(
        <Aux>
            <BackDrop show={props.open} clicked={props.closed}/>
            <div className={attachClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo ></Logo>
                </div>
                <nav><NavigationalItems isAutheticated={props.isAuth}/></nav>
            </div>
        </Aux>

    )
}
export default sideDrawer;