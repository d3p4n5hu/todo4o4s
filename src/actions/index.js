export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const RESET_TODO = 'RESET_TODO';

export const addTodo = text => ({
    type: ADD_TODO,
    text,
});

export const toggleTodo = id => ({
    type: TOGGLE_TODO,
    id,
});
export const resetTodo = id => ({
    type: RESET_TODO,
});
