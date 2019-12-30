import uuid from 'uuid';
import { ADD_TODO, TOGGLE_TODO, RESET_TODO } from '../actions';
import { extractHashTags } from '../utils/helpers';

const initialState = {
    todos: localStorage.getItem('todos')
        ? JSON.parse(localStorage.getItem('todos'))
        : [],
};

function saveStateToLocalStorage(todos) {
    if (window.localStorage) {
        localStorage.setItem('todos', JSON.stringify(todos));
    } else {
        alert("Your browser doesn't support local storage");
    }
}

function todoApp(state = initialState, action) {
    let newState;
    switch (action.type) {
        case ADD_TODO:
            const newTodo = {
                id: uuid(),
                text: action.text,
                hashTags: extractHashTags(action.text),
                createdAt: new Date(),
                completedAt: null,
            };
            newState = {
                todos: state.todos.concat(newTodo),
            };
            saveStateToLocalStorage(newState.todos);
            return newState;
        case TOGGLE_TODO:
            newState = {
                todos: state.todos.map(item => {
                    if (item.id === action.id) {
                        return {
                            ...item,
                            completedAt: item.completedAt ? null : new Date(),
                        };
                    }
                    return item;
                }),
            };
            saveStateToLocalStorage(newState.todos);
            return newState;
        case RESET_TODO:
            saveStateToLocalStorage([]);
            return {
                todos: [],
            };
        default:
            return state;
    }
}

export default todoApp;
