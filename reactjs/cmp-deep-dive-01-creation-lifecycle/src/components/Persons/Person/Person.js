import React,{Component,Fragment} from 'react';
import PropTypes from 'prop-types';

import classes from './Person.css';
import withClass from '../../../hoc/withClass';
import aux from '../../../hoc/Auxialiar';

class Person extends Component{
  constructor(props){
    super(props);
    this.inputElementRef = React.createRef();
  }
  componentDidMount(){
    this.inputElementRef.current.focus();
  }
  render(){
    console.log('[Person.js] rendering...');
    return (
      <Fragment>
        {this.props.isAuth ? <p>Authenticated</p>:<p>Please login</p>}
        <p onClick={this.props.click}>
          I'm {this.props.name} and I am {this.props.age} years old!
        </p>
        <p>{this.props.children}</p>
        <input 
        ref={this.inputElementRef}
        // ref={(inputEl)=>{this.inputElement= inputEl}} 
        type="text" onChange={this.props.changed} value={this.props.name} />
      </Fragment>
    );
  }
  componentWillUnmount(){
    console.log('[Persons.js] componentWillUnmount');
  }
}
Person.propTypes = {
  click:PropTypes.func,
  age:PropTypes.number,
  name:PropTypes.string,
  changed:PropTypes.func
}
export default withClass(Person,classes.Person);
