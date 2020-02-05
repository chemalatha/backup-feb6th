import React,{Component} from 'react';
import Aux from '../../../hoc/Auxilary/Auxilary';
import Button from '../../UI/Button/Button';

class orderSummary extends Component {


    render(){
        const ingrediantSummary = Object.keys(this.props.ingrediants)
        .map((igKey)=>{
            return <li key={igKey}><span style={{textTransform:'capitalize'}}>{igKey}</span>:{this.props.ingrediants[igKey]}</li>
        });

        return(
        <Aux>
        <h3>Your Order</h3>
        <p>your delicious burger with following ingrediants</p>
        <ul>
        {ingrediantSummary}
        </ul>
        <p><strong>Total Price:{this.props.totalPrice}</strong></p>
        <p>Continue to Checkout</p>
        <Button clicked={this.props.purchaseCanceled} btnType="Danger">CANCEL</Button>
        <Button clicked={this.props.purchaseContinued} btnType="Success">CONTINUE</Button>

        </Aux>
        )
    }

}
export default orderSummary;