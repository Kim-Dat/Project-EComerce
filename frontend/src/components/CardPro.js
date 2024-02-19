import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
const CardPro = (props) => {
    const { img, title, id, price, col, star } = props;
    const formattedAmount = (price) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(price);
    };
    return (
        <div className={col}>
            <Link to={`/product/${id}`}>
                <div className="card-product">
                    <img src={img} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h3 className="title fs-4 mt-3">{title}</h3>
                        {/* <p className="card-text">{desc}</p> */}
                        <ReactStars count={5} size={20} value={star} activeColor="#ffd700" edit={false} />
                        <div className="price">{formattedAmount(price)}</div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default CardPro;
