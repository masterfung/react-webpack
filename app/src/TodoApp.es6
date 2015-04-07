import React from 'react/addons'

const TodoHeader = React.createClass({
  render() {
    return (
      <div className="todo-app">
        <form onSubmit={this.handleSubmit}>
          <fieldset>
            <label htmlFor="newTodo">New Todo: </label>
            <input name="newTodo" ref='newTodo' />
          </fieldset>
        </form>
      </div>
    )
  },
  handleSubmit(event) {
    event.preventDefault();
    let inputComponent = React.findDOMNode(this.refs['newTodo']);
    console.log(inputComponent.value)
    this.props.onNewTodo(inputComponent.value);
    inputComponent.value = '';
  }
})

let TodoApp = React.createClass({
  getInitialState(){
    return {
      todos: [
        'demonstrate state',
        'build with forms and refs',
        'manage lifecycles hooks',
        'reverse the data',
        'think react'
      ]
    };
  },
  addTodo(todo) {
    let {todos} = this.state;
    todos.push(todo);
    this.setState({todos})
  },
  render(){
    return (
      <div className="todo-app">
        <TodoHeader
        onNewTodo = {this.addTodo}
        />
        <ul>
          {this.state.todos.map((todo, idx)=>
            <li key={idx}>{todo}</li>
          )}
        </ul>
      </div>
    )
  }
})

React.render(<TodoApp/>, document.querySelector('.container'))

// export default {};
