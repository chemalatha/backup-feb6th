import React,{useEffect,useRef} from 'react';

import classes from './Cockpit.css';

const cockpit = ( props ) => {
    const toggleButtonRef = useRef(null);
    
    useEffect(()=>{
      console.log('[Cockpit.js useEffect');
      toggleButtonRef.current.click();
      return () => {
        console.log('[Cockpit.js] clean up work in useEffect');
      }
    },[]);

    const assignedClasses = [];
    let btnClass = '';
    if (props.showPersons) {
        btnClass = classes.Red;
    }

    if ( props.persons.length <= 2 ) {
      assignedClasses.push( classes.red ); // classes = ['red']
    }
    if ( props.persons.length <= 1 ) {
      assignedClasses.push( classes.bold ); // classes = ['red', 'bold']
    }

    return (
        <div className={classes.Cockpit}>
            <h1>{props.title}</h1>
            <p className={assignedClasses.join( ' ' )}>This is really working!</p>
            <button
                ref = {toggleButtonRef}
                className={btnClass}
                onClick={props.clicked}>Toggle Persons</button>
            <button onClick={props.login}>Login</button>
        </div>
    );
};

export default cockpit;