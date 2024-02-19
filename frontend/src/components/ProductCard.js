import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation } from "react-router-dom";
const ProductCard = (props) => {
    const { grid, data } = props;
    let location = useLocation();
    const formattedAmount = (price) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(price);
    };
    return (
        <>
            {data?.map((item, index) => {
                return (
                    <div key={index} className={`${location.pathname === "/store" ? `col-${grid}` : "col-3"}`}>
                        <Link to={`/product/${item?._id}`} className="product-card position-relative">
                            <div className="product-img">
                                <img src={item?.images[0]?.url} className="w-100" alt="product image" />
                            </div>
                            <div className={`product-details ${grid === 12 ? "ms-4" : ""}`}>
                                <h6 className="fs-3 py-3">{item?.brand}</h6>
                                <div className="product-title">
                                    <h5 className="lh-sm">{item?.title}</h5>
                                </div>
                                <ReactStars count={5} size={24} value={+item?.totalrating} activeColor="#ffd700" edit={false} />
                                <p
                                    className={`desc ${grid === 12 ? "d-block" : "d-none"}`}
                                    dangerouslySetInnerHTML={{
                                        __html: item?.description,
                                    }}
                                ></p>
                                <p className="price">{formattedAmount(item?.price)}</p>
                            </div>
                        </Link>
                    </div>
                );
            })}
        </>
    );
};

export default ProductCard;
