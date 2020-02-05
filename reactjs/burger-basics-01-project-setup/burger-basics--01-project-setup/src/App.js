import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/burgerBuilder/burgerBuilder';
import Checkout from './containers/checkout/checkout';
import {Route,Switch,Redirect} from 'react-router-dom';
import Orders from './containers/checkout/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import {connect} from 'react-redux';
import * as actions from './store/actions/index';
import {withRouter} from 'react-router-dom';

class App extends Component {
  componentDidMount(){
    this.props.onTryAutoSignup();
  }
  render() {
    let routes = (
      <Switch>
      <Route path="/Auth" component={Auth}></Route>
      <Route path="/" exact component={BurgerBuilder}></Route>
      <Redirect to="/"></Redirect>

    </Switch>
    )
    if(this.props.isAutheticated){
      <Switch>
      <Route path="/checkout" component={Checkout}></Route>

      <Route path="/orders" component={Orders}></Route>
      <Route path="/logout" component={Logout}></Route>
      <Route path="/" exact component={BurgerBuilder}></Route>
      <Redirect to="/"></Redirect>

    </Switch>
    }
    return (
      <div >
        <Layout>
        {routes}


        </Layout>
        
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    isAutheticated: state.auth.token!=null,
  }
}
const mapDispatchToProps = dispatch => {
  return{
    onTryAutoSignup: ()=> dispatch(actions.authCheckState())
  }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
