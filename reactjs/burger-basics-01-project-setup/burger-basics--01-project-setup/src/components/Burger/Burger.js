import React from 'react';
import classes from './Burger.css';
import BurgerIngrediant from '../BurgerIngrediant/BurgerIngrediant';

const burger = (props)=>{
    let ingrediants = Object.keys(props.ingrediants)
        .map((key,index)=>{
            return [...Array(props.ingrediants[key])].map((_,i)=>{
                return <BurgerIngrediant type={key} key={key+i}/>
            });
        }).reduce((arr,el)=>{
            return arr.concat(el)
        },[]);
    if(ingrediants.length === 0){
        ingrediants = <p>Please start adding ingrediants</p>
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngrediant type="bread-top"/>
                {ingrediants}
            <BurgerIngrediant type="bread-bottom"/>
        </div>
    )
}
export default burger;