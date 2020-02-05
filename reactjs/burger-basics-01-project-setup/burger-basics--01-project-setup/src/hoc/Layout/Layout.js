import React,{Component} from 'react';
import Aux from '../Auxilary/Auxilary';
import classes from './Layout.css';
import Toolbar from '../../components/Navigational/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigational/SideDrawer/SideDrawer';
import {connect} from 'react-redux';

class Layout extends Component {
    state = {
        showSideDrawer:false
    }
    sideDrawerCloseHandler = ()=>{
        this.setState({showSideDrawer:false});
    }
    sideDrawerToggleHandler = ()=>{
        this.setState((prevState)=>{
            return {showSideDrawer:!prevState.showSideDrawer};
        });
    }
    render(){
        return (
            <Aux>
            <Toolbar isAuth={this.props.isAuthenticated}
                menuOpen={this.sideDrawerToggleHandler}/>
            <SideDrawer isAuth={this.props.isAuthenticated}
                open={this.state.showSideDrawer} closed={this.sideDrawerCloseHandler}/>
            <main className={classes.Content}>
                {this.props.children}
            </main>
            </Aux>
        )
    }

}
const mapStateToProps = state => {
    return {
        isAuthenticated:state.auth.token!=null
    }
}

export default connect(mapStateToProps)(Layout);
