import React from 'react';
import classes from './Order.css';

const order = (props) =>{
    const ingrediants = [];
    for(let ingrediantsName in props.ingrediants){
        ingrediants.push({name:ingrediantsName,amount:props.ingrediants[ingrediantsName]});
    }
    const ingrediantsOutput = ingrediants.map(ing=>{
        return (<span 
                style={{textTransform:'capitalize',
                display:'inline-block',
                margin:'0 8px',
                border:'1px solid #ccc',
                padding:'5px'
                }}
                key={ing.name}>{ing.name}({ing.amount})</span>);
    });
    return (
        <div className={classes.Order}>
            <p>Ingrediant: {ingrediantsOutput}
            </p>
            <p>Price:<strong>USD {props.price.toFixed(2)}</strong></p>
        </div>
    )
}
export default order;