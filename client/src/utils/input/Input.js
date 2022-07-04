import React from 'react';

const Input = ({value, setValue, type, placeholder}) => {
    return (
        <input value={value} type={type} placeholder={placeholder} className={"input"}
               onChange={(event) => setValue(event.target.value)}></input>
    );
};

export default Input;
