import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";



class CreateTodo extends Component {

  constructor(props) {
    super(props);

    this.state = {
      todo_description: "",
      todo_responsible: "",
      todo_priority: "",
      todo_completed: false
    }

  }

  onChangeTodoDescription(e) {
    this.setState({
      todo_description: e.target.value
    });

  }

  onChangeTodoResponsible(e) {
    todo_responsible: e.target.value
  }

  onChangeTodoPriority(e) {
    todo_priority: e.target.value
  }
  onSubmit(e) {
    e.preventDefault();

    console.log(`Form submitted:`);
    console.log(`Todo Description: ${this.state.todo_description}`);
    console.log(`Todo Responsible: ${this.state.todo_responsible}`);
    console.log(`Todo Priority: ${this.state.todo_priority}`);

    this.setState({
      todo_description:"",
      todo_responsible:"",
      todo_priority: "",
      todo_completed: false

    })

  }
  render() {
    return (

      <div className="container">
        <h2>Create Todo</h2>

      </div>


    );
  }
}

export default CreateTodo;
