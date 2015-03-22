import React from 'react'

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
        <form>
          <fieldset>
            <label htmlFor="newTodo">New Todo: </label>
            <input name="newTodo" ref='newTodo' />
          </fieldset>
        </form>
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

export default TodoApp;