import React from 'react/addons';
import RB from 'react-bootstrap';

let {Button, Input, ListGroup, ListGroupItem, Grid, Row, Col, Navbar
, Nav, CollapsableNav, NavItem, DropdownButton, MenuItem} = RB

let ShowList = React.createClass({
  getDefaultProps(){
    return {
      names: []
    }
  },
  render(){
    // let listItems = this.props.names.map(function(friend, idx){
    //   return (<ListGroup>
    //     <ListGroupItem key={idx}>{friend}</ListGroupItem>
    //   </ListGroup>)
    // });
    return (
      <div>
        <h3> Your Friends Friends </h3>
        <ListGroup>
          {this.props.names.map((friend, idx) =>
            <ListGroupItem key={idx}>{friend}</ListGroupItem>
          )}
        </ListGroup>
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
      <Grid>
        <Navbar brand='FriendsNet' toggleNavKey={0}>
        <CollapsableNav eventKey={0}> {/* This is the eventKey referenced */}
          <Nav navbar>
            <NavItem eventKey={1} href='#'>About</NavItem>
            <NavItem eventKey={2} href='#'>Company</NavItem>
            <DropdownButton eventKey={3} title='Getting Started'>
              <MenuItem eventKey='1'>Action</MenuItem>
              <MenuItem eventKey='2'>Another action</MenuItem>
              <MenuItem eventKey='3'>Something else here</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey='4'>Separated link</MenuItem>
            </DropdownButton>
          </Nav>
          <Nav navbar right>
            <NavItem eventKey={1} href='#'>Link Login</NavItem>
            <NavItem eventKey={2} href='#'>Link Sign Up</NavItem>
          </Nav>
        </CollapsableNav>
      </Navbar>
        <h1 className="text-center">Add Your Friends</h1>
        <h3 className='text-center'>Name: {this.state.name}</h3>
        <Row className='show-grid'>
          <AddFriend addNew={this.addFriend} />
          <Col md={12}><ShowList names={this.state.friends} /></Col>
        </Row>
      </Grid>

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
       <input type="text" className="form-control" value={this.state.newFriend} onChange={this.updateNewFriend}/>
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
