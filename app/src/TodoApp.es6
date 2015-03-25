import React from 'react'

let TodoHeader = React.createClass({
  render(){
    return (
      <form onSubmit={this.handleSubmit}>
        <fieldset>
          <label htmlFor="newTodo">New Todo: </label>
          <input name="newTodo" ref='newTodo' />
        </fieldset>
      </form>
    )
  },
  handleSubmit(event){
    event.preventDefault()
    let newTodo = this.refs['newTodo'].getDOMNode();
    this.props.onSubmit(newTodo.value)
    newTodo.value = '';
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
  render(){
    return (
      <div className="todo-app">
        <TodoHeader
          onSubmit={this.addTodo}
         />
        <ul>
          {this.state.todos.map((todo, idx)=>
            <li key={idx}>{todo}</li>
          )}
        </ul>
      </div>
    )
  },
  addTodo(todo){
    let todos = this.state.todos;
    todos.push(todo)
    this.setState({ todos })
  }
})

React.render(<TodoApp/>, document.querySelector('.container'))

export default TodoApp;