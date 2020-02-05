import React,{Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route,Redirect} from 'react-router-dom';
import ContactData from '../checkout/ContactData/ContactData';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';


class Checkout extends Component{
    // state={
    //     ingrediants:null,
    //     price:0
    // }
    checkoutCancelledHandler = ()=>{
        this.props.history.goBack();
    }
    checkoutContinuedHandler = ()=>{
        this.props.history.replace('/checkout/contact-data');
        // console.log(this.props)
    }
    // componentWillMount(){
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingrediants = [];
    //     let price = 0;
    //     for(let param of query.entries()){
    //         if(param[0] === 'price'){
    //             price = +param[1];
    //         } else{
    //             ingrediants[param[0]] = +param[1];
    //         }
            
    //     }
    //     this.setState({ingrediants:ingrediants,totalPrice:price});
    // }
    // componentWillMount(){
    //     this.props.onPurchaseInit();
    // }


    render(){
        let summary = <Redirect to="/" />
        
        if(this.props.ings){
            const purchasedRedirect  = (this.props.purchased)?<Redirect to="/" /> : null;
            summary = <div>
                {purchasedRedirect}
                <CheckoutSummary ingrediants={this.props.ings} 
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinuedHandler} />
            <Route path={this.props.match.path+'/contact-data'} 
            component={ContactData}/>
                </div>
        }
        return(
            <div>
            {summary}

            </div>

            
        )
    }
}
const mapStateToProps = state =>{
    return{
        ings:state.burgerBuilder.ingrediants,
        purchased:state.order.purchased
        
    }
}

export default connect(mapStateToProps)(Checkout);