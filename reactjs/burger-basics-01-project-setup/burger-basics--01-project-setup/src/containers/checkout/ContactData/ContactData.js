import React,{Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axiosOrders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import {connect} from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';

class ContactData extends Component{
    state={
        orderForm:{
            name:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Name',
                    
                },
                value:'',
                validation:{
                    required:true,
                   
                },
                valid:false,
                touched:false
            },
            street:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Street',
                    
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            zipcode:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'ZipCode',
                    
                },
                value:'',
                validation:{
                    required:true,
                    minLen:3,
                    maxLen:5
                },
                valid:false,
                touched:false
            },
            country:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Country',
                    
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Email',
                    
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
        deliveryMethod:{
            elementType:'select',
            elementConfig:{
                options:[
                    {value:'fastest',displayValue:'Fastest'},
                    {value:'cheapest',displayValue:'Cheapest'}
                ] 
            },
            value:'cheapest',
            validation:{},
            valid:true
        }
        },
        formValid:false,
    }
    // componentDidUpdate(){
    //     console.log('contact data will update');
    //     if(!this.props.loading && !this.props.purchasing) this.props.history.push('/');

    // }
    orderHandler = (event)=>{
        event.preventDefault();
        // this.setState({loading:true});
        const formData = {};
        for(let forElemId in this.state.orderForm){
            formData[forElemId] = this.state.orderForm[forElemId].value;
        }
        const orderObj = {
            ingrediants:this.props.ings,
            price:this.props.price,
            orderData:formData,
            userId:this.props.userId
        }
        console.log(this.props.ings);
        this.props.onOrderBurger(orderObj,this.props.token);

        // axios.post('/orders.json',orderObj).then((response)=>{
        //     console.log(response);
        //     this.setState({loading:false});
        //     this.props.history.push('/');
        // }).catch((error)=>{
        //     console.log(error);
        //     this.setState({loading:false});
        // })
        // console.log(this.props.ings)
    }
    checkValidity = (value,rules)=>{
        let isValid = true;
        if(rules){
            if(rules.required){
                isValid = value.trim() !== '' && isValid;
            }
            if(rules.minLen){
                isValid = value.length >= rules.minLen && isValid;
            }
            if(rules.maxLen){
                isValid = value.length <= rules.maxLen && isValid;
            }
        }

        return isValid;
    }
    inputChangeHandler = (event,elemId)=>{
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedOrderElem ={
            ...updatedOrderForm[elemId]
        }
        updatedOrderElem.value = event.target.value;
        updatedOrderElem.valid = this.checkValidity(updatedOrderElem.value,updatedOrderElem.validation);
        updatedOrderElem.touched = true;
        updatedOrderForm[elemId] = updatedOrderElem;
        let isFormValid = true;
        for(let id in updatedOrderForm){
            isFormValid = updatedOrderForm[id].valid && isFormValid;
        }
        this.setState({orderForm:updatedOrderForm,formValid:isFormValid});
        
    }
    render(){
        const formElementsArr=[];
        for(let key in this.state.orderForm){
            formElementsArr.push({
                id:key,
                config:this.state.orderForm[key]
            });
        }
        let form =(                
        <form onSubmit={this.orderHandler}>
            {formElementsArr.map(formElem => {
                return(
                    <Input elementType={formElem.config.elementType}
                            elementConfig={formElem.config.elementConfig}
                            value={formElem.config.value}
                            key={formElem.id}
                            touched={formElem.config.touched}
                            invalid={!formElem.config.valid}
                            shouldValidate={formElem.config.validation}
                            changed={(event)=>this.inputChangeHandler(event,formElem.id)} />
                )
            })}
            <Button btnType="Success" disabled={!this.state.formValid}>ORDER</Button>
        </form>);
        if(this.props.loading){
            form = <Spinner />;
        }
        return(
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}

            </div>
        )
    }
}
const mapStateToProps = state =>{
    return{
        ings:state.burgerBuilder.ingrediants,
        price:state.burgerBuilder.totalPrice,
        loading:state.order.loading,
        token:state.auth.token,
        userId:state.auth.userId
    }
}
const mapDispatchToProps = dispatch =>{
    return{
        onOrderBurger: (orderData,token)=> dispatch(actions.purchaseBurger(orderData,token))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));