import React from 'react/addons';
import RB from 'react-bootstrap';

let {Button, ListGroup, ListGroupItem} = RB

let ShowList = React.createClass({
  getDefaultProps(){
    return {
      names: []
    }
  },
  render(){
    let listItems = this.props.names.map(function(friend, idx){
      return <li key={idx}> {friend} </li>;
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
      name: "Tsung Hung",
      friends: ["Bill Gates", "Yo Yo Ma", "Cher", "Barry Allen"]
    }
  },
  // componentWillMount(){
  //   alert('In Component Will Mount');
  // },
  // componentDidMount(){
  //   alert('In Component Did Mount');
  // },
  // componentWillReceiveProps(nextProps){
  //   alert('In Component Will Receive Props');
  // },
  // componentWillUnmount(){},
  addFriend(friend) {
    this.setState({
      friends: this.state.friends.concat([friend])
    });
  },
  render(){
    return (
      <div>
        <h3 className="col-md-6">Name: {this.state.name}</h3>
        <div className="col-md-6">
          <AddFriend addNew={this.addFriend} />
          <ShowList names={this.state.friends} />
        </div>
      </div>
    )
  }
})

let AddFriend = React.createClass({
  getInitialState(){
    return {
      newFriend: ""
    }
  },
  propTypes(){
    addNew : React.propTypes.func.isRequired
  },
  updateNewFriend(e){
    this.setState({
      newFriend: e.target.value
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
        <Button className="btn btn-primary" onClick={this.handleAddNew}>Add New Friend</Button>
      </div>
    )
  }
})

let HelloUser = React.createClass({
  getInitialState(){
    return {
      username: 'masterfung'
    }
  },
  handleChange(e) {
    this.setState({
      username: e.target.value
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
  <FriendsContainer />,
  document.querySelector('.container')
)
