import React,{PureComponent} from 'react';

import Person from './Person/Person';
class Persons extends PureComponent{
  // static getDerivedStateFromProps(props,state){
  //   console.log('[Persons.js] getDerivedStateFromProps');
  //   return state;
  // }
  // shouldComponentUpdate(nextProps,nextState){
  //   console.log('[Persons.js] shouldComponentUpdate');
  //   return true;
  // }
  getSnapshotBeforeUpdate(prevProps,prevState){
    console.log('[Persons.js] getSnapshotBeforeUpdate')
    return {message:'SnapShot'};
  }
  render(){
    console.log('[Persons.js] rendering...');
    return this.props.persons.map((person, index) => {
      return (
        <Person
          click={() => this.props.clicked(index)}
          name={person.name}
          age={person.age}
          key={person.id}
          changed={event => this.props.changed(event, person.id)}
          isAuth={this.props.isAuthenticated}
        />
      );
    });
  }
  componentDidUpdate(){
    console.log('[Persons.js] componentDidUpdate');
  }
}


export default Persons;
