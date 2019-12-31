import React from 'react';
import { joinAlternatively } from '../utils/helpers';
import HashTag from './HashTag';

const TodoItem = props => {
    let children = props.item.text.split(/#\w+/g);

    if (props.item.hashTags.length > 0) {
        children = joinAlternatively(
            children,
            props.item.hashTags.map((item, index) => (
                <HashTag
                    key={index}
                    text={item}
                    onHashTagClick={props.onHashTagClick}
                />
            ))
        );
    }

    return (
        <li
            className="todo-item"
            style={{
                textDecoration: props.item.completedAt ? 'line-through' : '',
            }}
            onClick={() => props.onClick(props.item.id)}
        >
            {children}
        </li>
    );
};

export default TodoItem;
