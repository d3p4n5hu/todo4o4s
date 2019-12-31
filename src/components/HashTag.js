import React from 'react';

const HashTag = props => (
    <span
        className="hashtag"
        onClick={e => {
            e.stopPropagation();
            props.onHashTagClick(props.text);
        }}
    >
        {props.text}
    </span>
);

export default HashTag;
