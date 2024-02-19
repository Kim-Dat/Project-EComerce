import React from "react";

const Container = ({ class1, children }) => {
    return (
        <section className={class1}>
            <div className="container">
                <div className={"main-bg-primary"} >{children}</div>
            </div>
        </section>
    );
};

export default Container;
