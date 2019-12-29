import { ADD_TODO } from '../actions';

const initialState = {
  todos: [],
};

function todoApp(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: state.todos.concat(action.text),
      };
    default:
      return state;
  }
}

export default todoApp;
