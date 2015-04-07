import React from 'react/addons';

import RB from 'react-bootstrap';

let ShowList = React.createClass({
  render(){
    let listItems = this.props.name.map((friend) => {
      return <li> {friend} </li>;
    });
    return (
      <div>
        <h3 className="text-center"> Friends </h3>
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
  addFriend(homies) {
    this.setState({
      "friends": this.state.friends.concat([homies])
    })
  },
  render(){
    return (
      <div>
        <h3 className="col-md-6">Name: {this.state.name}</h3>
        <AddFriend addNew={this.addFriend} />
        <ShowList names={this.state.friends} />
      </div>
    )
  }
})

let AddFriend = React.createClass({
  getInitialState(){
    return {
      "newFriend": ""
    }
  },
  updateNewFriend(event){
    this.setState({
      "newFriend": event.target.value
    });
  },
  handleAddNew(){
    this.props.addNew(this.state.newFriend);
    this.setState({
      newFriend: ""
    })
  },
  render(){
    return (
      <div>
        <input type="text" value={this.state.newFriend} onChange={this.updateNewFriend}/>
        <button onClick={this.handleAddNew}>Add New Friend</button>
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
