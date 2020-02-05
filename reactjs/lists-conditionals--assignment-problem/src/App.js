import React, { Component } from 'react';
import './App.css';
import ValidationComponent from './validateComponent/validateComponent';
import CharComponent from './charComponent/charComponent';

class App extends Component {
  state = {
    outText :""
  }
  // charsArr = (this.state.outText.length>0)?(this.state.outText.split('')):('');

  textChangeHandler = (event) =>{
    this.setState( {outText: event.target.value} );
  }

  deleteCharHandler = (charIndex)=>{
    let charsArr = this.state.outText.split('');
    if(charIndex !== -1){
        charsArr.splice(charIndex,1);
    }
    let newCharsToDisplay = charsArr.join('');
    this.setState({outText:newCharsToDisplay}) ;
  };
  
  render() {
    let charsArr = this.state.outText.split('');
    // let charsToDisplay = this.charsArr;
    // if(charsToDisplay.length>0){
      let charsToDisplay = (
        <div>
          {charsArr.map((singleChar, index) => {
            return <CharComponent
            key={index}
            clicked={() => this.deleteCharHandler(index)}
            outChar={singleChar} />
          })}
        </div>
      );
    //}


    return (
      <div className="App">
        <ol>
          <li>Create an input field (in App component) with a change listener which outputs the length of the entered text below it (e.g. in a paragraph).</li>
          <li>Create a new component (=> ValidationComponent) which receives the text length as a prop</li>
          <li>Inside the ValidationComponent, either output "Text too short" or "Text long enough" depending on the text length (e.g. take 5 as a minimum length)</li>
          <li>Create another component (=> CharComponent) and style it as an inline box (=> display: inline-block, padding: 16px, text-align: center, margin: 16px, border: 1px solid black).</li>
          <li>Render a list of CharComponents where each CharComponent receives a different letter of the entered text (in the initial input field) as a prop.</li>
          <li>When you click a CharComponent, it should be removed from the entered text.</li>
        </ol>
        <p>Hint: Keep in mind that JavaScript strings are basically arrays!</p>
        <input type="text" onChange={this.textChangeHandler} value={this.state.outText}/>
        <p>{this.state.outText}</p>
        <ValidationComponent textLen={this.state.outText.length}/>
        {charsToDisplay}
        {/* <CharComponent outChars={this.state.outText} clicked={this.deleteCharHandler}/> */}
      </div>
    );
  }
}

export default App;
