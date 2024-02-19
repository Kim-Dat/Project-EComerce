import React from "react";

const CustomInput = (props) => {
    const { type, name, placeholder, c_class, val, onBl, onCh, style } = props;
    return (
        <>
            <input
                style={style}
                type={type}
                name={name}
                value={val}
                className={`form-control ${c_class}`}
                placeholder={placeholder}
                onChange={onCh}
                onBlur={onBl}
            />
        </>
    );
};

export default CustomInput;
