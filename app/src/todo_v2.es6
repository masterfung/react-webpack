import React from 'react/addons';
import RB from 'react-bootstrap';

let {Button} = RB

let Todo = React.createClass({
  render() {
    return (
      <div>
        <h1>Awesome ToDo List:</h1>
      </div>
    )
  }
})

React.render(
  <Todo />,
  document.querySelector('.container');
)
