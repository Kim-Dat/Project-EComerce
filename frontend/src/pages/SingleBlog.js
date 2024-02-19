import React, { useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import Container from "../components/Container";

import { useDispatch, useSelector } from "react-redux";
import { getBlog } from "../features/blog/blogSlice";
const SingleBlog = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const BlogId = location.pathname.split("/")[2];
    const singleBlog = useSelector((state) => state.blog.singleBlog) || [];
    useEffect(() => {
        dispatch(getBlog(BlogId));
    }, [BlogId]);
    return (
        <>
            <BreadCrumb title={"Single Blog"} />
            <Container class1={"blog-wrapper home-wrapper-2 py-5"}>
                <div className="row">
                    <div className="col-12">
                        <div className="single-blog-cart">
                            <Link to={"/blogs"} className="d-flex align-items-center gap-2 mb-5">
                                <BsFillArrowLeftCircleFill className="fs-4" />
                                Quay lại Blogs
                            </Link>
                            <div className="row">
                                <div className="col-5">
                                    <div className="single-blog-img">
                                        <img src={singleBlog?.images && singleBlog.images[0]?.url} className="img-fluid my-4" alt="" />
                                    </div>
                                </div>
                                <div className="col-7">
                                    <div className="p-3">
                                        <h3 className="mb-3">{singleBlog?.title}</h3>

                                        <p
                                            dangerouslySetInnerHTML={{
                                                __html: singleBlog?.description,
                                            }}
                                        ></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default SingleBlog;
