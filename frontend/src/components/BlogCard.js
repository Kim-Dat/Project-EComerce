import React from "react";
import { Link } from "react-router-dom";

const BlogCard = (props) => {
    const { id, title, description, image, date } = props;
    return (
        <>
            <div className="blog-cart">
                <div className="blog-img">
                    <img src={image} className="img-fluid" alt="blog" />
                </div>
                <div className="blog-content">
                    <p className="date">{date}</p>
                    <h5 className="title">{title}</h5>
                    <div className="desc">
                        <p
                            dangerouslySetInnerHTML={{
                                __html: description,
                            }}
                        ></p>
                    </div>
                    <Link className="button" to={`/blog/${id}`}>
                        Read More
                    </Link>
                </div>
            </div>
        </>
    );
};

export default BlogCard;
