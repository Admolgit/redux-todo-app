import { actionTypes } from "./types";

const persistTodos = () => {
  return {
    type: actionTypes.PERSIST_TODOS,
  };
};

const getTodos = () => {
  return {
    type: actionTypes.GET_TODOS,
  };
};

const addTodos = (payload) => {
  return {
    type: actionTypes.ADD_TODO,
    payload,
  };
};

const getTodo = (payload) => {
  return {
    type: actionTypes.GET_TODO,
    payload,
  };
};

const updateTodo = (payload) => {
  return {
    type: actionTypes.UPDATE_TODO,
    payload,
  };
};

const deleteTodo = (payload) => {
  return {
    type: actionTypes.DELETE_TODO,
    payload,
  };
};

export { getTodos, addTodos, getTodo, updateTodo, deleteTodo, persistTodos };
