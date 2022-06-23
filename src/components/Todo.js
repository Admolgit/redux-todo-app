import React, {useState} from "react";
import { v4 as uuidv4 } from 'uuid';
import Styles from "./Todo.module.css";
import { useDispatch, useSelector } from 'react-redux';
import {addTodos, deleteTodo} from '../redux/actions';
import Img from "../assets/images/Photo on 02-06-2022 at 11.08.jpg";

function Todo() {

  const [showTodoInput, setShowTodoInput] = useState(false);
  const [showTodoList, setShowTodoList] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const [todo, setTodo] = useState({
    task: '',
    date: '',
    time: '',
    assign: '',
  });

  // const { task, date, time, assign } = todo;

  const dispatch = useDispatch();
  const {todos} = useSelector((state) => state.todos)
  console.log(todos, "todos");
  
  let count = todos.length;

  const handleSubmit = (e) => {
    e.preventDefault();
    if(todo?.task === "" || todo?.date === "" || todo?.time === "" || todo?.assign === ""){
      alert("Please fill all fields")
      return;
    }

    const id  = todo?.id ? todo?.id : uuidv4()

    dispatch(addTodos({id, ...todo}))

    setTodo({
      task: '',
      date: '',
      time: '',
      assign: '',
    })

    setShowTodoInput(false)
    setShowTodoList(true)
  }

  const onChangeHandler = (e)=>{
    setTodo({
      ...todo,
      [e.target.name]: e.target.value
    }) 
  }

  const handleUpdate = (id)=>{
    const filtered = todos.find((item) => item.id === id)
    setTodo(filtered)
    setShowTodoInput(true)
    setShowDelete(true)
    setShowTodoList(false)
  }

  const handleDelete = (id)=>{
    dispatch(deleteTodo(id))
    setTodo({
      task: '',
      date: '',
      time: '',
      assign: '',
    })
    setShowTodoInput(false)
  }

  return (
    <div className={Styles.container}>
      <div className={Styles.tasks}>
        <div className={Styles.task}>
          <h2 className={Styles.count} onClick={() => setShowTodoList(true)}>Task {count}</h2>
        </div>
        <div className={Styles.icon}>
          <i id={Styles.fasIcon} onClick={() => setShowTodoInput(true)} className="fas fa-plus" />
        </div>
      </div>

      { showTodoInput ? <form className={Styles.form} onSubmit={handleSubmit}>
        <div className={Styles.description}>
          <label className={Styles.desc}>Task Description</label>
          <input
            name="task"
            className={Styles.taskInput}
            type="text"
            placeholder="Follow up"
            value={todo?.task}
            onChange={onChangeHandler}
          />
        </div>

        <div className={Styles.dateTime}>

          <div className={Styles.date}>
            <label>Date</label>
            <input
              className={Styles.timeInput}
              type="date"
              name="date"
              placeholder="02/06/2022"
              value={todo?.date}
              onChange={onChangeHandler}
            />
          </div>

          <div className={Styles.time}>
            <label>Time</label>
            <input
              className={Styles.timeInputs}
              type="time"
              name="time"
              placeholder="2:00"
              value={todo?.time}
              onChange={onChangeHandler}
            />
          </div>
        </div>

        <div className={Styles.assign}>
          <label className={Styles.user}>Assign User</label>
          <input
            className={Styles.taskInput}
            type="text"
            name="assign"
            placeholder="Ademola"
            value={todo?.assign}
            onChange={onChangeHandler}
          />
        </div>

        <div className={Styles.buttonContainer}>
          {showDelete ? <div className={Styles.deleteTodo}>
              <i id={Styles.fasIcons} onClick={() => handleDelete(todo?.id)} className="fas fa-trash-alt" />
          </div> : null}
          <div className={Styles.buttons}>
            <button className={`${Styles.cancel} ${Styles.button}`}>
              Cancel
            </button>
            <button className={`${Styles.save} ${Styles.button}`}>Save</button>
          </div>
        </div>
      </form> : null } 

      <div className={Styles.todoList}>
        { showTodoList ? todos.map((todo, index) => (
          <div className={Styles.todo} key={index}>
            <div className={Styles.icons}>
              <div className={Styles.taskTodos} key={todo.id}>
                <div>
                  <img src={Img} alt="Ademola" className={Styles.image} />
                </div>
                <div>
                  <p>{todo.task}</p>
                  <p className={Styles.red}>{todo.date}</p>
                </div>
              </div>
              <div className={Styles.editIcon}>
                <i id={Styles.fasIcon} onClick={() => handleUpdate(todo.id)} className="fas fa-edit" />
              </div>
            </div>
          </div>
        )) : null }
      </div> 
    </div>
  );
}

export default Todo;
