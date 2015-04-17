import React from 'react/addons';
import RB from 'react-bootstrap';

let {Button} = RB

let AddItem = React.createClass({
  getInitialState(){
    return (
      newItem = ''
    )
  },
  handleChange(e){
    this.setState({
      newItem: e.target.value
    })
  },
  handleSubmit(e){
    if(e.keyCode === 13) {
      this.props.add(this.state.newItem);
      this.setState({
        newItem: ''
      })
    }
  },
  render() {
    return(
      <div>
        <input type="text" className="form-control"
        value={this.state.newItem} placeholder="Enter An Item"
        onKeyDown={this.handleSubmit} onChange={this.handleChange} />
      </div>
    )
  }
})

let Todo = React.createClass({
  render() {
    return (
      <div>
        <h1>Awesome ToDo List:</h1>
        <AddItem />
      </div>
    )
  }
})

React.render(
  <Todo />,
  document.querySelector('.container')
)
