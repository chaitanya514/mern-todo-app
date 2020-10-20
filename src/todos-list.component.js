import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import axios from "axios";
import "./todocompleted.css"

class Todo extends React.Component {
  constructor(props){
    super(props)

    this.delete = this.delete.bind(this);
  }

  delete() {
   console.log("delete button works")
   axios.delete('http://localhost:4000/todos/delete/' + this.props.todo._id)
            .then(() => this.props.deleteItem(this.props.todo._id))
            .catch((error) => {
                console.log(error)
            })
}

render(){
  return (
    <tr>
      <td className={this.props.todo.todo_completed ? 'completed' : ''}>{this.props.todo.todo_description}</td>
      <td className={this.props.todo.todo_completed ? 'completed' : ''}>{this.props.todo.todo_responsible}</td>
      <td className={this.props.todo.todo_completed ? 'completed' : ''}>{this.props.todo.todo_priority}</td>
      <td>
        <Link to={"/edit/" +this.props.todo._id}> Edit</Link>
      </td>
      <td>
      <button className="btn btn-sm btn-danger" onClick={this.delete}>
        Delete
      </button>
      </td>
    </tr>
  )
}

}  


class TodosList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      todos: []
    } 
  }

  componentDidMount() {
    axios.get('http://localhost:4000/todos/')
      .then(response => {
        this.setState({ todos: response.data });
      })
      .catch(err => {
        console.log('err', err)
      })

  }


  deleteItemHandler = (id) => {
    this.setState(this.state.todos.filter(todo => todo.id !== id));
    
   }

  todoList() {
    return this.state.todos.map((todo, index) => {
      return <Todo todo={todo} key={index} deleteItem={this.deleteItemHandler}/>

      
    })
    
    
  }

  render() {

    return (

      <div>
        <h3>Todos List</h3>
        <table className="table table-striped" style={{ marginTop: 20 }} >
          <thead>
            <tr>
              <th>Description</th>
              <th>Responsible</th>
              <th>Priority</th>
              <th>Action</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.todoList()}

          </tbody>

        </table>
      </div>


    );
  }
}

export default TodosList;
