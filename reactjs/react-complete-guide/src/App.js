import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';
import Radium,{StyleRoot} from 'radium';

class App extends Component {
  state = {
    person:[{
      name:'Teju',age:'8'
    },{
      name:'Sai',age:'5'
    }]
  }
  style={
    border:'1px solid black',
    font:'inherit',
    backgroundColor:'green',
    cursor:'pointer',
    color:'white',
    ':hover':{
      backgroundColor:'lightgreen',
      color:'black'
    }
  };
  swtichNameHandler = () =>{
    console.log('clicked');
    this.setState({person:[
      {
        name:'Tejoramaa',age:'10'
      },{
        name:'SaiSarvanand',age:'6'
      }
    ]});
  }
  render() {
    let classes = ['red','bold'].join(' ');
    return (
      <StyleRoot>
      <div className="App">
        <h1 class={classes}>Hi!!I am a React App</h1>
        <button style={this.style} onClick={this.swtichNameHandler}>Switch Name</button>
        <Person name={this.state.person[0].name} age={this.state.person[0].age}>Her Hobbies are Playing</Person>
        <Person name={this.state.person[1].name}  age={this.state.person[1].age}></Person>
      </div>
      </StyleRoot>

    );
  }
}

export default Radium(App);
