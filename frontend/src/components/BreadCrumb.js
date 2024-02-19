import React from "react";
import { Link } from "react-router-dom";
import Container from "./Container";

const BreadCrumb = (props) => {
    const { title } = props;
    return (
        <Container class1={"breadcrumb mb-0 py-4"}>
            <div className="row">
                <div className="col-12 d-flex align-items-center justify-content-center fs-3">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb d-flex align-items-center justify-content-center">
                            <li class="breadcrumb-item">
                                <Link to={"/"} className="fs-4">
                                    Home
                                </Link>
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">
                                <span className="fs-3">{title}</span>
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>
        </Container>
    );
};

export default BreadCrumb;
