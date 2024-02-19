import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
const SpecialProduct = (props) => {
    const { title, brand, totalRating, price, quantity, sold, img } = props;
    const formattedAmount = (price) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(price);
    };
    const percentage = (sold / quantity) * 100;
    return (
        <div className="col-4">
            <div className="spacial-product-card">
                <div className="row">
                    <div className="col-6">
                        <img src={img} className="img-fluid" alt="watch" />
                    </div>
                    <div className="special-product-content col-6">
                        <h5 className="brand fs-2" style={{ color: "#bf4800" }}>
                            {brand}
                        </h5>
                        <h6 className="title fs-4 mt-3">{title}</h6>
                        <ReactStars count={5} size={24} value={+totalRating} activeColor="#ffd700" edit={false} />
                        <p className="price">
                            <span className="fs-2">{formattedAmount(price)}</span>
                        </p>
                        <div className="product-count my-3 fs-4">
                            <p>Số lượng : {quantity}</p>
                            <div className="progress">
                                <div
                                    className="progress-bar"
                                    role="progressbar"
                                    style={{
                                        width: `${percentage.toFixed(2)}%`,
                                    }}
                                    aria-valuenow="25"
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                ></div>
                            </div>
                        </div>
                        <Link className="button-small my-3">Add to card</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpecialProduct;
