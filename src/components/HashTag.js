import React from 'react';

const HashTag = props => (
    <a
        href={props.text}
        onClick={e => {
            e.stopPropagation();
            props.onHashTagClick(props.text);
        }}
    >
        {props.text}
    </a>
);

export default HashTag;
