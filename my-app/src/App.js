import React, { useState } from "react";
import "./App.css";

function TodoList({ todos, delTodo, toggleComplete, editTodo }) {
  return (
    <div>
      <h2>Ma Todo List</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.editText ? (
              <div>
                <textarea
                  type="text"
                  rows="5"
                  value={todo.text}
                  onChange={(event) =>
                    editTodo({ ...todo, text: event.target.value })
                  }
                />
                <button onClick={() => editTodo({ ...todo, editText: false })}>
                  Enregistrer
                </button>
              </div>
            ) : (
              <>
                <span className="bloc">
                  <h3>{todo.title}</h3>
                  <input
                    type="checkbox"
                    checked={todo.complete}
                    onChange={() => toggleComplete(todo.id)}
                  />
                </span>
                <p onClick={() => editTodo({ ...todo, editText: true })}>
                  {todo.text}
                </p>
                <button onClick={() => delTodo(todo.id)}> Supprimer</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function AddTodo({ addTodo }) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    addTodo({
      id: Math.random(),
      title: title,
      text: text,
      complete: false,
    });
    setTitle("");
    setText("");
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div>
      <form className="container" onSubmit={handleSubmit}>
        Titre de la Todo
        <input type="text" value={title} onChange={handleTitleChange} />
        Description de la Todo
        <textarea
          type="textarea"
          rows="5"
          value={text}
          onChange={handleTextChange}
        />
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
}

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  const delTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, complete: !todo.complete };
        } else {
          return todo;
        }
      })
    );
  };

  const editTodo = (updatedTodo) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === updatedTodo.id) {
          return updatedTodo;
        }
        return todo;
      })
    );
  };

  return (
    <div>
      <AddTodo addTodo={addTodo} />
      <TodoList
        todos={todos}
        delTodo={delTodo}
        toggleComplete={toggleComplete}
        editTodo={editTodo}
      />
    </div>
  );
}

export default App;
