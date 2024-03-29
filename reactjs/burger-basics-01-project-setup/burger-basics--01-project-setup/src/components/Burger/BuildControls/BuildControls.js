import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label:'Salad',type:'salad'},
    {label:'Meat',type:'meat'},
    {label:'Bacon',type:'bacon'},
    {label:'Cheese',type:'cheese'}
]

const buildControls = (props) => {
    return (
    <div className={classes.BuildControls}>
        <p>Current Price:<strong>{props.totalPrice.toFixed(2)}</strong></p>
        {controls.map((ctrl)=>{
            return <BuildControl key={ctrl.label} label={ctrl.label} added={()=>{
                return props.ingrediantAdded(ctrl.type)
            }
            }
            removed={()=>{
                return props.ingrediantRemoved(ctrl.type)
            }}
            disabled={props.disabled[ctrl.type]}
            />
        })}
        <button className={classes.OrderButton}
                disabled={!props.purchasable}
                onClick={props.purchasing}>{props.isAuth?'ORDER NOW':'SIGN UP TO ORDER'}</button>
    </div>
    );
}
export default buildControls;