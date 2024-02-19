import React from "react";
import { Link } from "react-router-dom";

function CustomButton({ children, href, c_class, type, onClick }) {
    let Comp = "Link";
    const props = {
        onClick,
    };

    if (type == "button") {
        Comp = "button";
    } else if (href) {
        props.to = href;
        Comp = Link;
    }
    return (
        <Comp className={c_class} {...props}>
            {children}
        </Comp>
    );
}

export default CustomButton;
