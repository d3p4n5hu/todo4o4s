import React from 'react';

const TextField = props => {
    const { onSubmit, ...other } = props;

    return <input type="text" onKeyPress={onSubmit} {...other} />;
};

export default TextField;
