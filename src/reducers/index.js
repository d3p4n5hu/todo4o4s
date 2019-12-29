import uuid from 'uuid';
import { ADD_TODO, TOGGLE_TODO } from '../actions';

const initialState = {
    todos: [],
};

function todoApp(state = initialState, action) {
    switch (action.type) {
        case ADD_TODO:
            const newTodo = {
                id: uuid(),
                text: action.text,
                createdAt: new Date(),
                completedAt: null,
            };
            return {
                ...state,
                todos: state.todos.concat(newTodo),
            };
        case TOGGLE_TODO:
            return {
                ...state,
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
        default:
            return state;
    }
}

export default todoApp;
