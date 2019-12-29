import React from 'react';

const TextField = props => (
    <input
        type="text"
        value={props.value}
        onChange={props.onChange}
        onKeyPress={props.onSubmit}
    />
);

export default TextField;
