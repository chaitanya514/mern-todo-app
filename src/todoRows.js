import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import axios from "axios";

const Todo = (props) => {
  

    return (
      <tr>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_description}</td>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_responsible}</td>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_priority}</td>
        <td>
          <Link to={"/edit/" + props.todo._id}> Edit</Link>
        </td>
        <td>
        <button className="btn btn-sm btn-danger" >
          Delete
        </button>
        </td>
      </tr>
    )
  }