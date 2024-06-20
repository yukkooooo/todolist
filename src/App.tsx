/* eslint-disable no-restricted-globals */
import React, { useState } from 'react';
import Status from './compornents/Status';
import './App.css';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

type Todo = {
  inputValue: string;
  id: number;
  checked: boolean;
  isEditing: boolean;
  timestamp: string;
}

function App() {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 新しいToDoを作成
    const newTodo: Todo = {
      inputValue: inputValue,
      id: todos.length,
      checked: false,
      isEditing: false,
      timestamp: new Date().toLocaleTimeString(),
    };

    setTodos([newTodo, ...todos]);
    setInputValue("");
  };

  const handleEdit = (id: number, inputValue: string) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.inputValue = inputValue;
      }
      return todo;
    });

    setTodos(newTodos);
  };

  const handleChecked = (id: number) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.checked = !todo.checked;
      }
      return todo;
    });

    setTodos(newTodos);
  };

  const handleDelete = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const toggleEditMode = (id: number) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isEditing = !todo.isEditing;
      }
      return todo;
    });

    setTodos(newTodos);
  };

  return (
    <div className='header'>
      <span className='title'>Todoリスト with Typescript</span>
      <div className='back'>
        <div className="App">
          <div className='list'>
            <div className='status'>
              <Status />
            </div>

            <form onSubmit={(e) => handleSubmit(e)}>
              <input
                type="text"
                onChange={(e) => handleChange(e)}
                className='inputText'
                value={inputValue}
              />
              <input type='submit' value="作成" className="submitButton" />
            </form>

            {/* タスク設定が完了したら */}
            <ul className='todoList'>


              {todos.map((todo) => (
                <li className='listtodo' key={todo.id}>
                  <input
                    type="checkbox"
                    checked={todo.checked}
                    onChange={() => handleChecked(todo.id)}
                  />


                  {todo.isEditing ? (
                    <input
                      type="text"
                      onChange={(e) => handleEdit(todo.id, e.target.value)}
                      className='inputText'
                      value={todo.inputValue}
                    />
                  ) : (
                    <span className={todo.checked ? 'strikethrough' : ''}>
                      {todo.inputValue}
                    </span>
                  )}


                  <button className='keep' onClick={() => toggleEditMode(todo.id)}>
                    {todo.isEditing ? '保存' : '編集'}
                  </button>

                  <button className='delete' onClick={() => handleDelete(todo.id)}>消</button>
                  <span className="timestamp"> <AccessTimeIcon style={{ verticalAlign: 'middle' }} />
                    {todo.timestamp}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>

  );
}

export default App;