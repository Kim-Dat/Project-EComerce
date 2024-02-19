import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
const CardSlide = (props) => {
    const { img, title, price, id } = props;
    const formattedAmount = (price) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(price);
    };
    return (
        <div className="cart me-3">
            <Link to={`/product/${id}`}>
                <div className="card-product">
                    <img src={img} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h3 className="title fs-4">{title}</h3>
                        <ReactStars count={5} size={20} value={1} activeColor="#ffd700" edit={false} />
                        <div className="price">{formattedAmount(price)}</div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default CardSlide;
