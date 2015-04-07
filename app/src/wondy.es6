import React from 'react/addons';

import RB from 'react-bootstrap';

let ShowList = React.createClass({
  render(){
    let listItems = this.props.name.map((friend) => {
      return <li> {friend} </li>;
    });
    return (
      <div>
        <h3> Friends </h3>
        <ul>
          {listItems}
        </ul>
      </div>
    )
  }
})

let FriendsContainer = React.createClass({
  getInitialState(){
    return {
      "name": "Tsung Hung",
      "friends": ["Bill Gates", "Yo Yo Ma", "Cher", "Barry Allen"]
    }
  },
  render(){
    return (
      <div>
        <h3 className="col-md-6">Name: {this.state.name}</h3>

      </div>
    )
  }
})

let HelloUser = React.createClass({
  getInitialState(){
    return {
      "username": 'masterfung'
    }
  },
  handleChange(e) {
    this.setState({
      "username": e.target.value
    })
  },
  render(){
    return (
      <div className="home row">
        <h1 className="text-center">Hello @{this.state.username}!</h1>
        <h4>To Change your Name:
        <input type="text" className="form-control" value = {this.state.username}
        onChange={this.handleChange} />
        </h4>
      </div>
    )
  }
})

React.render(
  <HelloUser />,
  document.querySelector('.container')
)
