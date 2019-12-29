import React from 'react';

const TodoItem = props => (
    <li
        style={{ textDecoration: props.item.completedAt ? 'line-through' : '' }}
        onClick={() => props.onClick(props.item.id)}
    >
        {props.item.text}
    </li>
);

export default TodoItem;
