const express = require('express'); //I import express to build my server
const app = express(); //Executing my server
const cors = require('cors');
const pool = require('./db');

//middleware
app.use(cors());
app.use(express.json()); //It let us add 'req.body'

//ROUTES//

//create a todo
app.post('/todos', async (req, res) => {
  try {
    const { description } = req.body; //I get the description coming from body
    const newTodo = await pool.query(
      'INSERT INTO todo(description) VALUES($1) RETURNING *', //and insert it into the newTodo
      [description]
    );
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get ALL todos
app.get('/todos', async (req, res) => {
  try {
    const allTodos = await pool.query('SELECT * FROM todo'); //This is just a select * (all)
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a todo
app.get('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params; //I get the ID coming from params (url)
    const todo = await pool.query('SELECT * FROM todo WHERE todo_id = $1', [
      //and use it to compare with the ID I want to show
      id,
    ]);
    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update a todo
app.put('/todos/:id', async (req, res) => {
  try {
    const { description } = req.body;
    const { id } = req.params;
    const updateToDo = await pool.query(
      'UPDATE todo SET description = $1 WHERE todo_id = $2 RETURNING *',
      [description, id] //Update the column specified by params (ID) with the description specified by body
    );
    res.json(updateToDo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//delete a todo
app.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteToDo = await pool.query('DELETE FROM todo WHERE todo_id = $1', [
      id,
    ]); //Same as get one, I compare IDs to delete the correct column
    res.json(`ToDo #${id} deleted`);
  } catch (err) {
    console.error(err.message);
  }
});

//Server will be up at this port
app.listen(5000, () => {
  console.log('Server has started on port 5000');
});
