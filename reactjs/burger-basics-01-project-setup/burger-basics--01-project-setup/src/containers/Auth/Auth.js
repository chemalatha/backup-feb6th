import React ,{Component} from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import {Redirect} from 'react-router-dom';

class  Auth extends Component{
    state = {
        controls :  {
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Mail Address',
                    
                },
                value:'',
                validation:{
                    required:true,
                    isEmail:true
                   
                },
                valid:false,
                touched:false
            },
            password:{
                elementType:'input',
                elementConfig:{
                    type:'password',
                    placeholder:'password',
                    
                },
                value:'',
                validation:{
                    required:true,
                    minLen:6
                   
                },
                valid:false,
                touched:false
            }
        },
        isSignUp:true
    }
    componentDidMount(){
        if(!this.props.building&& this.props.authRedirectPath!=='/'){
            this.props.onSetAuthRedirectPath();
        }
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
            if(rules.isEmail){
                isValid = (value.indexOf('@')!==-1) & isValid;
            }
        }

        return isValid;
    }
    inputChangeHandler = (event,controlName)=>{
        const updatedControls = {
            ...this.state.controls,
            [controlName]:{
                ...this.state.controls[controlName],
                value:event.target.value,
                valid:this.checkValidity(event.target.value,this.state.controls[controlName].validation),
                touched:true
            }
        }

        this.setState({controls:updatedControls});
        
    }
    submitHandler = (event)=>{
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignUp);
    }
    switchAuthModeHandler = () =>{
        this.setState(prevState => {
            return({isSignUp:!prevState.isSignUp})
        });
    }
    render(){
        const formElementsArr=[];
        for(let key in this.state.controls){
            formElementsArr.push({
                id:key,
                config:this.state.controls[key]
            });
        }
        let formEle = formElementsArr.map(formElem => {
            return <Input elementType={formElem.config.elementType}
            elementConfig={formElem.config.elementConfig}
            value={formElem.config.value}
            key={formElem.id}
            touched={formElem.config.touched}
            invalid={!formElem.config.valid}
            shouldValidate={formElem.config.validation}
            changed={(event)=>this.inputChangeHandler(event,formElem.id)}
             />
        });
        if(this.props.loading){
            formEle = <Spinner />;
        }
        let errorMessage = null;
        if(this.props.error){
            errorMessage = <p>{this.props.error.message}</p>
        }
        let authRedirect = null;
        if(this.props.isAuthenticated){
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }
        return(
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {formEle}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                <Button btnType="Danger" clicked={this.switchAuthModeHandler}>SWITCH TO {this.state.isSignUp?'SIGNIN':'SIGNUP'}</Button>
            </div>
        )
            
    }
}
const mapStateToProps = state => {
    return {
        loading:state.auth.loading,
        error:state.auth.error,
        isAuthenticated:state.auth.token!=null,
        building:state.burgerBuilder.building,
        authRedirectPath:state.auth.authRedirectPath
    }
}
const mapDispatchToProps = dispatch => {
    return{
        onAuth: (email,password,isSignUp) => dispatch(actions.auth(email,password,isSignUp)),
        onSetAuthRedirectPath : ()=>dispatch(actions.setAuthRedirectPath('/'))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Auth);
