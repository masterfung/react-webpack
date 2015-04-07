import React from 'react/addons';
import RB from 'react-bootstrap';
import HTTP from 'axios';


const {Input, Button, ListGroup, ListGroupItem, Nav, NavItem} = RB

const baseURL = "http://developer.echonest.com/api/v4/"
const api_key = "CVBTS2BKRG8BAFKIE"

let ArtistDetail = React.createClass({
  getInitialState(){
    return {
      "artist" : {
        "images": [
          {
            "url": "http://userserve-ak.last.fm/serve/_/174456.jpg",
          }
        ],
        "name": "Weezer",
        "genre": "Hot Rock"
      },
      "songs": [
        {
          "id": "SOXZYYG127F3E1B7A2",
          "title": "Karma police"
        },
        {
          "id": "SOXZABD127F3E1B7A2",
          "title" : "Creep"
        }
      ]
    }
  },
  render(){
    let {artist, songs} = this.state
    return(
      <div className="artista row">
      <h2>{artist.name}</h2>
      <ListGroup>
        <ListGroupItem><img src={artist.images[0].url} /></ListGroupItem>
        <ListGroupItem className="pull-right">{artist.genre}</ListGroupItem>
      </ListGroup>

      <h3>Songs</h3>

      <ListGroup>
        {songs.map((song) =>
          <ListGroupItem key={song.id}>
          Title: {song.title}
          </ListGroupItem>
        )}
      </ListGroup>
      </div>
    )
  }
})

let ArtistList = React.createClass({
  render() {
    return (
      <ListGroup>
        {this.props.artists.map((artist) =>
          <ListGroupItem key={artist.id}>{artist.name}</ListGroupItem>
        )}
      </ListGroup>
    )
  }
})

let EchoNest = React.createClass({
  getInitialState() {
    return {
      "page" : 'artists',
      'artists': []
    }
  },
  render(){
    let {page} = this.state;
    let currentPage;
    switch (page) {
      case 'home':
      case 'artists':
        currentPage = <ArtistList artists={this.state.artists} />
        break

      case 'artistdetail':
        currentPage = <ArtistDetail />
        break


    }
    return (
      <div className="home row">
        <h1 className="text-center">Echo Suggest</h1>
        <Nav bsStyle='pills' activeKey={page}>
          <NavItem eventKey='home' onClick={this.handleClick.bind(this, 'home')}
          >Home</NavItem>
          <NavItem eventKey="artists" onClick={this.handleClick.bind(this, 'artists')}
          >Artists</NavItem>
          <NavItem eventKey={3} disabled={true}>Favorites</NavItem>
        </Nav>

        <form onSubmit={this.handleSubmit}>
          <Input type="text" label="Enter Search"
          buttonAfter={<Button bsStyle='primary'>Search</Button>} ref='search' />
          {currentPage}
        </form>
      </div>
    )

  },
  handleClick(page, event) {
    this.setState(
      {page}
    )
  },
  handleSubmit(event) {
    event.preventDefault();
    let name = this.refs['search'].getValue()
    // console.log(name)
    HTTP.get(`${baseURL}artist/similar`,
      {"params": {
        api_key,
        name
      }}).then(({data:{response:{artists}}}) => {
        console.log(artists);
        this.setState({artists});
      })
  }
})

React.render(
  <EchoNest />,
  document.querySelector('.container')
)
