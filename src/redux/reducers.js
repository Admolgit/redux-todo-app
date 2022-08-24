import {actionTypes} from './types';


const initialState = {
  todos:[],
  singleTodo: {}
}


const todoReducer = (state=initialState, action) => {
  console.log(action.payload)
  // action returns type and payload
  switch(action.type){
    // Persist todos in local storage
    case actionTypes.PERSIST_TODOS:
      const todos = JSON.parse(window.localStorage.getItem('todos'))
      return [...state, ...todos];
    case actionTypes.ADD_TODO:
      // Check if todo already exists
      const isExist = state.todos.findIndex(todo => todo.id === action.payload.id);
      // If it does, updated it
      const todos2 = state.todos.map((item) => {
        if(item.id === action.payload.id){
          return action.payload;
        } else {
          return item;
        }
      });
      if(isExist < 0) {
        todos2.push(action.payload);
      }
      window.localStorage.setItem('todos', JSON.stringify(todos2)); 
      return{ 
        ...state,
       todos: todos2
      }
      ;
    case actionTypes.GET_TODOS:
      return{
        ...state,
        todos: [...state.todos]
      };
    case actionTypes.GET_TODO:
      const todo = state.todos.filter(todo => todo.id === action.payload);
      return{
        ...state,
        singleTodo: {...todo[0]}
      };
      case actionTypes.UPDATE_TODO:
      const updatedTodo = state.todos.map(todo => {if(todo.id === action.payload.id){return action.payload}; return todo});
      return{
        ...state,
        todos: [...updatedTodo]
      };
      case actionTypes.DELETE_TODO:
      const newTodo = state.todos.filter(todo => todo.id !== action.payload);
      return{
        ...state,
        todos: [...newTodo]
      };
    default:
      return state;
  }

}

export default todoReducer;