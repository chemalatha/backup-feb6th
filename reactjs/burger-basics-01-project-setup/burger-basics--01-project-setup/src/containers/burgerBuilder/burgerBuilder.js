 import React,{Component} from 'react';
 import {connect} from 'react-redux';

 import Aux from '../../hoc/Auxilary/Auxilary';
 import Burger from '../../components/Burger/Burger';
 import BuildControls from '../../components/Burger/BuildControls/BuildControls';
 import Modal from '../../components/UI/Modal/Modal';
 import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
 import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
 import Spinner from '../../components/UI/Spinner/Spinner';
 import * as actions from '../../store/actions/index';
 import axios from '../../axiosOrders';


 class burgerBuilder extends Component{
    state = {
        purchasing:false,

    }
    componentDidMount(){
        // axios.get('/ingrediants.json')
        // .then(response => {
        //     this.setState({ingrediants:response.data});
        // }).catch(error => {
        //     this.setState({error:true});
        // });
        this.props.onInitIngrediants();
    }
    updatePurchaseState(ingrediants){

        const sum = Object.keys(ingrediants).map((key)=>{
            return ingrediants[key]
        }).reduce( (sum,el)=>{
            return sum+el;
        },0)
        return sum >0;
    }
    // addIngrediantHandler = (type)=>{
    //     const oldCount = this.state.ingrediants[type];
    //     const updatedCount = oldCount+1;
    //     const updatedIngrediants = {
    //         ...this.state.ingrediants
    //     }
    //     updatedIngrediants[type] = updatedCount;
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = INGREDIANT_PRICES[type]+oldPrice;
    //     this.updatePurchaseState(updatedIngrediants);
    //     this.setState({ingrediants:updatedIngrediants,totalPrice:newPrice});
    // }
    // removeIngrediantHandler = (type)=>{
    //     const oldCount = this.state.ingrediants[type];
    //     if(oldCount<=0){
    //         return;
    //     }
    //     const updatedCount = oldCount-1;
    //     const updatedIngrediants = {
    //         ...this.state.ingrediants
    //     }
    //     updatedIngrediants[type] = updatedCount;
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - INGREDIANT_PRICES[type];
    //     this.updatePurchaseState(updatedIngrediants);
    //     this.setState({ingrediants:updatedIngrediants,totalPrice:newPrice});
    // }
    purchaseHandler = ()=>{
        if(this.props.isAutheticated){
            this.setState({purchasing:true});
        } else{
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/Auth');
        }
        
    }
    purchaseCancelHandler = ()=>{

        this.setState({purchasing:false});
    }
    purchaseContinueHandler = ()=>{
        this.props.oninitPurchase();
        this.props.history.push('/checkout');
    }
    render(){
        let disabledInfo = {
            ...this.props.ings
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key]<=0;
        }
        let orderSummary = null;

        let burger = this.props.error ? <Spinner />: <div>Ingrediants cannot be loaded</div>
        if(this.props.ings){
            burger = <Aux>
            <Burger ingrediants={this.props.ings}/>
        <BuildControls ingrediantAdded={this.props.onIngrediantAdded}
                        ingrediantRemoved={this.props.onIngrediantRemoved}
                        disabled={disabledInfo}
                        totalPrice={this.props.price}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        purchasing={this.purchaseHandler}
                        isAuth={this.props.isAutheticated}/>
            </Aux>
                orderSummary = <OrderSummary ingrediants={this.props.ings}
                    totalPrice={this.props.price}
                    purchaseCanceled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}/>;

        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
                
            </Aux>
            
        );
    }
 }
 const mapStateToProps= state => {
     return{
         ings:state.burgerBuilder.ingrediants,
         price:state.burgerBuilder.totalPrice,
         error:state.burgerBuilder.error,
         isAutheticated:state.auth.token!=null
     }
 }
 const mapDispatchToProps= dispatch =>{
     return{
         onIngrediantAdded:(ingName)=>dispatch(actions.addIngrediants(ingName)),
         onIngrediantRemoved:(ingName)=>dispatch(actions.removeIngrediants(ingName)),
         onInitIngrediants:()=>dispatch(actions.initIngrediants()),
         oninitPurchase:()=>dispatch(actions.purchaseBurgerInit()),
         onSetAuthRedirectPath:(path)=>dispatch(actions.setAuthRedirectPath(path))
             }
 }
 export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(burgerBuilder,axios));