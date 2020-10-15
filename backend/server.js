const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = 4000; 

const mongoose= require("mongoose");


const app = express();

const todoRoutes = express.Router();//used for routingh a path in node using express. express.Router is express's method.
app.use('/todos',todoRoutes); // we gonna use todoroutes in ouer code.

// usage of GET rerquest in router
todoRoutes.route('/').get(function(req,res){
    Todo.find(function(err,todos){
      if(err){
          console.log("error",err);
      }else{
          res.json(todos)
      }
    });
});

//we will be getting data from mongoDB database 
// findById is the method that we can retrive from express.
todoRoutes.route("/:id").get(function(req,res){
    let id = req.params.id;
    Todo.findById(id,function(err,todo){
        res.json(todo)
    });
});

// Now we will be adding new data into database by using HTTP's POST request.

todoRoutes.route("/add").post(function(req,res){
    let todo = new Todo(req.body);
    todo.save()
    .then(todo=>{
        res.status(200).json({'todo':'todo added successfully'});
    })
    .catch(err=>{
        res.status(400).send('addingf new todo failed')
    });
});

//todo update routes

todoRoutes.route("/update/:id").post(function(req,res){
    Todo.findById(req.params.id,function(err,todo){
        if(!todo){
            res.status(404).send("data is not found"); 
        }else{
            todo.todo_description=req.body.todo_description;
            todo.todo_responsible = req.body.todo_responsible;
            todo.todo_priority = req.body.todo_priority;
            todo.todo_completed = req.body.todo_completed;

            todo.save().then(todo=>{
                res.json('Todo updated');
            })

            .catch(err=>{
                res.status(400).send("update not possible");
            });

        }
    });
});

app.use(cors());
app.use(bodyParser.json);

mongoose.connect('mongodb://127.0.0.1:27017/todos',{useNewUrlParser:true});
const connection = mongoose.connection;

connection.once('open', function(){
    console.log("mongodb connection established successfully");
})

app.listen(PORT, function(){
    console.log("server is running on ",+ PORT);
});
