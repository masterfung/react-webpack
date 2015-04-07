import React from 'react';

let MyComponent = React.createClass({
  getInitialState(){
    return { who: 'world!', unchanged: 'I dont change' };
  },
  render(){
    return (
      <span className='hello' onMouseOver={this.handleClick}>
        Hello, {this.state.who}
      </span>
    )
  },
  handleClick(event){
  	event.preventDefault()
    let { who } = this.state;
    this.setState({
      who: (who == 'you!') ? 'world!' : 'you!'
    })
  }
})

React.render(
	<MyComponent />, 
	document.querySelector('.container')
	)

console.log(MyComponent)